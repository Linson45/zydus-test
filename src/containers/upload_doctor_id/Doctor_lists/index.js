import React from 'react';
import { connect } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { uploadDoctorIDList } from '../../../actions';
import UploadDoctorListComponent from '../../../components/upload_doctor_id_list/doctor_lists';

class UploadDoctorListContainer extends React.Component {
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
    // const user = this.props.navigation.state.params.Name;
    // if(user === "MITESH"){
    //   this.willFocus = this.props.navigation.addListener(
    //     'didFocus',
    //     this.onFocus.bind(this),
    //   );    }
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

    return (
      <UploadDoctorListComponent
        loading={loading}
        connected={this.state.isInternetConnected}
        onRefresh={() => this.onRefresh()}
        data={data}
        user={user}
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
)(UploadDoctorListContainer);
