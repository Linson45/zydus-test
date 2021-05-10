import api from '../api';
import Urls from '../api/urls';
import Adapter from '../util/Adapter';
import { Role } from '../util/Constants';

export const LOAD_MY_PERFORMANCE_BO_SALES = 'load_my_performance_bo_sales';
export const LOAD_MY_PERFORMANCE_BO_SALES_SUCCESS = 'load_my_performance_bo_sales_success';
export const LOAD_MY_PERFORMANCE_BO_SALES_FAIL = 'load_my_performance_bo_sales_fail';

export const LOAD_MY_PERFORMANCE_BO_EFFORTS = 'load_my_performance_bo_efforts';
export const LOAD_MY_PERFORMANCE_BO_EFFORTS_SUCCESS = 'load_my_performance_bo_efforts_success';
export const LOAD_MY_PERFORMANCE_BO_EFFORTS_FAIL = 'load_my_performance_bo_efforts_fail';

export const LOAD_MY_PERFORMANCE_MCR_COVERAGE = 'load_my_performance_mcr_coverage';
export const LOAD_MY_PERFORMANCE_MCR_COVERAGE_SUCCESS = 'load_my_performance_mcr_coverage_success';
export const LOAD_MY_PERFORMANCE_MCR_COVERAGE_FAIL = 'load_my_performance_mcr_coverage_fail';

export const LOAD_MY_PERFORMANCE_GSP_COMPLIANCE = 'load_my_performance_gsp_compliance';
export const LOAD_MY_PERFORMANCE_GSP_COMPLIANCE_SUCCESS = 'load_my_performance_gsp_compliance_success';
export const LOAD_MY_PERFORMANCE_GSP_COMPLIANCE_FAIL = 'load_my_performance_gsp_compliance_fail';

export const LOAD_MY_PERFORMANCE_RCPA = 'load_my_performance_rcpa';
export const LOAD_MY_PERFORMANCE_RCPA_SUCCESS = 'load_my_performance_rcpa_success';
export const LOAD_MY_PERFORMANCE_RCPA_FAIL = 'load_my_performance_rcpa_fail';

export const LOAD_MY_PERFORMANCE_BRAND_WISE_SALES = 'load_my_performance_brand_wise_sales';
export const LOAD_MY_PERFORMANCE_BRAND_WISE_SALES_SUCCESS = 'load_my_performance_brand_wise_sales_success';
export const LOAD_MY_PERFORMANCE_BRAND_WISE_SALES_FAIL = 'load_my_performance_brand_wise_sales_fail';

export const LOAD_MY_PERFORMANCE_SKU_WISE_SALES = 'load_my_performance_sku_wise_sales';
export const LOAD_MY_PERFORMANCE_SKU_WISE_SALES_SUCCESS = 'load_my_performance_sku_wise_sales_success';
export const LOAD_MY_PERFORMANCE_SKU_WISE_SALES_FAIL = 'load_my_performance_sku_wise_sales_fail';

export const LOAD_MY_PERFORMANCE_ABM_SALES = 'load_my_performance_abm_sales';
export const LOAD_MY_PERFORMANCE_ABM_SALES_SUCCESS = 'load_my_performance_abm_sales_success';
export const LOAD_MY_PERFORMANCE_ABM_SALES_FAIL = 'load_my_performance_abm_sales_fail';

export const LOAD_MY_PERFORMANCE_ABM_EFFORTS = 'load_my_performance_abm_efforts';
export const LOAD_MY_PERFORMANCE_ABM_EFFORTS_SUCCESS = 'load_my_performance_abm_efforts_success';
export const LOAD_MY_PERFORMANCE_ABM_EFFORTS_FAIL = 'load_my_performance_abm_efforts_fail';

export const LOAD_MY_PERFORMANCE_ABM_AGGREGATED_EFFORTS = 'load_my_performance_abm_aggregated_efforts';
export const LOAD_MY_PERFORMANCE_ABM_AGGREGATED_EFFORTS_SUCCESS = 'load_my_performance_abm_aggregated_efforts_success';
export const LOAD_MY_PERFORMANCE_ABM_AGGREGATED_EFFORTS_FAIL = 'load_my_performance_abm_aggregated_efforts_fail';

