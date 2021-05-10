import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';
import {
  loadBoWiseReport, loadRbmTourPlan, submitApprove, submitReopen
} from '../../../actions';
import ApproveRbmComponent from '../../../components/tourplan/ApproveRbmComponent';
import Adapter from '../../../util/Adapter';

class TourplanApproveRbmContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format('DD-MMM-YYYY'),
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'Tour Plan',
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

    async setNewDateAndLoad() {
      const { date } = this.props.navigation.state.params;
      if (date) {
        await this.setState({
          date
        });
      }
      this.loadData();
    }

    async changeQuery(date) {
      await this.setState({
        date
      });
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
      this.props.loadRbmTourPlan(data);
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
      const { loading, data } = this.props.tourplanRbm;
      const { user } = this.props.navigation.state.params;
      const { date } = this.state;
      const changeQuery = this.changeQuery.bind(this);
      const submitApprove = this.submitApprove.bind(this);
      const submitReopen = this.submitReopen.bind(this);
      const approve = this.props.tourplanApprove;
      const reopen = this.props.tourplanReopen;

      return (
        <ApproveRbmComponent
          data={data}
          changeQuery={changeQuery}
          user={user}
          date={date}
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
  tourplanRbm: state.tourplanRbm,
  tourplanApprove: state.tourplanApprove,
  tourplanReopen: state.tourplanReopen
});

export default connect(
  mapStateToProps,
  {
    loadRbmTourPlan, loadBoWiseReport, submitApprove, submitReopen
  }
)(TourplanApproveRbmContainer);
