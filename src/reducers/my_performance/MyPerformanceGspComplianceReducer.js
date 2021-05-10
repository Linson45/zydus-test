import {
  LOAD_MY_PERFORMANCE_GSP_COMPLIANCE,
  LOAD_MY_PERFORMANCE_GSP_COMPLIANCE_FAIL,
  LOAD_MY_PERFORMANCE_GSP_COMPLIANCE_SUCCESS
} from '../../actions';

const INITIAL_STATE = {
  error: null,
  doctors_compliance: [],
  doctors_not_compliance: [],
  loading: true
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case LOAD_MY_PERFORMANCE_GSP_COMPLIANCE:
      return {
        ...state, loading: true, doctors_compliance: [], doctors_not_compliance: [], error: null
      };
    case LOAD_MY_PERFORMANCE_GSP_COMPLIANCE_SUCCESS:
      const doctors_compliance = []; const
        doctors_not_compliance = [];
      payload.forEach((doctor) => {
        if (doctor.compliance) doctors_compliance.push(doctor);
        else doctors_not_compliance.push(doctor);
      });
      return {
        ...state, loading: false, doctors_compliance, doctors_not_compliance, error: null
      };
    case LOAD_MY_PERFORMANCE_GSP_COMPLIANCE_FAIL:
      return {
        ...state, loading: false, doctors_compliance: [], doctors_not_compliance: [], error
      };
    default:
      return state;
  }
};