export const LOAD_MY_PERFORMANCE_JCC_COMPLIANCE = 'load_my_performance_jcc_compliance';
export const LOAD_MY_PERFORMANCE_JCC_COMPLIANCE_SUCCESS = 'load_my_performance_jcc_compliance_success';
export const LOAD_MY_PERFORMANCE_JCC_COMPLIANCE_FAIL = 'load_my_performance_jcc_compliance_fail';

export const LOAD_MY_PERFORMANCE_JFW_BO_LIST = 'load_my_performance_jfw_bo_list';
export const LOAD_MY_PERFORMANCE_JFW_BO_LIST_SUCCESS = 'load_my_performance_jfw_bo_list_success';
export const LOAD_MY_PERFORMANCE_JFW_BO_LIST_FAIL = 'load_my_performance_jfw_bo_list_fail';

export const LOAD_MY_PERFORMANCE_MCR_BO_LIST = 'load_my_performance_mcr_bo_list';
export const LOAD_MY_PERFORMANCE_MCR_BO_LIST_SUCCESS = 'load_my_performance_mcr_bo_list_success';
export const LOAD_MY_PERFORMANCE_MCR_BO_LIST_FAIL = 'load_my_performance_mcr_bo_list_fail';

export const LOAD_MY_PERFORMANCE_GSP_COMPLIANCE_BO_LIST = 'load_my_performance_gsp_compliance_bo_list';
export const LOAD_MY_PERFORMANCE_GSP_COMPLIANCE_BO_LIST_SUCCESS = 'load_my_performance_gsp_compliance_bo_list_success';
export const LOAD_MY_PERFORMANCE_GSP_COMPLIANCE_BO_LIST_FAIL = 'load_my_performance_gsp_compliance_bo_list_fail';

export const LOAD_MY_PERFORMANCE_RCPA_BO_LIST = 'load_my_performance_rcpa_bo_list';
export const LOAD_MY_PERFORMANCE_RCPA_BO_LIST_SUCCESS = 'load_my_performance_rcpa_bo_list_success';
export const LOAD_MY_PERFORMANCE_RCPA_BO_LIST_FAIL = 'load_my_performance_rcpa_bo_list_fail';

export const LOAD_MY_PERFORMANCE_CALL_AVG_BO_LIST = 'load_my_performance_call_avg_bo_list';
export const LOAD_MY_PERFORMANCE_CALL_AVG_BO_LIST_SUCCESS = 'load_my_performance_call_avg_bo_list_success';
export const LOAD_MY_PERFORMANCE_CALL_AVG_BO_LIST_FAIL = 'load_my_performance_call_avg_bo_list_fail';

export const LOAD_MY_PERFORMANCE_ABM_HQ_WISE_SALES = 'load_my_performance_abm_hq_wise_sales';
export const LOAD_MY_PERFORMANCE_ABM_HQ_WISE_SALES_SUCCESS = 'load_my_performance_abm_hq_wise_sales_success';
export const LOAD_MY_PERFORMANCE_ABM_HQ_WISE_SALES_FAIL = 'load_my_performance_abm_hq_wise_sales_fail';

export const LOAD_MY_PERFORMANCE_ABM_BRAND_WISE_SALES = 'load_my_performance_abm_brand_wise_sales';
export const LOAD_MY_PERFORMANCE_ABM_BRAND_WISE_SALES_SUCCESS = 'load_my_performance_abm_brand_wise_sales_success';
export const LOAD_MY_PERFORMANCE_ABM_BRAND_WISE_SALES_FAIL = 'load_my_performance_abm_brand_wise_sales_fail';

export const LOAD_MY_PERFORMANCE_RBM_AREA_WISE_SALES = 'load_my_performance_rbm_area_wise_sales';
export const LOAD_MY_PERFORMANCE_RBM_AREA_WISE_SALES_SUCCESS = 'load_my_performance_rbm_area_wise_sales_success';
export const LOAD_MY_PERFORMANCE_RBM_AREA_WISE_SALES_FAIL = 'load_my_performance_rbm_area_wise_sales_fail';

