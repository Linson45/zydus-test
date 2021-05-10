import { dynamicSort } from '../../util/ArrayUtil';
import {
  LOAD_DAILY_PLAN_RBM_BO_LIST,
  LOAD_DAILY_PLAN_RBM_BO_LIST_FAIL,
  LOAD_DAILY_PLAN_RBM_BO_LIST_SUCCESS,
  RESET_DAILY_PLAN_RBMS
} from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_DAILY_PLAN_RBM_BO_LIST:
      return { ...state, loading: true };
    case LOAD_DAILY_PLAN_RBM_BO_LIST_SUCCESS:
      const regions = payload.map((region) => {
        region.bos = region.bos.sort(dynamicSort('name')).sort(dynamicSort('-is_jfw'));
        return region;
      });
      return {
        ...state, loading: false, error: '', data: regions
      };
    case LOAD_DAILY_PLAN_RBM_BO_LIST_FAIL:
      return {
        ...state, loading: false, error: payload.error, data: []
      };
    case RESET_DAILY_PLAN_RBMS:
      return { ...state, data: [] };
    default:
      return state;
  }
};
