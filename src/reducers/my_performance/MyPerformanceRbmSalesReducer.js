import {
  LOAD_MY_PERFORMANCE_RBM_AREA_WISE_SALES,
  LOAD_MY_PERFORMANCE_RBM_AREA_WISE_SALES_FAIL,
  LOAD_MY_PERFORMANCE_RBM_AREA_WISE_SALES_SUCCESS,
  LOAD_MY_PERFORMANCE_RBM_BRAND_WISE_SALES,
  LOAD_MY_PERFORMANCE_RBM_BRAND_WISE_SALES_FAIL,
  LOAD_MY_PERFORMANCE_RBM_BRAND_WISE_SALES_SUCCESS
} from '../../actions';

const INITIAL_STATE = {
  error: null,
  rbmAreWiseSales: null,
  rbmAreWiseSalesLoading: true,
  rbmBrandWiseSales: null,
  rbmBrandWiseSalesLoading: true
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case LOAD_MY_PERFORMANCE_RBM_AREA_WISE_SALES:
      return { ...state, rbmAreWiseSalesLoading: true, rbmAreWiseSales: null };
    case LOAD_MY_PERFORMANCE_RBM_AREA_WISE_SALES_SUCCESS:
      return {
        ...state, rbmAreWiseSalesLoading: false, error: '', rbmAreWiseSales: payload
      };
    case LOAD_MY_PERFORMANCE_RBM_AREA_WISE_SALES_FAIL:
      return {
        ...state, rbmAreWiseSalesLoading: false, error, rbmAreWiseSales: null
      };
    case LOAD_MY_PERFORMANCE_RBM_BRAND_WISE_SALES:
      return { ...state, rbmBrandWiseSalesLoading: true, rbmBrandWiseSales: null };
    case LOAD_MY_PERFORMANCE_RBM_BRAND_WISE_SALES_SUCCESS:
      return {
        ...state, rbmBrandWiseSalesLoading: false, error: '', rbmBrandWiseSales: payload
      };
    case LOAD_MY_PERFORMANCE_RBM_BRAND_WISE_SALES_FAIL:
      return {
        ...state, rbmBrandWiseSalesLoading: false, error, rbmBrandWiseSales: null
      };
    default:
      return state;
  }
};
