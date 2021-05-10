import { LOAD_TPL, LOAD_TPL_FAIL, LOAD_TPL_SUCCESS } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_TPL:
      return { ...state, loading: true };
    case LOAD_TPL_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_TPL_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
