import { SUBMIT_REOPEN, SUBMIT_REOPEN_FAIL, SUBMIT_REOPEN_SUCCESS } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SUBMIT_REOPEN:
      return { ...state, loading: true };
    case SUBMIT_REOPEN_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case SUBMIT_REOPEN_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
