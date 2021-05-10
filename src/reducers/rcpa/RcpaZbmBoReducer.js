import { LOAD_RCPA_ZBM_BO_LIST, LOAD_RCPA_ZBM_BO_LIST_FAIL, LOAD_RCPA_ZBM_BO_LIST_SUCCESS } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_RCPA_ZBM_BO_LIST:
      return { ...state, loading: true, data: [] };
    case LOAD_RCPA_ZBM_BO_LIST_SUCCESS:
      const regions = payload.map((region) => {
        region.bos = region.bos.sort(dynamicSort('name'));
        return region;
      });
      return {
        ...state, loading: false, error: '', data: regions
      };
    case LOAD_RCPA_ZBM_BO_LIST_FAIL:
      return {
        ...state, loading: false, error: payload.error, data: []
      };
    default:
      return state;
  }
};

function dynamicSort(property) {
  let sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  return (a, b) => {
    const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  };
}
