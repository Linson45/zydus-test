import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import { loadMyPerformanceRbmPcpm } from '../../../actions';
import RbmPcpmComponent from '../../../components/my_performance/RbmPcpmComponent';
import { Role } from '../../../util/Constants';

class MyPerformanceRbmPcpmContainer extends Component {
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
      const {
        rep_code, user_type, company_code, sbu_code, zone_code, region_code
      } = this.props.navigation.state.params.user;
      const {
        period, month, year, region, zone
      } = this.props.navigation.state.params;

      const data = {
        user_id: rep_code,
        group_code: user_type,
        period,
        month,
        year,
        company_code,
        sbu_code,
        zone_code,
        region_code,
        type: Role.RBM
      };

      if (region) data.region_code = region.id;
      if (zone) data.zone_code = zone.id;

      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceRbmPcpm(data);
            }
          });
        });
    }

    onRefresh = () => {
      const {
        rep_code, user_type, company_code, sbu_code, zone_code, region_code
      } = this.props.navigation.state.params.user;
      const {
        period, month, year, region, zone
      } = this.props.navigation.state.params;

      const data = {
        user_id: rep_code,
        group_code: user_type,
        period,
        month,
        year,
        company_code,
        sbu_code,
        zone_code,
        region_code,
        type: Role.RBM
      };

      if (region) data.region_code = region.id;
      if (zone) data.zone_code = zone.id;

      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceRbmPcpm(data);
            }
          });
        });
    }

    goToAbmPcpmSales(index) {
      const area = this.props.myPerformanceRbmPcpm.data[index];
      const {
        user, month, year, period, date_range, region, zone
      } = this.props.navigation.state.params;
      this.props.navigation.navigate('MyPerformanceAbmPcpm', {
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
      const { data, loading } = this.props.myPerformanceRbmPcpm;
      const { date_range } = this.props.navigation.state.params;
      const goToAbmPcpmSales = this.goToAbmPcpmSales.bind(this);

      return (
        <Container>
          <RbmPcpmComponent
            data={data}
            loading={loading}
            date_range={date_range}
            onItemPress={goToAbmPcpmSales}
            connected={this.state.isInternetConnected}
            onRefresh={() => this.onRefresh()}
          />

        </Container>
      );
    }
}

const mapStateToProps = (state) => ({
  myPerformanceRbmPcpm: state.myPerformanceRbmPcpm
});

export default connect(
  mapStateToProps,
  { loadMyPerformanceRbmPcpm }
)(MyPerformanceRbmPcpmContainer);
