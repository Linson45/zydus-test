import {
  LOAD_CRM_DASHBOARD_TOP_50,
  LOAD_CRM_DASHBOARD_TOP_50_FAIL,
  LOAD_CRM_DASHBOARD_TOP_50_SUCCESS
} from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_CRM_DASHBOARD_TOP_50:
      return { ...state, loading: true, data: null };
    case LOAD_CRM_DASHBOARD_TOP_50_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_CRM_DASHBOARD_TOP_50_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
