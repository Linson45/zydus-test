import React from 'react';
import {
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { StackActions } from 'react-navigation';
import { uploadDoctorIDFile } from '../../../actions';
import DoctorDetailsSave from '../../../components/upload_doctor_id_list/doctor_details_save/DoctorDetailsSave';
import Async from '../../../util/storage/Async';

class UploadDocumentDetailsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      ImageSource: null,
      ImageSource2: null,
      full_path_1: null,
      full_path_2: null,
    };
  }

  static navigationOptions = {
    title: 'Doctor Upload ID',
    headerRight: null,
  };

  componentDidMount() {
    const { data } = this.props.navigation.state.params;
    const { userData } = this.props.navigation.state.params;
    const {
      doc_name,
      doc_code,
      status,
      full_path_1,
      full_path_2,
    } = data;

    const { rep_code, sbu_code, company_code } = userData;

    // eslint-disable-next-line consistent-return
    function checkValidUrl(url) {
      if (url === undefined) {
        return false;
      }
      const types = ['jpg', 'jpeg', 'tiff', 'png', 'gif', 'bmp'];
      const parts = url.split('.');
      const extension = parts[parts.length - 1];
      if (types.indexOf(extension) !== -1) {
        return true;
      }
    }

    if (checkValidUrl(full_path_1)) {
      this.setState({
        ImageSource: full_path_1.replace('/..', ''),
      });
    } else {
      this.setState({
        ImageSource: null,
      });
    }
    if (checkValidUrl(full_path_2)) {
      this.setState({
        ImageSource2: full_path_2.replace('/..', ''),
      });
    } else {
      this.setState({
        ImageSource2: null,
      });
    }
    this.setState({
      companyCode: company_code,
      repCode: rep_code,
      divID: sbu_code,
      drCode: doc_code,
      drName: doc_name,
      drStatus: status,
      loading: false,
    });
    if (status === 'Rejected') {
      this.setState({
        ImageSource: null,
      });
      this.setState({
        ImageSource2: null,
      });
    }
  }

  // eslint-disable-next-line no-unused-vars
  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.uploadDoctorID !== this.props.uploadDoctorID) {
      const { error, status_text } = nextProps.uploadDoctorID;
      if (error) {
        // Toaster.show(error);
        alert(error);
        return;
      }

      if (status_text != null) {
        Async.set('doctor_upload', true);
        Alert.alert(
          'Alert',
          status_text,
          [
            {
              text: 'OK',
              onPress: () => {
                const popAction = StackActions.pop({
                  // actions: [NavigationActions.navigate({ routeName: 'UploadDoctorID' ,params: {"Name": "Mitesh"} })],
                });
                this.props.navigation.dispatch(popAction);
              },
            },
          ],
          { cancelable: false },
        );
      }
    }
  }

  uploadData() {
    const document_1 = this.state.full_path_1 != null
      ? this.state.full_path_1
      : this.state.ImageSource;
    const document_2 = this.state.full_path_2 != null
      ? this.state.full_path_2
      : this.state.ImageSource2;

    if (document_1 != null || document_2 != null) {
      const formData = new FormData();
      formData.append('company_code', this.state.companyCode);
      formData.append('rep_code', this.state.repCode);
      formData.append('div_id', this.state.divID);
      formData.append('dr_code', this.state.drCode);
      if (document_1 != null && document_1.uri !== undefined) {
        formData.append('file1', {
          uri: document_1.uri,
          type: 'image/jpg',
          name: 'file1.jpg',
        });
      }
      if (document_2 != null && document_2.uri !== undefined) {
        formData.append('file2', {
          uri: document_2.uri,
          type: 'image/jpg',
          name: 'file2.jpg',
        });
      }

      this.setState({
        loading: true,
      });

      this.props.uploadDoctorIDFile(formData).then(() => {
        this.setState({
          loading: false,
        });
      });
    } else {
      Alert.alert('Alert', 'Please select one or more image for doctor upload');
    }
  }

  removeImage(data) {
    if (data === 'image1') {
      this.setState({
        full_path_1: null,
        ImageSource: null,
      });
    } else {
      this.setState({
        full_path_2: null,
        ImageSource2: null,
      });
    }
  }

  selectPhotoTapped(data) {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        if (data === 'image1') {
          this.setState({
            full_path_1: source,
          });
        } else {
          this.setState({
            full_path_2: source,
          });
        }
      }
    });
  }

  render() {
    const selectPhotoTapped = this.selectPhotoTapped.bind(this);
    const removeImage = this.removeImage.bind(this);
    const uploadData = this.uploadData.bind(this);

    const {
      ImageSource,
      ImageSource2,
      drStatus,
      drCode,
      drName,
      loading,
      full_path_1,
      full_path_2,
    } = this.state;

    return (
      <DoctorDetailsSave
        data={this.props.navigation.state.params.data}
        userData={this.props.navigation.state.params.userData}
        selectPhotoTapped={selectPhotoTapped}
        removeImage={removeImage}
        ImageSource={ImageSource}
        ImageSource2={ImageSource2}
        drStatus={drStatus}
        uploadData={uploadData}
        drCode={drCode}
        drName={drName}
        loading={loading}
        full_path_1={full_path_1}
        full_path_2={full_path_2}
      />
    );
  }
}
const mapStateToProps = (state) => ({
  uploadDoctorID: state.uploadDoctorID,
});
export default connect(
  mapStateToProps,
  { uploadDoctorIDFile },
)(UploadDocumentDetailsContainer);
