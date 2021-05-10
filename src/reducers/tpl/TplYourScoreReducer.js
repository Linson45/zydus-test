import { LOAD_TPL_YOUR_SCORE, LOAD_TPL_YOUR_SCORE_FAIL, LOAD_TPL_YOUR_SCORE_SUCCESS } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_TPL_YOUR_SCORE:
      return { ...state, loading: true };
    case LOAD_TPL_YOUR_SCORE_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_TPL_YOUR_SCORE_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
