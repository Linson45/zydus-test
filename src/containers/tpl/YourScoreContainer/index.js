import React, { Component } from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadTplYourScore } from '../../../actions';
import TplYourScore from '../../../components/tpl/TplYourScore';

class TplYourScoreContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'Score Summary',
    };

    async componentDidMount() {
      const { user, month, year } = this.props.navigation.state.params;
      const { company_code, sbu_code, rep_code } = user;
      const data = {
        company_code, sbu_code, rep_code, month, year
      };
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadTplYourScore(data);
            }
          });
        });
    }

    onRefresh = () => {
      const { user, month, year } = this.props.navigation.state.params;
      const { company_code, sbu_code, rep_code } = user;
      const data = {
        company_code, sbu_code, rep_code, month, year
      };
      NetInfo.isConnected.fetch()
        .then((isConnected) => {
          this.setState({ isInternetConnected: isConnected }, () => {
            if (isConnected) {
              this.props.loadTplYourScore(data);
            }
          });
        });
    }

    render() {
      const { loading, data } = this.props.tplYourScore;
      const { month } = this.props.navigation.state.params;
      return (

        <TplYourScore
          data={data}
          loading={loading}
          showModal={false}
          month={month}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  tplYourScore: state.tplYourScore
});

export default connect(
  mapStateToProps,
  { loadTplYourScore }
)(TplYourScoreContainer);
