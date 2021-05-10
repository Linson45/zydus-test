import { LOAD_BO_COACH_MAP, LOAD_BO_COACH_MAP_FAIL, LOAD_BO_COACH_MAP_SUCCESS } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_BO_COACH_MAP:
      return { ...state, loading: true, data: null };
    case LOAD_BO_COACH_MAP_SUCCESS:
      return {
        ...state, loading: false, error: '', data: parseData(payload)
      };
    case LOAD_BO_COACH_MAP_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};

function parseData(payload) {
  const filedBy = {};
  payload.forEach((bo) => {
    const { filed_by_rep_code } = bo;
    let files = filedBy[filed_by_rep_code];
    if (!files) files = [];
    files.push(bo);
    filedBy[filed_by_rep_code] = files;
  });
  const items = Object.keys(filedBy).map((rep_code) => {
    const files = filedBy[rep_code];
    const item = {
      filed_by_rep_code: rep_code,
      filed_by_rep_name: files[0].filed_by_rep_name,
      filed_by_desg_desc: files[0].filed_by_desg_desc,
      files,
      files_count: files.length
    };
    return item;
  });
  return items;
}
