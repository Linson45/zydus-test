import { LOAD_CRM_ABM_LIST, LOAD_CRM_ABM_LIST_FAIL, LOAD_CRM_ABM_LIST_SUCCESS } from '../../actions';
import { dynamicSort } from '../../util/ArrayUtil';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_CRM_ABM_LIST:
      return { ...state, loading: true, data: null };
    case LOAD_CRM_ABM_LIST_SUCCESS:
      return {
        ...state, loading: false, error: '', data: payload.sort(dynamicSort('name'))
      };
    case LOAD_CRM_ABM_LIST_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
