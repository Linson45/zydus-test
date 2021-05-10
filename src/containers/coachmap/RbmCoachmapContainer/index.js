import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadRbmCoachmapDetails } from '../../../actions';
import { Role } from '../../../util/Constants';
import RbmCoachmapComponent from '../../../components/coachmap/RbmCoachmapComponent';

class CoachMapRbmCoachmapContainer extends React.Component {
  static navigationOptions = {
    title: 'Add / View Coachmap / Leadermap',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 15
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true,
    };
  }

  async componentDidMount() {
    NetInfo.isConnected.fetch().then((isConnected) => {
      this.setState({ isInternetConnected: isConnected }, () => {
        if (isConnected) {
          this.willFocus = this.props.navigation.addListener(
            'didFocus',
            this.onFocus.bind(this),
          );
        }
      });
    });
  }

  onFocus() {
    NetInfo.isConnected.fetch().then((isConnected) => {
      this.setState({ isInternetConnected: isConnected }, () => {
        if (isConnected) {
          this.loadData();
        }
      });
    });
  }

  onRefresh = () => {
    NetInfo.isConnected.fetch().then((isConnected) => {
      this.setState({ isInternetConnected: isConnected }, () => {
        if (isConnected) {
          this.loadData();
        }
      });
    });
  };

  loadData() {
    const {
      rep_code,
      company_code,
      sbu_code,
      user_type,
      zone_code,
      region_code,
      area_code,
      user_title,
    } = this.props.navigation.state.params.user;
    const data = {
      rep_code,
      company_code,
      sbu_code,
      user_type,
      zone_code,
      area_code,
      region_code,
      status: 'Y',
      desig_group_code: Role.RBM,
      user_title,
    };
    if (!data.area_code) data.area_code = '';
    this.props.loadRbmCoachmapDetails(data);
  }

  gotoCoachmapSummary(user) {
    user.user_name = user.uname;
    user.user_type = Role.BO;
    this.props.navigation.navigate('CoachMapSummary', { user });
  }

  gotoCoachmapDetails(user) {
    const { filed_date, filed_by_rep_code } = user;
    if (user.status === 'Submitted') {
      user.user_type = Role.BO;
      this.props.navigation.navigate('CoachMapDetail', {
        user,
        filed_date,
        filed_by_rep_code,
        file: user,
      });
    } else {
      this.openAddCoachmap(user);
    }
  }

  openAddCoachmap(user) {
    this.props.navigation.navigate('AddCoachmap', { user });
  }

  gotoLeaderboardSummary(user) {
    user.user_name = user.uname;
    user.user_type = Role.ABM;
    this.props.navigation.navigate('CoachMapLeadermapSummary', { user });
  }

  gotoLeaderboardDetails(user) {
    this.addLeademap(user);
  }

  addLeademap(user) {
    this.props.navigation.navigate('AddLeadermap', { user });
  }

  render() {
    const { user } = this.props.navigation.state.params;
    const gotoCoachmapDetails = this.gotoCoachmapDetails.bind(this);
    const gotoCoachmapSummary = this.gotoCoachmapSummary.bind(this);
    const gotoLeaderboardSummary = this.gotoLeaderboardSummary.bind(this);
    const gotoLeaderboardDetails = this.gotoLeaderboardDetails.bind(this);
    const openAddCoachmap = this.openAddCoachmap.bind(this);
    const addLeademap = this.addLeademap.bind(this);
    const { loading, data } = this.props.coachmapRbm;

    return (
      <RbmCoachmapComponent
        user={user}
        loading={loading}
        data={data}
        gotoCoachmapDetails={gotoCoachmapDetails}
        gotoCoachmapSummary={gotoCoachmapSummary}
        gotoLeaderboardSummary={gotoLeaderboardSummary}
        gotoLeaderboardDetails={gotoLeaderboardDetails}
        openAddCoachmap={openAddCoachmap}
        addLeademap={addLeademap}
        connected={this.state.isInternetConnected}
        onRefresh={() => this.onRefresh()}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  coachmapRbm: state.coachmapRbm,
});

export default connect(
  mapStateToProps,
  { loadRbmCoachmapDetails },
)(CoachMapRbmCoachmapContainer);
