import { LOGIN_FAIL, LOGIN_SUCCESS, LOGIN_USER } from '../actions';

const INITIAL_STATE = {
  error: null,
  isLogin: false
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_USER:
      return {
        ...state, loading: true, error: '', isLogin: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state, loading: false, error: '', isLogin: true, data: payload
      };
    case LOGIN_FAIL:
      return {
        ...state, loading: false, error: payload.error, isLogin: false
      };
    default:
      return state;
  }
};
