import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';
import {
  loadBoTourPlan,
  loadBoTourPlanDocList,
  loadBoTourPlanTpQuality,
  submitApprove,
  submitReopen
} from '../../../actions';
import ApproveBoComponent from '../../../components/tourplan/ApproveBoComponent';
import Adapter from '../../../util/Adapter';

class TourplanApproveBoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format('DD-MMM-YYYY'),
      isTpQualityOpen: false,
      isDrWiseTpOpen: false,
      isPlannedVisitListOpen: false,
      isDoctorListOpen: false,
      approver: '',
      selected: null,
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'Tour Plan',
      headerRight: null
    };

    selectApprover(approver) {
      this.setState({
        approver
      });
    }

    openDaysPlan(item, date) {
      this.setState({
        date,
        selected: item,
        isPlannedVisitListOpen: !this.state.isPlannedVisitListOpen
      });
    }

    toggleDaysPlan() {
      this.setState({
        isPlannedVisitListOpen: !this.state.isPlannedVisitListOpen
      });
    }

    toggleDoctorListModal() {
      this.setState({
        isDoctorListOpen: !this.state.isDoctorListOpen
      });
    }

    toggleTpQualityModal() {
      this.setState({
        isTpQualityOpen: !this.state.isTpQualityOpen
      });
    }

    toggleDrWiseTpModal() {
      this.setState({
        isDrWiseTpOpen: !this.state.isDrWiseTpOpen
      });
    }

    async changeQuery(date) {
      await this.setState({
        date
      });
      this.loadData();
    }

    componentDidMount() {
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.setNewDateAndLoad();
            }
          });
        });
    }

    onRefresh = () => {
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.setNewDateAndLoad();
            }
          });
        });
    }

    async setNewDateAndLoad() {
      const { date } = this.props.navigation.state.params;
      if (date) {
        await this.setState({
          date
        });
      }
      this.loadData();
      this.openTpQuality();
    }

    loadData() {
      const {
        rep_code, company_code, sbu_code, user_type
      } = this.props.navigation.state.params.user;
      const { date } = this.state;
      const data = {
        rep_code,
        company_code,
        sbu_code,
        user_type,
        date
      };
      this.props.loadBoTourPlan(data);
    }

    // Open a popup and show loading inside it (Like Sales Trend my performance)
    openDocList() {
      this.toggleDrWiseTpModal();
      const {
        rep_code, company_code, sbu_code, user_type
      } = this.props.navigation.state.params.user;
      const { date } = this.state;
      const data = {
        rep_code,
        company_code,
        sbu_code,
        user_type,
        date
      };
      this.props.loadBoTourPlanDocList(data);
    }

    // Open a popup and show loading inside it (Like Sales Trend my performance)
    openTpQuality() {
      this.toggleTpQualityModal();
      const {
        rep_code, company_code, sbu_code, user_type
      } = this.props.navigation.state.params.user;
      const { date } = this.state;
      const data = {
        rep_code,
        company_code,
        sbu_code,
        user_type,
        date
      };
      this.props.loadBoTourPlanTpQuality(data);
    }

    async submitReopen() {
      const user = await Adapter.getUser();
      const { date } = this.state;
      const { rep_code, company_code, sbu_code } = this.props.navigation.state.params.user;
      const approver_id = user.rep_code;
      const { user_type } = user;
      const month = moment(date, 'DD-MMM-YYYY').format('M');
      const year = moment(date, 'DD-MMM-YYYY').format('YYYY');
      const data = {
        rep_code,
        company_code,
        sbu_code,
        approver_id,
        month,
        year,
        user_type
      };
      this.props.submitReopen(data);
    }

    async submitApprove() {
      const user = await Adapter.getUser();
      const { date } = this.state;
      const { rep_code, company_code, sbu_code } = this.props.navigation.state.params.user;
      const approver_id = user.rep_code;
      const month = moment(date, 'DD-MMM-YYYY').format('M');
      const year = moment(date, 'DD-MMM-YYYY').format('YYYY');
      const data = {
        rep_code,
        company_code,
        sbu_code,
        approver_id,
        month,
        year
      };
      this.props.submitApprove(data);
    }

    render() {
      const { user } = this.props.navigation.state.params;
      const {
        date, isTpQualityOpen, isDrWiseTpOpen, approver, isPlannedVisitListOpen, selected, isDoctorListOpen
      } = this.state;
      const { loading, data } = this.props.tourplanBo;
      const { tourplanBoTpQuality } = this.props;
      const { tourPlanBoDocs } = this.props;

      const openDocList = this.openDocList.bind(this);
      const openTpQuality = this.openTpQuality.bind(this);
      const toggleDaysPlan = this.toggleDaysPlan.bind(this);
      const changeQuery = this.changeQuery.bind(this);
      const toggleTpQualityModal = this.toggleTpQualityModal.bind(this);
      const toggleDrWiseTpModal = this.toggleDrWiseTpModal.bind(this);
      const selectApprover = this.selectApprover.bind(this);
      const openDaysPlan = this.openDaysPlan.bind(this);
      const toggleDoctorListModal = this.toggleDoctorListModal.bind(this);
      const submitApprove = this.submitApprove.bind(this);
      const submitReopen = this.submitReopen.bind(this);
      const approve = this.props.tourplanApprove;
      const reopen = this.props.tourplanReopen;
      return (
        <ApproveBoComponent
          loading={loading || approve.loading || reopen.loading}
          submitApprove={submitApprove}
          submitReopen={submitReopen}
          data={data}
          date={date}
          user={user}
          selected={selected}
          approver={approver}
          openDaysPlan={openDaysPlan}
          isDoctorListOpen={isDoctorListOpen}
          toggleDoctorListModal={toggleDoctorListModal}
          isPlannedVisitListOpen={isPlannedVisitListOpen}
          toggleDaysPlan={toggleDaysPlan}
          tourPlanBoDocs={tourPlanBoDocs}
          tourplanBoTpQuality={tourplanBoTpQuality}
          isDrWiseTpOpen={isDrWiseTpOpen}
          isTpQualityOpen={isTpQualityOpen}
          toggleDrWiseTpModal={toggleDrWiseTpModal}
          toggleTpQualityModal={toggleTpQualityModal}
          openTpQuality={openTpQuality}
          openDocList={openDocList}
          changeQuery={changeQuery}
          selectApprover={selectApprover}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  tourplanBo: state.tourplanBo,
  tourPlanBoDocs: state.tourPlanBoDocs,
  tourplanBoTpQuality: state.tourplanBoTpQuality,
  tourplanApprove: state.tourplanApprove,
  tourplanReopen: state.tourplanReopen
});

export default connect(
  mapStateToProps,
  {
    loadBoTourPlan, loadBoTourPlanDocList, loadBoTourPlanTpQuality, submitApprove, submitReopen
  }
)(TourplanApproveBoContainer);
