import {
  LOAD_TOURPLAN_SUGGESTED_DOCTORS,
  LOAD_TOURPLAN_SUGGESTED_DOCTORS_FAIL,
  LOAD_TOURPLAN_SUGGESTED_DOCTORS_SUCCESS
} from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_TOURPLAN_SUGGESTED_DOCTORS:
      return { ...state, loading: true, data: null };
    case LOAD_TOURPLAN_SUGGESTED_DOCTORS_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_TOURPLAN_SUGGESTED_DOCTORS_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
