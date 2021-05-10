import api from '../api';
import Urls from '../api/urls';

export const LOAD_EMPLOYEES = 'load_employees';
export const LOAD_EMPLOYEES_SUCCESS = 'load_employees_success';
export const LOAD_EMPLOYEES_FAIL = 'load_employees_fail';

export const loadEmployees = (body) => async (dispatch) => {
  dispatch({ type: LOAD_EMPLOYEES });

  const { statusCode, data, errorMessage } = await api({
    method: 'POST',
    url: Urls.GET_EMPLOYEES,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_EMPLOYEES_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_EMPLOYEES_FAIL,
      payload: { error: errorMessage }
    });
  }
};
