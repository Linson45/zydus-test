import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'native-base';
import NetInfo from '@react-native-community/netinfo';
import { loadMyPerformanceJfwBos } from '../../../actions';
import JfwBoListComponent from '../../../components/my_performance/JfwBoListComponent';

class MyPerformanceJfwBoListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'No of JFW Days',
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
        type: 'JFW'
      };
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadMyPerformanceJfwBos(data);
            }
          });
        });
    }

    render() {
      const { data, loading } = this.props.myPerformanceJfwBos;
      const { date_range } = this.props.navigation.state.params;

      return (
        <Container>
          <JfwBoListComponent
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
  myPerformanceJfwBos: state.myPerformanceJfwBos
});

export default connect(
  mapStateToProps,
  { loadMyPerformanceJfwBos }
)(MyPerformanceJfwBoListContainer);
