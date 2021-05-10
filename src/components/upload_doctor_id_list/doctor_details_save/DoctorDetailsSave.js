import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
} from 'react-native';
import ImageLoader from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

// import {uploadDoctorIDFile} from '../../../actions';
// eslint-disable-next-line import/no-extraneous-dependencies
import Icon from 'react-native-vector-icons/FontAwesome';
import Images from '../../../Constants/imageConstants';
import styles from './styles';

export default class DoctorDetailsSave extends React.Component {
  render() {
    const {
      selectPhotoTapped,
      removeImage,
      ImageSource,
      ImageSource2,
      uploadData,
      drStatus,
      drName,
      drCode,
      loading,
      full_path_1,
      full_path_2,
    } = this.props;
    const document_1 = full_path_1 != null ? full_path_1.uri : ImageSource;
    const document_2 = full_path_2 != null ? full_path_2.uri : ImageSource2;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <ScrollView>
            <View>
              <ImageBackground
                source={Images.ic_tool_bar_bg}
                style={styles.absoluteFill}
              >
                <Text style={styles.heading}>
                  Doctor Name :
                  {drName}
                </Text>
              </ImageBackground>
              <ImageBackground
                source={Images.ic_tool_bar_bg}
                style={styles.absoluteFill}
              >
                <Text style={styles.heading}>
                  Doctor Code :
                  {drCode}
                </Text>
              </ImageBackground>

              <View style={{ margin: 20, alignSelf: 'center' }}>

                <TouchableOpacity
                  onPress={() => {
                    // eslint-disable-next-line no-unused-expressions
                    document_1 === null && drStatus !== 'In Progress'
                      ? selectPhotoTapped('image1')
                      : null;
                  }}
                >
                  <View style={styles.ImageContainer}>
                    {document_1 === null ? (
                      <View style={styles.greyCircle}>
                        <Image
                          style={styles.ImagePlaceHolderContainer}
                          source={Images.ic_doctor_upload_background}
                        />
                      </View>
                    ) : (
                      <View>
                        <ImageLoader
                          resizeMode="contain"
                          indicator={Progress} // <---Pass ProgressLoader as a indicator
                          indicatorProps={{
                            size: 80,
                            borderWidth: 0,
                            color: '#062baa',
                            unfilledColor: '#0e6605',
                          }}
                          source={{ uri: document_1 }}
                          style={[styles.ImageContainerWithoutPlaceHolder]}
                        />

                        {document_1 === null
                        || drStatus === 'In Progress' ? null : (
                          <Icon
                            style={{
                              position: 'absolute',
                              left: 360,
                              right: 0,
                              top: 10,
                              bottom: 0,
                            }}
                            name="remove"
                            size={30}
                            color="#900"
                            onPress={() => removeImage('image1')}
                          />
                          )}
                      </View>
                    )}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    // eslint-disable-next-line no-unused-expressions
                    document_2 === null && drStatus !== 'In Progress'
                      ? selectPhotoTapped('image2')
                      : null;
                  }}
                >
                  <View style={styles.ImageContainer}>
                    {document_2 === null ? (
                      <View style={styles.greyCircle}>
                        <Image
                          style={styles.ImagePlaceHolderContainer}
                          source={Images.ic_doctor_upload_background}
                        />
                      </View>
                    ) : (
                      <View>
                        <ImageLoader
                          component={ImageLoader}
                          resizeMode="contain"
                          indicator={Progress} // <---Pass ProgressLoader as a indicator
                          indicatorProps={{
                            size: 80,
                            borderWidth: 0,
                            color: '#062baa',
                            unfilledColor: '#0e6605',
                          }}
                          source={{ uri: document_2 }}
                          style={[styles.ImageContainerWithoutPlaceHolder]}
                        />
                        {document_2 === null
                        || drStatus === 'In Progress' ? null : (
                          <Icon
                            style={{
                              position: 'absolute',
                              left: 360,
                              right: 0,
                              top: 10,
                              bottom: 0,
                            }}
                            name="remove"
                            size={30}
                            color="#900"
                            onPress={() => removeImage('image2')}
                          />
                          )}
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={{ alignSelf: 'center' }}>
                Please select one or more image for doctor upload
              </Text>
            </View>
          </ScrollView>

          <TouchableOpacity
            disabled={drStatus === 'In Progress'}
            style={styles.bottomView}
            onPress={() => uploadData()}
          >
            <View>
              <Text style={styles.textStyle}>SUBMIT</Text>
            </View>
          </TouchableOpacity>
        </View>
        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="grey" />
          </View>
        )}
      </View>
    );
  }
}
