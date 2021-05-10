import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadRcpaChemistList, loadRcpaLogs, resetProductList } from '../../../actions';
import ChemistSelectionComponent from '../../../components/rcpa/ChemistSelectionComponent';
import { getPendingRcpaLogs } from '../../../local-storage/helper/rcpa';
import Adapter from '../../../util/Adapter';

class RcpaChemistSelectionContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chemist: null,
      pending_logs: [],
      me: null,
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'Add / Edit RCPA',
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
      const me = await Adapter.getUser();
      this.setState({ me });
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

    async changeChemist(chemist) {
      this.setState({
        chemist
      });

      const { user, doctor } = this.props.navigation.state.params;
      const { rep_code } = user;
      const { doc_code } = doctor;
      const { chemist_code } = chemist;

      const data = {
        rep_code,
        doc_code,
        chemist_code
      };

      this.props.loadRcpaLogs(data);
      const pending_logs = await getPendingRcpaLogs(rep_code, chemist_code, doc_code);
      this.setState({ pending_logs });
    }

    addRcpa = (doctor) => {
      const { user } = this.props.navigation.state.params;
      const { chemist } = this.state;
      this.props.navigation.navigate('RcpaAddView', { user, chemist, doctor });
    };

    loadData() {
      const { user, doctor } = this.props.navigation.state.params;
      const { sbu_code } = user;
      const { doc_code } = doctor;

      const data = {
        sbu_code,
        doc_code
      };
      this.props.loadRcpaChemistList(data);
    }

    goToLogDetail(log) {
      const { chemist } = this.state;
      const { user, doctor } = this.props.navigation.state.params;

      this.props.navigation.navigate('RcpaLogDetail', {
        log, chemist, doctor, user
      });
    }

    goToHistory() {
      const { chemist } = this.state;
      const { user, doctor } = this.props.navigation.state.params;

      this.props.navigation.navigate('RcpaHistory', { chemist, doctor, user });
    }

    render() {
      const { rcpaLogs, rcpaChemistList } = this.props;
      const { loading, data } = rcpaChemistList;
      const { user, doctor } = this.props.navigation.state.params;

      const hoverLoading = rcpaLogs.loading;
      const logs = rcpaLogs.data;
      const changeChemist = this.changeChemist.bind(this);
      const { chemist, pending_logs, me } = this.state;
      const goToLogDetail = this.goToLogDetail.bind(this);
      const goToHistory = this.goToHistory.bind(this);

      return (
        <ChemistSelectionComponent
          loading={loading}
          connected={this.state.isInternetConnected}
          hoverLoading={hoverLoading}
          data={data}
          changeChemist={changeChemist}
          user={user}
          doctor={doctor}
          addRcpa={this.addRcpa}
          chemist={chemist}
          logs={logs}
          onPress={goToLogDetail}
          goToHistory={goToHistory}
          pendingLogs={pending_logs}
          me={me}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  rcpaChemistList: state.rcpaChemistList,
  rcpaLogs: state.rcpaLogs
});

export default connect(
  mapStateToProps,
  { loadRcpaChemistList, loadRcpaLogs, resetProductList }
)(RcpaChemistSelectionContainer);
