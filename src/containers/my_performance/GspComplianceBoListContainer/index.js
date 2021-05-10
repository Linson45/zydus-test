import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import { loadMyPerformanceGspComplianceBos } from '../../../actions';
import GspComplianceBoListComponent from '../../../components/my_performance/GspComplianceBoListComponent';

class MyPerformanceGspComplianceBoListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'Multi-Visit & GSP Compliance'
    };

    async componentDidMount() {
      const { rep_code, user_type } = this.props.navigation.state.params.user;
      const { period, month, year } = this.props.navigation.state.params;

      const data = {
        user_id: rep_code,
        group_code: user_type,
        period,
        month,
        year,
        type: 'MVC'
      };
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceGspComplianceBos(data);
            }
          });
        });
    }

    goToBoGspCompliance(index) {
      const user = this.props.myPerformanceGspComplianceBos.data[index];
      user.user_type = 'BO';
      const { month, year, period } = this.props.navigation.state.params;
      this.props.navigation.navigate('MyPerformanceGspCompliance', {
        user, month, year, period
      });
    }

    render() {
      const { data, loading } = this.props.myPerformanceGspComplianceBos;
      const { date_range } = this.props.navigation.state.params;
      const goToBoGspCompliance = this.goToBoGspCompliance.bind(this);

      return (
        <Container>
          <GspComplianceBoListComponent
            data={data}
            loading={loading}
            date_range={date_range}
            onItemPress={goToBoGspCompliance}
            connected={this.state.isInternetConnected}
            onRefresh={() => this.onRefresh()}
          />
        </Container>
      );
    }
}

const mapStateToProps = (state) => ({
  myPerformanceGspComplianceBos: state.myPerformanceGspComplianceBos
});

export default connect(
  mapStateToProps,
  { loadMyPerformanceGspComplianceBos }
)(MyPerformanceGspComplianceBoListContainer);
