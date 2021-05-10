import { SUBMIT_DRAFT, SUBMIT_DRAFT_FAIL, SUBMIT_DRAFT_SUCCESS } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SUBMIT_DRAFT:
      return { ...state, loading: true };
    case SUBMIT_DRAFT_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case SUBMIT_DRAFT_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
