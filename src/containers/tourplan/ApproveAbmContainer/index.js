import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';
import {
  loadAbmTourPlan, loadBoWiseReport, submitApprove, submitReopen
} from '../../../actions';
import ApproveAbmComponent from '../../../components/tourplan/ApproveAbmComponent';
import Adapter from '../../../util/Adapter';

class TourplanApproveAbmContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format('DD-MMM-YYYY'),
      isPlannedVisitListOpen: false,
      selected: null,
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'Daily Tour Plan',
      headerRight: null
    };

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

    openDaysPlan(item, date) {
      console.log(item);
      this.setState({
        date,
        selected: item,
        isPlannedVisitListOpen: true
      });
    }

    toggleDaysPlan() {
      this.setState({
        isPlannedVisitListOpen: !this.state.isPlannedVisitListOpen
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
      this.props.loadAbmTourPlan(data);
    }

    async changeQuery(date) {
      await this.setState({
        date
      });
      this.loadData();
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
      const { loading, data } = this.props.tourplanAbm;
      const { date, isPlannedVisitListOpen, selected } = this.state;
      const toggleDaysPlan = this.toggleDaysPlan.bind(this);
      const openDaysPlan = this.openDaysPlan.bind(this);
      const changeQuery = this.changeQuery.bind(this);
      const submitApprove = this.submitApprove.bind(this);
      const submitReopen = this.submitReopen.bind(this);
      const approve = this.props.tourplanApprove;
      const reopen = this.props.tourplanReopen;

      return (
        <ApproveAbmComponent
          data={data}
          date={date}
          user={user}
          changeQuery={changeQuery}
          selected={selected}
          openDaysPlan={openDaysPlan}
          toggleDaysPlan={toggleDaysPlan}
          isPlannedVisitListOpen={isPlannedVisitListOpen}
          loading={loading || approve.loading || reopen.loading}
          submitApprove={submitApprove}
          submitReopen={submitReopen}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  tourplanAbm: state.tourplanAbm,
  tourplanBoWiseReport: state.tourplanBoWiseReport,
  tourplanApprove: state.tourplanApprove,
  tourplanReopen: state.tourplanReopen
});

export default connect(
  mapStateToProps,
  {
    loadAbmTourPlan, loadBoWiseReport, submitApprove, submitReopen
  }
)(TourplanApproveAbmContainer);
