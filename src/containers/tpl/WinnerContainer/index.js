import React, { Component } from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadTplWinners } from '../../../actions';
import TplWinners from '../../../components/tpl/TplWinners';

class TplWinnerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: "Winner's Corner",
    };

    async componentDidMount() {
      const { user, month, year } = this.props.navigation.state.params;
      const { company_code, sbu_code, user_type } = user;
      const data = {
        company_code, sbu_code, user_type, month, year
      };
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadTplWinners(data);
            }
          });
        });
    }

    onRefresh = () => {
      const { user, month, year } = this.props.navigation.state.params;
      const { company_code, sbu_code, user_type } = user;
      const data = {
        company_code, sbu_code, user_type, month, year
      };
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadTplWinners(data);
            }
          });
        });
    }

    render() {
      const { loading, data } = this.props.tplWinners;
      return (

        <TplWinners
          data={data}
          loading={loading}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  tplWinners: state.tplWinners
});

export default connect(
  mapStateToProps,
  { loadTplWinners }
)(TplWinnerContainer);
