import { RX_APPROVED_LIST, RX_APPROVED_LIST_SUCCESS, RX_APPROVED_LIST_FAILED } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case RX_APPROVED_LIST:
      return { ...state, loading: true };
    case RX_APPROVED_LIST_SUCCESS:
      console.log(payload);
      return {
        ...state, loading: false, error: '', data: payload
      };
    case RX_APPROVED_LIST_FAILED:
      return {
        ...state, loading: false, error: payload.error, data: []
      };
    default:
      return state;
  }
};
