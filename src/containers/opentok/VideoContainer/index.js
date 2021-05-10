import React, { Component } from 'react';
import moment from 'moment';
import {
  OTPublisher, OTSession, OTSubscriber, OTSubscriberView
} from 'opentok-react-native';
import { connect } from 'react-redux';
import {
  Dimensions, ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import { Icon } from 'native-base';
import { Image } from 'react-native-elements';
import { StackActions } from 'react-navigation';
import {
  ADD_PARTICIPANTS,
  addOpenTokData,
  DISABLE_FIRST_LOADER,
  DISABLE_PUBLISH_VIDEO,
  openTokToggles, RESTORE_OLD_MESSAGES,
  TOGGLE_PUBLISH_AUDIO,
  UPDATE_ALL_PARTICIPANTS
} from '../../../actions';
import styles from './styles';
import ColorStyles from '../../../styles/colorsStyles';
import imageConstants from '../../../Constants/imageConstants';

const streamStyle = {
  width: 120,
  height: 90,
};

const fullScreenStreamStyle = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height
};

const getStreamName = (connectionId, participants) => {
  let name = 'Other';
  participants.forEach((stream) => {
    const { connection } = stream;
    if (connection && connectionId === connection.connectionId) {
      name = stream.name;
    }
  });
  return name;
};

class VideoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streamProperties: {},
      firstLoad: true
    };

    this.publisherEventHandlers = {
      streamCreated: (event) => {
        console.log('publisherEventHandlers: streamCreated.... updating state');
        const streamProperties = {
          ...this.state.streamProperties,
          [event.streamId]: {
            subscribeToAudio: true,
            subscribeToVideo: true,
            style: fullScreenStreamStyle,
          }
        };
        this.setState({ streamProperties });
      },
      streamDestroyed: (event) => {
        console.log('Publisher stream destroyed!', event);
      }
    };

    this.publisherEventHandlersCamera = {
      streamCreated: (event) => {
        if (this.state.firstLoad) {
          this.state.firstLoad = false;
          this.props.openTokToggles(DISABLE_PUBLISH_VIDEO);
          this.props.openTokToggles(TOGGLE_PUBLISH_AUDIO);
          this.props.openTokToggles(DISABLE_FIRST_LOADER);
          const that = this;
          setTimeout(() => {
            that.props.openTokToggles(TOGGLE_PUBLISH_AUDIO);
          }, 500);
        }
        const streamProperties = {
          ...this.state.streamProperties,
          [event.streamId]: {
            subscribeToAudio: true,
            subscribeToVideo: true,
            style: fullScreenStreamStyle,
          }
        };
        this.setState({ streamProperties });
      },
      streamDestroyed: (event) => {
        console.log('Publisher stream destroyed!', event);
      }
    };

    this.sessionOptions = {
      connectionEventsSuppressed: true, // default is false
      androidZOrder: '', // Android only - valid options are 'mediaOverlay' or 'onTop'
      androidOnTop: 'subscriber', // Android only - valid options are 'publisher' or 'subscriber'
      useTextureViews: true, // Android only - default is false
      isCamera2Capable: false, // Android only - default is false
      ipWhitelist: false, // https://tokbox.com/developer/sdks/js/reference/OT.html#initSession - ipWhitelist
    };

    this.sessionEventHandlers = {
      signal: (event) => {
        if (event.data) {
          const name = getStreamName(event.connectionId, this.props.participants);
          const self = (name === 'Other');
          const oldMessages = this.props.chat.messages;
          const messages = [...oldMessages, {
            text: event.data,
            self,
            name,
            time: moment().format('hh:mm A'),
          }];
          this.props.addOpenTokData(RESTORE_OLD_MESSAGES, messages);
        }
      },
      streamCreated: (event) => {
        const {
          hasVideo,
          hasAudio,
        } = event;
        let newStyle = false;
        if (event.videoType === 'screen') {
          try {
            const fullScreenStreamStyle = {
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height
            };
            if (+event.height < event.width) {
              newStyle = {
                width: +fullScreenStreamStyle.width,
                height: ((+fullScreenStreamStyle.width * +event.height) / +event.width)
              };
            } else {
              newStyle = {
                width: ((+fullScreenStreamStyle.height * +event.width) / +event.height),
                height: +fullScreenStreamStyle.height
              };
            }
          } catch (e) {
            newStyle = false;
          }
        }
        const streamProperties = {
          ...this.state.streamProperties,
          [event.streamId]: {
            subscribeToAudio: true,
            subscribeToVideo: true,
            hasVideo,
            hasAudio,
            style: newStyle || fullScreenStreamStyle,
            event
          }
        };
        this.props.addOpenTokData(ADD_PARTICIPANTS, event);
        this.setState({ streamProperties });
        if (event.videoType === 'screen') {
          setTimeout(() => {
            let index = 0;
            for (const streamId of Object.keys(streamProperties)) {
              if (event.streamId === streamId) {
                this.handleClick(index);
                break;
              }
              index++;
            }
          }, 1000);
        }
      },
      streamPropertyChanged: (event) => {
        const {
          stream
        } = event;
        if (stream && this.state.streamProperties[stream.streamId]) {
          const {
            subscribeToAudio,
            subscribeToVideo
          } = this.state.streamProperties[stream.streamId];
          const {
            hasVideo,
            hasAudio
          } = stream;
          const streamProperties = {
            ...this.state.streamProperties,
            [stream.streamId]: {
              subscribeToAudio: !!subscribeToAudio,
              subscribeToVideo: !!subscribeToVideo,
              hasVideo,
              hasAudio,
              style: fullScreenStreamStyle,
              event: stream
            }
          };
          this.setState({ streamProperties });
        }
      },
      streamDestroyed: (event) => {
        const participants = [];
        for (const index in this.props.participants) {
          const {
            streamId
          } = this.props.participants[index];
          if (event.streamId !== streamId) {
            participants.push(
              this.props.participants[index]
            );
          }
        }
        this.props.addOpenTokData(UPDATE_ALL_PARTICIPANTS, participants);
        console.log('Session Stream destroyed!!!!!!', event);
      },
    };

    this.subscriberProperties = {
      subscribeToAudio: true,
      subscribeToVideo: true,
    };

    this.subscriberEventHandlers = {
      error: (error) => {
        console.log('There was an error with the subscriber:', error);
      },
    };
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
      numberOfScreenToBePopped = 0;
    }
    if (numberOfScreenToBePopped < 0) {
      numberOfScreenToBePopped = 0;
    }
    if (numberOfScreenToBePopped) {
      const popAction = StackActions.pop({
        n: numberOfScreenToBePopped
      });
      this.props.navigation.dispatch(popAction);
    }
  }

    renderSubscribers = (subscribers) => subscribers.map((streamId) => {
      if (this.state.streamProperties[streamId]) {
        const subscriberStyle = this.state.streamProperties[streamId].style;
        const event = this.state.streamProperties[streamId].event;

        const {
          subscribeToAudio,
          subscribeToVideo,
          hasVideo,
        } = this.state.streamProperties[streamId];
        return (
          <View key={streamId} style={{ position: 'relative' }}>
            <View>
              {hasVideo && subscribeToVideo
                ? <OTSubscriberView streamId={streamId} style={subscriberStyle} />
                : <Image source={imageConstants.videoCallBG} style={subscriberStyle} />}
            </View>
            <View style={[
              {
                width: Dimensions.get('window').width,
                marginVertical: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute'
              }
            ]}
            >
              <View style={styles.buttonContentDesign}>
                <Text style={styles.rowText}>{event.name}</Text>
              </View>
              <View style={styles.buttonContentDesign}>
                <TouchableOpacity
                  style={styles.buttonDesign}
                  onPress={() => {
                    const streamData = { ...this.state.streamProperties[streamId] };
                    streamData.subscribeToAudio = !streamData.subscribeToAudio;
                    const streamProperties = {
                      ...this.state.streamProperties,
                      [streamId]: streamData
                    };
                    this.setState({ streamProperties });
                  }}
                >
                  <Icon
                    name={subscribeToAudio ? 'microphone' : 'microphone-slash'}
                    type="FontAwesome"
                    style={{ color: ColorStyles.gray_dark, fontSize: 20 }}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.buttonContentDesign}>
                <TouchableOpacity
                  style={styles.buttonDesign}
                  onPress={() => {
                    const streamData = { ...this.state.streamProperties[streamId] };
                    streamData.subscribeToVideo = !streamData.subscribeToVideo;
                    const streamProperties = {
                      ...this.state.streamProperties,
                      [streamId]: streamData
                    };
                    this.setState({ streamProperties });
                  }}
                >
                  <Icon
                    name={subscribeToVideo ? 'video' : 'video-slash'}
                    type="FontAwesome5"
                    style={{ color: ColorStyles.gray_dark, fontSize: 20 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      }
      return null;
    })

    handleClick = (number) => {
      this.goBack();
      this.scrollView.scrollTo({ x: (number * fullScreenStreamStyle.width), y: 0, animated: true });
    }

    render() {
      const {
        publisherProperties,
        show,
        session_data
      } = this.props.openTokScreen;
      const {
        chat
      } = this.props;
      const {
        apiKey,
        sessionId,
        token
      } = session_data;
      const {
        videoSource
      } = publisherProperties;
      const isScreenShare = videoSource === 'screen';
      return (
        <>
          {
            show && apiKey
              ? (
                <>
                  <OTSession
                    apiKey={apiKey}
                    sessionId={sessionId}
                    token={token}
                    signal={chat.signal}
                    ref={(instance) => {
                      this.session = instance;
                    }}
                    eventHandlers={this.sessionEventHandlers}
                  >
                    <View style={{
                      flex: 1,
                      flexDirection: 'row'
                    }}
                    >
                      <View
                        style={[{
                          width: 1,
                        }]}
                      >
                        {isScreenShare
                          ? (
                            <OTPublisher
                              properties={{
                                ...publisherProperties,
                                publishVideo: true,
                                publishAudio: false
                              }}
                              eventHandlers={this.publisherEventHandlers}
                              style={streamStyle}
                            />
                          ) : null}
                        <OTPublisher
                          properties={publisherProperties}
                          eventHandlers={this.publisherEventHandlersCamera}
                          style={streamStyle}
                        />
                      </View>
                      <View
                        style={[{
                          width: '100%',
                          position: 'relative'
                        }]}
                      >
                        <ScrollView
                          ref={(component) => { this.scrollView = component; }}
                          showsHorizontalScrollIndicator={false}
                          horizontal
                          pagingEnabled
                        >
                          <OTSubscriber
                            properties={this.subscriberProperties}
                            eventHandlers={this.subscriberEventHandlers}
                            streamProperties={this.state.streamProperties}
                          >
                            {this.renderSubscribers}
                          </OTSubscriber>
                        </ScrollView>
                      </View>
                    </View>
                  </OTSession>
                </>
              )
              : null
            }
        </>
      );
    }
}

const mapStateToProps = (state) => ({
  openTokScreen: state.openTokScreen,
  participants: state.openTokScreen.extra.participants,
  chat: state.openTokScreen.chat
});

export default connect(
  mapStateToProps,
  {
    openTokToggles,
    addOpenTokData
  }
)(VideoContainer);