export const LOAD_MY_PERFORMANCE_RBM_BRAND_WISE_SALES = 'load_my_performance_rbm_brand_wise_sales';
export const LOAD_MY_PERFORMANCE_RBM_BRAND_WISE_SALES_SUCCESS = 'load_my_performance_rbm_brand_wise_sales_success';
export const LOAD_MY_PERFORMANCE_RBM_BRAND_WISE_SALES_FAIL = 'load_my_performance_rbm_brand_wise_sales_fail';

export const LOAD_MY_PERFORMANCE_ABM_PCPM = 'load_my_performance_abm_pcpm';
export const LOAD_MY_PERFORMANCE_ABM_PCPM_SUCCESS = 'load_my_performance_abm_pcpm_success';
export const LOAD_MY_PERFORMANCE_ABM_PCPM_FAIL = 'load_my_performance_abm_pcpm_fail';

export const LOAD_MY_PERFORMANCE_RBM_PCPM = 'load_my_performance_rbm_pcpm';
export const LOAD_MY_PERFORMANCE_RBM_PCPM_SUCCESS = 'load_my_performance_rbm_pcpm_success';
export const LOAD_MY_PERFORMANCE_RBM_PCPM_FAIL = 'load_my_performance_rbm_pcpm_fail';

export const LOAD_MY_PERFORMANCE_ZBM_PCPM = 'load_my_performance_zbm_pcpm';
export const LOAD_MY_PERFORMANCE_ZBM_PCPM_SUCCESS = 'load_my_performance_zbm_pcpm_success';
export const LOAD_MY_PERFORMANCE_ZBM_PCPM_FAIL = 'load_my_performance_zbm_pcpm_fail';

export const LOAD_MY_PERFORMANCE_HO_PCPM = 'load_my_performance_ho_pcpm';
export const LOAD_MY_PERFORMANCE_HO_PCPM_SUCCESS = 'load_my_performance_ho_pcpm_success';
export const LOAD_MY_PERFORMANCE_HO_PCPM_FAIL = 'load_my_performance_ho_pcpm_fail';

export const LOAD_MY_PERFORMANCE_SUB_HO_PCPM = 'load_my_performance_sub_ho_pcpm';
export const LOAD_MY_PERFORMANCE_SUB_HO_PCPM_SUCCESS = 'load_my_performance_sub_ho_pcpm_success';
export const LOAD_MY_PERFORMANCE_SUB_HO_PCPM_FAIL = 'load_my_performance_sub_ho_pcpm_fail';

export const LOAD_MY_PERFORMANCE_ZBM_SALES = 'load_my_performance_zbm_sales';
export const LOAD_MY_PERFORMANCE_ZBM_SALES_SUCCESS = 'load_my_performance_zbm_sales_success';
export const LOAD_MY_PERFORMANCE_ZBM_SALES_FAIL = 'load_my_performance_zbm_sales_fail';

export const LOAD_MY_PERFORMANCE_ZBM_AGGREGATED_EFFORTS = 'load_my_performance_zbm_aggregated_efforts';
export const LOAD_MY_PERFORMANCE_ZBM_AGGREGATED_EFFORTS_SUCCESS = 'load_my_performance_zbm_aggregated_efforts_success';
export const LOAD_MY_PERFORMANCE_ZBM_AGGREGATED_EFFORTS_FAIL = 'load_my_performance_zbm_aggregated_efforts_fail';

export const LOAD_MY_PERFORMANCE_ZBM_REGION_WISE_SALES = 'load_my_performance_zbm_region_wise_sales';
export const LOAD_MY_PERFORMANCE_ZBM_REGION_WISE_SALES_SUCCESS = 'load_my_performance_zbm_region_wise_sales_success';
export const LOAD_MY_PERFORMANCE_ZBM_REGION_WISE_SALES_FAIL = 'load_my_performance_zbm_region_wise_sales_fail';

