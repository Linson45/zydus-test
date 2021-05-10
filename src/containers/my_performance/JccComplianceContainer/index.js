import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import { loadMyPerformanceJccCompliance } from '../../../actions';
import JccComplianceComponent from '../../../components/my_performance/JccComplianceComponent';

class MyPerformanceJccComplianceContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'JCC Compliance',
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
        type: 'JCC'
      };
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceJccCompliance(data);
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
        type: 'JCC'
      };
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceJccCompliance(data);
            }
          });
        });
    }

    render() {
      const { data, loading } = this.props.myPerformanceJccCompliance;
      const { date_range } = this.props.navigation.state.params;

      return (
        <Container>
          <JccComplianceComponent
            data={data}
            loading={loading}
            date_range={date_range}
            connected={this.state.isInternetConnected}
            onRefresh={() => this.onRefresh()}
          />

        </Container>
      );
    }
}

const mapStateToProps = (state) => ({
  myPerformanceJccCompliance: state.myPerformanceJccCompliance
});

export default connect(
  mapStateToProps,
  { loadMyPerformanceJccCompliance }
)(MyPerformanceJccComplianceContainer);
