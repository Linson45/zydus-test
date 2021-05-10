import React, { Component } from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadRcpaAbmBOs } from '../../../actions';
import AbmBoListComponent from '../../../components/rx_tracker/ABMBoListComponents';

class ABMBoListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true,
    };
  }

  static navigationOptions = {
    title: 'Rx',
  };

  componentDidMount() {
    const {
      rep_code,
      company_code,
      sbu_code,
    } = this.props.navigation.state.params.user;
    const data = {
      rep_code,
      company_code,
      sbu_code,
    };
    // this.props.loadRcpaAbmBOs(data);
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({ isInternetConnected: isConnected }, () => {
        if (true) {
          this.props.loadRcpaAbmBOs(data);
        }
      });
    });
  }

  onRefresh = () => {
    const {
      rep_code,
      company_code,
      sbu_code,
    } = this.props.navigation.state.params.user;
    const data = {
      rep_code,
      company_code,
      sbu_code,
    };
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({ isInternetConnected: isConnected }, () => {
        // if (isConnected) {
        if (true) {
          this.props.loadRcpaAbmBOs(data);
        }
      });
    });
  };

  goToAbmDetail(user) {
    const userDetails = this.props.navigation.state.params.user;
    this.props.navigation.navigate('ABMRxDocList', { user, userDetails });
  }

  render() {
    const { data, loading } = this.props.rcpaAbmBOs;
    const goToAbmDetail = this.goToAbmDetail.bind(this);

    return (
      <AbmBoListComponent
        connected={true}
        loading={loading}
        data={data}
        onPress={goToAbmDetail}
        onRefresh={() => this.onRefresh()}
      />
    );
  }
}

const mapStateToProps = state => ({
  rcpaAbmBOs: state.rcpaAbmBOs,
});

export default connect(
  mapStateToProps,
  { loadRcpaAbmBOs },
)(ABMBoListContainer);
