import {POST_RX_LIST, POST_RX_SUCCESS, POST_RX_FAILED} from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case POST_RX_LIST:
      return {...state, loading: true};
    case POST_RX_SUCCESS:
      console.log(payload);
      return {
        ...state,
        loading: false,
        error: '',
        data: payload,
      };
    case POST_RX_FAILED:
      return {
        ...state,
        loading: false,
        error: payload.error,
        data: [],
      };
    default:
      return state;
  }
};
