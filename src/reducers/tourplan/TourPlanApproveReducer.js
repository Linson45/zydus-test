import { SUBMIT_APPROVE, SUBMIT_APPROVE_FAIL, SUBMIT_APPROVE_SUCCESS } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SUBMIT_APPROVE:
      return { ...state, loading: true };
    case SUBMIT_APPROVE_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case SUBMIT_APPROVE_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
