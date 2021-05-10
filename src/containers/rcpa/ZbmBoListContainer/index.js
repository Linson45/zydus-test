import React, { Component } from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadRcpaZbmBOs } from '../../../actions';
import ZbmBoComponent from '../../../components/rcpa/ZbmBoComponent';

class RcpaZbmBoListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'Select BO',
    };

    async componentDidMount() {
      const { rep_code, company_code, sbu_code } = this.props.navigation.state.params.user;

      const data = {
        rep_code,
        company_code,
        sbu_code
      };
        // this.props.loadRcpaZbmBOs(data);
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadRcpaZbmBOs(data);
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
              this.props.loadRcpaZbmBOs(data);
            }
          });
        });
    }

    goToRbmDetail(user) {
      const bo_name = user.name;
      this.props.navigation.navigate('RcpaDocList', { user, bo_name });
    }

    render() {
      const { data, loading } = this.props.rcpaZbmBOs;
      const goToRbmDetail = this.goToRbmDetail.bind(this);

      return (
        <ZbmBoComponent
          data={data}
          loading={loading}
          onPress={goToRbmDetail}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  rcpaZbmBOs: state.rcpaZbmBOs
});

export default connect(
  mapStateToProps,
  { loadRcpaZbmBOs }
)(RcpaZbmBoListContainer);
