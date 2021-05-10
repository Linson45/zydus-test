import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { uploadDoctorIDList } from '../../actions';
import UploadDoctorIDComponent from '../../components/upload_doctor_id_list/UploadDoctorIDComponent';
import Async from '../../util/storage/Async';

class UploadDoctorIDContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      docList: {
        all: [],
        isInternetConnected: true,
      },
      searchQuery: null,
    };
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().then((isConnected) => {
      this.setState({ isInternetConnected: isConnected }, () => {});
    });
    this.loadData();
    this.willFocus = this.props.navigation.addListener(
      'didFocus',
      this.onFocus.bind(this),
    );
  }

  onFocus() {
    NetInfo.isConnected.fetch().then((isConnected) => {
      this.setState({ isInternetConnected: isConnected }, () => {
        if (isConnected) {
          Async.get('doctor_upload').then((data) => {
            if (data === true) {
              this.loadData();
              Async.set('doctor_upload', false);
            } else {

            }
          });
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

  onDoctorList = () => {
    const user = this.props.navigation.state.params.user;
    const { date } = this.props.navigation.state.params;

    if (user.user_type === 'ZBM') {
      this.props.navigation.navigate('TourplanZbm', { user, type: 'doc_upload' });
    } else if (user.user_type === 'ABM') {
      this.props.navigation.navigate('TourplanTeam', {
        user,
        type: 'doc_upload',
        date,
      });
    } else if (user.user_type === 'RBM') {
      this.props.navigation.navigate('TourplanTeam', {
        user,
        type: 'doc_upload',
        date,
      });
    }
  };

  loadData() {
    const user = this.props.navigation.state.params.user;
    const { rep_code, sbu_code } = user;

    const data = {
      rep_code,
      sbu_code,
    };
    this.props.uploadDoctorIDList(data);
  }

  static Data() {
    const user = this.props.navigation.state.params.user;
    const { rep_code, sbu_code } = user;

    const data = {
      rep_code,
      sbu_code,
    };
    this.props.uploadDoctorIDList(data);
  }

  static navigationOptions = {
    title: 'Doctor Upload ID',
  };

  render() {
    const { data, loading } = this.props.uploadDoctorIDData;
    const user = this.props.navigation.state.params.user;
    const onDoctorList = this.onDoctorList.bind(this);

    return (
      <UploadDoctorIDComponent
        loading={loading}
        connected={this.state.isInternetConnected}
        onRefresh={() => this.onRefresh()}
        data={data}
        user={user}
        onDoctorList={onDoctorList}
      />
    );
  }
}
const mapStateToProps = (state) => ({
  uploadDoctorIDData: state.uploadDoctorIDData,
});

export default connect(
  mapStateToProps,
  { uploadDoctorIDList },
)(UploadDoctorIDContainer);
