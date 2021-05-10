import { LOAD_COACH_SUMMARY, LOAD_COACH_SUMMARY_FAIL, LOAD_COACH_SUMMARY_SUCCESS } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_COACH_SUMMARY:
      return { ...state, loading: true, data: null };
    case LOAD_COACH_SUMMARY_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_COACH_SUMMARY_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
