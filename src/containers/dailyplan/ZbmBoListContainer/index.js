import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';
import { loadDailyPlanZbmBOs } from '../../../actions';
import ZbmBoDailyComponent from '../../../components/dailyplan/ZbmBoDailyComponent';

class DailyPlanZbmBoListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format('DD-MMM-YYYY'),
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'My Plan',
    };

    componentDidMount() {
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.loadData();
            }
          });
        });
    }

    onRefresh = () => {
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.loadData();
            }
          });
        });
    }

    async changeQuery(date) {
      await this.setState({
        date
      });
      this.loadData();
    }

    loadData() {
      const { rep_code, company_code, sbu_code } = this.props.navigation.state.params.user;
      const { date } = this.state;

      const data = {
        rep_code,
        company_code,
        sbu_code,
        date
      };
      this.props.loadDailyPlanZbmBOs(data);
    }

    goToRbmDetail(user) {
      const bo_name = user.name;
      const { date } = this.state;
      this.props.navigation.navigate('DailyPlanBo', { user, bo_name, date });
    }

    render() {
      const { data, loading } = this.props.dailyPlanZbmBOs;
      const goToRbmDetail = this.goToRbmDetail.bind(this);
      const { date } = this.state;
      const changeQuery = this.changeQuery.bind(this);

      return (
        <ZbmBoDailyComponent
          data={data}
          date={date}
          changeQuery={changeQuery}
          loading={loading}
          onPress={goToRbmDetail}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  dailyPlanZbmBOs: state.dailyPlanZbmBOs
});

export default connect(
  mapStateToProps,
  { loadDailyPlanZbmBOs }
)(DailyPlanZbmBoListContainer);
