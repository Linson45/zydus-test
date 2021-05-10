import {
  LOAD_MY_PERFORMANCE_ABM_BRAND_WISE_SALES,
  LOAD_MY_PERFORMANCE_ABM_BRAND_WISE_SALES_FAIL,
  LOAD_MY_PERFORMANCE_ABM_BRAND_WISE_SALES_SUCCESS,
  LOAD_MY_PERFORMANCE_ABM_HQ_WISE_SALES,
  LOAD_MY_PERFORMANCE_ABM_HQ_WISE_SALES_FAIL,
  LOAD_MY_PERFORMANCE_ABM_HQ_WISE_SALES_SUCCESS
} from '../../actions';

const INITIAL_STATE = {
  error: null,
  abmHqWiseSales: null,
  abmHqWiseSalesLoading: true,
  abmBrandWiseSales: null,
  abmBrandWiseSalesLoading: true
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case LOAD_MY_PERFORMANCE_ABM_HQ_WISE_SALES:
      return { ...state, abmHqWiseSalesLoading: true, abmHqWiseSales: null };
    case LOAD_MY_PERFORMANCE_ABM_HQ_WISE_SALES_SUCCESS:
      return {
        ...state, abmHqWiseSalesLoading: false, error: '', abmHqWiseSales: payload
      };
    case LOAD_MY_PERFORMANCE_ABM_HQ_WISE_SALES_FAIL:
      return {
        ...state, abmHqWiseSalesLoading: false, error, abmHqWiseSales: null
      };
    case LOAD_MY_PERFORMANCE_ABM_BRAND_WISE_SALES:
      return { ...state, abmBrandWiseSalesLoading: true, abmBrandWiseSales: null };
    case LOAD_MY_PERFORMANCE_ABM_BRAND_WISE_SALES_SUCCESS:
      return {
        ...state, abmBrandWiseSalesLoading: false, error: '', abmBrandWiseSales: payload
      };
    case LOAD_MY_PERFORMANCE_ABM_BRAND_WISE_SALES_FAIL:
      return {
        ...state, abmBrandWiseSalesLoading: false, error, abmBrandWiseSales: null
      };
    default:
      return state;
  }
};
