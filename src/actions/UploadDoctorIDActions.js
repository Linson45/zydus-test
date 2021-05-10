import api from '../api';
import Urls from '../api/urls';

export const LOAD_UPLOAD_DOCTOR_LIST = 'get_upload_doctor_id_list';
export const UPLOAD_DOCTOR_LIST_SUCCESS = 'upload_doctor_id_list_success';
export const UPLOAD_DOCTOR_LIST_FAILED = 'upload_doctor_id_list_fail';

export const UPLOADING_DOCTOR_DATA = 'upload_doctor_data_load';
export const UPLOADED_DOCTOR_DATA_SUCCESS = 'upload_doctor_data_success';
export const UPLOADED_DOCTOR_DATA_FAILED = 'upload_doctor_data_fail';

export const uploadDoctorIDList = (body) => async (dispatch) => {
  dispatch({ type: LOAD_UPLOAD_DOCTOR_LIST });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.POST_UPLOAD_DOCTOR_ID_LIST,
    data: body,
  });

  if (statusCode === 200) {
    dispatch({ type: UPLOAD_DOCTOR_LIST_SUCCESS, payload: data.all });
  } else {
    dispatch({
      type: UPLOAD_DOCTOR_LIST_FAILED,
      payload: { error: errorMessage },
    });
  }
};

export const uploadDoctorIDFile = (body) => async (dispatch) => {
  dispatch({ type: UPLOADING_DOCTOR_DATA });
  const {
    statusCode, errorMessage, status_text
  } = await api({
    method: 'POST',
    url: Urls.POST_UPLOAD_DOCTOR_ID_FILE,
    data: body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  });

  if (statusCode === 200) {
    dispatch({ type: UPLOADED_DOCTOR_DATA_SUCCESS, payload: status_text });
  } else {
    dispatch({
      type: UPLOADED_DOCTOR_DATA_FAILED,
      payload: { error: errorMessage },
    });
  }
};
