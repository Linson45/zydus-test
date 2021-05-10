import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadCampaingsList } from '../../../actions';
import CampaingsListComponent from '../../../components/rx_tracker/CampaingsComponents';

class CampaingsListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      docList: {
        isInternetConnected: true,
      },
      list: [],
      searchQuery: null,
    };
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({ isInternetConnected: isConnected }, () => { });
    });
    this.loadData();
  }

  onFocus() {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({ isInternetConnected: isConnected }, () => {
        if (true) {
          this.loadData();
        }
      });
    });
  }

  onRefresh = () => {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({ isInternetConnected: isConnected }, () => {
        if (true) {
          this.loadData();
        }
      });
    });
  };

  async loadData() {
    const user = this.props.navigation.state.params.user;
    const { sbu_code, company_code } = user;
    // const localDocs = await getCampaingsList(rep_code);
    const data = {
      company_code,
      sbu_code,
    };
    this.props.loadCampaingsList(data);
  }

  static navigationOptions = {
    title: 'RX Tracker Campaign',
  };

  render() {
    const { data, loading } = this.props.campaingsList;

    const user = this.props.navigation.state.params.user;

    return (
      <CampaingsListComponent
        loading={loading}
        connected={true}
        onRefresh={() => this.onRefresh()}
        data={data}
        user={user}
      />
    );
  }
}
const mapStateToProps = state => ({
  campaingsList: state.campaingsList,
});

export default connect(
  mapStateToProps,
  { loadCampaingsList },
)(CampaingsListContainer);
