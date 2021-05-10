import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadRcpaHistory } from '../../../actions';
import HistoryComponent from '../../../components/rcpa/HistoryComponent';

class RcpaHistoryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'RCPA View',
    };

    async componentDidMount() {
      // this.loadData();
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.loadData();
            }
          });
        });
    }

    onRefresh = () => {
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.loadData();
            }
          });
        });
    }

    loadData() {
      const { user, doctor, chemist } = this.props.navigation.state.params;
      const { rep_code } = user;
      const { doc_code } = doctor;
      const { chemist_code } = chemist;

      const data = {
        rep_code,
        doc_code,
        chem_code: chemist_code
      };
      this.props.loadRcpaHistory(data);
    }

    render() {
      const { data, loading } = this.props.rcpaHistory;
      const { doctor, chemist } = this.props.navigation.state.params;

      return (
        <HistoryComponent
          doctor={doctor}
          chemist={chemist}
          loading={loading}
          data={data}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  rcpaHistory: state.rcpaHistory
});

export default connect(
  mapStateToProps,
  { loadRcpaHistory }
)(RcpaHistoryContainer);
