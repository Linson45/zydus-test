import { LOAD_FILTER_ACTION_ITEM_EMPLOYEE, LOAD_FILTER_ACTION_ITEM_EMPLOYEE_SUCCESS, LOAD_FILTER_ACTION_ITEM_EMPLOYEE_FAIL } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_FILTER_ACTION_ITEM_EMPLOYEE:
      return { ...state, loading: true };
    case LOAD_FILTER_ACTION_ITEM_EMPLOYEE_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_FILTER_ACTION_ITEM_EMPLOYEE_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
