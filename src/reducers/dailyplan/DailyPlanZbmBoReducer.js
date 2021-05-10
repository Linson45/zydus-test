import {
  LOAD_DAILY_PLAN_ZBM_BO_LIST,
  LOAD_DAILY_PLAN_ZBM_BO_LIST_FAIL,
  LOAD_DAILY_PLAN_ZBM_BO_LIST_SUCCESS
} from '../../actions';
import { dynamicSort } from '../../util/ArrayUtil';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_DAILY_PLAN_ZBM_BO_LIST:
      return { ...state, loading: true, data: [] };
    case LOAD_DAILY_PLAN_ZBM_BO_LIST_SUCCESS:
      const regions = payload.map((region) => {
        region.bos = region.bos.sort(dynamicSort('name')).sort(dynamicSort('-jfw'));
        return region;
      });
      return {
        ...state, loading: false, error: '', data: regions
      };
    case LOAD_DAILY_PLAN_ZBM_BO_LIST_FAIL:
      return {
        ...state, loading: false, error: payload.error, data: []
      };
    default:
      return state;
  }
};
