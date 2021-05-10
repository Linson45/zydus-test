import {
  LOAD_MY_PERFORMANCE_MCR_COVERAGE,
  LOAD_MY_PERFORMANCE_MCR_COVERAGE_FAIL,
  LOAD_MY_PERFORMANCE_MCR_COVERAGE_SUCCESS
} from '../../actions';

const INITIAL_STATE = {
  error: null,
  doctors_met: [],
  doctors_not_met: [],
  loading: true
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case LOAD_MY_PERFORMANCE_MCR_COVERAGE:
      return {
        ...state, loading: true, doctors_met: [], doctors_not_met: [], error: null
      };
    case LOAD_MY_PERFORMANCE_MCR_COVERAGE_SUCCESS:
      const doctors_met = []; const
        doctors_not_met = [];
      payload.forEach((doctor) => {
        if (doctor.doctor_met) doctors_met.push(doctor);
        else doctors_not_met.push(doctor);
      });
      return {
        ...state, loading: false, doctors_met, doctors_not_met, error: null
      };
    case LOAD_MY_PERFORMANCE_MCR_COVERAGE_FAIL:
      return {
        ...state, loading: false, doctors_met: [], doctors_not_met: [], error
      };
    default:
      return state;
  }
};
