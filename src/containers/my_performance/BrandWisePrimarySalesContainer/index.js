import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import { loadMyPerformanceBrandWiseSales } from '../../../actions';
import BrandWisePrimarySalesComponent from '../../../components/my_performance/BrandWisePrimarySalesComponent';

class MyPerformanceBrandWisePrimarySalesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brandWiseSalesList: [],
      searchQuery: null
    };
  }

    static navigationOptions = {
      title: 'Brand Wise Primary Sales',
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
        sales_type: 'pri'
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
        sales_type: 'pri'
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

    searchText(searchEvent) {
      if (searchEvent != null) {
        if (searchEvent.searchQuery != null) {
          this.setState({ searchQuery: searchEvent.searchQuery });
          const searchQuery = searchEvent.searchQuery.toLowerCase();
          const { data } = this.props.myPerformanceBrandWiseSales;
          const searchResults = [];
          for (let index = 0; index < data.length; index++) {
            const itemName = data[index].title.toLowerCase();
            if (itemName.includes(searchQuery)) {
              searchResults.push(data[index]);
            }
          }
          this.setState({
            brandWiseSalesList: searchResults
          });
        }
      }
    }

    goToSkuWiseSales(index) {
      const {
        user, month, year, period, date_range, hq, area, region, zone
      } = this.props.navigation.state.params;
      const brand = this.props.myPerformanceBrandWiseSales.data[index];
      this.props.navigation.navigate('MyPerformanceSkuWisePrimarySales', {
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
      const searchText = this.searchText.bind(this);

      return (
        <Container>
          <BrandWisePrimarySalesComponent
            data={this.state.brandWiseSalesList && this.state.searchQuery ? this.state.brandWiseSalesList : data}
            loading={loading}
            date_range={date_range}
            onItemPress={goToSkuWiseSales}
            _onChangeSearchText={searchText}
            connected={this.state.isInternetConnected}
            onRefresh={() => this.onRefresh()}
          />
        </Container>
      );
    }
}

const mapStateToProps = (state) => ({
  myPerformanceBrandWiseSales: state.myPerformanceBrandWiseSales,
});

export default connect(
  mapStateToProps,
  { loadMyPerformanceBrandWiseSales }
)(MyPerformanceBrandWisePrimarySalesContainer);