export const LOAD_MY_PERFORMANCE_ZBM_BRAND_WISE_SALES = 'load_my_performance_zbm_brand_wise_sales';
export const LOAD_MY_PERFORMANCE_ZBM_BRAND_WISE_SALES_SUCCESS = 'load_my_performance_zbm_brand_wise_sales_success';
export const LOAD_MY_PERFORMANCE_ZBM_BRAND_WISE_SALES_FAIL = 'load_my_performance_zbm_brand_wise_sales_fail';

export const LOAD_MY_PERFORMANCE_HO_SALES = 'load_my_performance_ho_sales';
export const LOAD_MY_PERFORMANCE_HO_SALES_SUCCESS = 'load_my_performance_ho_sales_success';
export const LOAD_MY_PERFORMANCE_HO_SALES_FAIL = 'load_my_performance_ho_sales_fail';

export const LOAD_MY_PERFORMANCE_HO_AGGREGATED_EFFORTS = 'load_my_performance_ho_aggregated_efforts';
export const LOAD_MY_PERFORMANCE_HO_AGGREGATED_EFFORTS_SUCCESS = 'load_my_performance_ho_aggregated_efforts_success';
export const LOAD_MY_PERFORMANCE_HO_AGGREGATED_EFFORTS_FAIL = 'load_my_performance_ho_aggregated_efforts_fail';

export const LOAD_MY_PERFORMANCE_HO_DIVISION_WISE_SALES = 'load_my_performance_ho_division_wise_sales';
export const LOAD_MY_PERFORMANCE_HO_DIVISION_WISE_SALES_SUCCESS = 'load_my_performance_ho_division_wise_sales_success';
export const LOAD_MY_PERFORMANCE_HO_DIVISION_WISE_SALES_FAIL = 'load_my_performance_ho_division_wise_sales_fail';

export const LOAD_MY_PERFORMANCE_SUB_HO_ZONE_WISE_SALES = 'load_my_performance_sub_ho_zone_wise_sales';
export const LOAD_MY_PERFORMANCE_SUB_HO_ZONE_WISE_SALES_SUCCESS = 'load_my_performance_sub_ho_zone_wise_sales_success';
export const LOAD_MY_PERFORMANCE_SUB_HO_ZONE_WISE_SALES_FAIL = 'load_my_performance_sub_ho_zone_wise_sales_fail';

export const LOAD_MY_PERFORMANCE_SUB_HO_BRAND_WISE_SALES = 'load_my_performance_sub_ho_brand_wise_sales';
export const LOAD_MY_PERFORMANCE_SUB_HO_BRAND_WISE_SALES_SUCCESS = 'load_my_performance_sub_ho_brand_wise_sales_success';
export const LOAD_MY_PERFORMANCE_SUB_HO_BRAND_WISE_SALES_FAIL = 'load_my_performance_sub_ho_brand_wise_sales_fail';

export const LOAD_MY_PERFORMANCE_SALES_TREND = 'load_my_performance_sales_trend';
export const LOAD_MY_PERFORMANCE_SALES_TREND_SUCCESS = 'load_my_performance_sales_trend_success';
export const LOAD_MY_PERFORMANCE_SALES_TREND_FAIL = 'load_my_performance_sales_trend_fail';

export const LOAD_MY_PERFORMANCE_SBUS = 'load_my_performance_sbus';
export const LOAD_MY_PERFORMANCE_SBUS_SUCCESS = 'load_my_performance_sbus_success';
export const LOAD_MY_PERFORMANCE_SBUS_FAIL = 'load_my_performance_sbus_fail';

export const LOAD_MY_PERFORMANCE_REGIONS = 'load_my_performance_regions';
export const LOAD_MY_PERFORMANCE_REGIONS_SUCCESS = 'load_my_performance_regions_success';
export const LOAD_MY_PERFORMANCE_REGIONS_FAIL = 'load_my_performance_regions_fail';

export const MY_PERFORMANCE_RESET_REGIONS = 'my_performance_reset_regions';
export const MY_PERFORMANCE_RESET_EMPLOYEES = 'my_performance_reset_employees';

