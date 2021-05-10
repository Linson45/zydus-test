import { DELETE_DAILY_PLAN_VIRTUAL_DETAILING_ITEM, SET_DAILY_PLAN_VIRTUAL_DETAILING_FORM } from '../../actions';

const INITIAL_STATE = {
  team: [],
  doctors: []
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_DAILY_PLAN_VIRTUAL_DETAILING_FORM:
      const { team, doctors } = payload;
      return { ...state, team, doctors };
    case DELETE_DAILY_PLAN_VIRTUAL_DETAILING_ITEM:
      let finalTeam = [];
      let finalDoctors = [];
      const { code } = payload;
      if (payload.type === 'team') {
        state.team.forEach((user) => {
          if (user.rep_code !== code) {
            finalTeam.push(user);
          }
        });
        finalDoctors = state.doctors;
      }
      if (payload.type === 'doctor') {
        state.doctors.forEach((doctor) => {
          if (doctor.doc_code !== code) {
            finalDoctors.push(doctor);
          }
        });
        finalTeam = state.team;
      }
      return { ...state, team: finalTeam, doctors: finalDoctors };
    default:
      return state;
  }
};
