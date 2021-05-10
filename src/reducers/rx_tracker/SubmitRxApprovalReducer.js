import {POST_RX_APPROVAL_LIST, POST_RX_APPROVAL_LIST_SUCCESS, POST_RX_APPROVAL_LIST_FAILED} from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case POST_RX_APPROVAL_LIST:
      return {...state, loading: true};
    case POST_RX_APPROVAL_LIST_SUCCESS:
      console.log(payload);
      return {
        ...state,
        loading: false,
        error: '',
        data: payload,
      };
    case POST_RX_APPROVAL_LIST_FAILED:
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