export const LOAD_MY_PERFORMANCE_DETAILING = 'load_my_performance_detailing';
export const LOAD_MY_PERFORMANCE_DETAILING_SUCCESS = 'load_my_performance_detailing_success';
export const LOAD_MY_PERFORMANCE_DETAILING_FAIL = 'load_my_performance_detailing_fail';

export const loadMyPerformanceBoSales = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_BO_SALES });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_BO_SALES,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_BO_SALES_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_BO_SALES_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceBoEfforts = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_BO_EFFORTS });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_BO_EFFORTS,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_BO_EFFORTS_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_BO_EFFORTS_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceMcrCoverage = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_MCR_COVERAGE });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_MCR_COVERAGE,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_MCR_COVERAGE_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_MCR_COVERAGE_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceGspCompliance = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_GSP_COMPLIANCE });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_GSP_COMPLIANCE,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_GSP_COMPLIANCE_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_GSP_COMPLIANCE_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceRcpa = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_RCPA });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_RCPA,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_RCPA_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_RCPA_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceBrandWiseSales = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_BRAND_WISE_SALES });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_BRAND_WISE_SALES,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_BRAND_WISE_SALES_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_BRAND_WISE_SALES_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceSkuWiseSales = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_SKU_WISE_SALES });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_SKU_WISE_SALES,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_SKU_WISE_SALES_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_SKU_WISE_SALES_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceAbmSales = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_ABM_SALES });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_ABM_SALES,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_ABM_SALES_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_ABM_SALES_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceAbmEfforts = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_ABM_EFFORTS });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_ABM_EFFORTS,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_ABM_EFFORTS_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_ABM_EFFORTS_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceAbmAggregatedEfforts = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_ABM_AGGREGATED_EFFORTS });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_ABM_AGGREGATED_EFFORTS,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_ABM_AGGREGATED_EFFORTS_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_ABM_AGGREGATED_EFFORTS_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceJccCompliance = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_JCC_COMPLIANCE });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_JCC_COMPLIANCE,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_JCC_COMPLIANCE_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_JCC_COMPLIANCE_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceJfwBos = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_JFW_BO_LIST });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_JFW_BO_LIST,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_JFW_BO_LIST_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_JFW_BO_LIST_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceMcrBos = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_MCR_BO_LIST });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_MCR_BO_LIST,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_MCR_BO_LIST_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_MCR_BO_LIST_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceGspComplianceBos = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_GSP_COMPLIANCE_BO_LIST });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_GSP_COMPLIANCE_BO_LIST,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_GSP_COMPLIANCE_BO_LIST_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_GSP_COMPLIANCE_BO_LIST_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceRcpaBos = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_RCPA_BO_LIST });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_RCPA_BO_LIST,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_RCPA_BO_LIST_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_RCPA_BO_LIST_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceCallAvgBos = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_CALL_AVG_BO_LIST });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_CALL_AVG_BO_LIST,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_CALL_AVG_BO_LIST_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_CALL_AVG_BO_LIST_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceAbmHqWiseSales = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_ABM_HQ_WISE_SALES });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_ABM_HQ_WISE_SALES,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_ABM_HQ_WISE_SALES_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_ABM_HQ_WISE_SALES_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceAbmBrandWiseSales = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_ABM_BRAND_WISE_SALES });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_ABM_BRAND_WISE_SALES,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_ABM_BRAND_WISE_SALES_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_ABM_BRAND_WISE_SALES_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceRbmAreaWiseSales = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_RBM_AREA_WISE_SALES });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_RBM_AREA_WISE_SALES,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_RBM_AREA_WISE_SALES_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_RBM_AREA_WISE_SALES_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceRbmBrandWiseSales = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_RBM_BRAND_WISE_SALES });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_RBM_BRAND_WISE_SALES,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_RBM_BRAND_WISE_SALES_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_RBM_BRAND_WISE_SALES_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceAbmPcpm = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_ABM_PCPM });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_PCPM,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_ABM_PCPM_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_ABM_PCPM_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceRbmPcpm = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_RBM_PCPM });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_PCPM,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_RBM_PCPM_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_RBM_PCPM_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceZbmPcpm = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_ZBM_PCPM });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_PCPM,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_ZBM_PCPM_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_ZBM_PCPM_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceHoPcpm = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_HO_PCPM });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_PCPM_DIVISON_WISE,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_HO_PCPM_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_HO_PCPM_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceSubHoPcpm = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_SUB_HO_PCPM });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_PCPM_ZONE_WISE,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_SUB_HO_PCPM_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_SUB_HO_PCPM_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceZbmSales = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_ZBM_SALES });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_ZBM_SALES,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_ZBM_SALES_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_ZBM_SALES_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceZbmAggregatedEfforts = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_ZBM_AGGREGATED_EFFORTS });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_ZBM_AGGREGATED_EFFORTS,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_ZBM_AGGREGATED_EFFORTS_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_ZBM_AGGREGATED_EFFORTS_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceZbmRegionWiseSales = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_ZBM_REGION_WISE_SALES });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_ZBM_REGION_WISE_SALES,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_ZBM_REGION_WISE_SALES_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_ZBM_REGION_WISE_SALES_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceZbmBrandWiseSales = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_ZBM_BRAND_WISE_SALES });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_ZBM_BRAND_WISE_SALES,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_ZBM_BRAND_WISE_SALES_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_ZBM_BRAND_WISE_SALES_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceHoSales = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_HO_SALES });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_HO_SALES,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_HO_SALES_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_HO_SALES_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceHoAggregatedEfforts = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_HO_AGGREGATED_EFFORTS });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_HO_AGGREGATED_EFFORTS,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_HO_AGGREGATED_EFFORTS_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_HO_AGGREGATED_EFFORTS_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceHoDivisionWiseSales = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_HO_DIVISION_WISE_SALES });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_HO_DIVISION_WISE_SALES,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_HO_DIVISION_WISE_SALES_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_HO_DIVISION_WISE_SALES_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceSubHoZoneWiseSales = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_SUB_HO_ZONE_WISE_SALES });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_SUB_HO_DIVISION_WISE_SALES,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_SUB_HO_ZONE_WISE_SALES_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_SUB_HO_ZONE_WISE_SALES_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceSubHoBrandWiseSales = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_SUB_HO_BRAND_WISE_SALES });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_SUB_HO_BRAND_WISE_SALES,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_SUB_HO_BRAND_WISE_SALES_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_SUB_HO_BRAND_WISE_SALES_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceSalesTrends = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_SALES_TREND });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.GET_MY_PERFORMANCE_SALES_TREND,
    data: body
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_SALES_TREND_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_SALES_TREND_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceSbus = (rep_code) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_SBUS });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'GET',
    url: Urls.GET_MY_PERFORMANCE_SBUS,
    params: { rep_code }
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_SBUS_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_SBUS_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const loadMyPerformanceRegions = (company_code, sbu_code) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_REGIONS });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'GET',
    url: Urls.GET_MY_PERFORMANCE_REGIONS,
    params: { company_code, sbu_code }
  });

  if (statusCode === 200) {
    dispatch({ type: LOAD_MY_PERFORMANCE_REGIONS_SUCCESS, payload: data });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_REGIONS_FAIL,
      payload: { error: errorMessage }
    });
  }
};

