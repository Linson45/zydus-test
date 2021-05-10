import moment from 'moment';
import { LOAD_BO_DAILY_PLAN_OFFLINE, LOAD_BO_DAILY_PLAN_FAIL_OFFLINE, LOAD_BO_DAILY_PLAN_SUCCESS_OFFLINE } from '../../actions';
import { dynamicSort } from '../../util/ArrayUtil';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_BO_DAILY_PLAN_OFFLINE:
      return { ...state, loading: true, data: null };
    case LOAD_BO_DAILY_PLAN_SUCCESS_OFFLINE:
      if (payload.doctors_planned) {
        let docs = [];
        const docCodes = [];
        payload.doctors_planned.forEach((doctor) => {
          const { doc_code } = doctor;
          const { virtual_call_schedule } = doctor;
          if (virtual_call_schedule) {
            doctor.virtual_start_time = moment(virtual_call_schedule.start_time, 'DD-MMM-YY HH.mm.ss.s a').valueOf();
          } else {
            doctor.virtual_start_time = moment('2100-01-01').valueOf();
          }
          if (docCodes.indexOf(doc_code) === -1) {
            docs.push(doctor);
            docCodes.push(doc_code);
          }
        });
        docs = docs.sort(dynamicSort('doc_name'));
        docs = docs.sort(dynamicSort('virtual_start_time'));
        payload.doctors_planned = docs;
      }
      return {
        ...state, loading: false, error: '', data: payload
      };
    case LOAD_BO_DAILY_PLAN_FAIL_OFFLINE:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};
