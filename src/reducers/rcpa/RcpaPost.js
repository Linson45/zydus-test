import { SUBMIT_RCPA, SUBMIT_RCPA_FAIL, SUBMIT_RCPA_SUCCESS } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SUBMIT_RCPA:
      return { ...state, loading: true };
    case SUBMIT_RCPA_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case SUBMIT_RCPA_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
