import { LOAD_UPLOAD_DOCTOR_LIST, UPLOAD_DOCTOR_LIST_SUCCESS, UPLOAD_DOCTOR_LIST_FAILED } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_UPLOAD_DOCTOR_LIST:
      return { ...state, loading: true };
    case UPLOAD_DOCTOR_LIST_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case UPLOAD_DOCTOR_LIST_FAILED:
      return {
        ...state, loading: false, error: payload.error, data: null
      };
    default:
      return state;
  }
};
