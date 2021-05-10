import { LOAD_TPL_WINNERS, LOAD_TPL_WINNERS_FAIL, LOAD_TPL_WINNERS_SUCCESS } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_TPL_WINNERS:
      return { ...state, loading: true };
    case LOAD_TPL_WINNERS_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_TPL_WINNERS_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
