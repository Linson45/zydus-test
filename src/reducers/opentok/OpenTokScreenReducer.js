import uuid from 'react-native-uuid';
import {
  ADD_PARTICIPANTS,
  CANCEL_END_V_CALL, CLOSE_CHAT_SCREEN, DISABLE_FIRST_LOADER,
  DISABLE_PUBLISH_VIDEO,
  DISABLE_SHARE_BUTTON,
  ENABLE_PUBLISH_VIDEO,
  ENABLE_SHARE_BUTTON,
  END_V_CALL,
  HIDE_PARTICIPANTS_SCREEN, MESSAGE_READ, OPEN_CHAT_SCREEN,
  RESET_INITIAL_STATE_OPENTOK, RESTORE_OLD_MESSAGES, SEND_SIGNAL,
  SET_SESSION_DATA_OPENTOK, SET_TIMEOUT, SHARE_VIDEO_SOURCE_CAMERA, SHARE_VIDEO_SOURCE_SCREEN,
  SHOW_PARTICIPANTS_SCREEN,
  TOGGLE_CAMERA_POSITION,
  TOGGLE_OPENTOK_SCREEN,
  TOGGLE_PUBLISH_AUDIO,
  TOGGLE_PUBLISH_VIDEO,
  UPDATE_ALL_PARTICIPANTS,
  UPDATE_DETAILING_DATA,
  VIDEO_SOURCE_CAMERA,
  VIDEO_SOURCE_SCREEN
} from '../../actions';

const INITIAL_STATE = {
  show: false,
  disableFirstLoad: true,
  timeout: false,
  shareScreenType: 'camera',
  shareButtonDisabled: false,
  session_data: {
    apiKey: '',
    sessionId: '',
    token: '',
  },
  endCall: false,
  detailing_data: null,
  extra: {
    showParticipantModal: false,
    participants: [],
  },
  publisherProperties: {
    videoTrack: true,
    audioTrack: true,
    publishAudio: true,
    publishVideo: true,
    name: '',
    cameraPosition: 'front',
    audioFallbackEnabled: true,
    audioBitrate: 10000,
    frameRate: 30,
    videoSource: 'camera',
  },
  chat: {
    signal: {
      data: '',
      type: '',
    },
    messages: [],
    newMessage: false
  },
  chatModal: false
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  const publisherProperties = { ...state.publisherProperties };
  const extra = { ...state.extra };
  let chat;
  switch (type) {
    case RESET_INITIAL_STATE_OPENTOK:
      return {
        ...state,
        detailing_data: null,
        endCall: false,
        disableFirstLoad: true,
        timeout: false,
        shareScreenType: 'camera',
        shareButtonDisabled: false,
        publisherProperties: { ...INITIAL_STATE.publisherProperties },
        session_data: { ...INITIAL_STATE.session_data },
        extra: { ...INITIAL_STATE.extra, u_id: uuid.v1() },
        chat: { ...INITIAL_STATE.chat },
        chatModal: false
      };
    case SEND_SIGNAL:
      chat = { ...state.chat, signal: payload };
      return {
        ...state, chat
      };
    case RESTORE_OLD_MESSAGES:
      let newMessage = false;
      if (state.chat && state.chat.messages && state.chat.messages.length !== payload.length) {
        if (payload[payload.length - 1] && payload[payload.length - 1].self === false) {
          newMessage = true;
        }
      }
      chat = { ...state.chat, messages: payload, newMessage };
      return {
        ...state, chat
      };
    case MESSAGE_READ:
      chat = { ...state.chat, newMessage: false };
      return {
        ...state, chat
      };
    case DISABLE_FIRST_LOADER:
      return {
        ...state,
        disableFirstLoad: false
      };
    case DISABLE_SHARE_BUTTON:
      return {
        ...state, shareButtonDisabled: true
      };
    case ENABLE_SHARE_BUTTON:
      return {
        ...state, shareButtonDisabled: false
      };
    case CANCEL_END_V_CALL:
      return {
        ...state, endCall: false
      };
    case END_V_CALL:
      return {
        ...state, endCall: true
      };
    case OPEN_CHAT_SCREEN:
      return {
        ...state, chatModal: true
      };
    case CLOSE_CHAT_SCREEN:
      return {
        ...state, chatModal: false
      };
    case SET_TIMEOUT:
      return {
        ...state,
        timeout: payload
      };
    case UPDATE_DETAILING_DATA:
      const detailing_data = { ...state.detailing_data, ...payload };
      return {
        ...state, detailing_data
      };
    case HIDE_PARTICIPANTS_SCREEN:
      extra.showParticipantModal = false;
      return {
        ...state, extra: { ...extra }
      };
    case SHOW_PARTICIPANTS_SCREEN:
      extra.showParticipantModal = true;
      return {
        ...state, extra: { ...extra }
      };
    case UPDATE_ALL_PARTICIPANTS:
      extra.participants = payload;
      return {
        ...state, extra: { ...extra }
      };
    case ADD_PARTICIPANTS:
      extra.participants = extra.participants.splice(0);
      extra.participants.push(payload);
      return {
        ...state, extra: { ...extra }
      };
    case TOGGLE_OPENTOK_SCREEN:
      return {
        ...state, show: !state.show
      };
    case SET_SESSION_DATA_OPENTOK:
      publisherProperties.name = payload.name;
      const session_data = {
        apiKey: payload.apiKey,
        sessionId: payload.sessionId,
        token: payload.token,
      };
      return {
        ...state, session_data, publisherProperties
      };
    case SHARE_VIDEO_SOURCE_SCREEN:
      return {
        ...state,
        shareScreenType: 'screen',
      };
    case SHARE_VIDEO_SOURCE_CAMERA:
      return {
        ...state,
        shareScreenType: 'camera',
      };
    case VIDEO_SOURCE_SCREEN:
      publisherProperties.videoSource = 'screen';
      return {
        ...state,
        publisherProperties
      };
    case VIDEO_SOURCE_CAMERA:
      publisherProperties.videoSource = 'camera';
      return {
        ...state,
        publisherProperties
      };
    case TOGGLE_CAMERA_POSITION:
      publisherProperties.cameraPosition = publisherProperties.cameraPosition === 'front' ? 'back' : 'front';
      return {
        ...state, publisherProperties
      };
    case TOGGLE_PUBLISH_AUDIO:
      publisherProperties.publishAudio = !publisherProperties.publishAudio;
      return {
        ...state, publisherProperties
      };
    case TOGGLE_PUBLISH_VIDEO:
      publisherProperties.publishVideo = !publisherProperties.publishVideo;
      return {
        ...state, publisherProperties
      };
    case ENABLE_PUBLISH_VIDEO:
      publisherProperties.publishAudio = true;
      return {
        ...state, publisherProperties
      };
    case DISABLE_PUBLISH_VIDEO:
      publisherProperties.publishVideo = false;
      return {
        ...state, publisherProperties
      };
    default:
      return state;
  }
};
