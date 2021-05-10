import { POST_CHEMIST_LIST, POST_CHEMIST_LIST_SUCCESS, POST_CHEMIST_FAILED } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case POST_CHEMIST_LIST:
      return { ...state, loading: true };
    case POST_CHEMIST_LIST_SUCCESS:
      console.log(payload);
      return {
        ...state, loading: false, error: '', data: payload
      };
    case POST_CHEMIST_FAILED:
      return {
        ...state, loading: false, error: payload.error, data: []
      };
    default:
      return state;
  }
};
