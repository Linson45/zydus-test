import React from 'react';
import { connect } from 'react-redux';
import ABMRxDocListComponent from '../../../components/rx_tracker/ABMRxDocListComponent';
import { loadApprovedList, loadPendingRxList } from '../../../actions';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { Icon } from 'native-base';
import Adapter from './../../../util/Adapter';
import AsyncStorage from '@react-native-community/async-storage'
const STORAGE_KEY = '@save_rx_tab'
import { StackActions } from 'react-navigation';
import Images from '../../../Constants/imageConstants';
import { identity } from 'lodash';
class ABMRxDocListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: null,
      pendingDocs: [],
      isInternetConnected: true,
      isRXtab: false,
      boName: '',
      boRole: '',
      boPlace: ''
    };
  }

  async componentDidMount() {

    this.props.navigation.setParams({
      goToLeaderBoard: this.goToLeaderBoard,
      goBackHandler: this.goBackHandler
    });
    this.willFocus = this.props.navigation.addListener(
      'didFocus',
      this.onFocus.bind(this),
    );
  }
  onFocus() {
    this.loadData();
  }
  loadData() {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (value) {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(false));
        this.setState({ isRXtab: true })
      }
      console.log("Mitesh", value);
    });
    const bo = this.props.navigation.state.params.bo;
    const user = this.props.navigation.state.params.user;

    const { rep_code, sbu_code, company_code } = user;
    // console.log('Apsel for saish',user)
    const boNameFirst = `${user.name} ,`
    const boRoleFirst = `${user.group_code} ,`
    const boPlaceFirst = `${user.hq_name}`
    this.props.navigation.setParams({
      // boName: `${user.name} , ${user.group_code} , ${user.hq_name}`,
      boName: boNameFirst,
      boRole: boRoleFirst,
      boPlace: boPlaceFirst,
    });

    this.setState({ boName: user.name })
    // const {campaign_code} = bo;

    // const localDocs = await getApprovedBoDocList(campaign_code);
    const data = {
      rep_code,
      sbu_code,
      company_code,
      campaign_code: 'CC01',
    };
    this.props.loadApprovedList(data);
    this.props.loadPendingRxList(data);
  }
  goToLeaderBoard = async () => {
    const user = await Adapter.getUser();
    const { rep_code, sbu_code, company_code } = user;
    const data = {
      rep_code,
      sbu_code,
      company_code,
    };
    this.props.navigation.navigate('BoLeaderBoard', { data });
  };
  goBackHandler = async () => {

    const popAction = StackActions.pop({
      n: 1,
    });
    this.props.navigation.dispatch(popAction);

  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    if (params) {
      goToLeaderBoard = params.goToLeaderBoard;
      
    }

    return {
      title: 'Rx',
      headerRight: (
        <View style={{ margin: 10 }}>
          <Icon
            name="trophy"
            type="FontAwesome"
            onPress={() => params.goToLeaderBoard()}
            style={{
              fontSize: 30,
              color: '#ffffff', 
            }}
          />
        </View>
      ), 
      headerLeft: (
        // LeftButton 

        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 5 }}>
          <TouchableOpacity onPress={() => navigation.getParam('goBackHandler')()}><Image source={Images.backWhite} style={{ marginLeft: 5, marginTop: 3, height: 20 }} /></TouchableOpacity>
          <Text style={{ fontSize: 20, color: 'white', marginLeft: 15 }}>{navigation.getParam('boName')}</Text>
          <Text style={{ fontSize: 20, color: 'white', marginLeft: 5 }}>{navigation.getParam('boRole')}</Text>
          <Text style={{ fontSize: 20, color: 'white', marginLeft: 5 }}>{navigation.getParam('boPlace')}</Text>
        </View>

      ),
    };
  };

  render() {
    const { loading, data } = this.props.approvedList;
    const { loading_1, data_1 } = this.props.LoadPendingRX;
    const user = this.props.navigation.state.params.user;
    const { isRXtab } = this.state;
    return (
      <ABMRxDocListComponent
        loading={loading}
        data_1={data_1}
        data={data}
        isRXtab={isRXtab}
        user={user}
        connected={true}
      />
    );
  }
}
const mapStateToProps = state => ({
  approvedList: state.approvedList,
  LoadPendingRX: state.LoadPendingRX,
});

export default connect(
  mapStateToProps,
  { loadApprovedList, loadPendingRxList },
)(ABMRxDocListContainer);
