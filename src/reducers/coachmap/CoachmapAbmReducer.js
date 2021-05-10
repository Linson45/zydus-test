import {
  LOAD_ABM_COACH_MAP_DETAIL,
  LOAD_ABM_COACH_MAP_DETAIL_FAIL,
  LOAD_ABM_COACH_MAP_DETAIL_SUCCESS
} from '../../actions';
import { dynamicSort } from '../../util/ArrayUtil';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  let { payload } = action;
  const { type } = action;
  switch (type) {
    case LOAD_ABM_COACH_MAP_DETAIL:
      return { ...state, loading: true, data: null };
    case LOAD_ABM_COACH_MAP_DETAIL_SUCCESS:
      if (payload) {
        payload = payload.sort(dynamicSort('uname'));
      }
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_ABM_COACH_MAP_DETAIL_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
