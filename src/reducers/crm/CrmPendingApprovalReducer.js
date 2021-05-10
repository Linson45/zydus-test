import {
  LOAD_CRM_PENDING_APPROVAL,
  LOAD_CRM_PENDING_APPROVAL_FAIL,
  LOAD_CRM_PENDING_APPROVAL_SUCCESS
} from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_CRM_PENDING_APPROVAL:
      return { ...state, loading: true, data: null };
    case LOAD_CRM_PENDING_APPROVAL_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_CRM_PENDING_APPROVAL_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
