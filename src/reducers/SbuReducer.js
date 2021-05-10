import { LOAD_SBUS, LOAD_SBUS_SUCCESS } from '../actions';

const INITIAL_STATE = {
  data: [],
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_SBUS:
      return { ...state, loading: true };
    case LOAD_SBUS_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    default:
      return state;
  }
};
