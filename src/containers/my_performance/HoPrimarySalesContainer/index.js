import React, { Component } from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadMyPerformanceHoDivisionWiseSales } from '../../../actions';
import HoPrimarySalesComponent from '../../../components/my_performance/HoPrimarySalesComponent';

class MyPerformanceHoPrimarySalesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'Primary Sales',
    };

    async componentDidMount() {
      const { rep_code, user_type } = this.props.navigation.state.params.user;
      const { period, month, year } = this.props.navigation.state.params;

      const data = {
        user_id: rep_code,
        group_code: user_type,
        sales_type: 'pri',
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
        sales_type: 'pri',
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
      this.props.navigation.navigate('MyPerformanceSubHoPrimarySales', {
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
        <HoPrimarySalesComponent
          loading={loading}
          hoDivisionWiseSales={hoDivisionWiseSales}
          date_range={date_range}
          divisionItemPress={goToDivisionWiseDetails}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
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
)(MyPerformanceHoPrimarySalesContainer);
