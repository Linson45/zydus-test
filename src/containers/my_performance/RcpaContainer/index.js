import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import { loadMyPerformanceRcpa } from '../../../actions';
import RcpaComponent from '../../../components/my_performance/RcpaComponent';

class MyPerformanceRcpaContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: null,
      doctors_rcpa: [],
      doctors_not_rcpa: [],
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: "Doctors RCPA'ed",
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
              this.props.loadMyPerformanceRcpa(data);
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
              this.props.loadMyPerformanceRcpa(data);
            }
          });
        });
    }

    searchText(searchEvent) {
      if (searchEvent != null) {
        if (searchEvent.searchQuery != null && searchEvent.searchQuery) {
          this.setState({ searchQuery: searchEvent.searchQuery });
          const searchQuery = searchEvent.searchQuery.toLowerCase();
          const { doctors_rcpa } = this.props.myPerformanceRcpa;
          const { doctors_not_rcpa } = this.props.myPerformanceRcpa;
          const doctors_rcpa_result = [];
          for (const value of doctors_rcpa) {
            if (value.doctor_name) {
              const itemName = value.doctor_name.toLowerCase();
              if (itemName.includes(searchQuery)) {
                doctors_rcpa_result.push(value);
              }
            }
          }
          const doctors_not_rcpa_result = [];
          for (const value of doctors_not_rcpa) {
            if (value.doctor_name) {
              const itemName = value.doctor_name.toLowerCase();
              if (itemName.includes(searchQuery)) {
                doctors_not_rcpa_result.push(value);
              }
            }
          }
          this.setState({
            doctors_rcpa: doctors_rcpa_result,
            doctors_not_rcpa: doctors_not_rcpa_result
          });
        }
      }
    }

    render() {
      const {
        doctors_rcpa, doctors_not_rcpa, loading
      } = this.props.myPerformanceRcpa;
      const searchText = this.searchText.bind(this);

      return (
        <Container>
          <RcpaComponent
            doctors_rcpa={this.state.searchQuery ? this.state.doctors_rcpa : doctors_rcpa}
            doctors_not_rcpa={this.state.searchQuery ? this.state.doctors_not_rcpa : doctors_not_rcpa}
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
  myPerformanceRcpa: state.myPerformanceRcpa
});

export default connect(
  mapStateToProps,
  { loadMyPerformanceRcpa }
)(MyPerformanceRcpaContainer);
