import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadAbmLeaderboardDetails } from '../../../actions';
import { Role } from '../../../util/Constants';
import AbmLeaderboardComponent from '../../../components/coachmap/AbmLeaderboardComponent';

class CoachMapAbmLeaderboardContainer extends React.Component {
    static navigationOptions = {
      title: 'View Leadermap',
    };

    constructor(props) {
      super(props);
      this.state = {
        isInternetConnected: true
      };
    }

    async componentDidMount() {
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
      const {
        rep_code, company_code, sbu_code
      } = this.props.navigation.state.params.user;
      const data = {
        rep_code,
        company_code,
        sbu_code,
        status: 'Y',
        desig_group_code: Role.ABM
      };
      this.props.loadAbmLeaderboardDetails(data, rep_code);
    }

    gotoSummary() {
      const { user } = this.props.navigation.state.params;
      this.props.navigation.navigate('CoachMapLeadermapSummary', { user });
    }

    gotoDetails(file) {
      const { user } = this.props.navigation.state.params;
      const { filed_date, filed_by_rep_code } = file;
      this.props.navigation.navigate('CoachMapLeadermapDetail', {
        user, filed_date, filed_by_rep_code, file
      });
    }

    render() {
      const gotoDetails = this.gotoDetails.bind(this);
      const gotoSummary = this.gotoSummary.bind(this);
      const { loading, data } = this.props.coachmapAbmLeaderboard;
      const { user } = this.props.navigation.state.params;
      console.log(data);

      return (
        <AbmLeaderboardComponent
          loading={loading}
          data={data}
          user={user}
          gotoDetails={gotoDetails}
          gotoSummary={gotoSummary}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  coachmapAbmLeaderboard: state.coachmapAbmLeaderboard,
});

export default connect(
  mapStateToProps,
  { loadAbmLeaderboardDetails }
)(CoachMapAbmLeaderboardContainer);
