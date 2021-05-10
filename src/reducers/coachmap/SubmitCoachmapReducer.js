import { POST_COACHMAP, POST_COACHMAP_FAIL, POST_COACHMAP_SUCCESS } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case POST_COACHMAP:
      return { ...state, loading: true, data: null };
    case POST_COACHMAP_SUCCESS:
      return {
        ...state, loading: false, error: '', payload
      };
    case POST_COACHMAP_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
