import {
  GET_SUBMIT_RCPA, GET_SUBMIT_RCPA_FAIL, GET_SUBMIT_RCPA_SUCCESS, RESET_GET_SUBMITTED_RCPA
} from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SUBMIT_RCPA:
      return { ...state, loading: true };
    case GET_SUBMIT_RCPA_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case GET_SUBMIT_RCPA_FAIL:
      return { ...state, loading: false, error: payload.error };
    case RESET_GET_SUBMITTED_RCPA:
      return {
        ...state, loading: false, error: '', data: null
      };
    default:
      return state;
  }
};
