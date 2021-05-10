import api from '../api';
import Urls from '../api/urls';
import Adapter from '../util/Adapter';

export const LOAD_ADD_TICKET_DATA = 'load_add_ticket_data';
export const LOAD_ADD_TICKET_DATA_SUCCESS = 'load_add_ticket_data_success';
export const LOAD_ADD_TICKET_DATA_FAIL = 'load_add_ticket_data_fail';

export const LOAD_PAST_QUERIES = 'load_past_queries';
export const LOAD_PAST_QUERIES_SUCCESS = 'load_past_queries_success';
export const LOAD_PAST_QUERIES_FAIL = 'load_past_queries_fail';

export const loadAddTicketData = () => async (dispatch) => {
  let categories = [];
  let priorities = [];

  dispatch({ type: LOAD_ADD_TICKET_DATA });
  const categoryResponse = await api({
    method: 'GET',
    url: Urls.GET_HELP_CATEGORIES,
    params: { },
  });

  if (categoryResponse.statusCode === 200) {
    categories = categoryResponse.data;
  }

  const priorityResponse = await api({
    method: 'GET',
    url: Urls.GET_HELP_PRIORITIES,
    params: { },
  });

  if (priorityResponse.statusCode === 200) {
    priorities = priorityResponse.data;
  }

  dispatch({
    type: LOAD_ADD_TICKET_DATA_SUCCESS,
    payload: {
      categories,
      priorities
    }
  });
};

export const addQuery = async (body) => {
  const response = await api({
    method: 'POST',
    url: Urls.ADD_QUERY,
    data: body
  });
  return response;
};

export const loadPastQueries = () => async (dispatch) => {
  const user = await Adapter.getUser();
  const { rep_code } = user;

  dispatch({ type: LOAD_PAST_QUERIES });
  const { statusCode, data } = await api({
    method: 'GET',
    url: Urls.GET_QUERIES,
    params: { rep_code, type: 'internal' },
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_PAST_QUERIES_SUCCESS, payload: data });
  } else {
    dispatch({ type: LOAD_PAST_QUERIES_FAIL, payload: [] });
  }
};
