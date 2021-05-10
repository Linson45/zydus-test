import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import { loadMyPerformanceAbmPcpm } from '../../../actions';
import AbmPcpmComponent from '../../../components/my_performance/AbmPcpmComponent';
import { Role } from '../../../util/Constants';

class MyPerformanceAbmPcpmContainer extends Component {
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
        rep_code, user_type, company_code, sbu_code, zone_code, region_code, area_code
      } = this.props.navigation.state.params.user;
      const {
        period, month, year, area, region, zone
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
        area_code,
        type: Role.ABM
      };
      if (area) data.area_code = area.id;
      if (region) data.region_code = region.id;
      if (zone) data.zone_code = zone.id;

      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceAbmPcpm(data);
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
        period,
        month,
        year,
        company_code,
        sbu_code,
        zone_code,
        region_code,
        area_code,
        type: Role.ABM
      };
      if (area) data.area_code = area.id;
      if (region) data.region_code = region.id;
      if (zone) data.zone_code = zone.id;

      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceAbmPcpm(data);
            }
          });
        });
    }

    render() {
      const { data, loading } = this.props.myPerformanceAbmPcpm;
      const { date_range } = this.props.navigation.state.params;

      return (
        <Container>
          <AbmPcpmComponent
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
  myPerformanceAbmPcpm: state.myPerformanceAbmPcpm
});

export default connect(
  mapStateToProps,
  { loadMyPerformanceAbmPcpm }
)(MyPerformanceAbmPcpmContainer);
