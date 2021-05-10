import api from '../api';
import Urls from '../api/urls';

export const LOAD_SFE_DATA = 'get_sfe_data';
export const UPLOAD_SFE_SUCCESS = 'upload_sfe_success';
export const UPLOAD_SFE_FAILED = 'upload_sfe_fail';

export const getSFEData = (body) => async (dispatch) => {
  dispatch({ type: LOAD_SFE_DATA });

  const {
    statusCode, errorMessage, token
  } = await api({
    method: 'POST',
    url: Urls.POST_SFE_DATA,
    data: body,
  });

  if (statusCode === 200) {
    dispatch({ type: UPLOAD_SFE_SUCCESS, payload: token });
  } else {
    dispatch({
      type: UPLOAD_SFE_FAILED,
      payload: { error: errorMessage },
    });
  }
};
