import { LOAD_ADD_TICKET_DATA, LOAD_ADD_TICKET_DATA_FAIL, LOAD_ADD_TICKET_DATA_SUCCESS } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_ADD_TICKET_DATA:
      return { ...state, loading: true, data: null };
    case LOAD_ADD_TICKET_DATA_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_ADD_TICKET_DATA_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
