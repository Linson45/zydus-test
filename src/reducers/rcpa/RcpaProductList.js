import {
  LOAD_RCPA_PRODUCT_LIST,
  LOAD_RCPA_PRODUCT_LIST_FAIL,
  LOAD_RCPA_PRODUCT_LIST_SUCCESS,
  RESET_PRODUCT_LIST
} from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_RCPA_PRODUCT_LIST:
      return { ...state, loading: true };
    case LOAD_RCPA_PRODUCT_LIST_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_RCPA_PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: payload.error };
    case RESET_PRODUCT_LIST:
      return {
        ...state, loading: false, error: '', data: null
      };
    default:
      return state;
  }
};
