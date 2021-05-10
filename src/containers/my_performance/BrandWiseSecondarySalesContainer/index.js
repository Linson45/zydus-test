import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import { loadMyPerformanceBrandWiseSales } from '../../../actions';
import BrandWiseSecondarySalesComponent from '../../../components/my_performance/BrandWiseSecondarySalesComponent';

class MyPerformanceBrandWiseSecondarySalesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'Brand Wise Secondary Sales',
    };

    async componentDidMount() {
      const {
        rep_code, user_type, sbu_code, zone_code, region_code, area_code, hq_code
      } = this.props.navigation.state.params.user;
      const {
        period, month, year, hq, area, region, zone
      } = this.props.navigation.state.params;

      let data = {
        user_id: rep_code,
        group_code: user_type,
        period,
        month,
        year,
        sales_type: 'sec'
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
              this.props.loadMyPerformanceBrandWiseSales(data);
            }
          });
        });
    }

    onRefresh = () => {
      const {
        rep_code, user_type, sbu_code, zone_code, region_code, area_code, hq_code
      } = this.props.navigation.state.params.user;
      const {
        period, month, year, hq, area, region, zone
      } = this.props.navigation.state.params;

      let data = {
        user_id: rep_code,
        group_code: user_type,
        period,
        month,
        year,
        sales_type: 'sec'
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
              this.props.loadMyPerformanceBrandWiseSales(data);
            }
          });
        });
    }

    goToSkuWiseSales(index) {
      const {
        user, month, year, period, date_range, hq, area, region, zone
      } = this.props.navigation.state.params;
      const brand = this.props.myPerformanceBrandWiseSales.data[index];
      this.props.navigation.navigate('MyPerformanceSkuWiseSecondarySales', {
        user,
        month,
        year,
        period,
        brand,
        date_range,
        hq,
        area,
        region,
        zone
      });
    }

    render() {
      const { data, loading } = this.props.myPerformanceBrandWiseSales;
      const { date_range } = this.props.navigation.state.params;
      const goToSkuWiseSales = this.goToSkuWiseSales.bind(this);

      return (
        <Container>
          <BrandWiseSecondarySalesComponent
            data={data}
            loading={loading}
            date_range={date_range}
            onItemPress={goToSkuWiseSales}
            connected={this.state.isInternetConnected}
            onRefresh={() => this.onRefresh()}
          />

        </Container>
      );
    }
}

const mapStateToProps = (state) => ({
  myPerformanceBrandWiseSales: state.myPerformanceBrandWiseSales
});

export default connect(
  mapStateToProps,
  { loadMyPerformanceBrandWiseSales }
)(MyPerformanceBrandWiseSecondarySalesContainer);
