import { LOAD_CONTACT_DOCTOR, LOAD_CONTACT_DOCTOR_FAIL, LOAD_CONTACT_DOCTOR_SUCCESS } from '../../actions';
import { dynamicSort } from '../../util/ArrayUtil';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_CONTACT_DOCTOR:
      return { ...state, loading: true, data: formatDocs(payload) };
    case LOAD_CONTACT_DOCTOR_SUCCESS:
      return {
        ...state, loading: false, error: '', data: formatDocs(payload)
      };
    case LOAD_CONTACT_DOCTOR_FAIL:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};

const formatDocs = (doctors) => {
  if (!doctors) {
    doctors = [];
  }
  doctors = doctors.map((doctor) => {
    let { mcr_no } = doctor;
    if (!mcr_no) {
      mcr_no = 0;
    } else {
      mcr_no = parseInt(mcr_no);
    }
    return {
      ...doctor, mcr_no
    };
  });
  return doctors.sort(dynamicSort('mcr_no'));
};
