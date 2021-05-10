import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import { loadMyPerformanceGspCompliance } from '../../../actions';
import GspComplianceComponent from '../../../components/my_performance/GspComplianceComponent';

class MyPerformanceGspComplianceContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: null,
      doctors_compliance: [],
      doctors_not_compliance: [],
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'Multi-Visit & GSP Compliance',
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
              this.props.loadMyPerformanceGspCompliance(data);
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
              this.props.loadMyPerformanceGspCompliance(data);
            }
          });
        });
    }

    searchText(searchEvent) {
      if (searchEvent != null) {
        if (searchEvent.searchQuery != null && searchEvent.searchQuery) {
          this.setState({ searchQuery: searchEvent.searchQuery });
          const searchQuery = searchEvent.searchQuery.toLowerCase();
          const { doctors_compliance } = this.props.myPerformanceGspCompliance;
          const { doctors_not_compliance } = this.props.myPerformanceGspCompliance;
          const doctors_compliance_result = [];
          for (const value of doctors_compliance) {
            if (value.doctor_name) {
              const itemName = value.doctor_name.toLowerCase();
              if (itemName.includes(searchQuery)) {
                doctors_compliance_result.push(value);
              }
            }
          }
          const doctors_not_compliance_result = [];
          for (const value of doctors_not_compliance) {
            if (value.doctor_name) {
              const itemName = value.doctor_name.toLowerCase();
              if (itemName.includes(searchQuery)) {
                doctors_not_compliance_result.push(value);
              }
            }
          }
          this.setState({
            doctors_compliance: doctors_compliance_result,
            doctors_not_compliance: doctors_not_compliance_result
          });
        }
      }
    }

    render() {
      const {
        doctors_compliance, doctors_not_compliance, loading
      } = this.props.myPerformanceGspCompliance;
      const searchText = this.searchText.bind(this);
      return (
        <Container>
          <GspComplianceComponent
            doctors_compliance={this.state.searchQuery ? this.state.doctors_compliance : doctors_compliance}
            doctors_not_compliance={this.state.searchQuery ? this.state.doctors_not_compliance : doctors_not_compliance}
            loading={loading}
            _onChangeSearchText={searchText}
            connected={this.state.isInternetConnected}
            onRefresh={() => this.onRefresh()}
          />

        </Container>
      );
    }
}

const mapStateToProps = (state) => ({
  myPerformanceGspCompliance: state.myPerformanceGspCompliance
});

export default connect(
  mapStateToProps,
  { loadMyPerformanceGspCompliance }
)(MyPerformanceGspComplianceContainer);
