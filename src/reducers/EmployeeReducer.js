import { LOAD_EMPLOYEES, LOAD_EMPLOYEES_FAIL, LOAD_EMPLOYEES_SUCCESS } from '../actions/EmployeesActions';
import { MY_PERFORMANCE_RESET_EMPLOYEES } from '../actions';

const INITIAL_STATE = {
  error: null,
  data: [],
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_EMPLOYEES:
      return { ...state, loading: true };
    case LOAD_EMPLOYEES_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_EMPLOYEES_FAIL:
      return { ...state, loading: false, error: payload.error };
    case MY_PERFORMANCE_RESET_EMPLOYEES:
      return {
        ...state, loading: false, error: null, data: []
      };
    default:
      return state;
  }
};
