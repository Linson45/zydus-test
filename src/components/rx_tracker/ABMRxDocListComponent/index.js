import React from 'react';
import { Container, Icon, Input, Item, Text, ListItem, Body } from 'native-base';
import { ScrollView, View } from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import { withNavigation } from 'react-navigation';
import ParentView from '../../ParentView';
import styles from './styles';
import TabStyles from '../../../styles/tabStyles';
import ColorStyles from '../../../styles/colorsStyles';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity, Image } from 'react-native';
import Images from '../../../Constants/imageConstants';
import {
  MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
const STORAGE_KEY = '@save_rx_tab';

class ABMRxDocListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      isTab: false,
      sortOrder: false,
      sortChangeStarted: false,
      dateOrder: false,
      dateOrderChangeStarted: false,
      rxSortOrder: false,
      rxSortChangeStarted: false,
      rxDateOrder: true,
      rxDateOrderChangeStarted: false,
      approvedList: false,
      rejectedList: false,
      pendingList: false,
      rxApprovedList: false,
      rxRejectedList: false,
      rxPendingList: false,

    };
    this.goToDetailScreen = this.goToDetailScreen.bind(this);
    this.sortHandlerAtoZ = this.sortHandlerAtoZ.bind(this);
    this.sortHandlerZtoA = this.sortHandlerZtoA.bind(this);
    this.dateSortHandlerAtoZ = this.dateSortHandlerAtoZ.bind(this);
    this.dateSortHandlerZtoA = this.dateSortHandlerZtoA.bind(this);
  }
  componentDidMount() {
    this.willFocus = this.props.navigation.addListener(
      'didFocus',
      this.onFocus.bind(this),
    );

  }
  onFocus() {
    this.setState({ isTab: false })
  }
  goToDetailScreen(docData) {
    const userDetails = this.props.navigation.state.params.userDetails;
    const { user } = this.props;
    const boNameData = `${user.name} ,${user.group_code} ,${user.hq_name}`;
    console.log('Apsel data', boNameData);
    this.props.navigation.navigate('RxAbmSubmitApprovels', {
      docData,
      userDetails,
      boNameData,
    });
  }
  async goToUploadVerficationScreen(docData) {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(true));

    const userDetails = this.props.navigation.state.params.userDetails;
    const { user } = this.props;
    const boNameData = `${user.name} ,${user.group_code} ,${user.hq_name}`;
    this.props.navigation.navigate('RxAbmSubmitApprovel', {
      docData,
      userDetails,
      boNameData,
    });
  }

  searchText(searchEvent) {
    if (searchEvent != null) {
      if (searchEvent.searchQuery != null) {
        this.setState({ searchQuery: searchEvent.searchQuery });
      }
    }
  }

  renderList(data) {
    const { searchQuery } = this.state;

    if (data != null) {
      const listToDisplay = data;
      const ValuesGot = data;
      if (this.state.sortChangeStarted) {
        if (this.state.sortOrder) {
          ValuesGot.sort((a, b) =>
            a.doc_name.localeCompare(b.doc_name, 'es', { sensitivity: 'base' }),
          );
        } else {
          ValuesGot.sort((a, b) =>
            a.doc_name.localeCompare(b.doc_name, 'es', { sensitivity: 'base' }),
          );
          ValuesGot.reverse();
        }
      }
      const MONTHS = {
        JAN: 1,
        FEB: 2,
        MAR: 3,
        APR: 4,
        MAY: 5,
        JUN: 6,
        JUL: 7,
        AUG: 8,
        SEP: 9,
        OCT: 10,
        NOV: 11,
        DEC: 12,
      };

      if (this.state.dateOrderChangeStarted) {
        if (this.state.dateOrder) {
          data.sort(function (a, b) {
            var aa = a.created.split('-'),
              bb = b.created.split('-');

            return (
              aa[2] - bb[2] || MONTHS[aa[1]] - MONTHS[bb[1]] || aa[0] - bb[0]
            );
          });
        } else {
          data.sort(function (a, b) {
            var aa = a.created.split('-'),
              bb = b.created.split('-');

            return (
              aa[2] - bb[2] || MONTHS[aa[1]] - MONTHS[bb[1]] || aa[0] - bb[0]
            );
          });
          data.reverse();
        }
      }
      var dataFiltered = data;
      if (this.state.approvedList) {
        dataFiltered = [];
        data.map(item => {
          if (item.status_rbm === '1') {
            dataFiltered.push(item);
          }
        });
      }
      if (this.state.rejectedList) {
        dataFiltered = [];
        data.map(item => {
          if (item.status === '2' || item.status_rbm === '2') {
            dataFiltered.push(item);
          }
        });
      }
      if (this.state.pendingList) {
        dataFiltered = [];
        data.map(item => {
          if (item.status === '0' || (item.status === '1' && item.status_rbm === '0')) {
            dataFiltered.push(item);
          }
        });
      }
      return dataFiltered.map((item, index) => {
        const {
          doc_name,
          status,
          status_rbm,
          created,
          spec_desc,
          visit_category,
          chemist_code,
          dr_code,
        } = item;
        if (searchQuery) {
          if (doc_name.toLowerCase().indexOf(searchQuery.toLowerCase()) < 0) {
            return null;
          }
        }
        var approvedOrRejected
        if (status === '1') {
          approvedOrRejected = 'Approved by ABM'
        }
        if (status === '2') {
          approvedOrRejected = 'REJECTED by ABM'
        }
        return (
          <ListItem
            key={index}
            onPress={() => this.goToDetailScreen(item)}
            bordered
            style={{
              marginLeft: 0,
            }}>
            <Body>
              <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text
                      style={{
                        padding: 3,
                        fontSize: 15,
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}>
                      {doc_name}
                    </Text>
                    <Text style={styles.doc_item}>{dr_code}</Text>
                    <Text style={styles.columnText}>{spec_desc}</Text>
                    <Text style={styles.columnText}>{visit_category}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.doc_item}>{chemist_code.length}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.doc_item}>{created}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    {status === '1' || status === '0' ?
                      <Text
                        style={{
                          padding: 4,
                          fontSize: 15,
                          textAlign: 'center',
                          color:
                            status_rbm === '1'
                              ? ColorStyles.green
                              : status_rbm === '2'
                                ? ColorStyles.red
                                : ColorStyles.gray,
                        }}>
                        {status_rbm === '1'
                          ? 'APPROVED by RBM '
                          : status_rbm === '2'
                            ? 'REJECTED by RBM'
                            : status==='0' ? 'PENDING by ABM': 'PENDING by RBM'}
                      </Text> : null
                    }
                    <Text
                      style={{
                        padding: 4,
                        fontSize: 15,
                        textAlign: 'center',
                        color:
                          status === '1'
                            ? ColorStyles.green
                            : status === '2'
                              ? ColorStyles.red
                              : ColorStyles.gray,
                      }}>
                      {status_rbm == '0' ? approvedOrRejected : null}
                    </Text>
                  </View>
                  <View style={{ alignSelf: 'center' }}>
                    <Icon
                      name="chevron-right"
                      type="Entypo"
                      style={{ color: 'grey', fontSize: 20 }}
                    />
                  </View>
                </View>
              </View>
            </Body>
          </ListItem>
        );
      });
    }
    return null;
  }

  renderRXTrackerList(data) {
    const { searchQuery } = this.state;
    // console.log('Apsel user', this.props.user);
    if (data != null) {
      const listToDisplay = data;
      console.log('data apsel rx', data);
      const ValuesGot = data;
      if (this.state.rxSortChangeStarted) {
        if (this.state.rxSortOrder) {
          ValuesGot.sort((a, b) =>
            a.doc_name.localeCompare(b.doc_name, 'es', { sensitivity: 'base' }),
          );
        } else {
          ValuesGot.sort((a, b) =>
            a.doc_name.localeCompare(b.doc_name, 'es', { sensitivity: 'base' }),
          );
          ValuesGot.reverse();
        }
      }
      const MONTHS = {
        JAN: 1,
        FEB: 2,
        MAR: 3,
        APR: 4,
        MAY: 5,
        JUN: 6,
        JUL: 7,
        AUG: 8,
        SEP: 9,
        OCT: 10,
        NOV: 11,
        DEC: 12,
      };

      if (this.state.rxDateOrderChangeStarted) {
        if (!this.state.rxDateOrder) {
          data.sort(function (a, b) {
            var aa = a.created_at.split('-'),
              bb = b.created_at.split('-');

            return (
              aa[2] - bb[2] || MONTHS[aa[1]] - MONTHS[bb[1]] || aa[0] - bb[0]
            );
          });
        } else {
          data.sort(function (a, b) {
            var aa = a.created_at.split('-'),
              bb = b.created_at.split('-');

            return (
              aa[2] - bb[2] || MONTHS[aa[1]] - MONTHS[bb[1]] || aa[0] - bb[0]
            );
          });
          data.reverse();
        }
      }
      var dataFiltered = data;
      if (this.state.rxApprovedList) {
        dataFiltered = [];
        data.map(item => {
          if (item.status_rbm === '1') {
            dataFiltered.push(item);
          }
        });

        console.log('list show APSEL', dataFiltered);
      }
      if (this.state.rxRejectedList) {
        dataFiltered = [];
        data.map(item => {
          if (item.status === '2' || item.status_rbm === '2') {
            dataFiltered.push(item);
          }
        });
      }
      if (this.state.rxPendingList) {
        dataFiltered = [];
        data.map(item => {
          if (item.status === '0' || (item.status === '1' && item.status_rbm === '0')) {
            dataFiltered.push(item);
          }
        });
      }
      if (this.state.rxIncompletedList) {
        dataFiltered = [];
        data.map(item => {
          if (item.status === '-1') {
            dataFiltered.push(item);
          }
        });
      }


      console.log('Date  data full', data);
      return dataFiltered.map((item, index) => {
        const { doc_name, status, status_rbm, created_at, brand_name } = item;
        if (searchQuery) {
          if (doc_name.toLowerCase().indexOf(searchQuery.toLowerCase()) < 0) {
            return null;
          }
        }
        var approvedOrRejected
        if (status === '1') {
          approvedOrRejected = 'Approved by ABM'
        }
        if (status === '2') {
          approvedOrRejected = 'REJECTED by ABM'
        }
        return (
          <ListItem
            key={index}
            onPress={() => this.goToUploadVerficationScreen(item)}
            bordered
            style={{
              marginLeft: 0,
            }}>
            <Body>
              <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text style={styles.docTitle}>{doc_name}</Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text style={styles.doc_item}>{brand_name}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.doc_item}>{created_at}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    {status === '1' || status === '0' ?
                      <Text
                        style={{
                          padding: 4,
                          fontSize: 15,
                          textAlign: 'center',
                          color:
                            status_rbm === '1'
                              ? ColorStyles.green
                              : status_rbm === '2'
                                ? ColorStyles.red
                                : ColorStyles.gray,
                        }}>
                        {status_rbm === '1'
                          ? 'APPROVED by RBM '
                          : status_rbm === '2'
                            ? 'REJECTED by RBM'
                            : status==='0' ? 'PENDING by ABM': 'PENDING by RBM'}
                      </Text> : null
                    }
                    <Text
                      style={{
                        padding: 4,
                        fontSize: 15,
                        textAlign: 'center',
                        color:
                          status === '1'
                            ? ColorStyles.green
                            : status === '2'
                              ? ColorStyles.red
                              : ColorStyles.gray,
                      }}>
                      {status_rbm == '0' ? approvedOrRejected : null}
                    </Text>
                  </View>
                  <View style={{ alignSelf: 'center' }}>
                    <Icon
                      name="chevron-right"
                      type="Entypo"
                      style={{ color: 'grey', fontSize: 20 }}
                    />
                  </View>
                </View>
              </View>
            </Body>
          </ListItem>
        );
      });
    }
    return null;
  }
  sortHandlerAtoZ() {
    this.setState({ sortOrder: true });
    this.setState({ dateOrderChangeStarted: false });
    this.setState({ sortChangeStarted: true });
    console.log('Order', this.state.sortOrder);
  }
  sortHandlerZtoA() {
    this.setState({ sortOrder: false });
    this.setState({ dateOrderChangeStarted: false });
    this.setState({ sortChangeStarted: true });
    console.log('Order', this.state.sortOrder);
  }
  dateSortHandlerAtoZ() {
    this.setState({ dateOrder: true });
    this.setState({ sortChangeStarted: false });
    this.setState({ dateOrderChangeStarted: true });
    console.log('Order', this.state.dateOrder);
  }
  dateSortHandlerZtoA() {
    this.setState({ dateOrder: false });
    this.setState({ sortChangeStarted: false });
    this.setState({ dateOrderChangeStarted: true });
    console.log('Order', this.state.dateOrder);
  }
  rxSortHandlerAtoZ() {
    this.setState({ rxSortOrder: true });
    this.setState({ rxDateOrderChangeStarted: false });
    this.setState({ rxSortChangeStarted: true });
  }
  rxSortHandlerZtoA() {
    this.setState({ rxSortOrder: false });
    this.setState({ rxDateOrderChangeStarted: false });
    this.setState({ rxSortChangeStarted: true });
  }
  rxDateSortHandlerAtoZ() {
    this.setState({ rxDateOrder: false });
    this.setState({ rxSortChangeStarted: false });
    this.setState({ rxDateOrderChangeStarted: true });
  }
  rxDateSortHandlerZtoA() {
    this.setState({ rxDateOrder: true });
    this.setState({ rxSortChangeStarted: false });
    this.setState({ rxDateOrderChangeStarted: true });
  }

  //For filter
  approvedListShow() {
    this.setState({ sortChangeStarted: false });
    this.setState({ dateOrderChangeStarted: false });
    this.setState(prevState => ({
      approvedList: !prevState.approvedList
    }))
    this.setState({ rejectedList: false });
    this.setState({ pendingList: false });
  }
  rejectedListShow() {
    this.setState({ sortChangeStarted: false });
    this.setState({ dateOrderChangeStarted: false });
    this.setState(prevState => ({
      rejectedList: !prevState.rejectedList
    }))
    this.setState({ pendingList: false });
    this.setState({ approvedList: false });
  }
  pendingListShow() {
    this.setState({ sortChangeStarted: false });
    this.setState({ dateOrderChangeStarted: false });
    this.setState(prevState => ({
      pendingList: !prevState.pendingList
    }))
    this.setState({ approvedList: false });
    this.setState({ rejectedList: false });
  }
  rxApprovedListShow() {
    this.setState({ rxSortChangeStarted: false });
    this.setState({ rxDateOrderChangeStarted: false });
    this.setState(prevState => ({
      rxApprovedList: !prevState.rxApprovedList
    }))
    this.setState({ rxRejectedList: false });
    this.setState({ rxPendingList: false });
  }
  rxRejectedListShow() {
    this.setState({ rxSortChangeStarted: false });
    this.setState({ rxDateOrderChangeStarted: false });
    this.setState({ rxApprovedList: false });
    this.setState(prevState => ({
      rxRejectedList: !prevState.rxRejectedList
    }))
    this.setState({ rxPendingList: false });

  }
  rxPendingListShow() {
    this.setState({ rxSortChangeStarted: false });
    this.setState({ rxDateOrderChangeStarted: false });
    this.setState({ rxApprovedList: false });
    this.setState({ rxRejectedList: false });
    this.setState(prevState => ({
      rxPendingList: !prevState.rxPendingList
    }))
  }
  renderHeader() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            borderWidth: 2,
            // Set border Hex Color Code Here.
            borderColor: '#000000',

            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              // Set border width.
              fontSize: 20,
              textAlign: 'center',
              marginRight: 20,
            }}>
            DOCTORS NAME
          </Text>
          <Menu>
            <MenuTrigger>
              <Image source={Images.sortArrow} style={{}} />
            </MenuTrigger>

            <MenuOptions>
              <MenuOption
                style={{ fontSize: 20 }}
                onSelect={() => this.sortHandlerAtoZ()}
                text="Sort A--> Z"
              />
              <MenuOption
                onSelect={() => this.sortHandlerZtoA()}
                text="Sort Z--> A"
              />
            </MenuOptions>
          </Menu>
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              // Set border width.
              borderWidth: 2,
              // Set border Hex Color Code Here.
              borderColor: '#000000',
              padding: 5,
              fontSize: 20,
              textAlign: 'center',
            }}>
            CHEMIST
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            borderWidth: 2,
            // Set border Hex Color Code Here.
            borderColor: '#000000',

            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              // Set border width.

              fontSize: 20,
              textAlign: 'center',
              marginRight: 20,
            }}>
            DATE
          </Text>
          <Menu>
            <MenuTrigger>
              <Image source={Images.sortArrow} style={{}} />
            </MenuTrigger>

            <MenuOptions>
              <MenuOption
                onSelect={() => this.dateSortHandlerZtoA()}
                text="Sort High--> Low"
              />
              <MenuOption
                onSelect={() => this.dateSortHandlerAtoZ()}
                text="Sort Low--> High"
              />

            </MenuOptions>
          </Menu>

        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              // Set border width.
              borderWidth: 2,
              // Set border Hex Color Code Here.
              borderColor: '#000000',
              padding: 5,
              fontSize: 20,
              textAlign: 'center',
            }}>
            STATUS
          </Text>
        </View>
      </View>
    );
  }

  renderStatus(data, data_1) {
    if (data_1 != null) {
      const approved = data_1.filter(item => item.status_rbm === '1');
      const rejected = data_1.filter(item => item.status === '2' || item.status_rbm === '2');
      const pending = data_1.filter(item => item.status === '0' || (item.status === '1' && item.status_rbm === '0'));

      if (this.state.isTab) {
        return (
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={{
                  // Set border width.
                  borderWidth: 2,
                  // Set border Hex Color Code Here.
                  borderColor: '#00FF00',
                  // color: '#00FF00',
                  backgroundColor: this.state.rxApprovedList
                    ? '#00FF00'
                    : 'white',
                  padding: 5,
                  fontSize: 20,
                  textAlign: 'center',
                }}
                onPress={() => this.rxApprovedListShow()}>
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: 'center',
                    // color: '#00FF00',
                    color: this.state.rxApprovedList ? 'black' : '#00FF00',
                  }}>{`${'APPROVED' + ' ' + '('}${approved.length})`}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={{
                  // Set border width.
                  borderWidth: 2,
                  // Set border Hex Color Code Here.
                  borderColor: '#DC143C',
                  // color: '#DC143C',
                  backgroundColor: this.state.rxRejectedList
                    ? '#DC143C'
                    : 'white',
                  padding: 5,
                  fontSize: 20,
                  textAlign: 'center',
                }}
                onPress={() => this.rxRejectedListShow()}>
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: 'center',
                    // color: '#DC143C',
                    color: this.state.rxRejectedList ? 'black' : '#DC143C',
                  }}>{`${'REJECTED' + ' ' + '('}${rejected.length})`}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={{
                  borderWidth: 2,
                  // Set border Hex Color Code Here.
                  borderColor: '#808080',
                  // color: '#808080',
                  backgroundColor: this.state.rxPendingList
                    ? '#808080'
                    : 'white',
                  padding: 5,
                  fontSize: 20,
                  textAlign: 'center',
                }}
                onPress={() => this.rxPendingListShow()}>
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: 'center',
                    // color: '#808080',
                    color: this.state.rxPendingList ? 'black' : '#808080',
                  }}>{`${'PENDING' + ' ' + '('}${pending.length})`}</Text>
              </TouchableOpacity>
            </View>

          </View>
        );
      }
      if (data != null) {
        const approved = data.filter(item => item.status_rbm === '1');
        const rejected = data.filter(item => item.status === '2' || item.status_rbm === '2');
        const pending = data.filter(item => item.status === '0' || (item.status === '1' && item.status_rbm === '0'));
        if (!this.state.isTab) {
          return (
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  style={{
                    borderWidth: 2,
                    // Set border Hex Color Code Here.
                    borderColor: '#00FF00',
                    backgroundColor: !this.state.approvedList
                      ? 'white'
                      : '#00FF00',
                    padding: 5,
                    fontSize: 20,
                    textAlign: 'center',
                  }}
                  onPress={() => this.approvedListShow()}>
                  <Text
                    style={{
                      fontSize: 20,
                      textAlign: 'center',
                      color: this.state.approvedList ? 'black' : '#00FF00',
                    }}>{`${'APPROVED' + ' ' + '('}${approved.length})`}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  style={{
                    // Set border width.
                    borderWidth: 2,
                    // Set border Hex Color Code Here.
                    borderColor: '#DC143C',
                    color: '#DC143C',
                    backgroundColor: !this.state.rejectedList
                      ? 'white'
                      : '#DC143C',
                    padding: 5,
                    fontSize: 20,
                    textAlign: 'center',
                  }}
                  onPress={() => this.rejectedListShow()}>
                  <Text
                    style={{
                      fontSize: 20,
                      textAlign: 'center',
                      color: this.state.rejectedList ? 'black' : '#DC143C',
                    }}>{`${'REJECTED' + ' ' + '('}${rejected.length})`}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  style={{
                    // Set border width.
                    borderWidth: 2,
                    // Set border Hex Color Code Here.
                    borderColor: '#808080',
                    // color: '#808080',
                    backgroundColor: !this.state.pendingList
                      ? 'white'
                      : '#808080',
                    padding: 5,
                    fontSize: 20,
                    textAlign: 'center',
                  }}
                  onPress={() => this.pendingListShow()}>
                  <Text
                    style={{
                      fontSize: 20,
                      textAlign: 'center',
                      // color: '#808080',
                      color: this.state.pendingList ? 'black' : '#808080',
                    }}>{`${'PENDING' + ' ' + '('}${pending.length})`}</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }
      }
    }
    return null;
  }

  renderRXHeader() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            borderWidth: 2,
            // Set border Hex Color Code Here.
            borderColor: '#000000',

            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              // Set border width.
              fontSize: 20,
              textAlign: 'center',
              marginRight: 20,
            }}>
            DOCTORS NAME
          </Text>
          <Menu>
            <MenuTrigger>
              <Image source={Images.sortArrow} style={{}} />
            </MenuTrigger>

            <MenuOptions>
              <MenuOption
                onSelect={() => this.rxSortHandlerAtoZ()}
                text="Sort A--> Z"
              />
              <MenuOption
                onSelect={() => this.rxSortHandlerZtoA()}
                text="Sort Z--> A"
              />
            </MenuOptions>
          </Menu>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              // Set border width.
              borderWidth: 2,
              // Set border Hex Color Code Here.
              borderColor: '#000000',
              padding: 5,
              fontSize: 20,
              textAlign: 'center',
            }}>
            BRAND NAME
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            borderWidth: 2,
            // Set border Hex Color Code Here.
            borderColor: '#000000',

            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              // Set border width.
              fontSize: 20,
              textAlign: 'center',
              marginRight: 20,
            }}>
            DATE
          </Text>
          <Menu>
            <MenuTrigger>
              <Image source={Images.sortArrow} style={{}} />
            </MenuTrigger>

            <MenuOptions>
              <MenuOption
                onSelect={() => this.rxDateSortHandlerZtoA()}
                text="Sort New--> Old"
              />
              <MenuOption
                onSelect={() => this.rxDateSortHandlerAtoZ()}
                text="Sort Old--> New"
              />
              {/* <MenuOption onSelect={() => this.sortHandler()}>
                <Text style={{ color: 'black' }}>`Sort A-->Z`</Text>
              </MenuOption> */}
              {/* <MenuOption
                onSelect={() => alert(`Not called`)}
                disabled={true}
                text="Disabled"
              /> */}
            </MenuOptions>
          </Menu>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              // Set border width.
              borderWidth: 2,
              // Set border Hex Color Code Here.
              borderColor: '#000000',
              padding: 5,
              fontSize: 20,
              textAlign: 'center',
            }}>
            STATUS
          </Text>
        </View>
      </View>
    );
  }

  selectChemistScreen() {
    this.props.navigation.navigate('RxChemistSelection');
  }

  renderTabs(data, user, rxData, isRXtab) {
    const doctor = 'DOCTORS';
    const rxTracker = 'RX TRACKER';

    return (
      <View style={{ flex: 1 }}>
        <ScrollableTabView
          tabBarBackgroundColor={TabStyles.tabStyle.backgroundColor}
          tabBarUnderlineStyle={TabStyles.tabBarUnderlineStyle}
          tabBarInactiveTextColor={TabStyles.textStyle.color}
          tabBarActiveTextColor={TabStyles.activeTextStyle.color}
          initialPage={0}
          onChangeTab={({ i }) => {
            if (i === 0) {
              this.setState({ isTab: false });
            } else {
              this.setState({ isTab: true });
            }
          }}
          renderTabBar={() => <ScrollableTabBar />}>
          <View tabLabel={doctor} style={{ flex: 1 }}>
            {this.renderHeader()}
            <ScrollView ref={scrollView => (this._scrollView = scrollView)}>
              {this.renderList(data)}
            </ScrollView>
          </View>
          <View tabLabel={rxTracker} style={{ flex: 1 }}>
            {this.renderRXHeader()}
            <ScrollView ref={scrollView => (this._scrollView = scrollView)}>
              {this.renderRXTrackerList(rxData)}
            </ScrollView>
          </View>
        </ScrollableTabView>
      </View>
    );
    // }
    // return null;
  }

  render() {
    const { loading, connected, data, data_1, isRXtab } = this.props;
    const { user } = this.props.navigation.state.params;

    return (
      <ParentView
        loading={loading}
        connected={connected}
        // onRefresh={() => this.props.onRefresh()}
        style={styles.container}>
        <Container>
          {this.renderStatus(data, data_1)}
          <Item
            style={{
              margin: 5,
              borderColor: ColorStyles.gray_light_1,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderRadius: 10,
              paddingLeft: 10,
              paddingRight: 10,
            }}>
            <Icon
              name="ios-search"
              style={{
                color: ColorStyles.gray_light_1,
              }}
            />
            <Input
              onChangeText={searchQuery => this.searchText({ searchQuery })}
              placeholder="Search"
            />
          </Item>
          {this.renderTabs(data, user, data_1, isRXtab)}
        </Container>
      </ParentView>
    );
  }
}
export default withNavigation(ABMRxDocListComponent);