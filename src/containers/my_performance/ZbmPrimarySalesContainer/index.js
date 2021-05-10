import React, { Component } from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadMyPerformanceZbmBrandWiseSales, loadMyPerformanceZbmRegionWiseSales } from '../../../actions';
import { Role } from '../../../util/Constants';
import ZbmPrimarySalesComponent from '../../../components/my_performance/ZbmPrimarySalesComponent';

class MyPerformanceZbmPrimarySalesContainer extends Component {
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
      const {
        rep_code, user_type, company_code, sbu_code, zone_code
      } = this.props.navigation.state.params.user;
      const {
        period, month, year, zone
      } = this.props.navigation.state.params;

      const data = {
        user_id: rep_code,
        group_code: user_type,
        sales_type: 'pri',
        company_code,
        sbu_code,
        zone_code,
        type: Role.ZBM,
        period,
        month,
        year
      };
      if (zone) data.zone_code = zone.id;

      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceZbmRegionWiseSales(data);
              this.props.loadMyPerformanceZbmBrandWiseSales(data);
            }
          });
        });
    }

    onRefresh = () => {
      const {
        rep_code, user_type, company_code, sbu_code, zone_code
      } = this.props.navigation.state.params.user;
      const {
        period, month, year, zone
      } = this.props.navigation.state.params;

      const data = {
        user_id: rep_code,
        group_code: user_type,
        sales_type: 'pri',
        company_code,
        sbu_code,
        zone_code,
        type: Role.ZBM,
        period,
        month,
        year
      };
      if (zone) data.zone_code = zone.id;

      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceZbmRegionWiseSales(data);
              this.props.loadMyPerformanceZbmBrandWiseSales(data);
            }
          });
        });
    }

    goToBrandDetails(index) {
      const {
        user, month, year, period, date_range
      } = this.props.navigation.state.params;
      const brand = this.props.myPerformanceZbmSales.zbmBrandWiseSales[index];
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
        user, month, year, period, date_range, zone
      } = this.props.navigation.state.params;
      const region = this.props.myPerformanceZbmSales.zbmRegionWiseSales[index];
      this.props.navigation.navigate('MyPerformanceRbmPrimarySales', {
        user,
        month,
        year,
        period,
        date_range,
        region,
        zone
      });
    }

    render() {
      const {
        zbmRegionWiseSales, zbmRegionWiseSalesLoading, zbmBrandWiseSales, zbmBrandWiseSalesLoading
      } = this.props.myPerformanceZbmSales;
      const loading = zbmRegionWiseSalesLoading || zbmBrandWiseSalesLoading;
      const { date_range } = this.props.navigation.state.params;
      const goToBrandDetails = this.goToBrandDetails.bind(this);
      const goToRegionWiseDetails = this.goToRegionWiseDetails.bind(this);

      return (
        <ZbmPrimarySalesComponent
          loading={loading}
          regionWiseSales={zbmRegionWiseSales}
          brandWiseSales={zbmBrandWiseSales}
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
  myPerformanceZbmSales: state.myPerformanceZbmSales
});

export default connect(
  mapStateToProps,
  { loadMyPerformanceZbmRegionWiseSales, loadMyPerformanceZbmBrandWiseSales }
)(MyPerformanceZbmPrimarySalesContainer);
