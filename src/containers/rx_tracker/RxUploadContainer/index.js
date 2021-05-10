import React from 'react';
import { connect } from 'react-redux';
import { Alert, ActivityIndicator } from 'react-native';
import { StackActions } from 'react-navigation';
import { loadDailyPlanBoAllDoctors } from '../../../actions';
import RxUploadComponents from '../../../components/rx_tracker/RxUploadComponents';
import { getAllFullDataDoctors } from '../../../local-storage/helper/dailyplan';
import api from '../../../api';
import Urls from '../../../api/urls';
import { filter } from 'lodash';
import NetInfo from '@react-native-community/netinfo';
import {
  getCurrentMonth,
  getCurrentYear,
  getFullMonthString,
} from '../../../util/dateTimeUtil';
class RxUploadContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      isSelectedDoc: false,
      isChemistAdded: false,
      selectedItems: [],
      searchQuery: null,
      docCode: null,
      chemistCode: [],
      isInternetConnected: true,
      full_path_1: null,
      full_path_2: null,
      isSubmitProgress: false,
    };
  }

  static navigationOptions = {
    title: 'Add / Edit Rx',
  };

  async componentDidMount() {
    const { user, date } = this.props.navigation.state.params;
    const { rep_code, company_code, sbu_code } = user;
    const localDocs = await getAllFullDataDoctors(rep_code);
    const data = {
      rep_code,
      company_code,
      sbu_code,
      date,
      localDocs,
    };
    this.props.loadDailyPlanBoAllDoctors(data);
  }
  async submitDataAPI(dataGot){
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected){
       this.onlineSubmitData(dataGot)
      }else{
        // Offline Data
       // this.props.submitChemistData(data);
      }})
  }
  saveHandlerAPI() {
    console.log('Save pressed');
    
    // saveUploadRx('date');
  }

  async onlineSubmitData(dataGot){

    const { statusCode } = await api({
      method: 'POST',
      url: Urls.SUBMIT_UPLOAD_RX,
      data: dataGot,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    if (statusCode === 200) {
      this.setState({ isSubmitProgress: false });
      Alert.alert(
        'Rx Data submitted',
        'Rx has been submitted successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              this.goBack();
            },
          },
        ],
        { cancelable: false },
      );
    }
  }
  goBack() {
    const popAction = StackActions.pop({
      n: 1,
    });
    this.props.navigation.dispatch(popAction);
  }
  async changeChemist(chemist) {
    if (chemist !== null) {
      this.setState({
        isSelectedDoc: true,
      });
      this.setState({
        docCode: chemist.doc_code,
      });
      this.props.loadContactChemists();
    }
  }

  onChange(index, doctor) {
    const { selected } = this.state;
    const filtered = this.state.selected.filter(el => el != null);
    if (selected) {
      if (selected[index]) {
        selected.splice(index, 1);
        console.log('unselected', selected);
      } else if (filtered.length !== 5) {
        selected[index] = doctor;
        console.log('selected', selected);
      } else {
        alert('Only 5 chemist is allowed');
      }
    }
    this.setState({
      selected,
    });
    // console.log(selected);
    // console.log(filtered);
  }

  remove(index, doctor) {
    const { selected } = this.state;
    const filtered = this.state.selected.filter(el => el !== null);

    if (filtered.length !== 0) {
      if (selected) {
        if (selected[index]) {
          selected.splice(index, 1);
        } else {
          selected[index] = doctor;
        }
      }
      this.setState({
        selected: selected || {},
      });
      this.setState({ isChemistAdded: true });
      console.log(filtered);
    } else {
      this.setState({ isChemistAdded: false });
    }
  }

  render() {
    const docList = this.props.navigation.state.params.docList;
    const rxData = this.props.navigation.state.params.rxData;
    console.log('Doc list, RX list Apsel',docList,rxData)
    const user = docList.filter(item => item.status_rbm === '1');
    var month = getCurrentMonth()
    var year = getCurrentYear()
    year = year - 2000;
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


    var sameMonthRXList = []
    rxData.map(rx => {
      var dateValue = rx.created_at.split('-')
      console.log(MONTHS[dateValue[1]] == month || dateValue[2].toString() == year, MONTHS[dateValue[1]], month, dateValue[2].toString(), year)
      if (MONTHS[dateValue[1]] == month && dateValue[2].toString() == year) {
        sameMonthRXList.push(rx)
      }
    })

    console.log('sameMonthRXList', sameMonthRXList)
    var sameMonthRXListWithoutRejected = []
    sameMonthRXList.map(rx => {
      if (!(rx.status === "2"||rx.status_rbm==="2")) {
        sameMonthRXListWithoutRejected.push(rx)
      }
    })
    console.log('sameMonthRXListWithoutRejected', sameMonthRXListWithoutRejected)
    var filteredList = user.filter((elem) => !sameMonthRXListWithoutRejected.find(({ dr_code }) => elem.dr_code === dr_code));
    console.log('filteredList', filteredList)

    const userData = this.props.navigation.state.params.user;


    const goBack = this.goBack.bind(this);
    const submitDataAPI = this.submitDataAPI.bind(this);
    const saveHandlerAPI = this.saveHandlerAPI.bind(this);
    const { isSubmitProgress } = this.state;

    return (
      <RxUploadComponents
        goBack={goBack}
        userData={userData}
        user={filteredList}
        loading={false}
        connected={true}
        isSubmitProgress={isSubmitProgress}
        submitDataAPI={submitDataAPI}
        saveHandlerAPI={saveHandlerAPI}
      />
    );
  }
}

const mapStateToProps = state => ({
  dailyPlanBoAllDoctors: state.dailyPlanBoAllDoctors,
});

export default connect(
  mapStateToProps,
  { loadDailyPlanBoAllDoctors },
)(RxUploadContainer);
