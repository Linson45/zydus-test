import React, { Component } from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadMyPerformanceRbmAreaWiseSales, loadMyPerformanceRbmBrandWiseSales } from '../../../actions';
import RbmSecondarySalesComponent from '../../../components/my_performance/RbmSecondarySalesComponent';
import { Role } from '../../../util/Constants';

class MyPerformanceRbmSecondarySalesContainer extends Component {
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
      const {
        rep_code, user_type, company_code, sbu_code, zone_code, region_code
      } = this.props.navigation.state.params.user;
      const {
        period, month, year, region, zone
      } = this.props.navigation.state.params;

      const data = {
        user_id: rep_code,
        group_code: user_type,
        sales_type: 'sec',
        company_code,
        sbu_code,
        zone_code,
        region_code,
        type: Role.RBM,
        period,
        month,
        year
      };
      if (region) data.region_code = region.id;
      if (zone) data.zone_code = zone.id;

      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceRbmAreaWiseSales(data);
              this.props.loadMyPerformanceRbmBrandWiseSales(data);
            }
          });
        });
    }

    goToBrandDetails(index) {
      const {
        user, month, year, period, date_range
      } = this.props.navigation.state.params;
      const brand = this.props.myPerformanceRbmSales.rbmBrandWiseSales[index];
      this.props.navigation.navigate('MyPerformanceSkuWiseSecondarySales', {
        user,
        month,
        year,
        period,
        brand,
        date_range
      });
    }

    goToAreaWiseDetails(index) {
      const {
        user, month, year, period, date_range, region, zone
      } = this.props.navigation.state.params;
      const area = this.props.myPerformanceRbmSales.rbmAreWiseSales[index];
      this.props.navigation.navigate('MyPerformanceAbmSecondarySales', {
        user,
        month,
        year,
        period,
        date_range,
        area,
        region,
        zone
      });
    }

    render() {
      const {
        rbmAreWiseSales, rbmAreWiseSalesLoading, rbmBrandWiseSales, rbmBrandWiseSalesLoading
      } = this.props.myPerformanceRbmSales;
      const loading = rbmAreWiseSalesLoading || rbmBrandWiseSalesLoading;
      const { date_range } = this.props.navigation.state.params;
      const goToBrandDetails = this.goToBrandDetails.bind(this);
      const goToAreaWiseDetails = this.goToAreaWiseDetails.bind(this);

      return (
        <RbmSecondarySalesComponent
          loading={loading}
          areaWiseSales={rbmAreWiseSales}
          brandWiseSales={rbmBrandWiseSales}
          date_range={date_range}
          onBrandItemPress={goToBrandDetails}
          onAreaItemPress={goToAreaWiseDetails}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  myPerformanceRbmSales: state.myPerformanceRbmSales
});

export default connect(
  mapStateToProps,
  { loadMyPerformanceRbmAreaWiseSales, loadMyPerformanceRbmBrandWiseSales }
)(MyPerformanceRbmSecondarySalesContainer);
