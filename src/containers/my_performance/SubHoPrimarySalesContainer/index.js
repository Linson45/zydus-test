import React, { Component } from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadMyPerformanceSubHoBrandWiseSales, loadMyPerformanceSubHoZoneWiseSales } from '../../../actions';
import SubHoPrimarySalesComponent from '../../../components/my_performance/SubHoPrimarySalesComponent';

class MyPerformanceSubHoPrimarySalesContainer extends Component {
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
      const {
        period, month, year, division
      } = this.props.navigation.state.params;
      const { company_code, id } = division;

      const data = {
        user_id: rep_code,
        group_code: user_type,
        sales_type: 'pri',
        company_code,
        period,
        month,
        year,
        sbu_code: id
      };

      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceSubHoZoneWiseSales(data);
              this.props.loadMyPerformanceSubHoBrandWiseSales(data);
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
        sales_type: 'pri',
        company_code,
        period,
        month,
        year,
        sbu_code: id
      };

      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceSubHoZoneWiseSales(data);
              this.props.loadMyPerformanceSubHoBrandWiseSales(data);
            }
          });
        });
    }

    goToBrandDetails(index) {
      const {
        user, month, year, period, date_range
      } = this.props.navigation.state.params;
      const brand = this.props.myPerformanceSubHoSales.subHoBrandWiseSales[index];
      this.props.navigation.navigate('MyPerformanceSkuWisePrimarySales', {
        user,
        month,
        year,
        period,
        brand,
        date_range
      });
    }

    goToRegionWiseDetails(index) {
      const {
        user, month, year, period, date_range
      } = this.props.navigation.state.params;
      const zone = this.props.myPerformanceSubHoSales.subHoZoneWiseSales[index];
      this.props.navigation.navigate('MyPerformanceZbmPrimarySales', {
        user, month, year, period, date_range, zone
      });
    }

    render() {
      const {
        subHoZoneWiseSales, subHoZoneWiseSalesLoading, subHoBrandWiseSales, subHoBrandWiseSalesLoading
      } = this.props.myPerformanceSubHoSales;
      const loading = subHoZoneWiseSalesLoading || subHoBrandWiseSalesLoading;
      const { date_range } = this.props.navigation.state.params;
      const goToBrandDetails = this.goToBrandDetails.bind(this);
      const goToRegionWiseDetails = this.goToRegionWiseDetails.bind(this);

      return (
        <SubHoPrimarySalesComponent
          loading={loading}
          subHoZoneWiseSales={subHoZoneWiseSales}
          brandWiseSales={subHoBrandWiseSales}
          date_range={date_range}
          onBrandItemPress={goToBrandDetails}
          onRegionItemPress={goToRegionWiseDetails}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  myPerformanceSubHoSales: state.myPerformanceSubHoSales
});

export default connect(
  mapStateToProps,
  { loadMyPerformanceSubHoZoneWiseSales, loadMyPerformanceSubHoBrandWiseSales }
)(MyPerformanceSubHoPrimarySalesContainer);
