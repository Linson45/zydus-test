import React, { Component } from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadMyPerformanceMcrBos } from '../../../actions';
import McrCoverageBoListComponent from '../../../components/my_performance/McrCoverageBoListComponent';

class MyPerformanceMcrCoverageBoListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'MCR Coverage',
    };

    async componentDidMount() {
      const { rep_code, user_type } = this.props.navigation.state.params.user;
      const { period, month, year } = this.props.navigation.state.params;

      const data = {
        user_id: rep_code,
        group_code: user_type,
        period,
        month,
        year,
        type: 'TC'
      };
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceMcrBos(data);
            }
          });
        });
    }

    onRefresh = () => {
      const { rep_code, user_type } = this.props.navigation.state.params.user;
      const { period, month, year } = this.props.navigation.state.params;

      const data = {
        user_id: rep_code,
        group_code: user_type,
        period,
        month,
        year,
        type: 'TC'
      };
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceMcrBos(data);
            }
          });
        });
    }

    goToBoMcrCoverage(index) {
      const user = this.props.myPerformanceMcrBos.data[index];
      user.user_type = 'BO';
      const { month, year, period } = this.props.navigation.state.params;
      this.props.navigation.navigate('MyPerformanceMcrCoverage', {
        user, month, year, period
      });
    }

    render() {
      const goToBoMcrCoverage = this.goToBoMcrCoverage.bind(this);
      const { data, loading } = this.props.myPerformanceMcrBos;
      const { date_range } = this.props.navigation.state.params;

      return (
        <McrCoverageBoListComponent
          data={data}
          loading={loading}
          date_range={date_range}
          onItemPress={goToBoMcrCoverage}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  myPerformanceMcrBos: state.myPerformanceMcrBos
});

export default connect(
  mapStateToProps,
  { loadMyPerformanceMcrBos }
)(MyPerformanceMcrCoverageBoListContainer);
