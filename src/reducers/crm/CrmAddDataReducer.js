import {
  CRM_ADD_PAST_ENGAGEMENT,
  CRM_SELECT_ABM,
  CRM_SELECT_BO,
  CRM_SELECT_DOCTOR, CRM_UPDATE_ACTION_PLAN, CRM_UPDATE_ANSWER, CRM_UPDATE_ENGAGEMENT_DETAIL_PARAM,
  CRM_UPDATE_PARAM,
  LOAD_CRM_DOC_METRIC,
  LOAD_CRM_DOC_METRIC_FAIL,
  LOAD_CRM_DOC_METRIC_SUCCESS,
  LOAD_CRM_DOCTOR_BO_ENGAGEMENT,
  LOAD_CRM_DOCTOR_BO_ENGAGEMENT_SUCCESS,
  LOAD_CRM_QUESTIONS, LOAD_CRM_QUESTIONS_FAIL,
  LOAD_CRM_QUESTIONS_SUCCESS,
  RESET_SUBMIT
} from '../../actions';

const INITIAL_STATE = {
  abm: null,
  bo: null,
  doctor: null,
  is_review: false,
  engagement: null,
  past_engagements: [],
  doc_matrics: null,
  proposed_exp: null,
  expected_supp: null,
  questions: [],
  action_plan: null,
  engagement_details: {
    brands: [],
    engagement_type: null,
    sponsorship_type: null,
    activity_name: null,
    recommended_by: null
  }
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case CRM_SELECT_ABM:
      return {
        ...state, abm: payload, bo: null, doctor: null, engagement: null
      };
    case CRM_SELECT_BO:
      return {
        ...state, bo: payload, doctor: null, engagement: null
      };
    case CRM_SELECT_DOCTOR:
      return { ...state, doctor: payload, engagement: null };
    case RESET_SUBMIT:
      return INITIAL_STATE;
    case LOAD_CRM_DOCTOR_BO_ENGAGEMENT:
      return { ...state, engagement: null };
    case LOAD_CRM_DOCTOR_BO_ENGAGEMENT_SUCCESS:
      return { ...state, engagement: payload };
    case CRM_ADD_PAST_ENGAGEMENT:
      let past_engagements = JSON.parse(JSON.stringify(state.past_engagements));
      if (!past_engagements) past_engagements = [];
      past_engagements.push(payload);
      return { ...state, past_engagements };
    case LOAD_CRM_DOC_METRIC:
      return { ...state, loading: true, doc_matrics: null };
    case LOAD_CRM_DOC_METRIC_SUCCESS:
      return { ...state, loading: false, doc_matrics: payload };
    case LOAD_CRM_DOC_METRIC_FAIL:
      return { ...state, loading: false, doc_matrics: null };
    case CRM_UPDATE_PARAM:
      const newState = JSON.parse(JSON.stringify(state));
      Object.keys(payload).forEach((key) => {
        newState[key] = payload[key];
      });
      return newState;
    case LOAD_CRM_QUESTIONS:
      return { ...state, loading: true, questions: [] };
    case LOAD_CRM_QUESTIONS_SUCCESS:
      return { ...state, loading: false, questions: payload };
    case LOAD_CRM_QUESTIONS_FAIL:
      return { ...state, loading: false, questions: [] };
    case CRM_UPDATE_ACTION_PLAN:
      return { ...state, action_plan: payload };
    case CRM_UPDATE_ANSWER:
      const newQuestions = state.questions.map((question) => {
        // eslint-disable-next-line eqeqeq
        if (question.flag_id == payload.id) {
          question[`${payload.type}_answer`] = payload.answer;
        }
        return question;
      });
      return { ...state, questions: newQuestions };
    case CRM_UPDATE_ENGAGEMENT_DETAIL_PARAM:
      const engagement_details = JSON.parse(JSON.stringify(state.engagement_details));
      Object.keys(payload).forEach((key) => {
        engagement_details[key] = payload[key];
      });
      return { ...state, engagement_details };
    default:
      return state;
  }
};