export const myPerformanceResetRegions = () => (dispatch) => {
  dispatch({ type: MY_PERFORMANCE_RESET_REGIONS });
};

export const myPerformanceResetEmployees = () => (dispatch) => {
  dispatch({ type: MY_PERFORMANCE_RESET_EMPLOYEES });
};

export const loadMyPerformanceDetailing = (body) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_DETAILING });
  const me = await Adapter.getUser();
  const {
    company_code, sbu_code, rep_code, user_type
  } = me;
  body = {
    ...body, company_code, sbu_code, rep_code, user_type
  };

  const clmEfforts = await api({
    method: 'GET',
    url: Urls.GET_CLM_EFFORTS,
    params: body
  });

  const clmBrandEfforts = await api({
    method: 'GET',
    url: Urls.GET_CLM_BRAND_EFFORTS,
    params: body
  });

  const clmSummary = await api({
    method: 'GET',
    url: Urls.GET_CLM_EFFORT_SUMMARY,
    params: {
      sbu_code, company_code, rep_code, user_type, metrics_type: 'individual'
    }
  });

  if (clmEfforts.statusCode === 200 && clmBrandEfforts.statusCode === 200 && clmSummary.statusCode === 200) {
    dispatch({
      type: LOAD_MY_PERFORMANCE_DETAILING_SUCCESS,
      payload: {
        myEffort: clmEfforts.data, myBrandEffort: clmBrandEfforts.data, effortSummary: clmSummary.data
      }
    });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_DETAILING_FAIL,
      payload: { error: clmEfforts.errorMessage }
    });
  }
};

