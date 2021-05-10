import React, { Component } from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadRcpaAbmBOs } from '../../../actions';
import AbmBoComponent from '../../../components/rcpa/AbmBoComponent';

class RcpaAbmBoListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'Select BO',
    };

    componentDidMount() {
      const { rep_code, company_code, sbu_code } = this.props.navigation.state.params.user;
      const data = {
        rep_code,
        company_code,
        sbu_code
      };
        // this.props.loadRcpaAbmBOs(data);
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadRcpaAbmBOs(data);
            }
          });
        });
    }

    onRefresh = () => {
      const { rep_code, company_code, sbu_code } = this.props.navigation.state.params.user;
      const data = {
        rep_code,
        company_code,
        sbu_code
      };
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadRcpaAbmBOs(data);
            }
          });
        });
    }

    goToAbmDetail(user) {
      const bo_name = user.name;
      this.props.navigation.navigate('RcpaDocList', { user, bo_name });
    }

    render() {
      const { data, loading } = this.props.rcpaAbmBOs;
      const goToAbmDetail = this.goToAbmDetail.bind(this);

      return (
        <AbmBoComponent
          connected={this.state.isInternetConnected}
          loading={loading}
          data={data}
          onPress={goToAbmDetail}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  rcpaAbmBOs: state.rcpaAbmBOs
});

export default connect(
  mapStateToProps,
  { loadRcpaAbmBOs }
)(RcpaAbmBoListContainer);
