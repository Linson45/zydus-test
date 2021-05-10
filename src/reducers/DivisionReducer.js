import { LOAD_DIVISIONS, LOAD_DIVISIONS_SUCCESS } from '../actions';

const INITIAL_STATE = {
  data: [],
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_DIVISIONS:
      return { ...state, loading: true };
    case LOAD_DIVISIONS_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload
      };
    default:
      return state;
  }
};
