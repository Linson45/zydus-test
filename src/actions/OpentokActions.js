export const TOGGLE_OPENTOK_SCREEN = 'TOGGLE_OPENTOK_SCREEN';
export const SET_SESSION_DATA_OPENTOK = 'SET_SESSION_DATA_OPENTOK';
export const TOGGLE_CAMERA_POSITION = 'TOGGLE_CAMERA_POSITION';
export const TOGGLE_PUBLISH_AUDIO = 'TOGGLE_PUBLISH_AUDIO';
export const TOGGLE_PUBLISH_VIDEO = 'TOGGLE_PUBLISH_VIDEO';
export const VIDEO_SOURCE_SCREEN = 'VIDEO_SOURCE_SCREEN';
export const SHARE_VIDEO_SOURCE_SCREEN = 'SHARE_VIDEO_SOURCE_SCREEN';
export const SHARE_VIDEO_SOURCE_CAMERA = 'SHARE_VIDEO_SOURCE_CAMERA';
export const SET_TIMEOUT = 'SET_TIMEOUT';
export const VIDEO_SOURCE_CAMERA = 'VIDEO_SOURCE_CAMERA';
export const RESET_INITIAL_STATE_OPENTOK = 'RESET_INITIAL_STATE_OPENTOK';
export const HIDE_PARTICIPANTS_SCREEN = 'HIDE_PARTICIPANTS_SCREEN';
export const SHOW_PARTICIPANTS_SCREEN = 'SHOW_PARTICIPANTS_SCREEN';
export const ADD_PARTICIPANTS = 'ADD_PARTICIPANTS';
export const UPDATE_ALL_PARTICIPANTS = 'UPDATE_ALL_PARTICIPANTS';
export const UPDATE_DETAILING_DATA = 'UPDATE_DETAILING_DATA';
export const ENABLE_PUBLISH_VIDEO = 'ENABLE_PUBLISH_VIDEO';
export const DISABLE_PUBLISH_VIDEO = 'DISABLE_PUBLISH_VIDEO';
export const END_V_CALL = 'END_V_CALL';
export const CANCEL_END_V_CALL = 'CANCEL_END_V_CALL';
export const DISABLE_SHARE_BUTTON = 'DISABLE_SHARE_BUTTON';
export const ENABLE_SHARE_BUTTON = 'ENABLE_SHARE_BUTTON';
export const DISABLE_FIRST_LOADER = 'DISABLE_FIRST_LOADER';
export const MESSAGE_READ = 'MESSAGE_READ';
export const RESTORE_OLD_MESSAGES = 'RESTORE_OLD_MESSAGES';
export const SEND_SIGNAL = 'SEND_SIGNAL';
export const OPEN_CHAT_SCREEN = 'OPEN_CHAT_SCREEN';
export const CLOSE_CHAT_SCREEN = 'CLOSE_CHAT_SCREEN';

export const addOpenTokData = (key, value) => async (dispatch) => {
  switch (key) {
    case SET_TIMEOUT:
      dispatch({ type: SET_TIMEOUT, payload: value });
      break;
    case UPDATE_ALL_PARTICIPANTS:
      dispatch({ type: UPDATE_ALL_PARTICIPANTS, payload: value });
      break;
    case ADD_PARTICIPANTS:
      dispatch({ type: ADD_PARTICIPANTS, payload: value });
      break;
    case SET_SESSION_DATA_OPENTOK:
      dispatch({ type: SET_SESSION_DATA_OPENTOK, payload: value });
      break;
    case UPDATE_DETAILING_DATA:
      dispatch({ type: UPDATE_DETAILING_DATA, payload: value });
      break;
    case RESTORE_OLD_MESSAGES:
      dispatch({ type: RESTORE_OLD_MESSAGES, payload: value });
      break;
    case SEND_SIGNAL:
      dispatch({ type: SEND_SIGNAL, payload: value });
      break;
    default:
      break;
  }
};

export const openTokToggles = (key) => async (dispatch) => {
  // eslint-disable-next-line default-case
  switch (key) {
    case DISABLE_FIRST_LOADER:
      dispatch({ type: DISABLE_FIRST_LOADER, payload: {} });
      break;
    case SHARE_VIDEO_SOURCE_SCREEN:
      dispatch({ type: SHARE_VIDEO_SOURCE_SCREEN, payload: {} });
      break;
    case SHARE_VIDEO_SOURCE_CAMERA:
      dispatch({ type: SHARE_VIDEO_SOURCE_CAMERA, payload: {} });
      break;
    case ENABLE_SHARE_BUTTON:
      dispatch({ type: ENABLE_SHARE_BUTTON, payload: {} });
      break;
    case DISABLE_SHARE_BUTTON:
      dispatch({ type: DISABLE_SHARE_BUTTON, payload: {} });
      break;
    case ENABLE_PUBLISH_VIDEO:
      dispatch({ type: ENABLE_PUBLISH_VIDEO, payload: {} });
      break;
    case DISABLE_PUBLISH_VIDEO:
      dispatch({ type: DISABLE_PUBLISH_VIDEO, payload: {} });
      break;
    case HIDE_PARTICIPANTS_SCREEN:
      dispatch({ type: HIDE_PARTICIPANTS_SCREEN, payload: {} });
      break;
    case CANCEL_END_V_CALL:
      dispatch({ type: CANCEL_END_V_CALL, payload: false });
      break;
    case END_V_CALL:
      dispatch({ type: END_V_CALL, payload: true });
      break;
    case SHOW_PARTICIPANTS_SCREEN:
      dispatch({ type: SHOW_PARTICIPANTS_SCREEN, payload: {} });
      break;
    case RESET_INITIAL_STATE_OPENTOK:
      dispatch({ type: RESET_INITIAL_STATE_OPENTOK, payload: {} });
      break;
    case VIDEO_SOURCE_SCREEN:
      dispatch({ type: VIDEO_SOURCE_SCREEN, payload: {} });
      break;
    case VIDEO_SOURCE_CAMERA:
      dispatch({ type: VIDEO_SOURCE_CAMERA, payload: {} });
      break;
    case TOGGLE_CAMERA_POSITION:
      dispatch({ type: TOGGLE_CAMERA_POSITION, payload: {} });
      break;
    case TOGGLE_PUBLISH_AUDIO:
      dispatch({ type: TOGGLE_PUBLISH_AUDIO, payload: {} });
      break;
    case TOGGLE_PUBLISH_VIDEO:
      dispatch({ type: TOGGLE_PUBLISH_VIDEO, payload: {} });
      break;
    case TOGGLE_OPENTOK_SCREEN:
      dispatch({ type: TOGGLE_OPENTOK_SCREEN, payload: {} });
      break;
    case OPEN_CHAT_SCREEN:
      dispatch({ type: OPEN_CHAT_SCREEN, payload: {} });
      break;
    case CLOSE_CHAT_SCREEN:
      dispatch({ type: CLOSE_CHAT_SCREEN, payload: {} });
      break;
    case MESSAGE_READ:
      dispatch({ type: MESSAGE_READ, payload: {} });
      break;
    default:
      break;
  }
};
