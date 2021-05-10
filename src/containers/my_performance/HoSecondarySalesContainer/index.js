import React, { Component } from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadMyPerformanceHoDivisionWiseSales } from '../../../actions';
import HoSecondarySalesComponent from '../../../components/my_performance/HoSecondarySalesComponent';

class MyPerformanceHoSecondarySalesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'Secondary Sales',
    };

    async componentDidMount() {
      const { rep_code, user_type } = this.props.navigation.state.params.user;
      const { period, month, year } = this.props.navigation.state.params;

      const data = {
        user_id: rep_code,
        group_code: user_type,
        sales_type: 'sec',
        period,
        month,
        year
      };
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceHoDivisionWiseSales(data);
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
        sales_type: 'sec',
        period,
        month,
        year
      };
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceHoDivisionWiseSales(data);
            }
          });
        });
    }

    goToDivisionWiseDetails(index) {
      const division = this.props.myPerformanceHoSales.hoDivisionWiseSales[index];
      const {
        user, month, year, period, date_range
      } = this.props.navigation.state.params;
      this.props.navigation.navigate('MyPerformanceSubHoSecondarySales', {
        user,
        month,
        year,
        period,
        date_range,
        division
      });
    }

    render() {
      const { hoDivisionWiseSales, hoDivisionWiseSalesLoading } = this.props.myPerformanceHoSales;
      const loading = hoDivisionWiseSalesLoading;
      const { date_range } = this.props.navigation.state.params;
      const goToDivisionWiseDetails = this.goToDivisionWiseDetails.bind(this);

      return (
        <HoSecondarySalesComponent
          loading={loading}
          hoDivisionWiseSales={hoDivisionWiseSales}
          date_range={date_range}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
          divisionItemPress={goToDivisionWiseDetails}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  myPerformanceHoSales: state.myPerformanceHoSales
});

export default connect(
  mapStateToProps,
  { loadMyPerformanceHoDivisionWiseSales }
)(MyPerformanceHoSecondarySalesContainer);
