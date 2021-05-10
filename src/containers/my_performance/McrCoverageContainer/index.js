import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import { loadMyPerformanceMcrCoverage } from '../../../actions';
import McrCoverageComponent from '../../../components/my_performance/McrCoverageComponent';

class MyPerformanceMcrCoverageContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: null,
      doctors_met: [],
      doctors_not_met: [],
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
        year
      };
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceMcrCoverage(data);
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
        year
      };
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceMcrCoverage(data);
            }
          });
        });
    }

    searchText(searchEvent) {
      if (searchEvent != null) {
        if (searchEvent.searchQuery != null && searchEvent.searchQuery) {
          this.setState({ searchQuery: searchEvent.searchQuery });
          const searchQuery = searchEvent.searchQuery.toLowerCase();
          const { doctors_met } = this.props.myPerformanceMcrCoverage;
          const { doctors_not_met } = this.props.myPerformanceMcrCoverage;
          const doctors_met_result = [];
          for (const value of doctors_met) {
            if (value.doctor_name) {
              const itemName = value.doctor_name.toLowerCase();
              if (itemName.includes(searchQuery)) {
                doctors_met_result.push(value);
              }
            }
          }
          const doctors_not_met_result = [];
          for (const value of doctors_not_met) {
            if (value.doctor_name) {
              const itemName = value.doctor_name.toLowerCase();
              if (itemName.includes(searchQuery)) {
                doctors_not_met_result.push(value);
              }
            }
          }
          this.setState({
            doctors_met: doctors_met_result,
            doctors_not_met: doctors_not_met_result
          });
        }
      }
    }

    render() {
      const {
        doctors_met, doctors_not_met, loading
      } = this.props.myPerformanceMcrCoverage;
      const searchText = this.searchText.bind(this);
      return (
        <Container>
          <McrCoverageComponent
            doctors_met={this.state.searchQuery && this.state.doctors_met ? this.state.doctors_met : doctors_met}
            doctors_not_met={this.state.searchQuery && this.state.doctors_not_met ? this.state.doctors_not_met : doctors_not_met}
            _onChangeSearchText={searchText}
            loading={loading}
            connected={this.state.isInternetConnected}
            onRefresh={() => this.onRefresh()}
          />
        </Container>
      );
    }
}

const mapStateToProps = (state) => ({
  myPerformanceMcrCoverage: state.myPerformanceMcrCoverage
});

export default connect(
  mapStateToProps,
  { loadMyPerformanceMcrCoverage }
)(MyPerformanceMcrCoverageContainer);
