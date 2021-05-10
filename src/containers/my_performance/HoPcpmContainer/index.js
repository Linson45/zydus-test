import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import { loadMyPerformanceHoPcpm } from '../../../actions';
import HoPcpmComponent from '../../../components/my_performance/HoPcpmComponent';

class MyPerformanceHoPcpmContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'PCPM Sales',
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
              this.props.loadMyPerformanceHoPcpm(data);
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
              this.props.loadMyPerformanceHoPcpm(data);
            }
          });
        });
    }

    goToSubHoPcpmSales(index) {
      const division = this.props.myPerformanceHoPcpm.data[index];
      const {
        user, month, year, period, date_range
      } = this.props.navigation.state.params;
      this.props.navigation.navigate('MyPerformanceSubHoPcpm', {
        user, month, year, period, date_range, division
      });
    }

    render() {
      const { data, loading } = this.props.myPerformanceHoPcpm;
      const { date_range } = this.props.navigation.state.params;
      const goToSubHoPcpmSales = this.goToSubHoPcpmSales.bind(this);

      return (
        <Container>
          <HoPcpmComponent
            data={data}
            loading={loading}
            date_range={date_range}
            onItemPress={goToSubHoPcpmSales}
            connected={this.state.isInternetConnected}
            onRefresh={() => this.onRefresh()}
          />

        </Container>
      );
    }
}

const mapStateToProps = (state) => ({
  myPerformanceHoPcpm: state.myPerformanceHoPcpm
});

export default connect(
  mapStateToProps,
  { loadMyPerformanceHoPcpm }
)(MyPerformanceHoPcpmContainer);
