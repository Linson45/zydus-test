import {
  LOAD_MY_PERFORMANCE_SUB_HO_BRAND_WISE_SALES,
  LOAD_MY_PERFORMANCE_SUB_HO_BRAND_WISE_SALES_FAIL,
  LOAD_MY_PERFORMANCE_SUB_HO_BRAND_WISE_SALES_SUCCESS,
  LOAD_MY_PERFORMANCE_SUB_HO_ZONE_WISE_SALES,
  LOAD_MY_PERFORMANCE_SUB_HO_ZONE_WISE_SALES_FAIL,
  LOAD_MY_PERFORMANCE_SUB_HO_ZONE_WISE_SALES_SUCCESS
} from '../../actions';

const INITIAL_STATE = {
  error: null,
  subHoZoneWiseSales: null,
  subHoZoneWiseSalesLoading: true,
  subHoBrandWiseSales: null,
  subHoBrandWiseSalesLoading: true
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case LOAD_MY_PERFORMANCE_SUB_HO_ZONE_WISE_SALES:
      return { ...state, subHoZoneWiseSalesLoading: true, subHoZoneWiseSales: null };
    case LOAD_MY_PERFORMANCE_SUB_HO_ZONE_WISE_SALES_SUCCESS:
      return {
        ...state, subHoZoneWiseSalesLoading: false, error: '', subHoZoneWiseSales: payload
      };
    case LOAD_MY_PERFORMANCE_SUB_HO_ZONE_WISE_SALES_FAIL:
      return {
        ...state, subHoZoneWiseSalesLoading: false, error, subHoZoneWiseSales: null
      };
    case LOAD_MY_PERFORMANCE_SUB_HO_BRAND_WISE_SALES:
      return { ...state, subHoBrandWiseSalesLoading: true, subHoBrandWiseSales: null };
    case LOAD_MY_PERFORMANCE_SUB_HO_BRAND_WISE_SALES_SUCCESS:
      return {
        ...state, subHoBrandWiseSalesLoading: false, error: '', subHoBrandWiseSales: payload
      };
    case LOAD_MY_PERFORMANCE_SUB_HO_BRAND_WISE_SALES_FAIL:
      return {
        ...state, subHoBrandWiseSalesLoading: false, error, subHoBrandWiseSales: null
      };
    default:
      return state;
  }
};
