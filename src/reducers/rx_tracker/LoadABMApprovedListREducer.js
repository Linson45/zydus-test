import { ABM_RX_APPROVED_LIST, ABM_RX_APPROVED_LIST_SUCCESS, ABM_RX_APPROVED_LIST_FAILED } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ABM_RX_APPROVED_LIST:
      return { ...state, loading: true };
    case ABM_RX_APPROVED_LIST_SUCCESS:
      console.log(payload);
      return {
        ...state, loading: false, error: '', data: payload
      };
    case ABM_RX_APPROVED_LIST_FAILED:
      return {
        ...state, loading: false, error: payload.error, data: []
      };
    default:
      return state;
  }
};
