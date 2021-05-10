import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import { loadMyPerformanceRcpaBos } from '../../../actions';
import RcpaBoListComponent from '../../../components/my_performance/RcpaBoListComponent';

class MyPerformanceRcpaBoListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'Avg & Docs RCPAed'
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
        type: 'RCPA'
      };

      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceRcpaBos(data);
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
        type: 'RCPA'
      };

      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceRcpaBos(data);
            }
          });
        });
    }

    goToBoGspCompliance(index) {
      const user = this.props.myPerformanceRcpaBos.data[index];
      user.user_type = 'BO';
      const { month, year, period } = this.props.navigation.state.params;
      this.props.navigation.navigate('MyPerformanceRcpa', {
        user, month, year, period
      });
    }

    render() {
      const { data, loading } = this.props.myPerformanceRcpaBos;
      const { date_range } = this.props.navigation.state.params;
      const goToBoGspCompliance = this.goToBoGspCompliance.bind(this);

      return (
        <Container>
          <RcpaBoListComponent
            data={data}
            loading={loading}
            date_range={date_range}
            onItemPress={goToBoGspCompliance}
            connected={this.state.isInternetConnected}
            onRefresh={() => this.onRefresh()}
          />
        </Container>
      );
    }
}

const mapStateToProps = (state) => ({
  myPerformanceRcpaBos: state.myPerformanceRcpaBos
});

export default connect(
  mapStateToProps,
  { loadMyPerformanceRcpaBos }
)(MyPerformanceRcpaBoListContainer);
