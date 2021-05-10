import {
  LOAD_MY_PERFORMANCE_HO_DIVISION_WISE_SALES,
  LOAD_MY_PERFORMANCE_HO_DIVISION_WISE_SALES_FAIL,
  LOAD_MY_PERFORMANCE_HO_DIVISION_WISE_SALES_SUCCESS
} from '../../actions';

const INITIAL_STATE = {
  error: null,
  hoDivisionWiseSales: null,
  hoDivisionWiseSalesLoading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case LOAD_MY_PERFORMANCE_HO_DIVISION_WISE_SALES:
      return { ...state, hoDivisionWiseSalesLoading: true, hoDivisionWiseSales: null };
    case LOAD_MY_PERFORMANCE_HO_DIVISION_WISE_SALES_SUCCESS:
      return {
        ...state, hoDivisionWiseSalesLoading: false, error: '', hoDivisionWiseSales: payload
      };
    case LOAD_MY_PERFORMANCE_HO_DIVISION_WISE_SALES_FAIL:
      return {
        ...state, hoDivisionWiseSalesLoading: false, error, hoDivisionWiseSales: null
      };
    default:
      return state;
  }
};
