import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import { loadMyPerformanceZbmPcpm } from '../../../actions';
import { Role } from '../../../util/Constants';
import ZbmPcpmComponent from '../../../components/my_performance/ZbmPcpmComponent';

class MyPerformanceZbmPcpmContainer extends Component {
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
        rep_code, user_type, company_code, sbu_code, zone_code
      } = this.props.navigation.state.params.user;
      const {
        period, month, year, zone
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
        type: Role.ZBM
      };

      if (zone) data.zone_code = zone.id;

      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceZbmPcpm(data);
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
        period,
        month,
        year,
        company_code,
        sbu_code,
        zone_code,
        type: Role.ZBM
      };

      if (zone) data.zone_code = zone.id;

      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceZbmPcpm(data);
            }
          });
        });
    }

    goToRbmPcpmSales(index) {
      const region = this.props.myPerformanceZbmPcpm.data[index];
      const {
        user, month, year, period, date_range, zone
      } = this.props.navigation.state.params;
      this.props.navigation.navigate('MyPerformanceRbmPcpm', {
        user, month, year, period, date_range, region, zone
      });
    }

    render() {
      const { data, loading } = this.props.myPerformanceZbmPcpm;
      const { date_range } = this.props.navigation.state.params;
      const goToRbmPcpmSales = this.goToRbmPcpmSales.bind(this);

      return (
        <Container>
          <ZbmPcpmComponent
            data={data}
            loading={loading}
            date_range={date_range}
            onItemPress={goToRbmPcpmSales}
            connected={this.state.isInternetConnected}
            onRefresh={() => this.onRefresh()}
          />

        </Container>
      );
    }
}

const mapStateToProps = (state) => ({
  myPerformanceZbmPcpm: state.myPerformanceZbmPcpm
});

export default connect(
  mapStateToProps,
  { loadMyPerformanceZbmPcpm }
)(MyPerformanceZbmPcpmContainer);
