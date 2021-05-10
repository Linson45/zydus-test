import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Image } from 'react-native';
import {
  Body, Card, Icon, ListItem, Item, Input
} from 'native-base';
import RXDocListComponent from '../../../components/rx_tracker/RxTrackerDocListComponents';
import { loadApprovedList, loadPendingRxList } from '../../../actions';
import { loadDailyPlanBoAllDoctors, loadContactChemists } from '../../../actions';
import { getRxSave } from '../../../local-storage/helper/Rx/index'

// import { getApprovedBoDocList } from '../../../local-storage/helper/Rx';
import Adapter from './../../../util/Adapter';

class RxDocListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: null,
      pendingDocs: [],
      isInternetConnected: true,
      dataFromOffline: null
    };
  }

  async componentDidMount() {
    this.props.navigation.setParams({
      goToLeaderBoard: this.goToLeaderBoard,
    });
    this.willFocus = this.props.navigation.addListener(
      'didFocus',
      this.onFocus.bind(this),
    );
  }
  onFocus() {
    this.loadData();
  }

  async loadData() {
    const bo = this.props.navigation.state.params.bo;

    const { campaign_code } = bo;

    const user = await Adapter.getUser();
    const { rep_code, sbu_code, company_code } = user;
    // const filtered = user.map(item => item.chemist_code.CHEMIST_Name);

    // const localDocs = await getApprovedBoDocList(campaign_code);
    const data = {
      rep_code,
      sbu_code,
      company_code,
      campaign_code,
    };
    // const {  date } = this.props.navigation.state.params;

    // const localDocs = await getAllFullDataDoctors(rep_code);

    // const data2 = {
    //   rep_code,
    //   company_code,
    //   sbu_code,
    //   date,
    //   localDocs,
    // };
console.log('Reload check',data)
    // var items = await getRxSave(campaign_code, rep_code)
    // if(items){
    //   console.log('dataGot', items, campaign_code, rep_code)
    //   this.setState({ dataFromOffline: items })
    // }else{
      this.setState({ dataFromOffline: [] })
    // }
  
    this.props.loadApprovedList(data);
    this.props.loadPendingRxList(data);
    //this.props.loadDailyPlanBoAllDoctors(data2);
    //this.props.loadContactChemists();
  }
  goToLeaderBoard = async () => {
    const user = await Adapter.getUser();
    const { rep_code, sbu_code, company_code } = user;
    const data = {
      rep_code,
      sbu_code,
      company_code,
    };
    this.props.navigation.navigate('BoLeaderBoard', { data })
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
              color: '#ffffff'
            }}
          />
        </View>
      ),
    }
  };

  render() {
    const { loading, data } = this.props.approvedList;
    const { loading_1, data_1 } = this.props.LoadPendingRX;
    const user = this.props.navigation.state.params.user;
    const bo = this.props.navigation.state.params.bo;
    // console.log('New Data', data, date_1)
    var offlineDatas = []
    if (this.state.dataFromOffline) {

      this.state.dataFromOffline.map(list => {
        offlineDatas.push(list)
      })
    }
    if (data_1) {
      var rxData = data_1.concat(offlineDatas)
    }

    return (
      <RXDocListComponent
        loading={loading_1}
        data={data}
        data_1={rxData}
        user={user}
        bo={bo}
        connected={this.state.isInternetConnected}
      // dataFromOffline={this.state.dataFromOffline}
      />
    );
  }
}
const mapStateToProps = state => ({
  approvedList: state.approvedList,
  LoadPendingRX: state.LoadPendingRX,
  dailyPlanBoAllDoctors: state.dailyPlanBoAllDoctors,
  chemists: state.contactChemist,
  SubmitChemist: state.SubmitChemist,
});


export default connect(
  mapStateToProps,
  {
    loadApprovedList,
    loadPendingRxList,
    loadDailyPlanBoAllDoctors,
    loadContactChemists
  },
)(RxDocListContainer);
