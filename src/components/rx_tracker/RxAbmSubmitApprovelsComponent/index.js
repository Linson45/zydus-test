/* eslint-disable no-unused-expressions */
import React from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  Dimensions,
  Image,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { StackActions, withNavigation } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';
import Modal from 'react-native-modal';
import api from '../../../api';
import Urls from '../../../api/urls';
import { Icon, Text, ListItem, Body } from 'native-base';
import { getCurrentMonth, getCurrentYear } from '../../../util/dateTimeUtil';

import Images from '../../../Constants/imageConstants';
import styles from './styles';
import colorsStyles from '../../../styles/colorsStyles';

class RxAbmSubmitApprovelsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      isReject: false,
      isOther: false,
      reasons: null,
      showPopup_1: false,
      showPopUp1: false,
      showPopUp2: false,
      showPopUp3: false,
      showPopUp4: false,
      showPopUp5: false,
      isRxProofShow: [false, false, false, false, false],
      showPopup: false,
      showHint: 0,
      rejectReason: '',
      isSubmitProgress: false,

    };
  }

  async submitData() {
    const { user, userDetails } = this.props;
    console.log('User details', user, userDetails)
    const { rep_code, sbu_code, dr_code } = user;
    const { company_code } = userDetails;
    this.setState({ isSubmitProgress: true });
    const { created_at } = user
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
    var dd = created_at.split('-')
    var month = MONTHS[dd[1]]
    var year = 20 + dd[2]
    console.log('Month', dd, month, year)
    const data = {
      rep_code,
      sbu_code,
      company_code,
      campaign_code: 'CC01',
      mcr_no: user.mcr_no,
      // chem_code: user.chemist_code[0].chemist_code,
      prd_code: user.prd_code,
      brand_code: '0005000038',
      dr_code,
      // month: getCurrentMonth().toString(),
      month: month,
      // year: getCurrentYear().toString(),
      year: year,
      status: '1',
      approved_by: userDetails.rep_code,
    };
    console.log('Submit started', data)
    const { statusCode } = await api({
      method: 'POST',
      url: Urls.APPORVED_UPLOAD_RX,
      data,
    });
    if (statusCode === 200) {
      this.setState({ isSubmitProgress: false });

      Alert.alert(
        'Rx has been approved',
        'RX data has been approved successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              const popAction = StackActions.pop({
                n: 1,
              });
              this.props.navigation.dispatch(popAction);
            },
          },
        ],
        { cancelable: false },
      );
    }
    // this.props.submitChemistData(data);
  }
  async cancelReject() {
    this.setState({ isReject: false });
    this.setState({ isOther: false });

  }
  async rejectData() {

    const { user, userDetails } = this.props;
    const { rep_code, sbu_code, dr_code } = user;
    const { company_code } = userDetails;
    this.setState({ isSubmitProgress: true });
    const { created_at } = user
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
    var dd = created_at.split('-')
    var month = MONTHS[dd[1]]
    var year = 20 + dd[2]
    console.log('Month', dd, month, year)
    const data = {
      rep_code,
      sbu_code,
      company_code,
      campaign_code: 'CC01',
      mcr_no: user.mcr_no,
      // chem_code: user.chemist_code[0].chemist_code,
      prd_code: user.prd_code,
      brand_code: '0005000038',
      dr_code,
      month: month,
      year: year,
      status: '2',
      approved_by: userDetails.rep_code,
      reason: this.state.rejectReason,
    };
    console.log('Submit started', data)
    if (this.state.rejectReason.length !== 0) {
      const { statusCode } = await api({
        method: 'POST',
        url: Urls.APPORVED_UPLOAD_RX,
        data,
      });
      if (statusCode === 200) {
        this.setState({ isSubmitProgress: false });

        Alert.alert(
          'Rx has been rejected',
          'RX data has been rejected successfully!',
          [
            {
              text: 'OK',
              onPress: () => {
                const popAction = StackActions.pop({
                  n: 1,
                });
                this.props.navigation.dispatch(popAction);
              },
            },
          ],
          { cancelable: false },
        );
      }
    } else {
      alert('Please select Reason');
    }
    // this.props.submitChemistData(data);
  }

  renderReasons() {
    const data = [
      {
        reason: 'Rx not visible clearly',
        code: 1,
      },
      {
        reason: 'Chemist bill not visible clearly',
        code: 2,
      },
      {
        reason: 'Incomplete billing',
        code: 3,
      },
      {
        reason: 'Rx / Supply proof missing',
        code: 4,
      },
      {
        reason: 'Rx / Chemist details mismatch',
        code: 5,
      },
      {
        reason: 'Others',
        code: 6,
      },
    ];
    return (

      <View style={{ position: 'absolute', bottom: 140 }} >
        <Dropdown
          containerStyle={{ marginLeft: 80, width: Dimensions.get('window').width - 165 }}
          value="REASON :"
          data={data}
          valueExtractor={({ code }) => code}
          labelExtractor={({ reason }) => reason}
          onChangeText={(value, index, data) => {
            // eslint-disable-next-line no-lone-blocks
            {
              data[index].reason === 'Others'
                ? this.setState({ isOther: true })
                : this.setState({
                  rejectReason: data[index].reason,
                  isOther: false,
                });
            }
          }}
        />

        {this.state.isOther ? (
          <TextInput
            placeholder="Your text post"
            multiline
            numberOfLines={10}
            maxLength={1000}
            onChangeText={value => this.setState({ rejectReason: value })}
            style={{
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              textAlignVertical: 'top',
              position: 'absolute',
              bottom: -57,
              // bottom: Dimensions.get('window').height - 900,
              height: 65,
              width: Dimensions.get('window').width - 165,
              // marginTop: 5,
              marginLeft: 75,
              // marginRight: 30,
            }}
          />
        ) : null}
      </View>
    );
  }

  rejectView() {
    this.setState({ isReject: true });
  }

  // eslint-disable-next-line consistent-return
  renderButtons(status) {
    if (status === '0') {
      return (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
            margin: 10,
          }}>
          <View style={styles.buttonStyle}>
            {!this.state.isReject ? (
              <TouchableOpacity
                style={styles.SubmitApprovedButtonStyle}
                activeOpacity={0.5}
                // disabled={this.state.isReject}
                onPress={() => {
                  this.state.isReject ? null : this.submitData();
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}>
                  <Text style={styles.TextStyle}> APPROVE </Text>
                  <Icon
                    name="checkcircle"
                    type="AntDesign"
                    style={{
                      color: this.state.isReject ? 'grey' : 'black',
                      fontSize: 25,
                      marginLeft: 9,
                    }}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.SubmitApprovedButtonStyle}
                activeOpacity={0.5}
                // disabled={this.state.isReject}
                onPress={() => {
                  this.cancelReject();
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignSelf: 'center',
                  }}>
                  <Text style={styles.TextStyle}> CANCEL </Text>
                  <Icon
                    name="checkcircle"
                    type="AntDesign"
                    style={{
                      color: this.state.isReject ? 'grey' : 'black',
                      fontSize: 25,
                      marginLeft: 9,
                    }}
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={styles.SubmitButtonStyle}
            activeOpacity={10}
            onPress={() => {
              this.state.isReject ? this.rejectData() : this.rejectView();
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Text style={styles.TextStyle}>
                {this.state.isReject ? 'SUBMIT' : 'REJECT'}
              </Text>
              <Icon
                name="closecircle"
                type="AntDesign"
                style={{
                  color: status === '1' || status === '2' ? 'grey' : 'black',
                  fontSize: 25,
                  marginLeft: 9,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    if (status === '1') {
      return (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
            margin: 10,
          }}>
          <View style={styles.buttonStyle}>
            <TouchableOpacity
              style={styles.SubmitApprovedButtonStyle}
              activeOpacity={0.5}
              disabled>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <Text style={styles.TextStyle}> APPROVED by ABM </Text>
                <Icon
                  name="checkcircle"
                  type="AntDesign"
                  style={{
                    color: 'black',
                    fontSize: 25,
                    marginLeft: 9,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity
            style={styles.SubmitButtonStyle}
            activeOpacity={10}
            disabled>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Text style={styles.TextStyle}>REJECT</Text>
              <Icon
                name="closecircle"
                type="AntDesign"
                style={{
                  color: 'grey',
                  fontSize: 25,
                  marginLeft: 9,
                }}
              />
            </View>
          </TouchableOpacity> */}
        </View>
      );
    }
    if (status === '2') {
      return (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
            margin: 10,
          }}>
          {/* <View style={styles.buttonStyle}>
            <TouchableOpacity
              style={styles.SubmitApprovedButtonStyle}
              activeOpacity={0.5}
              disabled>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}>
                <Text style={styles.TextStyle}> APPROVE </Text>
                <Icon
                  name="checkcircle"
                  type="AntDesign"
                  style={{
                    color: status === '1' || status === '2' ? 'grey' : 'black',
                    fontSize: 25,
                    marginLeft: 9,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View> */}
          <TouchableOpacity
            style={styles.SubmitButtonStyle}
            activeOpacity={10}
            disabled>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Text style={styles.TextStyle}>REJECTED by ABM</Text>
              <Icon
                name="closecircle"
                type="AntDesign"
                style={{
                  color: 'black',
                  fontSize: 25,
                  marginLeft: 9,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }

  renderModal(user) {
    const { showPopup } = this.state;
    return (
      <Modal
        style={{
          height: Dimensions.get('window').height - 30,
          width: Dimensions.get('window').width - 80,
        }}
        onRequestClose={() => this.setState({ showPopup: true })}
        isVisible={showPopup}>
        <View style={styles.modalContent}>
          <Image
            source={{ uri: user.prescription }}
            resizeMode="contain"
            style={{
              width: (Dimensions.get('window').width * 8) / 9,
              height: (Dimensions.get('window').height * 6) / 9,
              padding: 20,
              backgroundColor: '#000000',
            }}
          />
          <View
            style={{
              backgroundColor: colorsStyles.blue_dark,
              width: '50%',
              justifyContent: 'center',
              alignSelf: 'center',
              margin: 20,
            }}>
            <Text style={{ fontSize: 15, margin: 5, color: 'white' }}>
              RxUpload
              {'\n'}
              Please check the following
              {'\n'}- Date Validation
              {'\n'}- CrossCheck the Product
              {'\n'}- Check if the Doctor's Name is correct
            </Text>
          </View>
          <Icon
            name="closecircle"
            type="AntDesign"
            onPress={() => {
              this.setState({ showPopup: false });
            }}
            style={{
              fontSize: 25,
              position: 'absolute',
              right: 5,
              color: 'red',
              top: 5,
            }}
          />
        </View>
      </Modal>
    );
  }
  showProofOfsupply(index) {
    if (index === 0) {
      this.setState({ showPopUp1: true })
    }
    if (index === 1) {
      this.setState({ showPopUp2: true })
    }
    if (index === 2) {
      this.setState({ showPopUp3: true })
    }
    if (index === 3) {
      this.setState({ showPopUp4: true })
    }
    if (index === 4) {
      this.setState({ showPopUp5: true })
    }
  }
  renderProofOfSupply1(user) {
    const { showPopUp1 } = this.state;
    const { chemist_data } = user

    return (
      <Modal
        style={{
          height: Dimensions.get('window').height - 30,
          width: Dimensions.get('window').width - 80,
        }}
        onRequestClose={() => this.setState({ showPopUp1: true })}
        isVisible={showPopUp1}>
        <View style={styles.modalContent}>
          <Image
            source={{ uri: chemist_data[0].proof_of_supply_path }}
            resizeMode="contain"
            style={{
              width: (Dimensions.get('window').width * 8) / 9,
              height: (Dimensions.get('window').height * 6) / 9,
              padding: 5,
              backgroundColor: '#000000',
            }}
          />
          <View
            style={{
              backgroundColor: colorsStyles.blue_dark,
              width: '50%',
              justifyContent: 'center',
              alignSelf: 'center',
              margin: 20,
            }}>
            <Text style={{ fontSize: 15, margin: 5, color: 'white' }}>
              Proof of supply
              {'\n'}
              Please check the following
              {'\n'}- Date Validation
              {'\n'}- CrossCheck the Product
              {'\n'}- Check if the Doctor's Name is correct
            </Text>
          </View>

          <Icon
            name="closecircle"
            type="AntDesign"
            onPress={() => {
              this.setState({ showPopUp1: false });
            }}
            style={{
              fontSize: 25,
              position: 'absolute',
              right: 5,
              color: 'red',
              top: 5,
            }}
          />
        </View>
      </Modal>
    );
  }
  renderProofOfSupply2(user) {
    const { showPopUp2 } = this.state;
    const { chemist_data } = user
    return (
      <Modal
        style={{
          height: Dimensions.get('window').height - 30,
          width: Dimensions.get('window').width - 80,
        }}
        onRequestClose={() => this.setState({ showPopUp2: true })}
        isVisible={showPopUp2}>
        <View style={styles.modalContent}>
          <Image
            source={{ uri: chemist_data[1].proof_of_supply_path }}
            resizeMode="contain"
            style={{
              width: (Dimensions.get('window').width * 8) / 9,
              height: (Dimensions.get('window').height * 6) / 9,
              padding: 5,
              backgroundColor: '#000000',
            }}
          />
          <View
            style={{
              backgroundColor: colorsStyles.blue_dark,
              width: '50%',
              justifyContent: 'center',
              alignSelf: 'center',
              margin: 20,
            }}>
            <Text style={{ fontSize: 15, margin: 5, color: 'white' }}>
              Proof of supply
              {'\n'}
              Please check the following
              {'\n'}- Date Validation
              {'\n'}- CrossCheck the Product
              {'\n'}- Check if the Doctor's Name is correct
            </Text>
          </View>

          <Icon
            name="closecircle"
            type="AntDesign"
            onPress={() => {
              this.setState({ showPopUp2: false });
            }}
            style={{
              fontSize: 25,
              position: 'absolute',
              right: 5,
              color: 'red',
              top: 5,
            }}
          />
        </View>
      </Modal>
    );
  }
  renderProofOfSupply3(user) {
    const { showPopUp3 } = this.state;
    const { chemist_data } = user
    return (
      <Modal
        style={{
          height: Dimensions.get('window').height - 30,
          width: Dimensions.get('window').width - 80,
        }}
        onRequestClose={() => this.setState({ showPopUp3: true })}
        isVisible={showPopUp3}>
        <View style={styles.modalContent}>
          <Image
            source={{ uri: chemist_data[2].proof_of_supply_path }}
            resizeMode="contain"
            style={{
              width: (Dimensions.get('window').width * 8) / 9,
              height: (Dimensions.get('window').height * 6) / 9,
              padding: 5,
              backgroundColor: '#000000',
            }}
          />
          <View
            style={{
              backgroundColor: colorsStyles.blue_dark,
              width: '50%',
              justifyContent: 'center',
              alignSelf: 'center',
              margin: 20,
            }}>
            <Text style={{ fontSize: 15, margin: 5, color: 'white' }}>
              Proof of supply
              {'\n'}
              Please check the following
              {'\n'}- Date Validation
              {'\n'}- CrossCheck the Product
              {'\n'}- Check if the Doctor's Name is correct
            </Text>
          </View>

          <Icon
            name="closecircle"
            type="AntDesign"
            onPress={() => {
              this.setState({ showPopUp3: false });
            }}
            style={{
              fontSize: 25,
              position: 'absolute',
              right: 5,
              color: 'red',
              top: 5,
            }}
          />
        </View>
      </Modal>
    );
  }
  renderProofOfSupply4(user) {
    const { showPopUp4 } = this.state;
    const { chemist_data } = user
    return (
      <Modal
        style={{
          height: Dimensions.get('window').height - 30,
          width: Dimensions.get('window').width - 80,
        }}
        onRequestClose={() => this.setState({ showPopUp4: true })}
        isVisible={showPopUp4}>
        <View style={styles.modalContent}>
          <Image
            source={{ uri: chemist_data[3].proof_of_supply_path }}
            resizeMode="contain"
            style={{
              width: (Dimensions.get('window').width * 8) / 9,
              height: (Dimensions.get('window').height * 6) / 9,
              padding: 5,
              backgroundColor: '#000000',
            }}
          />
          <View
            style={{
              backgroundColor: colorsStyles.blue_dark,
              width: '50%',
              justifyContent: 'center',
              alignSelf: 'center',
              margin: 20,
            }}>
            <Text style={{ fontSize: 15, margin: 5, color: 'white' }}>
              Proof of supply
              {'\n'}
              Please check the following
              {'\n'}- Date Validation
              {'\n'}- CrossCheck the Product
              {'\n'}- Check if the Doctor's Name is correct
            </Text>
          </View>

          <Icon
            name="closecircle"
            type="AntDesign"
            onPress={() => {
              this.setState({ showPopUp4: false });
            }}
            style={{
              fontSize: 25,
              position: 'absolute',
              right: 5,
              color: 'red',
              top: 5,
            }}
          />
        </View>
      </Modal>
    );
  }
  renderProofOfSupply5(user) {
    const { showPopUp5 } = this.state;
    const { chemist_data } = user
    return (
      <Modal
        style={{
          height: Dimensions.get('window').height - 30,
          width: Dimensions.get('window').width - 80,
        }}
        onRequestClose={() => this.setState({ showPopUp5: true })}
        isVisible={showPopUp5}>
        <View style={styles.modalContent}>
          <Image
            source={{ uri: chemist_data[4].proof_of_supply_path }}
            resizeMode="contain"
            style={{
              width: (Dimensions.get('window').width * 8) / 9,
              height: (Dimensions.get('window').height * 6) / 9,
              padding: 5,
              backgroundColor: '#000000',
            }}
          />
          <View
            style={{
              backgroundColor: colorsStyles.blue_dark,
              width: '50%',
              justifyContent: 'center',
              alignSelf: 'center',
              margin: 20,
            }}>
            <Text style={{ fontSize: 15, margin: 5, color: 'white' }}>
              Proof of supply
              {'\n'}
              Please check the following
              {'\n'}- Date Validation
              {'\n'}- CrossCheck the Product
              {'\n'}- Check if the Doctor's Name is correct
            </Text>
          </View>

          <Icon
            name="closecircle"
            type="AntDesign"
            onPress={() => {
              this.setState({ showPopUp5: false });
            }}
            style={{
              fontSize: 25,
              position: 'absolute',
              right: 5,
              color: 'red',
              top: 5,
            }}
          />
        </View>
      </Modal>
    );
  }
  renderTableOfChemist() {
    const { user, userDetails, reasons, boNameData } = this.props;
    const { chemist_data } = user
    var totalQuantity = 0
    chemist_data.map(chem => {
      var qtyData = parseInt(chem.qty, 10);

      totalQuantity = totalQuantity + qtyData
    })

    if (user !== null) {
      return (
        <View>
          {/* source={Images.ic_tool_bar_bg}
          style={styles.absoluteFill}> */}
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                flex: 1,
                // flexDirection: 'row',
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
                  fontWeight: '500'
                }}>
                Sr.No
            </Text>
            </View>
            <View
              style={{
                flex: 1,
                // flexDirection: 'row',
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
                  fontWeight: '500'
                }}>
                CHEMIST
            </Text>
            </View>
            <View
              style={{
                flex: 1,
                // flexDirection: 'row',
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
                  fontWeight: '500'
                }}>
                QUANTITY (Strips)
            </Text>
            </View>
            <View
              style={{
                flex: 1,
                // flexDirection: 'row',
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
                  fontWeight: '500'
                }}>
                PROOF OF SUPPLY
            </Text>
            </View>
          </View>
          {this.renderChemistListTable(user)}
          <View style={{ flex: 1, flexDirection: 'row', marginLeft: Dimensions.get('window').width - 498 }}>
            <Text style={{

              fontSize: 20,
              textAlign: 'center',
              // marginRight: 20,
              fontWeight: '500'
            }}>Total : </Text>
            <Text style={{
              fontSize: 20,
              borderColor: 'black', borderWidth: 1,
              height: 32,
              width: 65,
              textAlign: 'center',

              fontWeight: '500',

            }}>{totalQuantity}</Text>
          </View>

        </View>
      );
    }
  }
  proofHint(index, data) {
    if (data) {
      var newArray = this.state.isRxProofShow;
      newArray.splice(index, 1, data);
      this.setState({
        isRxProofShow: newArray,
      });
    } else {
      // var newArray = [false, false, false, false, false];
      var newArray = this.state.isRxProofShow;
      newArray.splice(index, 1, data);
      this.setState({
        isRxProofShow: newArray,
      });
    }
  }

  renderChemistListTable(user) {
    const { chemist_data } = user

    if (chemist_data) {
      return chemist_data.map((chem, index) => {

        return (
          <ListItem
            key={index}
            bordered
            // onPress={() => this.goToUploadVerficationScreen(item)}
            style={{
              marginLeft: 0,
            }}>
            <Body>
              <View style={{ flexDirection: 'column', color: 'white', marginVertical: -3 }}>
                <View style={{ flexDirection: 'row', marginVertical: -3 }}>
                  <View style={{ flex: 1, marginVertical: 0 }}>
                    <Text style={styles.docTitle}>{index + 1}</Text>
                  </View>
                  <View style={{ flex: 1, marginVertical: 0 }}>
                    <Text style={styles.docTitle}>{`${chem.chemist_name} (${chem.chemist_code})`}</Text>
                  </View>
                  <View style={{ flex: 1, marginVertical: 0 }}>
                    <Text style={styles.doc_item}>{chem.qty}</Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginVertical: 0 }}>
                    <TouchableHighlight
                      style={styles.proofSupplyView}
                      onPress={() => this.showProofOfsupply(index)}>
                      <Text style={styles.submitText}>VIEW</Text>
                    </TouchableHighlight>
                    <Icon
                      name="info-with-circle"
                      type="Entypo"
                      onPress={() => {
                        this.proofHint(index, true);
                      }}
                      style={{
                        fontSize: 20,
                      }}
                    />
                    {this.state.isRxProofShow[index] ? (
                      <View>
                        <View
                          style={{
                            position: 'absolute',
                            right: 25,
                            bottom: 20,
                            // marginLeft: 10,
                            marginBottom: 15,
                            padding: 0,
                            borderRadius: 5,
                            borderWidth: 1,
                            height: 110,
                            alignContent: 'flex-start',
                            alignSelf: 'flex-start',
                            justifyContent: 'flex-start',
                            backgroundColor: 'white',
                          }}>
                          <Text style={{ fontSize: 14, margin: 5 }}>
                            Proof of Supply
                  {'\n'}
                  Please check the following
                  {'\n'}- Date Validation
                  {'\n'}- CrossCheck the Product
                  {'\n'}- Check if the doctor name is correct
                </Text>
                          <Icon
                            name="closecircle"
                            type="AntDesign"
                            onPress={() => {
                              this.proofHint(index, false);
                            }}
                            style={{
                              fontSize: 18,
                              alignSelf: 'flex-end',
                              marginTop: 2,
                              position: 'absolute',
                              right: -15,
                              top: -20
                            }}
                          />
                        </View>

                      </View>
                    ) : null}
                  </View>
                </View>
              </View>
            </Body>
          </ListItem>
        )
      })

    }


  }
  renderRejectedReason(reason) {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 100,
          // height: '30%',
          marginLeft: 50,
          width: Dimensions.get('window').width - 165
        }}>
        <Text style={{ padding: 10 }}>Reason : </Text>
        <View
          style={{
            width: Dimensions.get('window').width - 165,
            height: 65,
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            marginLeft: 30,
          }}>
          <Text>{reason}</Text>
        </View>
      </View>
    );
  }

  render() {
    const { user, userDetails, reasons, boNameData } = this.props;
    console.log('Apsel User', user);
    const { status, status_rbm, updated_abm_date, updated_rbm_date } = user
    var approvOrRejectABM
    var approvOrRejectRBM
    if (status === '1') {
      approvOrRejectABM = `Approved by ABM on ${updated_abm_date}`
    } if (status === '2') {
      approvOrRejectABM = `Rejected by ABM on ${updated_abm_date}`
    }
    if (status_rbm === '1') {
      approvOrRejectRBM = `Approved by RBM on ${updated_rbm_date}`
    } if (status_rbm === '2') {
      approvOrRejectRBM = `Rejected by RBM on ${updated_rbm_date}`
    }
    if (user !== null) {
      // const filtered = user.chemist_code
      // .map((item) => `${item.chemist_name} (${item.chemist_code})`)
      // .join(',\n');
      const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

      return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'space-between',
              flexDirection: 'column',
            }}
            keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={keyboardVerticalOffset}>
              <View>
                {this.state.isSubmitProgress ? (
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
                <ImageBackground
                  source={Images.ic_tool_bar_bg}
                  style={styles.absoluteFill}>
                  <Text style={styles.heading}>{boNameData}</Text>
                </ImageBackground>
              </View>
              <View style={{ marginTop: 10 }}>
                <ImageBackground
                  source={Images.ic_tool_bar_bg}
                  style={styles.absoluteFill}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                    }}>
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={styles.heading}>
                        {`DOCTOR : ${user.doc_name} (${user.dr_code})`}
                      </Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.heading}>RX UPLOAD :</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <TouchableHighlight
                            style={styles.submit}
                            onPress={() => {
                              this.setState({ showPopup: true });
                            }}>
                            <Text style={styles.submitText}>VIEW</Text>
                          </TouchableHighlight>
                        </View>
                        <Icon
                          name="info-with-circle"
                          type="Entypo"
                          onPress={() => {
                            this.setState({ showHint: 1 });
                          }}
                          style={{
                            fontSize: 20,
                          }}
                        />
                      </View>
                    </View>
                    {this.state.showHint === 1 ? (
                      <View>
                        <View
                          style={{
                            position: 'absolute',
                            marginLeft: 100,
                            padding: 0,
                            borderRadius: 5,
                            borderWidth: 1,
                            height: 105,
                            alignContent: 'flex-start',
                            alignSelf: 'flex-start',
                            justifyContent: 'flex-start',
                            backgroundColor: '#ffffff',
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              margin: 5,
                              // fontWeight: 'bold',
                            }}>
                            RxUpload
                            {'\n'}
                            Please check the following
                            {'\n'}- Date Validation
                            {'\n'}- CrossCheck the Product
                            {'\n'}- Check if the doctor name is correct
                          </Text>
                          <Icon
                            name="closecircle"
                            type="AntDesign"
                            onPress={() => {
                              this.setState({ showHint: 0 });
                            }}
                            style={{
                              fontSize: 18,
                              alignSelf: 'flex-end',
                              marginTop: 2,
                              position: 'absolute',
                              top: -20,
                              right: -15
                            }}
                          />
                        </View>
                      </View>
                    ) : this.state.showHint === 2 ? (
                      <View>
                        <View
                          style={{
                            marginLeft: 100,
                            padding: 0,
                            borderRadius: 5,
                            borderWidth: 1,
                            height: 150,
                            alignContent: 'flex-start',
                            alignSelf: 'flex-start',
                            justifyContent: 'flex-start',
                            backgroundColor: '#ffffff',
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              margin: 10,
                              fontWeight: 'bold',
                            }}>
                            Proof of Supply
                            {'\n'}
                            Please check the following
                            {'\n'}- Date Validation
                            {'\n'}- CrossCheck the Product
                            {'\n'}- Check if the doctor name is correct
                          </Text>
                          <Icon
                            name="closecircle"
                            type="AntDesign"
                            onPress={() => {
                              this.setState({ showHint: 0 });
                            }}
                            style={{
                              fontSize: 18,
                              alignSelf: 'flex-end',
                              marginTop: -2,
                              position: 'absolute',
                              margin: 5,
                            }}
                          />
                        </View>
                      </View>
                    ) : null}
                  </View>
                </ImageBackground>
                {this.renderTableOfChemist()}
              </View>
              {this.renderModal(user)}
              {user.chemist_data[0] ?
                this.renderProofOfSupply1(user) : null
              }
              {user.chemist_data[1] ?
                this.renderProofOfSupply2(user) : null
              }
              {user.chemist_data[2] ?
                this.renderProofOfSupply3(user) : null
              }
              {user.chemist_data[3] ?
                this.renderProofOfSupply4(user) : null
              }
              {user.chemist_data[4] ?
                this.renderProofOfSupply5(user) : null
              }

              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <Text style={{ fontSize: 20 }}>{approvOrRejectABM}</Text>
                <Text style={{ fontSize: 20 }}>{approvOrRejectRBM}</Text>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
          {user.status === '2' || user.status_rbm === '2'
            ? this.renderRejectedReason(user.reason)
            : null}

          {this.state.isReject ? this.renderReasons() : null}
          {reasons !== 'noClick' ? this.renderButtons(user.status) : null}
        </View>
      );
      return null;
    }
  }
}
export default withNavigation(RxAbmSubmitApprovelsComponent);