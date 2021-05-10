import {
  ADD_ACTION_ITEM, ADD_ACTION_ITEM_FAIL, ADD_ACTION_ITEM_SUCCESS, RESET_SUBMIT
} from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_ACTION_ITEM:
      return { ...state, loading: true, data: null };
    case ADD_ACTION_ITEM_SUCCESS:
      return {
        ...state, loading: false, error: '', data: 'Submitted'
      };
    case ADD_ACTION_ITEM_FAIL:
      return { ...state, loading: false, error: payload.error };
    case RESET_SUBMIT:
      return { ...state, loading: false, data: null };
    default:
      return state;
  }
};
