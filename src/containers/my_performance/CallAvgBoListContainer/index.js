import React, { Component } from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadMyPerformanceCallAvgBos } from '../../../actions';
import CallAvgBoListComponent from '../../../components/my_performance/CallAvgBoListComponent';

class MyPerformanceCallAvgBoListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'Call Average'
    };

    async componentDidMount() {
      const { rep_code, user_type } = this.props.navigation.state.params.user;
      const {
        period, month, year
      } = this.props.navigation.state.params;

      const data = {
        user_id: rep_code,
        group_code: user_type,
        period,
        month,
        year,
        type: 'CA'
      };
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceCallAvgBos(data);
            }
          });
        });
    }

    onRefresh = () => {
      const { rep_code, user_type } = this.props.navigation.state.params.user;
      const {
        period, month, year
      } = this.props.navigation.state.params;

      const data = {
        user_id: rep_code,
        group_code: user_type,
        period,
        month,
        year,
        type: 'CA'
      };
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceCallAvgBos(data);
            }
          });
        });
    }

    render() {
      const { data, loading } = this.props.myPerformanceCallAvgBos;
      const { date_range } = this.props.navigation.state.params;

      return (
        <CallAvgBoListComponent
          loading={loading}
          data={data}
          date_range={date_range}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  myPerformanceCallAvgBos: state.myPerformanceCallAvgBos
});

export default connect(
  mapStateToProps,
  { loadMyPerformanceCallAvgBos }
)(MyPerformanceCallAvgBoListContainer);
