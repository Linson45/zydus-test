import {
  RESET_SUBMIT, UPDATE_ACTION_ITEM, UPDATE_ACTION_ITEM_FAIL, UPDATE_ACTION_ITEM_SUCCESS
} from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_ACTION_ITEM:
      return { ...state, loading: true, data: null };
    case UPDATE_ACTION_ITEM_SUCCESS:
      return {
        ...state, loading: false, error: '', data: 'Submitted'
      };
    case UPDATE_ACTION_ITEM_FAIL:
      return { ...state, loading: false, error: payload.error };
    case RESET_SUBMIT:
      return { ...state, loading: false, data: null };
    default:
      return state;
  }
};
