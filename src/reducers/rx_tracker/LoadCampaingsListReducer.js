import { CAMPAINGS_LIST, CAMPAINGS_LIST_SUCCESS, CAMPAINGS_LIST_FAILED } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case CAMPAINGS_LIST:
      return { ...state, loading: true };
    case CAMPAINGS_LIST_SUCCESS:
      console.log(payload);
      return {
        ...state, loading: false, error: '', data: payload
      };
    case CAMPAINGS_LIST_FAILED:
      return {
        ...state, loading: false, error: payload.error, data: []
      };
    default:
      return state;
  }
};
