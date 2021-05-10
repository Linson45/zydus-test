import { LOAD_SFE_DATA, UPLOAD_SFE_SUCCESS, UPLOAD_SFE_FAILED } from '../../actions';

const INITIAL_STATE = {
  error: null,
  status_text: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_SFE_DATA:
      return { ...state, loading: true };
    case UPLOAD_SFE_SUCCESS:
      return {
        ...state, loading: false, error: '', token: payload
      };
    case UPLOAD_SFE_FAILED:
      return {
        ...state, loading: false, error: payload.error, token: null
      };
    default:
      return state;
  }
};
