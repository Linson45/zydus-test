import React, {Component} from 'react';
import {
  ImageBackground,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import {Dropdown} from 'react-native-material-dropdown';
import {Body, Icon, ListItem, Right, Button, Item, Input} from 'native-base';
import Modal from 'react-native-modal';
import styles from './styles';
import ParentView from '../../ParentView';
import Images from '../../../Constants/imageConstants';
import {
  getCurrentMonth,
  getCurrentYear,
  getFullMonthString,
} from '../../../util/dateTimeUtil';
import Colors from '../../../styles/colorsStyles';

class RxChemistSelectionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      selected_list: [],
      firstShow: false,
      showPopup: false,
      brands: props.chemistsData,
      searchQuery: '',
    };
  }

  renderBottomButton(submitData) {
    return (
      <Button style={styles.bottomView} onPress={() => submitData({})}>
        <Text style={styles.popupButtonText}>SUBMIT</Text>
      </Button>
    );
  }

  renderSearch() {
    return (
      <Item
        style={{
          margin: 5,
          borderColor: Colors.gray_light_1,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderRadius: 10,
          paddingLeft: 10,
        }}>
        <Icon
          name="search"
          style={{
            color: Colors.gray_light_1,
            fontSize: 25,
          }}
        />
        <Input
          onChangeText={searchQuery => this.searchText({searchQuery})}
          placeholder="Search"
        />
      </Item>
    );
  }

  renderModalHeader() {
    return (
      <View style={styles.modalHeaderComponent}>
        <Text style={styles.modalHeaderText}>Select Chemist</Text>
      </View>
    );
  }

  renderModalBrand(brand, index) {
    const {onChange, selected} = this.props;
    const {searchQuery} = this.state;
    // console.log('brand', brand);
    if (searchQuery) {
      if (brand.name.toLowerCase().indexOf(searchQuery.toLowerCase()) < 0) {
        return null;
      }
    }
    return (
      <View style={styles.topRow} key={index}>
        <View style={styles.leftTopRow}>
          <Text style={styles.doctorName}>
            {brand.name} ({brand.chemist_code})
          </Text>
        </View>
        <View style={styles.rightTopRow}>
          <CheckBox
            checkBoxColor={Colors.colorPrimary}
            onClick={() => onChange(index, brand)}
            isChecked={selected[index]}
          />
        </View>
      </View>
    );
  }

  searchText(searchEvent) {
    if (searchEvent != null) {
      if (searchEvent.searchQuery != null) {
        this.setState({searchQuery: searchEvent.searchQuery});
      }
    }
  }

  renderModal(chemistsData) {
    const {showPopup} = this.state;
    const {selected} = this.props;

    return (
      <Modal
        style={{
          height: Dimensions.get('window').height - 40,
          width: Dimensions.get('window').width - 80,
        }}
        onRequestClose={() => this.setState({showPopup: true})}
        isVisible={showPopup}>
        <View style={styles.modalContent}>
          {this.renderModalHeader()}
          {this.renderSearch()}

          <ScrollView>
            {chemistsData.map((brand, index) =>
              this.renderModalBrand(brand, index),
            )}
          </ScrollView>
        </View>
        <View style={styles.popupButtonContainer}>
          <Button
            style={styles.popupLeftButton}
            onPress={() => {
              this.setState({showPopup: false});
              this.setState({searchQuery: null});
            }}>
            <Text style={styles.popupButtonText}>Cancel</Text>
          </Button>
          <Button
            style={styles.popupRightButton}
            onPress={() => {
              this.filterAndAdd(selected);
            }}>
            <Text style={styles.popupButtonText}>Add</Text>
          </Button>
        </View>
      </Modal>
    );
  }

  filterAndAdd(selected) {
    const filtered = selected.filter(el => el.hasOwnProperty('chemist_code'));
    console.log('Filter and Add', filtered);
    this.setState({selected_list: filtered});
    this.setState({showPopup: false});
    this.setState({searchQuery: null});
  }

  renderData(data) {
    const {changeChemist, isSelectedDoc} = this.props;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={Images.ChemistSelectionBanner}
          resizeMode="stretch"
          style={styles.bannerStyle}>
          <View style={styles.bannerContent}>
            <Text style={styles.month}>Month</Text>
            <Text style={styles.year}>
              {getFullMonthString(getCurrentMonth())} {getCurrentYear()}
            </Text>
          </View>
        </ImageBackground>
        <View>
          <Dropdown
            label="Doctor"
            value="Select Doctors"
            data={data}
            valueExtractor={({doc_code}) => doc_code}
            labelExtractor={({doc_name, doc_code}) =>
              `${doc_name} (${doc_code})`
            }
            onChangeText={(value, index, data) => {
              changeChemist(data[index]);
            }}
          />
        </View>
        {isSelectedDoc ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.historyButton}
              onPress={() => {
                this.setState({showPopup: true});
              }}>
              <Text style={styles.buttonText}>Add Chemist</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
  remove(index, doctor) {
    const {changeSelected} = this.props;
    // const {selected_list} = this.state;
    var chemistArray = this.state.selected_list;
    if (index > -1) {
      chemistArray.splice(index, 1);
      const filtered = chemistArray.filter(el =>
        el.hasOwnProperty('chemist_code'),
      );
      this.props.changeSelected(filtered);
      this.setState({selected_list: filtered});
      console.log('Chemist Array', filtered);
    }
  }
  renderAddedChemist(data) {
    const {remove} = this.props;
    const filtered = data.filter(el => el.hasOwnProperty('chemist_code'));
    console.log('Chemist Apsel', filtered);
    const filteredMore = filtered.filter(
      (ele, ind) => ind === filtered.findIndex(elem => elem.name === ele.name),
    );
    console.log('Chemist Apsel', filteredMore);
    if (filteredMore.length !== 0) {
      return this.state.selected_list.map((bo, index) => {
        const {name} = bo;

        return (
          <ListItem
            key={index}
            style={{
              padding: 6,
              borderRadius: 10,
              marginTop: 5,
            }}>
            <Body>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={styles.chemistListSerial}>{index + 1}</Text>
                <View
                  style={{
                    backgroundColor: '#FFA500',
                    padding: 8,
                    width: '50%',
                    borderRadius: 10,
                    marginLeft: 10,
                  }}>
                  <Text style={styles.itemHeading}>{name}</Text>
                </View>
              </View>
            </Body>

            <Right>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => this.remove(index, bo)}>
                <Icon
                  name="closecircle"
                  type="AntDesign"
                  style={{color: 'red', fontSize: 22}}
                />
              </TouchableOpacity>
            </Right>
          </ListItem>
        );
      });
    }
    return null;
  }

  render() {
    const {
      filterDocList,
      connected,
      loading,
      chemistsData,
      submitData,
      isSubmitProgress,
    } = this.props;
    console.log('Selected list', this.state.selected_list);
    // const filtered = this.state.selected_list.filter(el =>
    //   el.hasOwnProperty('chemist_code'),
    // );
    const filtered = this.state.selected_list;

    // const filtered = this.state.selected_list.filter((ele, ind) => ind === this.state.selected_list.findIndex((elem) => elem.chemist_code === ele.chemist_code && ele.hasOwnProperty('chemist_code')));

    return (
      <ParentView
        loading={loading}
        connected={connected}
        style={styles.container}>
        {isSubmitProgress ? (
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" />
          </View>
        ) : null}

        <ScrollView
          style={{
            paddingHorizontal: 15,
            flex: 1,
          }}>
          {this.renderData(filterDocList)}
          {chemistsData != null ? this.renderModal(chemistsData) : null}
          {filtered.length !== 0 ? (
            <View>
              <ImageBackground
                source={Images.ic_tool_bar_bg}
                style={styles.absoluteFill}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={styles.heading}>S No</Text>
                  <Text style={styles.heading}>ADDED CHEMIST</Text>
                </View>
              </ImageBackground>
            </View>
          ) : null}
          {this.state.selected_list
            ? this.renderAddedChemist(this.state.selected_list)
            : null}
        </ScrollView>
        {filtered.length > 0 ? this.renderBottomButton(submitData) : null}
      </ParentView>
    );
  }
}

export default RxChemistSelectionComponent;
