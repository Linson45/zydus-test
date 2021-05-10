import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';
import {
  loadBoWiseReport,
  loadManagerList,
  loadRbmTourPlan,
  submitTourPlan,
} from '../../../actions';
import RbmComponent from '../../../components/tourplan/RbmComponent';

class TourplanRbmContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format('DD-MMM-YYYY'),
      isBoWiseTpOpen: false,
      approver: '',
      isInternetConnected: true,
    };
  }

  static navigationOptions = {
    title: 'Daily Tour Plan',
    headerRight: null,
  };

  componentDidMount() {
    NetInfo.isConnected.fetch().then((isConnected) => {
      this.setState({ isInternetConnected: isConnected }, () => {
        if (isConnected) {
          this.willFocus = this.props.navigation.addListener(
            'didFocus',
            this.onFocus.bind(this),
          );
        }
      });
    });
  }

  onFocus() {
    NetInfo.isConnected.fetch().then((isConnected) => {
      this.setState({ isInternetConnected: isConnected }, () => {
        if (isConnected) {
          this.loadData();
        }
      });
    });
  }

  onRefresh = () => {
    NetInfo.isConnected.fetch().then((isConnected) => {
      this.setState({ isInternetConnected: isConnected }, () => {
        if (isConnected) {
          this.loadData();
        }
      });
    });
  };

  selectApprover(approver) {
    this.setState({
      approver,
    });
  }

  toggleBoWiseTpModal() {
    this.setState({
      isBoWiseTpOpen: !this.state.isBoWiseTpOpen,
    });
  }

  async changeQuery(date) {
    await this.setState({
      date,
    });
    this.loadData();
  }

  loadData() {
    const {
      rep_code,
      company_code,
      sbu_code,
      user_type,
      user_name,
    } = this.props.navigation.state.params.user;
    const { date } = this.state;
    let data = {
      rep_code,
      company_code,
      sbu_code,
      user_type,
      date,
    };
    this.props.loadRbmTourPlan(data);

    data = {
      rep_code,
      company_code,
      sbu_code,
      user_type,
      user_name,
    };

    this.props.loadManagerList(data);
  }

  openBoWiseReport() {
    this.toggleBoWiseTpModal();
    const {
      rep_code,
      company_code,
      sbu_code,
      user_type,
    } = this.props.navigation.state.params.user;
    const { date } = this.state;
    const current_month = moment(date, 'DD-MMM-YYYY').format('DD-MMM-YYYY');
    const last_month = moment(date, 'DD-MMM-YYYY')
      .add(-1, 'M')
      .format('DD-MMM-YYYY');
    const data = {
      rep_code,
      company_code,
      sbu_code,
      user_type,
      date,
      current_month,
      last_month,
    };
    this.props.loadBoWiseReport(data);
  }

  gotoTeam() {
    const { user } = this.props.navigation.state.params;
    const { date } = this.state;
    this.props.navigation.navigate('TourplanTeam', { user, date });
  }

  gotoEditTourplan(item) {
    const { user } = this.props.navigation.state.params;
    const { can_edit } = this.props.tourplanRbm.data;
    this.props.navigation.navigate('TourplanRbmAdd', { user, can_edit, item });
  }

  async submitTourPlan() {
    const { date, approver } = this.state;

    if (approver) {
      const {
        company_code,
        sbu_code,
        rep_code,
        user_type,
      } = this.props.navigation.state.params.user;

      const month = moment(date, 'DD-MMM-YYYY').format('M');
      const year = moment(date, 'DD-MMM-YYYY').format('YYYY');

      const data = {
        company_code,
        sbu_code,
        rep_code,
        month,
        year,
        date,
        user_type,
        approver_id: approver,
      };
      this.props.submitTourPlan(data);
    }
  }

  render() {
    const openBoWiseReport = this.openBoWiseReport.bind(this);
    const gotoTeam = this.gotoTeam.bind(this);
    const gotoEditTourplan = this.gotoEditTourplan.bind(this);
    const selectApprover = this.selectApprover.bind(this);
    const toggleBoWiseTpModal = this.toggleBoWiseTpModal.bind(this);
    const { loading, data } = this.props.tourplanRbm;
    const {
      tourplanBoWiseReport,
      tourplanSubmit,
      tourplanManagerList,
    } = this.props;
    const { approver, date, isBoWiseTpOpen } = this.state;
    const { user } = this.props.navigation.state.params;
    const changeQuery = this.changeQuery.bind(this);
    const submitTourPlan = this.submitTourPlan.bind(this);
    return (
      <RbmComponent
        submitTourPlan={submitTourPlan}
        tourplanManagerList={tourplanManagerList}
        changeQuery={changeQuery}
        approver={approver}
        user={user}
        isBoWiseTpOpen={isBoWiseTpOpen}
        date={date}
        data={data}
        loading={
          loading || tourplanSubmit.loading || tourplanManagerList.loading
        }
        tourplanBoWiseReport={tourplanBoWiseReport}
        gotoEditTourplan={gotoEditTourplan}
        gotoTeam={gotoTeam}
        openBoWiseReport={openBoWiseReport}
        selectApprover={selectApprover}
        toggleBoWiseTpModal={toggleBoWiseTpModal}
        connected={this.state.isInternetConnected}
        onRefresh={() => this.onRefresh()}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  tourplanRbm: state.tourplanRbm,
  tourplanBoWiseReport: state.tourplanBoWiseReport,
  tourplanSubmit: state.tourplanSubmit,
  tourplanManagerList: state.tourplanManagerList,
});

export default connect(
  mapStateToProps,
  {
    loadRbmTourPlan,
    loadBoWiseReport,
    submitTourPlan,
    loadManagerList,
  },
)(TourplanRbmContainer);
