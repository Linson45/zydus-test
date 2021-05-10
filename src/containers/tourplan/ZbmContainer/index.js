import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';
import { loadZbmTourPlan } from '../../../actions';
import { Role } from '../../../util/Constants';
import ZbmComponent from '../../../components/tourplan/ZbmComponent';

class TourplanZbmContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format('DD-MMM-YYYY'),
      isInternetConnected: true,
      uuid: '',
      repCode: '',
    };
  }

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

  async componentDidMount() {
    this.loadZbmData();
  }

  loadZbmData = () => {
    NetInfo.isConnected.fetch().then((isConnected) => {
      this.setState({ isInternetConnected: isConnected }, () => {
        if (isConnected) {
          this.loadData();
        }
      });
    });
  };

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
    } = this.props.navigation.state.params.user;
    const { date } = this.state;
    const data = {
      rep_code,
      company_code,
      sbu_code,
      user_type,
      date,
    };
    this.props.loadZbmTourPlan(data);
  }

  goToBoDetail(user) {
    user.user_type = Role.BO;
    const { date } = this.state;
    const type = this.props.navigation.state.params.type;
    if (type === 'doc_upload') {
      this.props.navigation.navigate('UploadDoctorList', { user });
    } else {
      this.props.navigation.navigate('TourplanApproveBo', { user, date });
    }
  }

  goToAbmDetail(user) {
    user.user_type = Role.ABM;
    const { date } = this.state;
    const type = this.props.navigation.state.params.type;
    if (type === 'doc_upload') {
      this.props.navigation.navigate('UploadDoctorList', { user });
    } else {
      this.props.navigation.navigate('TourplanApproveAbm', { user, date });
    }
  }

  goToRbmDetail(user) {
    user.user_type = Role.RBM;
    const { date } = this.state;
    const type = this.props.navigation.state.params.type;
    if (type === 'doc_upload') {
      this.props.navigation.navigate('UploadDoctorList', { user });
    } else {
      this.props.navigation.navigate('TourplanApproveRbm', { user, date });
    }
  }

  render() {
    const { loading, data } = this.props.tourplanZbm;
    const goToBoDetail = this.goToBoDetail.bind(this);
    const goToAbmDetail = this.goToAbmDetail.bind(this);
    const goToRbmDetail = this.goToRbmDetail.bind(this);
    const { type } = this.props.navigation.state.params;
    const { date } = this.state;
    return (
      <ZbmComponent
        data={data}
        loading={loading}
        goToBoDetail={goToBoDetail}
        goToAbmDetail={goToAbmDetail}
        goToRbmDetail={goToRbmDetail}
        date={date}
        type={type}
        connected={this.state.isInternetConnected}
        onRefresh={() => this.onRefresh()}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  tourplanZbm: state.tourplanZbm,
});

export default connect(
  mapStateToProps,
  { loadZbmTourPlan },
)(TourplanZbmContainer);
