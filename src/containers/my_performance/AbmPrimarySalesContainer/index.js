import React, { Component } from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadMyPerformanceAbmBrandWiseSales, loadMyPerformanceAbmHqWiseSales } from '../../../actions';
import AbmPrimarySalesComponent from '../../../components/my_performance/AbmPrimarySalesComponent';
import { Role } from '../../../util/Constants';

class MyPerformanceAbmPrimarySalesContainer extends Component {
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
        rep_code, user_type, company_code, sbu_code, zone_code, region_code, area_code
      } = this.props.navigation.state.params.user;
      const {
        period, month, year, area, region, zone
      } = this.props.navigation.state.params;

      const data = {
        user_id: rep_code,
        group_code: user_type,
        sales_type: 'pri',
        company_code,
        sbu_code,
        zone_code,
        region_code,
        area_code,
        type: Role.ABM,
        period,
        month,
        year
      };
      if (region) data.region_code = region.id;
      if (area) data.area_code = area.id;
      if (zone) data.zone_code = zone.id;

      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceAbmHqWiseSales(data);
              this.props.loadMyPerformanceAbmBrandWiseSales(data);
            }
          });
        });
    }

    onRefresh = () => {
      const {
        rep_code, user_type, company_code, sbu_code, zone_code, region_code, area_code
      } = this.props.navigation.state.params.user;
      const {
        period, month, year, area, region, zone
      } = this.props.navigation.state.params;

      const data = {
        user_id: rep_code,
        group_code: user_type,
        sales_type: 'pri',
        company_code,
        sbu_code,
        zone_code,
        region_code,
        area_code,
        type: Role.ABM,
        period,
        month,
        year
      };
      if (region) data.region_code = region.id;
      if (area) data.area_code = area.id;
      if (zone) data.zone_code = zone.id;

      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceAbmHqWiseSales(data);
              this.props.loadMyPerformanceAbmBrandWiseSales(data);
            }
          });
        });
    }

    goToBrandDetails(index) {
      const {
        user, month, year, period, date_range
      } = this.props.navigation.state.params;
      const brand = this.props.myPerformanceAbmSales.abmBrandWiseSales[index];
      this.props.navigation.navigate('MyPerformanceSkuWisePrimarySales', {
        user,
        month,
        year,
        period,
        brand,
        date_range
      });
    }

    goToHqWiseDetails(index) {
      const {
        user, month, year, period, date_range, area, region, zone
      } = this.props.navigation.state.params;
      const hq = this.props.myPerformanceAbmSales.abmHqWiseSales[index];
      this.props.navigation.navigate('MyPerformanceBrandWisePrimarySales', {
        user,
        month,
        year,
        period,
        date_range,
        area,
        hq,
        region,
        zone
      });
    }

    render() {
      const {
        abmHqWiseSales, abmHqWiseSalesLoading, abmBrandWiseSales, abmBrandWiseSalesLoading
      } = this.props.myPerformanceAbmSales;
      const loading = abmHqWiseSalesLoading || abmBrandWiseSalesLoading;
      const { date_range } = this.props.navigation.state.params;
      const goToBrandDetails = this.goToBrandDetails.bind(this);
      const goToHqWiseDetails = this.goToHqWiseDetails.bind(this);

      return (
        <AbmPrimarySalesComponent
          loading={loading}
          hqWiseSales={abmHqWiseSales}
          brandWiseSales={abmBrandWiseSales}
          date_range={date_range}
          onBrandItemPress={goToBrandDetails}
          onHqItemPress={goToHqWiseDetails}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  myPerformanceAbmSales: state.myPerformanceAbmSales
});

export default connect(
  mapStateToProps,
  { loadMyPerformanceAbmHqWiseSales, loadMyPerformanceAbmBrandWiseSales }
)(MyPerformanceAbmPrimarySalesContainer);
