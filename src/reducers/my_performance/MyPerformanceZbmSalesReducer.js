import {
  LOAD_MY_PERFORMANCE_ZBM_BRAND_WISE_SALES,
  LOAD_MY_PERFORMANCE_ZBM_BRAND_WISE_SALES_FAIL,
  LOAD_MY_PERFORMANCE_ZBM_BRAND_WISE_SALES_SUCCESS,
  LOAD_MY_PERFORMANCE_ZBM_REGION_WISE_SALES,
  LOAD_MY_PERFORMANCE_ZBM_REGION_WISE_SALES_FAIL,
  LOAD_MY_PERFORMANCE_ZBM_REGION_WISE_SALES_SUCCESS
} from '../../actions';

const INITIAL_STATE = {
  error: null,
  zbmRegionWiseSales: null,
  zbmRegionWiseSalesLoading: true,
  zbmBrandWiseSales: null,
  zbmBrandWiseSalesLoading: true
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case LOAD_MY_PERFORMANCE_ZBM_REGION_WISE_SALES:
      return { ...state, zbmRegionWiseSalesLoading: true, zbmRegionWiseSales: null };
    case LOAD_MY_PERFORMANCE_ZBM_REGION_WISE_SALES_SUCCESS:
      return {
        ...state, zbmRegionWiseSalesLoading: false, error: '', zbmRegionWiseSales: payload
      };
    case LOAD_MY_PERFORMANCE_ZBM_REGION_WISE_SALES_FAIL:
      return {
        ...state, zbmRegionWiseSalesLoading: false, error, zbmRegionWiseSales: null
      };
    case LOAD_MY_PERFORMANCE_ZBM_BRAND_WISE_SALES:
      return { ...state, zbmBrandWiseSalesLoading: true, zbmBrandWiseSales: null };
    case LOAD_MY_PERFORMANCE_ZBM_BRAND_WISE_SALES_SUCCESS:
      return {
        ...state, zbmBrandWiseSalesLoading: false, error: '', zbmBrandWiseSales: payload
      };
    case LOAD_MY_PERFORMANCE_ZBM_BRAND_WISE_SALES_FAIL:
      return {
        ...state, zbmBrandWiseSalesLoading: false, error, zbmBrandWiseSales: null
      };
    default:
      return state;
  }
};
