import {
  RX_PENDING_LIST,
  RX_PENDING_LIST_SUCCESS,
  RX_PENDING_LIST_FAILED,
} from '../../actions';

const INITIAL_STATE = {
  error: null,
  data_1: null,
  loading_1: true,
};

export default (state = INITIAL_STATE, action) => {
  const {type, payload} = action;
  switch (type) {
    case RX_PENDING_LIST:
      return {...state, loading_1: true};
    case RX_PENDING_LIST_SUCCESS:
      return {
        ...state,
        loading_1: false,
        error: '',
        data_1: payload,
      };
    case RX_PENDING_LIST_FAILED:
      return {
        ...state,
        loading_1: false,
        error: payload.error,
        data_1: [],
      };
    default:
      return state;
  }
};
