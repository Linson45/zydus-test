import {
  LOAD_ACTION_ITEM_EMPLOYEES,
  LOAD_ACTION_ITEM_EMPLOYEES_FAIL,
  LOAD_ACTION_ITEM_EMPLOYEES_SUCCESS
} from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_ACTION_ITEM_EMPLOYEES:
      return { ...state, loading: true, data: null };
    case LOAD_ACTION_ITEM_EMPLOYEES_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_ACTION_ITEM_EMPLOYEES_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
