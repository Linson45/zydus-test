import { LOAD_CONTENT_HUB, LOAD_CONTENT_HUB_FAIL, LOAD_CONTENT_HUB_SUCCESS } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_CONTENT_HUB:
      return { ...state, loading: true, data: null };
    case LOAD_CONTENT_HUB_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_CONTENT_HUB_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
