import { LOAD_PAST_QUERIES, LOAD_PAST_QUERIES_FAIL, LOAD_PAST_QUERIES_SUCCESS } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_PAST_QUERIES:
      return { ...state, loading: true, data: null };
    case LOAD_PAST_QUERIES_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_PAST_QUERIES_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
