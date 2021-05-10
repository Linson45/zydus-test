import {
  LOAD_RBM_COACH_MAP_DETAIL,
  LOAD_RBM_COACH_MAP_DETAIL_FAIL,
  LOAD_RBM_COACH_MAP_DETAIL_SUCCESS
} from '../../actions';
import { dynamicSort } from '../../util/ArrayUtil';
import { Role } from '../../util/Constants';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  let { payload } = action;
  const { type } = action;
  switch (type) {
    case LOAD_RBM_COACH_MAP_DETAIL:
      return { ...state, loading: true, data: null };
    case LOAD_RBM_COACH_MAP_DETAIL_SUCCESS:
      const leader_map = []; const
        coach_map = [];
      if (payload) {
        payload = payload.sort(dynamicSort('uname'));
        payload.forEach((user) => {
          if (user.group_code === Role.BO) coach_map.push(user);
          else if (user.group_code === Role.ABM) leader_map.push(user);
        });
      }
      return {
        ...state, loading: false, error: '', data: { leader_map, coach_map }
      };
    case LOAD_RBM_COACH_MAP_DETAIL_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
