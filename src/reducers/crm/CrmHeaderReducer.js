import { LOAD_CRM_HEADER, LOAD_CRM_HEADER_FAIL, LOAD_CRM_HEADER_SUCCESS } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_CRM_HEADER:
      return { ...state, loading: true, data: null };
    case LOAD_CRM_HEADER_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_CRM_HEADER_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
