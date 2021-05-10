import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import { loadMyPerformanceSubHoPcpm } from '../../../actions';
import SubHoPcpmComponent from '../../../components/my_performance/SubHoPcpmComponent';

class MyPerformanceSubHoPcpmContainer extends Component {
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
      const {
        period, month, year, division
      } = this.props.navigation.state.params;
      const { company_code, id } = division;

      const data = {
        user_id: rep_code,
        group_code: user_type,
        period,
        month,
        year,
        company_code,
        sbu_code: id
      };

      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceSubHoPcpm(data);
            }
          });
        });
    }

    onRefresh = () => {
      const { rep_code, user_type } = this.props.navigation.state.params.user;
      const {
        period, month, year, division
      } = this.props.navigation.state.params;
      const { company_code, id } = division;

      const data = {
        user_id: rep_code,
        group_code: user_type,
        period,
        month,
        year,
        company_code,
        sbu_code: id
      };

      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceSubHoPcpm(data);
            }
          });
        });
    }

    goToRbmPcpmSales(index) {
      const zone = this.props.myPerformanceSubHoPcpm.data[index];
      const {
        user, month, year, period, date_range, division
      } = this.props.navigation.state.params;
      user.company_code = division.company_code;
      user.sbu_code = division.id;
      this.props.navigation.navigate('MyPerformanceZbmPcpm', {
        user, month, year, period, date_range, zone
      });
    }

    render() {
      const { data, loading } = this.props.myPerformanceSubHoPcpm;
      const { date_range } = this.props.navigation.state.params;
      const goToRbmPcpmSales = this.goToRbmPcpmSales.bind(this);

      return (
        <Container>
          <SubHoPcpmComponent
            data={data}
            loading={loading}
            date_range={date_range}
            onItemPress={goToRbmPcpmSales}
            connected={this.state.isInternetConnected}
            onRefresh={() => this.onRefresh()}
          />

        </Container>
      );
    }
}

const mapStateToProps = (state) => ({
  myPerformanceSubHoPcpm: state.myPerformanceSubHoPcpm
});

export default connect(
  mapStateToProps,
  { loadMyPerformanceSubHoPcpm }
)(MyPerformanceSubHoPcpmContainer);
