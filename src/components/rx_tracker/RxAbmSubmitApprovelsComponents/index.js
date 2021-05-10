/* eslint-disable no-unused-expressions */
import React from 'react';
import { Text, Icon } from 'native-base';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { StackActions, withNavigation } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';
import api from '../../../api';
import Urls from '../../../api/urls';
import Images from '../../../Constants/imageConstants';
import styles from './styles';
import { getCurrentMonth, getCurrentYear } from '../../../util/dateTimeUtil';

class AbmSubmitApprovalsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      isReject: false,
      isOther: false,
      rejectReason: '',
      isSubmitProgress: false,
    };
  }

  async submitData() {
    const { user, userDetails } = this.props;
    const { rep_code, sbu_code, dr_code } = user;
    const { company_code } = userDetails;
    const { created } = user
    console.log('User', user)
    console.log
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
    var dd = created.split('-')
    var month = MONTHS[dd[1]]
    var year = 20 + dd[2]
    console.log('Month', dd, month, year)
    const data = {
      rep_code,
      sbu_code,
      company_code,
      campaign_code: 'CC01',
      dr_code,
      month: month,
      year: year,
      status: '1',
      approved_by: userDetails.rep_code,
    };
    this.setState({ isSubmitProgress: true });

    const { statusCode } = await api({
      method: 'POST',
      url: Urls.LOAD_RX_ABM_APPROVED_LIST,
      data,
    });
    if (statusCode === 200) {
      Alert.alert(
        'Doctor has been approved',
        'Doctor data has been approved successfully!',
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
  }
  async rejectData() {
    const { user, userDetails } = this.props;
    const { rep_code, sbu_code, dr_code } = user;
    const { company_code } = userDetails;
    const { created } = user
    console.log('User', user)
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
    var dd = created.split('-')
    var month = MONTHS[dd[1]]
    var year = 20 + dd[2]
    console.log('Month', dd, month, year)
    const data = {
      rep_code,
      sbu_code,
      company_code,
      campaign_code: 'CC01',
      dr_code,
      month: month,
      year: year,
      status: '2',
      reason: this.state.rejectReason,
      approved_by: userDetails.rep_code,
    };
    if (this.state.rejectReason.length !== 0) {
      const { statusCode } = await api({
        method: 'POST',
        url: Urls.LOAD_RX_ABM_APPROVED_LIST,
        data,
      });
      if (statusCode === 200) {
        this.setState({ isSubmitProgress: false });
        Alert.alert(
          'Doctor has been rejected',
          'Doctor data has been rejected successfully!',
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
        reason: 'Wrong Selection of Chemist',
        code: 1,
      },
      {
        reason: 'Already a prescriber',
        code: 2,
      },

      {
        reason: 'others',
        code: 3,
      },
    ];
    return (
      <View>
        <Dropdown
          containerStyle={{ margin: 30 }}
          value="REASON :"
          data={data}
          valueExtractor={({ code }) => code}
          labelExtractor={({ reason }) => reason}
          onChangeText={(value, index, data) => {
            // changeChemist(data[index]);
            // eslint-disable-next-line no-lone-blocks
            {
              data[index].reason === 'others'
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
            onChangeText={value => this.setState({ rejectReason: value })}
            numberOfLines={10}
            maxLength={1000}
            style={{
              borderWidth: 1,
              borderRadius: 10,
              padding: 10,
              textAlignVertical: 'top',
              height: 80,
              marginTop: 5,
              marginLeft: 30,
              marginRight: 30,
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
            position: 'relative',
            bottom: -120,
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
                disabled={this.state.isReject}
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
            position: 'relative',
            bottom: -120,
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
                <Text style={styles.TextStyle}> APPROVED </Text>
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

        </View>
      );
    }
    if (status === '2') {
      return (
        <View
          style={{
            position: 'relative',
            bottom: -120,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            flexDirection: 'row',
            margin: 10,
          }}>
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
              <Text style={styles.TextStyle}>REJECTED</Text>
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

  renderRejectedReason(reason) {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
          height: '30%',
        }}>
        <Text style={{ padding: 10, fontSize: 20 }}>REASON : </Text>
        <View
          style={{
            width: '80%',
            height: 100,
            borderColor: 'black',
            borderWidth: 0.5,
            borderRadius: 5,
            padding: 10,
          }}>
          <Text style={{ fontSize: 20 }}>{reason}</Text>
        </View>
      </View>
    );
  }

  // eslint-disable-next-line consistent-return
  render() {
    const { user, userDetails, reasons, rejectReason, boNameData } = this.props;
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
    // const { boName } = this.props
    console.log('Apsel today', this.props.boNameData);
    if (user !== null) {
      const filtered = user.chemist_code
        .map(item => `${item.chemist_name} (${item.chemist_code})`)
        .join(',\n');
      const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
      return (
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
            <View style={{ flex: 1, flexDirection: 'column', height: '100%' }}>
              <View>
                {this.state.isSubmitProgress ? (
                  <View
                    style={{
                      position: 'relative',
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
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.heading}>
                      {`DOCTOR :     ${user.doc_name} (${user.dr_code})`}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.heading}>CHEMIST :</Text>
                      <Text style={styles.heading}>{filtered}</Text>
                    </View>
                  </View>
                </ImageBackground>
              </View>

              {user.status === '2' || user.status_rbm === '2'
                ? this.renderRejectedReason(user.reason)
                : null}
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <Text style={{ fontSize: 20 }}>{approvOrRejectABM}</Text>
                <Text style={{ fontSize: 20 }}>{approvOrRejectRBM}</Text>
              </View>
              {this.state.isReject ? this.renderReasons(rejectReason) : null}
              {reasons !== 'noClick' ? this.renderButtons(user.status) : null}

            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      );
    }
  }
}
export default withNavigation(AbmSubmitApprovalsComponent);