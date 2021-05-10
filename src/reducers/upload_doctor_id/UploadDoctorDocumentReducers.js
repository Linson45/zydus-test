import { UPLOADING_DOCTOR_DATA, UPLOADED_DOCTOR_DATA_SUCCESS, UPLOADED_DOCTOR_DATA_FAILED } from '../../actions';

const INITIAL_STATE = {
  error: null,
  status_text: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPLOADING_DOCTOR_DATA:
      return { ...state, loading: true };
    case UPLOADED_DOCTOR_DATA_SUCCESS:
      return {
        ...state, loading: false, error: '', status_text: payload
      };
    case UPLOADED_DOCTOR_DATA_FAILED:
      return {
        ...state, loading: false, error: payload.error, status_text: null
      };
    default:
      return state;
  }
};
