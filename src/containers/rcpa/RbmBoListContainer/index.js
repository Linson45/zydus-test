import React, { Component } from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadRcpaRbmBOs } from '../../../actions';
import RbmBoComponent from '../../../components/rcpa/RbmBoComponent';

class RcpaRbmBoListContainer extends Component {
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
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadRcpaRbmBOs(data);
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
              this.props.loadRcpaRbmBOs(data);
            }
          });
        });
    }

    goToRbmDetail(user) {
      const bo_name = user.name;
      console.log(bo_name);
      this.props.navigation.navigate('RcpaDocList', { user, bo_name });
    }

    render() {
      const { data, loading } = this.props.rcpaRbmBOs;
      const goToRbmDetail = this.goToRbmDetail.bind(this);

      return (
        <RbmBoComponent
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
  rcpaRbmBOs: state.rcpaRbmBOs
});

export default connect(
  mapStateToProps,
  { loadRcpaRbmBOs }
)(RcpaRbmBoListContainer);
