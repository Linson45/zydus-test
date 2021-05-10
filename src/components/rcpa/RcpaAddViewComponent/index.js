import React, { Component } from 'react';
import {
  Dimensions, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import { Collapse, CollapseBody, CollapseHeader } from 'accordion-collapse-react-native';
import Modal from 'react-native-modal';
import {
  Body, Button, Icon, ListItem, Right
} from 'native-base';
import CheckBox from 'react-native-check-box';
import styles from './styles';
import ParentView from '../../ParentView';
import Images from '../../../Constants/imageConstants';
import { getCurrentMonth, getCurrentYear, getFullMonthString } from '../../../util/dateTimeUtil';
import Colors from '../../../styles/colorsStyles';

class RcpaAddViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      collapsibleToggleArray: [],
      selected_list: [],
      firstShow: false,
      showPopup: false,
      collapsibleBrandToggleArray: new Array(100).fill(false),
      brands: props.brands,
      submittedRcpa: props.submittedRcpa
    };
  }

  componentWillReceiveProps(props) {
    const collapseList = [];
    const brandData = JSON.parse(JSON.stringify(props.brands));
    const latestSelectedData = [];
    // eslint-disable-next-line no-unused-vars
    let submitData;
    try {
      submitData = (props.submittedRcpa && props.submittedRcpa.length > 0 && props.brands && props.brands.length > 0)
      // eslint-disable-next-line array-callback-return,consistent-return
        ? brandData.filter((brand, index) => {
          for (let i = 0; i < props.submittedRcpa.length; i++) {
            let currentBrand = {};
            if (props.submittedRcpa[i].brand_code === brand.brand_code) {
              currentBrand = {
                brand_code: brand.brand_code,
                brand_name: brand.brand_name,
                name: brand.brand_name,
                id: brand.id,
                items: []
              };
              collapseList.push({ id: brand.brand_code, collapse: true });
              brand.items = brand.items.map((product, index2) => {
                for (let j = 0; j < props.submittedRcpa[i].products.length; j++) {
                  if (product.product_code === props.submittedRcpa[i].products[j].product_code) {
                    brandData[index].items[index2].isSelected = true;
                    product.quantity = props.submittedRcpa[i].products[j].quantity ? props.submittedRcpa[i].products[j].quantity : null;
                    product.competitors = product.competitors.map((competitor) => {
                      for (let k = 0; k < props.submittedRcpa[i].products[j].competitions.length; k++) {
                        if (competitor.product_code === props.submittedRcpa[i].products[j].competitions[k].product_code) {
                          competitor.quantity = props.submittedRcpa[i].products[j].competitions[k].quantity ? props.submittedRcpa[i].products[j].competitions[k].quantity : null;
                        }
                      }
                      return competitor;
                    });
                  }
                }
                product.id = product.product_code;
                product.name = product.product_name;
                return product;
              });

              currentBrand.items = brand.items.filter((product, index2) => brandData[index].items[index2].isSelected === true);

              brand.id = brand.brand_code;
              brand.name = brand.brand_name;

              latestSelectedData.push(currentBrand);

              return true;
            }
          }
        }) : [];
    } catch (e) {
      submitData = [];
    }

    if (this.props.brands === null && props.brands !== null) {
      this.setState({
        brands: brandData,
        selected_list: latestSelectedData,
        showPopup: !(latestSelectedData && latestSelectedData.length > 0),
        collapsibleToggleArray: collapseList,

      });
    }
    if (props.postRcpa && props.postRcpa.error === '' && props.postRcpa.data && props.postRcpa.data.id > 0 && this.props.postRcpa.data == null) {
      alert('RCPA SUBMITTED SUCCESSFULLY');
      this.props.gotoList();
    }
  }

  toggleCollapse(position, value) {
    const newcollapseListArray = this.state.collapsibleToggleArray.filter((item) => {
      if (item.id === position) {
        item.collapse = value;
      }
      return item;
    });

    this.setState({
      collapsibleToggleArray: newcollapseListArray
    });
  }

    onSelectedItemsChange = (selectedItems) => {
      // It will check if parent is selected or if any of child is selected id of that parent will be pushed
      // in selected items list in order to solve the problem of not getting parent when only child is selected
      const { brands } = this.state;
      const newSelectedItem = [];
      brands.forEach((item) => {
        let parent = false;
        let child = false;
        if (selectedItems.indexOf(item.id) > -1) {
          // parent is present check for child
          parent = true;
          item.items.forEach((sub_product) => {
            if (selectedItems.indexOf(sub_product.id) > -1) {
              child = true;
              newSelectedItem.push(sub_product.id);
            }
          });
          if ((parent && child) || (!parent && child)) {
            newSelectedItem.push(item.id);
          }
        } else {
          item.items.forEach((sub_product) => {
            if (selectedItems.indexOf(sub_product.id) > -1) {
              child = true;
              newSelectedItem.push(sub_product.id);
            }
          });
          if ((parent && child) || (!parent && child)) {
            newSelectedItem.push(item.id);
          }
        }
      });
      this.setState({
        selectedItems: newSelectedItem, // setting new selected list contain all id of parent and there children
      }, () => {
        this.confirm(); // confirm is the function which is responsible for creating selected_list which will be used to render data
      });
    };

    confirm = () => {
      const collapseList = [];
      const { selectedItems } = this.state;
      const brandsList = this.state.brands;

      // deep copy created bcoz logic below was mutating the state which leads to data loss in popup
      const brands = JSON.parse(JSON.stringify(brandsList));
      // previous login due to which if child is selected parent will be not visible in the gui

      // next logic to solve previous problem
      // creating selected item object with there products in it so that it can be rendered with input field for quantity
      const selected_item = brands.filter((item) => {
        if (selectedItems.indexOf(item.id) > -1) {
          collapseList.push({ id: item.id, collapse: true }); // used to keep track of collapse of accordian
          item.items = item.items.filter((product) => {
            if (selectedItems.indexOf(product.id) > -1) {
              if (this.state.selected_list.length > 0) {
                const previousDataBrand = this.state.selected_list.filter((stateList) => stateList.id === item.id);
                const selectedProduct = previousDataBrand[0] ? previousDataBrand[0].items.filter((sub_product) => sub_product.id === product.id) : [];
                product.quantity = selectedProduct[0] ? selectedProduct[0].quantity : null;
                if (selectedProduct[0] && selectedProduct[0].competitors) {
                  product.competitors = product.competitors.map((competitor) => {
                    for (let i = 0; i < selectedProduct[0].competitors.length; i++) {
                      if (competitor.product_code === selectedProduct[0].competitors[i].product_code) {
                        competitor.quantity = selectedProduct[0].competitors[i].quantity ? selectedProduct[0].competitors[i].quantity : null;
                      }
                    }
                    return competitor;
                  });
                }
              }
              return true;
            }
            return false;
          });
          return true;
        }
        return false;
      });
      this.setState({
        selected_list: selected_item,
        collapsibleToggleArray: collapseList
      });
    };

    getCollapsValue(id) {
      const collaps = this.state.collapsibleToggleArray.filter((item) => item.id === id);
      return collaps[0] ? collaps[0].collapse : false;
    }

    changeQuantityValue = (parentId, childId, competitorId, value) => {
      const new_selectList_quantity = this.state.selected_list.map((product) => {
        if (product.id === parentId) {
          product.items = product.items.map((child_product) => {
            if (child_product.id === childId && competitorId === 0) {
              child_product.quantity = value;
              // return child_product
            } else if (child_product.id === childId && competitorId !== 0) {
              child_product.competitors = child_product.competitors.map((item) => {
                if (item.id === competitorId) {
                  item.quantity = value;
                  return item;
                }
                return item;
              });
            }
            return child_product;
          });
        }
        return product;
      });
      this.setState({
        selected_list: new_selectList_quantity
      });
    };

    renderButtons() {
      const { submitData } = this.props;
      const { selected_list } = this.state;

      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.historyButton}
            onPress={() => {
              this.setState({ showPopup: true });
            }}
          >
            <Text style={styles.buttonText}>Add Brands</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              submitData(selected_list);
            }}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      );
    }

    renderData = () => {
      const { doctor, chemist } = this.props;
      return (
        <ScrollView style={styles.container}>
          <ImageBackground
            source={Images.ChemistSelectionBanner}
            resizeMode="stretch"
            style={styles.bannerStyle}
          >
            <View style={styles.bannerContent}>
              <Text style={styles.month}>Month</Text>
              <Text style={styles.year}>
                {getFullMonthString(getCurrentMonth())}
                {' '}
                {getCurrentYear()}
              </Text>
            </View>
          </ImageBackground>
          <View style={styles.chemistDetailContainer}>
            <Text style={styles.doctorName}>
              {doctor.doc_name}
              {' '}
              (Doctor)
            </Text>
            <Text style={styles.chemistName}>
              {chemist.chemist_name}
              {' '}
              (Chemist)
            </Text>
          </View>
          <View>
            {this.state.selected_list && this.state.selected_list.map((item, index1) => (
              <Collapse
                key={index1}
                onToggle={(isCollapsed) => this.toggleCollapse(item.id, isCollapsed)}
                isCollapsed={this.getCollapsValue(item.id)}
              >
                <CollapseHeader>
                  <ImageBackground
                    source={this.getCollapsValue(item.id) ? Images.myPerformanceListHeaderUp : Images.myPerformanceListHeaderDown}
                    style={styles.headerImageBg}
                  >
                    <Text style={styles.brand}>{item.name}</Text>
                  </ImageBackground>
                </CollapseHeader>
                <CollapseBody>
                  <ScrollView>
                    {item.items.map((product, index2) => (
                      <View key={index2}>
                        <View style={styles.rowContainer}>
                          <View style={styles.rowInnerContainer}>
                            <View style={styles.rowLeftContent}>
                              <Text style={styles.companyZydus}>Zydus</Text>
                              <Text style={styles.productName}>{product.name}</Text>
                            </View>
                            <TextInput
                              placeholder="Quantity"
                              maxLength={5}
                              value={product.quantity ? product.quantity.toString() : null}
                              keyboardType="number-pad"
                              onChangeText={(value) => {
                                this.changeQuantityValue(item.id, product.id, 0, value);
                              }}
                              style={styles.input}
                            />
                          </View>
                        </View>
                        {product.competitors.map((competitors, index3) => (
                          <View style={styles.rowContainerCompetitors} key={index3}>
                            <View style={styles.rowInnerContainer}>
                              <View style={styles.rowLeftContent}>
                                <Text
                                  style={styles.competitor}
                                >
                                  {competitors.company_name}
                                </Text>
                                <Text
                                  style={styles.productName}
                                >
                                  {competitors.name}
                                </Text>
                              </View>
                              <TextInput
                                placeholder="Quantity"
                                maxLength={5}
                                value={competitors.quantity ? competitors.quantity.toString() : null}
                                keyboardType="number-pad"
                                onChangeText={(value) => {
                                  this.changeQuantityValue(item.id, product.id, competitors.id, value);
                                }}
                                style={styles.input}
                              />
                            </View>
                          </View>
                        ))}
                      </View>
                    ))}
                  </ScrollView>
                </CollapseBody>
              </Collapse>
            ))}
            {this.renderButtons()}
          </View>
        </ScrollView>
      );
    };

    renderModalHeader() {
      return (
        <View style={styles.modalHeaderComponent}>
          <Text style={styles.modalHeaderText}>Select Products</Text>
        </View>
      );
    }

    createSelectedArray = (brands) => {
      // Iterating on brands to get all the brands id and product id which are selected in the popup
      const selectedItemIds = [];
      brands.map((item) => {
        if (item.isSelected) {
          selectedItemIds.push(item.id);
        }
        item.items.forEach((product) => {
          if (product.isSelected) {
            selectedItemIds.push(product.id);
          }
          product.competitors.forEach((competitor) => {
            if (competitor.isSelected) {
              selectedItemIds.push(competitor.id);
            }
          });
        });
        return item;
      });

      this.setState({
        selectedItems: selectedItemIds, // this list only contain the selected item id, it will not contain parent Id if only few childs are selected
        showPopup: selectedItemIds.length <= 0,
      }, () => {
        // using previous logic to get the id of parents who's child are selected so that we can render brand according to selected children
        this.onSelectedItemsChange(selectedItemIds);
      });
    };

    renderModal() {
      const { showPopup } = this.state;
      const { brands } = this.state;
      const { onCancel } = this.props;
      return (
        <Modal
          style={{ height: Dimensions.get('window').height - 50 }}
          onRequestClose={() => this.setState({ showPopup: false })}
          isVisible={showPopup}
        >
          <View style={styles.modalContent}>
            {this.renderModalHeader()}
            <ScrollView>
              {
                            brands.map((brand, index) => (
                              this.renderModalBrand(brand, index)
                            ))
                        }
            </ScrollView>
          </View>
          <View style={styles.popupButtonContainer}>
            <Button
              style={styles.popupLeftButton}
              onPress={() => {
                this.setState({ showPopup: false });
                onCancel();
              }}
            >
              <Text style={styles.popupButtonText}>Cancel</Text>
            </Button>
            <Button
              style={styles.popupRightButton}
              onPress={() => {
                this.createSelectedArray(brands);
              }}
            >
              <Text style={styles.popupButtonText}>Add</Text>
            </Button>
          </View>
        </Modal>
      );
    }

    toggleBrandCollapse(position, value) {
      const toggleArray = this.state.collapsibleBrandToggleArray;
      toggleArray[position] = value;
      this.setState({ collapsibleBrandToggleArray: toggleArray });
    }

    renderModalBrand(brand, index) {
      const { collapsibleBrandToggleArray } = this.state;
      const { items } = brand;

      return (
        <Collapse
          key={index}
          onToggle={(isCollapsed) => this.toggleBrandCollapse(index, isCollapsed)}
          isCollapsed={collapsibleBrandToggleArray[index]}
        >
          <CollapseHeader style={styles.headerStyle}>
            <View style={styles.brandModalHeaderView}>
              <View style={styles.brandIcon}>
                {collapsibleBrandToggleArray[index] ? <Icon name="arrow-dropup" />
                  : <Icon name="arrow-dropdown" />}

                <Text style={styles.headerText}>{brand.brand_name}</Text>
              </View>
              <CheckBox
                style={styles.checkbox}
                isChecked={brand.isSelected}
                checkBoxColor={Colors.colorPrimary}
                onClick={() => {
                  this.toggleModalBrandSelection(index);
                }}
              />
            </View>
          </CollapseHeader>
          <CollapseBody>
            <ScrollView>
              {
                            items.map((item, index1) => this.renderModalProduct(item, index, index1))
                        }
            </ScrollView>
          </CollapseBody>
        </Collapse>
      );
    }

    toggleModalBrandSelection(index) {
      const { brands } = this.state;
      const brand = brands[index];
      brand.isSelected = !brand.isSelected;
      brand.items = brand.items.map((item) => {
        item.isSelected = brand.isSelected;
        return item;
      });
      brands[index] = brand;
      this.setState({ brands });
    }

    toggleModalItemSelection(brandIndex, index) {
      const { brands } = this.state;
      const brand = brands[brandIndex];

      let allSelected = true;

      brand.items = brand.items.map((item, localIndex) => {
        if (index === localIndex) item.isSelected = !item.isSelected;
        allSelected = allSelected && item.isSelected;
        return item;
      });
      brand.isSelected = allSelected;
      brands[brandIndex] = brand;
      this.setState({ brands });
    }

    renderModalProduct(product, brandIndex, index) {
      return (
        <ListItem key={index}>
          <Body>
            <Text style={styles.product}>{product.product_name}</Text>
          </Body>
          <Right>
            <CheckBox
              isChecked={product.isSelected}
              checkBoxColor={Colors.colorPrimary}
              onClick={() => {
                this.toggleModalItemSelection(brandIndex, index);
              }}
            />
          </Right>
        </ListItem>
      );
    }

    render() {
      const { loading, hoverLoading, connected } = this.props;
      const { brands } = this.state;
      return (
        <ParentView
          hoverLoading={hoverLoading}
          loading={loading}
          connected={connected}
          onRefresh={() => this.props.onRefresh()}
          data={brands}
          style={styles.container}
        >
          {brands ? this.renderData() : null}
          {brands ? this.renderModal() : null}
        </ParentView>
      );
    }
}

export default RcpaAddViewComponent;