export const loadMyPerformanceAbmDetailing = ({ filter, aggregatedFilter }) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_DETAILING });
  const me = await Adapter.getUser();
  const {
    company_code, sbu_code, rep_code, user_type
  } = me;
  filter = {
    ...filter, company_code, sbu_code, rep_code, user_type
  };
  aggregatedFilter = {
    ...aggregatedFilter, company_code, sbu_code, rep_code, user_type
  };

  const clmEfforts = await api({
    method: 'GET',
    url: Urls.GET_CLM_EFFORTS,
    params: { ...filter, metrics_type: 'individual' }
  });

  const clmBrandEfforts = await api({
    method: 'GET',
    url: Urls.GET_CLM_BRAND_EFFORTS,
    params: { ...filter, metrics_type: 'individual' }
  });

  const { selected_bo_code } = aggregatedFilter;
  let clmAggregatedEfforts; let
    clmAggregatedBrandEfforts;
  if (selected_bo_code) {
    clmAggregatedEfforts = await api({
      method: 'GET',
      url: Urls.GET_CLM_EFFORTS,
      params: {
        ...aggregatedFilter, metrics_type: 'individual', rep_code: selected_bo_code, user_type: Role.BO
      },
    });

    clmAggregatedBrandEfforts = await api({
      method: 'GET',
      url: Urls.GET_CLM_BRAND_EFFORTS,
      params: {
        ...aggregatedFilter, metrics_type: 'individual', rep_code: selected_bo_code, user_type: Role.BO
      },
    });
  } else {
    clmAggregatedEfforts = await api({
      method: 'GET',
      url: Urls.GET_CLM_EFFORTS,
      params: { ...aggregatedFilter, metrics_type: 'bo_only' },
    });

    clmAggregatedBrandEfforts = await api({
      method: 'GET',
      url: Urls.GET_CLM_BRAND_EFFORTS,
      params: { ...aggregatedFilter, metrics_type: 'bo_only' },
    });
  }

  const clmSummary = await api({
    method: 'GET',
    url: Urls.GET_CLM_EFFORT_SUMMARY,
    params: {
      sbu_code, company_code, rep_code, user_type, metrics_type: 'bo_only'
    }
  });

  if (clmEfforts.statusCode === 200 && clmBrandEfforts.statusCode === 200
            && clmAggregatedEfforts.statusCode === 200 && clmAggregatedBrandEfforts.statusCode === 200
            && clmSummary.statusCode === 200) {
    dispatch({
      type: LOAD_MY_PERFORMANCE_DETAILING_SUCCESS,
      payload: {
        myEffort: clmEfforts.data,
        myBrandEffort: clmBrandEfforts.data,
        aggregatedEffort: clmAggregatedEfforts.data,
        aggregatedBrandEffort: clmAggregatedBrandEfforts.data,
        effortSummary: clmSummary.data
      }
    });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_DETAILING_FAIL,
      payload: { error: clmEfforts.errorMessage }
    });
  }
};

