import React from 'react';
import { connect } from 'react-redux';
import { Alert, ActivityIndicator, View } from 'react-native';
import { StackActions } from 'react-navigation';
import { loadDailyPlanBoAllDoctors, loadContactChemists } from '../../../actions';
import RxChemistSelectionComponent from '../../../components/rx_tracker/AddEditRXComponents';
import { getAllFullDataDoctors } from '../../../local-storage/helper/dailyplan';
import api from '../../../api';
import Urls from '../../../api/urls';
import Async from '../../../util/storage/Async';
import NetInfo from '@react-native-community/netinfo';
import {createDrSubmit} from '../../../local-storage/helper/Rx'
class RxChemistSelectionContainer extends React.Component {
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
    this.props.loadContactChemists();
  }

  async submitData() {
    const user = this.props.navigation.state.params.user;
    const { company_code, sbu_code, rep_code } = user;
    const bo = this.props.navigation.state.params.bo;
    const { campaign_code } = bo;
    const { docCode, selected } = this.state;
    // const valueToRemove = 'chemist_code';
    this.setState({ isSubmitProgress: true });
    var filtered = selected.filter(el => el.hasOwnProperty('chemist_code'));
    console.log('Filtered data in submit before code', filtered);
    filtered = filtered.map(item => item.chemist_code);

    const data = {
      company_code,
      sbu_code,
      rep_code,
      campaign_code,
      doc_code: docCode,
      chemist_code: filtered,
    };
    console.log('Submited data Apsel', data);
    NetInfo.isConnected.fetch().then(isConnected => {
      if(isConnected){
      this.onlineSubmitData(data)
      }else{
        //for offline 
        //console.log('offline submit')
         createDrSubmit(data)   
         this.setState({ isSubmitProgress: false });
         Async.set('chemist_upload', true);
         Alert.alert(
           'Doctor Data submitted',
           'Doctor Data has been submitted successfully!',
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
     });
  }
  async onlineSubmitData(data){
    const { statusCode } = await api({
      method: 'POST',
      url: Urls.SUBMIT_CHEMIST_DATA,
      data,
    });
    if (statusCode === 200) {
      this.setState({ isSubmitProgress: false });
      Async.set('chemist_upload', true);
      Alert.alert(
        'Doctor Data submitted',
        'Doctor Data has been submitted successfully!',
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
  }

  async changeChemist(chemist) {
    if (chemist !== null) {
      this.setState({
        isSelectedDoc: true,
      });
      this.setState({
        docCode: chemist.doc_code,
      });
    }
  }

  onChange(index, doctor) {
    const { selected } = this.state;
    const filtered = this.state.selected.filter(el => el != null);
    if (selected) {
      if (selected[index]) {
        delete selected[index];
        const filtered = selected.filter(el =>
          el.hasOwnProperty('chemist_code'),
        );
        const filteredMore = filtered.filter(
          (ele, ind) =>
            ind === filtered.findIndex(elem => elem.name === ele.name),
        );
        this.setState({ selected: filteredMore });
        console.log('unselected', selected);
      } else if (filtered.length !== 5) {
        selected[index] = doctor;
        const filtered = selected.filter(el =>
          el.hasOwnProperty('chemist_code'),
        );
        const filteredMore = filtered.filter(
          (ele, ind) =>
            ind === filtered.findIndex(elem => elem.name === ele.name),
        );
        this.setState({ selected: filteredMore });
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

  changeSelected(value) {
    if (value) {
      console.log('Value for change slected Apsel');
      this.setState({ selected: value });
      // this.setState({isChemistAdded: true});
    }
  }
  remove(index, doctor) {
    const { selected } = this.state;
    const filtered = this.state.selected.filter(el =>
      el.hasOwnProperty('chemist_code'),
    );
    // console.log('Chemist', selected, filtered);
    const filteredMore = filtered.filter(
      (ele, ind) => ind === filtered.findIndex(elem => elem.name === ele.name),
    );
    // console.log('Filtered more Apsel', filteredMore);
    if (filteredMore.length !== 0) {
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
    } else {
      this.setState({ isChemistAdded: false });
    }
  }

  render() {
    const { data, loading } = this.props.dailyPlanBoAllDoctors;
    if (data != null) {
      const { docList } = this.props.navigation.state.params;
      const allSubmitedDocList = docList;

      const filteredDocList = [];
      allSubmitedDocList.map(doc => {
        if (doc.status === '2'||doc.status==='2') {
        } else {
          filteredDocList.push(doc);
        }
      });

      console.log('Doc List without reject', filteredDocList);
      const filterDocList = data.filter(
        data =>
          !filteredDocList.find(docItem => docItem.dr_code === data.doc_code),
      );
      console.log('Doc List before', filterDocList);

      const loading1 = this.props.chemists.loading;
      const chemistsData = this.props.chemists.data;
      const changeChemist = this.changeChemist.bind(this);
      const { isSelectedDoc, docCode } = this.state;
      const {
        selected,
        selectedItems,
        isChemistAdded,
        isSubmitProgress,
      } = this.state;
      const onChange = this.onChange.bind(this);
      const remove = this.remove.bind(this);
      const changeSelected = this.changeSelected.bind(this);
      const submitData = this.submitData.bind(this);

      //   const goToLogDetail = this.goToLogDetail.bind(this);
      //   const goToHistory = this.goToHistory.bind(this);
      return (
        <RxChemistSelectionComponent
          chemistsData={chemistsData}
          loading1={loading1}
          isSubmitProgress={isSubmitProgress}
          filterDocList={filterDocList}
          selected={selected}
          onChange={onChange}
          submitData={submitData}
          remove={remove}
          loading={loading}
          docCode={docCode}
          isSelectedDoc={isSelectedDoc}
          selectedItems={selectedItems}
          isChemistAdded={isChemistAdded}
          changeChemist={changeChemist}
          connected={true}
          changeSelected={changeSelected}
        />
      );
    }
    return (
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
    );
  }
}

const mapStateToProps = state => ({
  dailyPlanBoAllDoctors: state.dailyPlanBoAllDoctors,
  chemists: state.contactChemist,
  SubmitChemist: state.SubmitChemist,
});

export default connect(
  mapStateToProps,
  { loadDailyPlanBoAllDoctors, loadContactChemists },
)(RxChemistSelectionContainer);
