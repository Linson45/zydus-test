import api from '../api';
import Urls from '../api/urls';

export const LOAD_SBUS = 'load_sbus';
export const LOAD_SBUS_SUCCESS = 'load_sbus_success';

export const loadSbus = (body) => async (dispatch) => {
  dispatch({ type: LOAD_SBUS });

  const { statusCode, data } = await api({
    method: 'POST',
    url: Urls.GET_SBUS,
    data: body

  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_SBUS_SUCCESS, payload: data });
  }
};
