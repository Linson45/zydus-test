import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadAbmCoachmapDetails } from '../../../actions';
import { Role } from '../../../util/Constants';
import AbmCoachmapComponent from '../../../components/coachmap/AbmCoachmapComponent';

class CoachMapAbmCoachmapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true
    };
  }

    static navigationOptions = {
      title: 'Add / View Coachmap',
    };

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
        rep_code, company_code, sbu_code, user_type, zone_code, region_code, area_code
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
        desig_group_code: Role.ABM
      };
      this.props.loadAbmCoachmapDetails(data);
    }

    gotoSummary(user) {
      user.user_name = user.uname;
      user.user_type = Role.BO;
      this.props.navigation.navigate('CoachMapSummary', { user });
    }

    gotoDetails(user) {
      const { filed_date, filed_by_rep_code } = user;
      if (user.status === 'Submitted') {
        user.user_type = Role.BO;
        this.props.navigation.navigate('CoachMapDetail', {
          user, filed_date, filed_by_rep_code, file: user
        });
      } else {
        this.openAddCoachmap(user);
      }
    }

    openAddCoachmap(user) {
      this.props.navigation.navigate('AddCoachmap', { user });
    }

    render() {
      const gotoDetails = this.gotoDetails.bind(this);
      const gotoSummary = this.gotoSummary.bind(this);
      const { loading, data } = this.props.coachmapAbm;
      const openAddCoachmap = this.openAddCoachmap.bind(this);
      const { user } = this.props.navigation.state.params;

      return (
        <AbmCoachmapComponent
          data={data}
          loading={loading}
          gotoSummary={gotoSummary}
          gotoDetails={gotoDetails}
          openAddCoachmap={openAddCoachmap}
          user={user}
          connected={this.state.isInternetConnected}
          onRefresh={() => this.onRefresh()}
        />
      );
    }
}

const mapStateToProps = (state) => ({
  coachmapAbm: state.coachmapAbm,
});

export default connect(
  mapStateToProps,
  { loadAbmCoachmapDetails }
)(CoachMapAbmCoachmapContainer);
