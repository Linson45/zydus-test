import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Image, Text, TouchableOpacity, View
} from 'react-native';
import { Icon } from 'native-base';
import { StackActions } from 'react-navigation';
import {
  addOpenTokData,
  DISABLE_PUBLISH_VIDEO, DISABLE_SHARE_BUTTON, ENABLE_SHARE_BUTTON,
  END_V_CALL, MESSAGE_READ,
  openTokToggles, SET_TIMEOUT, SHARE_VIDEO_SOURCE_CAMERA, SHARE_VIDEO_SOURCE_SCREEN,
  SHOW_PARTICIPANTS_SCREEN,
  TOGGLE_CAMERA_POSITION,
  TOGGLE_PUBLISH_AUDIO,
  TOGGLE_PUBLISH_VIDEO,
  VIDEO_SOURCE_SCREEN
} from '../../../actions';
import styles from './styles';
import ColorStyles from '../../../styles/colorsStyles';
import imageConstants from '../../../Constants/imageConstants';
import { loadVADetailsWithConfig } from '../../../util/startDeatiling';

class FloatingButtonComponent extends Component {
  disableShareButton() {
    const {
      openTokScreenData,
      shareScreenType,
      timeout
    } = this.props;
    const {
      publisherProperties,
    } = openTokScreenData;
    const {
      videoSource,
    } = publisherProperties;
    if (videoSource !== shareScreenType) {
      let timeoutTime = 100;
      if (timeout) {
        clearTimeout(timeout);
      }
      const that = this;
      if (videoSource === 'screen') {
        timeoutTime = 5000;
        this.props.openTokToggles(SHARE_VIDEO_SOURCE_SCREEN);
        this.props.openTokToggles(DISABLE_SHARE_BUTTON);
      } else {
        this.props.openTokToggles(DISABLE_SHARE_BUTTON);
        this.props.openTokToggles(SHARE_VIDEO_SOURCE_CAMERA);
      }
      const tempTimeout = setTimeout(() => {
        that.props.openTokToggles(ENABLE_SHARE_BUTTON);
      }, timeoutTime);
      this.props.addOpenTokData(SET_TIMEOUT, tempTimeout);
    }
  }

  endCall() {
    this.props.openTokToggles(END_V_CALL);
  }

  goToContentHub() {
    this.props.navigation.navigate('ContentTabHub');
  }

  goBack() {
    let numberOfScreenToBePopped;
    try {
      for (const index in this.props.navigation.dangerouslyGetParent().state.routes) {
        const value = this.props.navigation.dangerouslyGetParent().state.routes[index];
        if (value.routeName === 'VirtualDetailingVideo') {
          numberOfScreenToBePopped = this.props.navigation.dangerouslyGetParent().state.routes.length - (+index + 1);
        }
      }
    } catch (error) {
      numberOfScreenToBePopped = 1;
    }
    if (numberOfScreenToBePopped < 0) {
      numberOfScreenToBePopped = 1;
    }
    const popAction = StackActions.pop({
      n: numberOfScreenToBePopped,
    });
    this.props.navigation.dispatch(popAction);
  }

  redirectToShareContent() {
    this.gotoStartDetailing();
  }

  gotoStartDetailing(position = undefined) {
    const { date, doctor } = this.props.navigation.state.params;
    const {
      doc_code,
      contents
    } = doctor;
    loadVADetailsWithConfig(doc_code, contents).then((brands) => {
      const brandsCloned = [];
      const allVAS = [];
      for (const brand of brands) {
        for (const va of brand.data) {
          const {
            vaPosition,
            in_showcase,
          } = va;
          if (in_showcase) {
            if (vaPosition && !brandsCloned.hasOwnProperty(vaPosition)) {
              brandsCloned[vaPosition] = va;
            } else {
              brandsCloned.push(
                va
              );
            }
          }
          allVAS.push(
            va,
          );
        }
      }
      if (brandsCloned.length > 0) {
        const finalVAS = [];
        for (const render of brandsCloned) {
          if (render) {
            finalVAS.push(
              render
            );
          }
        }
        this.props.navigation.navigate('VDetailingWebView', {
          showcase: finalVAS,
          allVAS,
          position,
          doctor,
          date,
          virtualDetailing: true
        });
      } else {
        let finalVAS = allVAS;
        if (typeof position !== 'undefined') {
          finalVAS = [allVAS[position]];
        }
        this.props.navigation.navigate('VDetailingWebView', {
          showcase: finalVAS,
          allVAS,
          doctor,
          date,
          virtualDetailing: true
        });
      }
    });
  }