export const loadMyPerformanceRbmDetailing = ({ filter, aggregatedFilter }) => async (dispatch) => {
  dispatch({ type: LOAD_MY_PERFORMANCE_DETAILING });
  const me = await Adapter.getUser();
  const {
    company_code, sbu_code, rep_code, user_type
  } = me;
  filter = {
    ...filter, company_code, sbu_code, rep_code, user_type
  };
  aggregatedFilter = {
    ...aggregatedFilter, company_code, sbu_code, rep_code, user_type
  };

  const clmEfforts = await api({
    method: 'GET',
    url: Urls.GET_CLM_EFFORTS,
    params: { ...filter, metrics_type: 'individual' }
  });

  const clmBrandEfforts = await api({
    method: 'GET',
    url: Urls.GET_CLM_BRAND_EFFORTS,
    params: { ...filter, metrics_type: 'individual' }
  });

  const clmSummary = await api({
    method: 'GET',
    url: Urls.GET_CLM_EFFORT_SUMMARY,
    params: {
      sbu_code, company_code, rep_code, user_type, metrics_type: 'abm_and_bo'
    }
  });

  const { selected_bo_code, selected_abm_code, selected_abm_group_code } = aggregatedFilter;
  let clmAggregatedEfforts; let
    clmAggregatedBrandEfforts;

  if (selected_bo_code) {
    clmAggregatedEfforts = await api({
      method: 'GET',
      url: Urls.GET_CLM_EFFORTS,
      params: {
        ...aggregatedFilter, metrics_type: 'individual', rep_code: selected_bo_code, user_type: Role.BO
      },
    });

    clmAggregatedBrandEfforts = await api({
      method: 'GET',
      url: Urls.GET_CLM_BRAND_EFFORTS,
      params: {
        ...aggregatedFilter, metrics_type: 'individual', rep_code: selected_bo_code, user_type: Role.BO
      },
    });
  } else if (selected_abm_code) {
    clmAggregatedEfforts = await api({
      method: 'GET',
      url: Urls.GET_CLM_EFFORTS,
      params: {
        ...aggregatedFilter, metrics_type: 'individual', rep_code: selected_abm_code, user_type: Role.ABM
      },
    });

    clmAggregatedBrandEfforts = await api({
      method: 'GET',
      url: Urls.GET_CLM_BRAND_EFFORTS,
      params: {
        ...aggregatedFilter, metrics_type: 'individual', rep_code: selected_abm_code, user_type: Role.ABM
      },
    });
  } else if (selected_abm_group_code) {
    clmAggregatedEfforts = await api({
      method: 'GET',
      url: Urls.GET_CLM_EFFORTS,
      params: {
        ...aggregatedFilter, metrics_type: 'abm_and_bo', rep_code: selected_abm_group_code, user_type: Role.ABM
      },
    });

    clmAggregatedBrandEfforts = await api({
      method: 'GET',
      url: Urls.GET_CLM_BRAND_EFFORTS,
      params: {
        ...aggregatedFilter, metrics_type: 'abm_and_bo', rep_code: selected_abm_group_code, user_type: Role.ABM
      },
    });
  } else {
    clmAggregatedEfforts = await api({
      method: 'GET',
      url: Urls.GET_CLM_EFFORTS,
      params: { ...aggregatedFilter, metrics_type: 'abm_and_bo' },
    });

    clmAggregatedBrandEfforts = await api({
      method: 'GET',
      url: Urls.GET_CLM_BRAND_EFFORTS,
      params: { ...aggregatedFilter, metrics_type: 'abm_and_bo' },
    });
  }

  if (clmEfforts.statusCode === 200 && clmBrandEfforts.statusCode === 200
            && clmAggregatedEfforts.statusCode === 200 && clmAggregatedBrandEfforts.statusCode === 200
            && clmSummary.statusCode === 200) {
    dispatch({
      type: LOAD_MY_PERFORMANCE_DETAILING_SUCCESS,
      payload: {
        myEffort: clmEfforts.data,
        myBrandEffort: clmBrandEfforts.data,
        aggregatedEffort: clmAggregatedEfforts.data,
        aggregatedBrandEffort: clmAggregatedBrandEfforts.data,
        effortSummary: clmSummary.data
      }
    });
  } else {
    dispatch({
      type: LOAD_MY_PERFORMANCE_DETAILING_FAIL,
      payload: { error: clmEfforts.errorMessage }
    });
  }
};
