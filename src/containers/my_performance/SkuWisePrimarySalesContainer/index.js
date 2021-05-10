import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import { loadMyPerformanceSkuWiseSales } from '../../../actions';
import SkuWisePrimarySalesConmponent from '../../../components/my_performance/SkuWisePrimarySalesConmponent';

class MyPerformanceSkuWisePrimarySalesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'SKU Wise Primary Sales',
    };

    async componentDidMount() {
      const {
        rep_code, user_type, sbu_code, zone_code, region_code, area_code, hq_code
      } = this.props.navigation.state.params.user;
      const {
        period, month, year, brand, hq, area, region, zone
      } = this.props.navigation.state.params;

      let data = {
        user_id: rep_code,
        group_code: user_type,
        period,
        month,
        year,
        sales_type: 'pri',
        prod_code: brand.id
      };
      if (hq || area || region || zone) {
        data = {
          ...data, sbu_code, zone_code, region_code, area_code, hq_code
        };
      }
      if (hq) data.hq_code = hq.id;
      if (area) data.area_code = area.id;
      if (region) data.region_code = region.id;
      if (zone) data.zone_code = zone.id;

      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceSkuWiseSales(data);
            }
          });
        });
    }

    onRefresh = () => {
      const {
        rep_code, user_type, sbu_code, zone_code, region_code, area_code, hq_code
      } = this.props.navigation.state.params.user;
      const {
        period, month, year, brand, hq, area, region, zone
      } = this.props.navigation.state.params;

      let data = {
        user_id: rep_code,
        group_code: user_type,
        period,
        month,
        year,
        sales_type: 'pri',
        prod_code: brand.id
      };
      if (hq || area || region || zone) {
        data = {
          ...data, sbu_code, zone_code, region_code, area_code, hq_code
        };
      }
      if (hq) data.hq_code = hq.id;
      if (area) data.area_code = area.id;
      if (region) data.region_code = region.id;
      if (zone) data.zone_code = zone.id;

      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceSkuWiseSales(data);
            }
          });
        });
    }

    render() {
      const { data, loading } = this.props.myPerformanceSkuWiseSales;
      const { date_range } = this.props.navigation.state.params;

      return (
        <Container>
          <SkuWisePrimarySalesConmponent
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
  myPerformanceSkuWiseSales: state.myPerformanceSkuWiseSales
});

export default connect(
  mapStateToProps,
  { loadMyPerformanceSkuWiseSales }
)(MyPerformanceSkuWisePrimarySalesContainer);
