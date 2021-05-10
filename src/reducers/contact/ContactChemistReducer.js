import { LOAD_CONTACT_CHEMIST, LOAD_CONTACT_CHEMIST_FAIL, LOAD_CONTACT_CHEMIST_SUCCESS } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_CONTACT_CHEMIST:
      return { ...state, loading: true, data: payload };
    case LOAD_CONTACT_CHEMIST_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_CONTACT_CHEMIST_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
