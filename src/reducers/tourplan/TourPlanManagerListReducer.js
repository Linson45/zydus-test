import { GET_MANAGER_LIST, GET_MANAGER_LIST_FAIL, GET_MANAGER_LIST_SUCCESS } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_MANAGER_LIST:
      return { ...state, loading: true };
    case GET_MANAGER_LIST_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case GET_MANAGER_LIST_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
