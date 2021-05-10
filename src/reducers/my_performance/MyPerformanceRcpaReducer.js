import { LOAD_MY_PERFORMANCE_RCPA, LOAD_MY_PERFORMANCE_RCPA_FAIL, LOAD_MY_PERFORMANCE_RCPA_SUCCESS } from '../../actions';

const INITIAL_STATE = {
  error: null,
  doctors_rcpa: [],
  doctors_not_rcpa: [],
  loading: true
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case LOAD_MY_PERFORMANCE_RCPA:
      return {
        ...state, loading: true, doctors_rcpa: [], doctors_not_rcpa: [], error: null
      };
    case LOAD_MY_PERFORMANCE_RCPA_SUCCESS:
      const doctors_rcpa = []; const
        doctors_not_rcpa = [];
      payload.forEach((doctor) => {
        if (doctor.doctor_rcpaed) doctors_rcpa.push(doctor);
        else doctors_not_rcpa.push(doctor);
      });
      return {
        ...state, loading: false, doctors_rcpa, doctors_not_rcpa, error: null
      };
    case LOAD_MY_PERFORMANCE_RCPA_FAIL:
      return {
        ...state, loading: false, doctors_rcpa: [], doctors_not_rcpa: [], error
      };
    default:
      return state;
  }
};
