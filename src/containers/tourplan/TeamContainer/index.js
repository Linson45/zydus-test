import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { loadTeamWise } from '../../../actions';
import { Role } from '../../../util/Constants';
import TeamComponent from '../../../components/tourplan/TeamComponent';

class TourplanTeamContainer extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const type = navigation.getParam('type');
    if (type === 'doc_upload') {
      return {
        headerTitle: "Team's Upload",
      };
    }
    return {
      headerTitle: "Team's Tour plan",
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isInternetConnected: true,
    };
  }

  componentDidMount() {
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
    const { user, date } = this.props.navigation.state.params;
    const {
      rep_code, company_code, sbu_code, user_type
    } = user;

    const data = {
      rep_code,
      company_code,
      sbu_code,
      user_type,
      date,
    };
    this.props.loadTeamWise(data);
  }

  goToBoDetail(user) {
    user.user_type = Role.BO;
    const { date } = this.props.navigation.state.params;
    const type = this.props.navigation.state.params.type;
    if (type !== 'doc_upload') {
      this.props.navigation.navigate('TourplanApproveBo', { user, date });
    } else {
      this.props.navigation.navigate('UploadDoctorList', { user });
    }
  }

  goToAbmDetail(user) {
    user.user_type = Role.ABM;
    const { date } = this.props.navigation.state.params;
    const type = this.props.navigation.state.params.type;
    if (type !== 'doc_upload') {
      this.props.navigation.navigate('TourplanApproveAbm', { user, date });
    } else {
      this.props.navigation.navigate('UploadDoctorList', { user });
    }
  }

  render() {
    const { type } = this.props.navigation.state.params;
    const { loading, data } = this.props.tourplanTeamWise;
    const goToBoDetail = this.goToBoDetail.bind(this);
    const goToAbmDetail = this.goToAbmDetail.bind(this);
    return (
      <TeamComponent
        data={data}
        loading={loading}
        goToBoDetail={goToBoDetail}
        goToAbmDetail={goToAbmDetail}
        connected={this.state.isInternetConnected}
        type={type}
        onRefresh={() => this.onRefresh()}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  tourplanTeamWise: state.tourplanTeamWise,
});

export default connect(
  mapStateToProps,
  { loadTeamWise },
)(TourplanTeamContainer);