  render() {
    const {
      openTokScreenData,
      showContentHubButton,
      end,
      showOffVideoBGImage,
      shareButtonDisabled,
      moveBy
    } = this.props;
    const {
      publisherProperties,
      session_data,
      show
    } = openTokScreenData;
    const {
      apiKey
    } = session_data;
    const {
      publishAudio,
      publishVideo,
      videoSource,
      cameraPosition
    } = publisherProperties;
    let displace = 0;
    if (moveBy && !isNaN(moveBy)) {
      displace = 160;
    }
    this.disableShareButton();
    return (
      <>
        {
        show && apiKey
          ? (
            <>
              { showOffVideoBGImage && !publishVideo ? (
                <Image
                  source={imageConstants.videoCallBG}

                  style={[{
                    position: 'absolute',
                    resizeMode: 'stretch',
                    backgroundColor: ColorStyles.ProgressBarBackground,
                    top: 0,
                    left: 0
                  }, {
                    width: 120,
                    height: 90,
                  }]}
                />
              ) : null }
              <View style={[styles.buttonContainer, { bottom: 50 + displace }]}>
                <View style={styles.buttonContentDesign}>
                  <TouchableOpacity
                    style={styles.buttonDesign}
                    onPress={() => {
                      this.props.openTokToggles(TOGGLE_PUBLISH_AUDIO);
                    }}
                  >
                    <Icon
                      name={publishAudio ? 'microphone' : 'microphone-slash'}
                      type="FontAwesome"
                      style={{ color: publishAudio ? ColorStyles.green : ColorStyles.pink, fontSize: 20 }}
                    />
                  </TouchableOpacity>
                  <Text style={styles.buttonDesignText}>
                    Audio
                  </Text>
                </View>

                <View style={styles.buttonContentDesign}>
                  <TouchableOpacity
                    style={styles.buttonDesign}
                    onPress={() => {
                      this.props.openTokToggles(TOGGLE_PUBLISH_VIDEO);
                    }}
                  >
                    <Icon
                      name={publishVideo ? 'video' : 'video-slash'}
                      type="FontAwesome5"
                      style={{ color: publishVideo ? ColorStyles.green : ColorStyles.pink, fontSize: 20 }}
                    />
                  </TouchableOpacity>
                  <Text style={styles.buttonDesignText}>
                    Video
                  </Text>
                </View>

                <View style={styles.buttonContentDesign}>
                  <TouchableOpacity
                    style={styles.buttonDesign}
                    onPress={() => {
                      this.props.openTokToggles(SHOW_PARTICIPANTS_SCREEN);
                    }}
                  >
                    <Icon
                      name="people"
                      type="MaterialIcons"
                      style={{ color: ColorStyles.gray_dark, fontSize: 20 }}
                    />
                  </TouchableOpacity>
                  <Text style={styles.buttonDesignText}>
                    Participants
                  </Text>
                </View>

                <View style={styles.buttonContentDesign}>
                  <TouchableOpacity
                    style={styles.buttonDesign}
                    onPress={() => {
                      this.props.openTokToggles(TOGGLE_CAMERA_POSITION);
                    }}
                  >
                    <Icon
                      name={cameraPosition === 'front' ? 'camera-rear' : 'camera-front'}
                      type="MaterialIcons"
                      style={{ color: ColorStyles.gray_dark, fontSize: 16 }}
                    />
                  </TouchableOpacity>
                  <Text style={styles.buttonDesignText}>
                    Camera
                  </Text>
                </View>

                <View style={styles.buttonContentDesign}>
                  <TouchableOpacity
                    disabled={!showContentHubButton}
                    style={styles.buttonDesign}
                    onPress={() => {
                      if (!shareButtonDisabled) {
                        this.props.openTokToggles(VIDEO_SOURCE_SCREEN);
                        this.props.openTokToggles(DISABLE_PUBLISH_VIDEO);
                        this.goToContentHub();
                      }
                    }}
                  >
                    <Image
                      source={imageConstants.bottom_content}
                      style={[styles.bottomIcon, { tintColor: 'gray' }]}
                    />
                  </TouchableOpacity>
                  <Text style={styles.buttonDesignText}>
                    { !shareButtonDisabled ? 'Share Content Hub' : 'Loading...' }
                  </Text>
                </View>

                <View style={[styles.buttonContentDesign, { tintColor: this.props.chat.newMessage ? ColorStyles.red : 'gray' }]}>
                  <TouchableOpacity
                    style={styles.buttonDesign}
                    onPress={() => {
                      this.props.openTokToggles(MESSAGE_READ);
                      this.props.navigation.navigate('ChatContainer');
                    }}
                  >
                    <Image
                      source={imageConstants.bottom_content}
                      style={[styles.bottomIcon, { tintColor: this.props.chat.newMessage ? ColorStyles.red : 'gray' }]}
                    />
                  </TouchableOpacity>
                  <Text style={[styles.buttonDesignText, { tintColor: this.props.chat.newMessage ? ColorStyles.red : 'gray' }]}>
                    Chat
                  </Text>
                </View>

                <View style={styles.buttonContentDesign}>
                  <TouchableOpacity
                    style={[styles.buttonDesign, styles.greenButton]}
                    onPress={() => {
                      if (!shareButtonDisabled) {
                        if (videoSource === 'screen') {
                          this.goBack();
                        } else {
                          this.props.openTokToggles(DISABLE_PUBLISH_VIDEO);
                          this.props.openTokToggles(VIDEO_SOURCE_SCREEN);
                          this.redirectToShareContent();
                        }
                      }
                    }}
                  >
                    <Icon
                      name={videoSource === 'screen' ? 'stop-screen-share' : 'screen-share'}
                      type="MaterialIcons"
                      style={{ color: ColorStyles.white, fontSize: 20 }}
                    />
                  </TouchableOpacity>
                  <Text style={[styles.buttonDesignText, styles.buttonDesignTextGreen]}>
                    {
                      !shareButtonDisabled ? videoSource === 'screen' ? 'Stop Share' : 'Share Content' : 'Loading...'
                    }
                  </Text>
                </View>

                <View style={styles.buttonContentDesign}>
                  <TouchableOpacity
                    disabled={end}
                    style={[styles.buttonDesign, styles.redButton]}
                    onPress={() => {
                      this.endCall();
                    }}
                  >
                    <Icon name="call-end" type="MaterialIcons" style={{ color: ColorStyles.white, fontSize: 20 }} />
                  </TouchableOpacity>
                  <Text style={[styles.buttonDesignText, styles.buttonDesignTextRed]}>
                    { !end ? 'End Call' : 'Ending' }
                  </Text>
                </View>
              </View>
            </>
          )
          : null
    }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  openTokScreenData: state.openTokScreen,
  end: state.openTokScreen.endCall,
  shareButtonDisabled: state.openTokScreen.shareButtonDisabled,
  shareScreenType: state.openTokScreen.shareScreenType,
  timeout: state.openTokScreen.timeout,
  chat: state.openTokScreen.chat
});

export default connect(
  mapStateToProps,
  { openTokToggles, addOpenTokData }
)(FloatingButtonComponent);
