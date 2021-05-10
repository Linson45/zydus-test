import api from '../api';
import Urls from '../api/urls';

export const RESET_SUBMIT = 'RESET_SUBMIT';
export const LOAD_ACTION_ITEMS = 'load_action_items';
export const LOAD_ACTION_ITEMS_SUCCESS = 'load_action_items_success';
export const LOAD_ACTION_ITEMS_FAIL = 'load_action_items_fail';

export const LOAD_ACTION_ITEM_DETAIL = 'load_action_item_detail';
export const LOAD_ACTION_ITEM_DETAIL_SUCCESS = 'load_action_item_detail_success';
export const LOAD_ACTION_ITEM_DETAIL_FAIL = 'load_action_item_detail_fail';

export const LOAD_ACTION_ITEM_EMPLOYEES = 'load_action_employees';
export const LOAD_ACTION_ITEM_EMPLOYEES_SUCCESS = 'load_action_employees_success';
export const LOAD_ACTION_ITEM_EMPLOYEES_FAIL = 'load_action_employees_fail';

export const UPDATE_ACTION_ITEM = 'update_action_item';
export const UPDATE_ACTION_ITEM_SUCCESS = 'update_action_item_success';
export const UPDATE_ACTION_ITEM_FAIL = 'update_action_item_fail';

export const ADD_ACTION_ITEM = 'add_action_item';
export const ADD_ACTION_ITEM_SUCCESS = 'add_action_item_success';
export const ADD_ACTION_ITEM_FAIL = 'add_action_item_fail';

export const LOAD_FILTER_ACTION_ITEM_DIVISIONS = 'load_action_item_filter_divisions';
export const LOAD_FILTER_ACTION_ITEM_DIVISIONS_SUCCESS = 'load_action_item_filter_divisions_success';
export const LOAD_FILTER_ACTION_ITEM_DIVISIONS_FAIL = 'load_action_item_filter_divisions_fail';

export const LOAD_FILTER_ACTION_ITEM_EMPLOYEE = 'load_action_item_filter_employee';
export const LOAD_FILTER_ACTION_ITEM_EMPLOYEE_SUCCESS = 'load_action_item_filter_employee_success';
export const LOAD_FILTER_ACTION_ITEM_EMPLOYEE_FAIL = 'load_action_item_filter_employee_fail';

export const loadActionItems = (body) => async (dispatch) => {
  dispatch({ type: LOAD_ACTION_ITEMS });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_ACTION_ITEMS,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_ACTION_ITEMS_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_ACTION_ITEMS_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadActionItemDetails = (body) => async (dispatch) => {
  dispatch({ type: LOAD_ACTION_ITEM_DETAIL });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_ACTION_ITEM_DETAILS,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_ACTION_ITEM_DETAIL_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_ACTION_ITEM_DETAIL_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadActionItemEmployees = (body) => async (dispatch) => {
  dispatch({ type: LOAD_ACTION_ITEM_EMPLOYEES });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_ACTION_ITEM_EMPLOYEES,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_ACTION_ITEM_EMPLOYEES_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_ACTION_ITEM_EMPLOYEES_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const updateActionItem = (body) => async (dispatch) => {
  dispatch({ type: UPDATE_ACTION_ITEM });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.UPDATE_ACTION_ITEM,
    data: body
  });

  if (statusCode === 200) {
    dispatch({
      type: UPDATE_ACTION_ITEM_SUCCESS,
      payload: data
    });
  } else {
    dispatch({
      type: UPDATE_ACTION_ITEM_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const resetSubmit = () => async (dispatch) => {
  dispatch({ type: RESET_SUBMIT });
};

export const addActionItem = (body) => async (dispatch) => {
  dispatch({ type: ADD_ACTION_ITEM });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.ADD_ACTION_ITEM,
    data: body
  });

  if (statusCode === 200) {
    dispatch({
      type: ADD_ACTION_ITEM_SUCCESS,
      payload: data
    });
  } else {
    dispatch({
      type: ADD_ACTION_ITEM_FAIL,
      payload: { error: errorMessage }
    });
  }
};
export const loadFilterDivisionsData = (body) => async (dispatch) => {
  dispatch({ type: LOAD_FILTER_ACTION_ITEM_DIVISIONS });

  const { statusCode, data, errorMessage } = await api({
    method: 'POST',
    url: Urls.GET_FILTER_DIVISIONS,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_FILTER_ACTION_ITEM_DIVISIONS_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_FILTER_ACTION_ITEM_DIVISIONS_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadFilterEmployeeData = (body) => async (dispatch) => {
  dispatch({ type: LOAD_FILTER_ACTION_ITEM_EMPLOYEE });

  const { statusCode, data, errorMessage } = await api({
    method: 'POST',
    url: Urls.GET_EMPLOYEES,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_FILTER_ACTION_ITEM_EMPLOYEE_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_FILTER_ACTION_ITEM_EMPLOYEE_FAIL,
      payload: { error: errorMessage }
    });
  }
};
