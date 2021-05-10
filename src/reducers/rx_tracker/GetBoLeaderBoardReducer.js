import { GET_BO_LEADERBOARD, GET_BO_LEADERBOARD_SUCCESS, GET_BO_LEADERBOARD_FAILED } from '../../actions';

const INITIAL_STATE = {
  error: null,
  data: null,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_BO_LEADERBOARD:
      return { ...state, loading: true };
    case GET_BO_LEADERBOARD_SUCCESS:
      console.log(payload);
      return {
        ...state, loading: false, error: '', data: payload
      };
    case GET_BO_LEADERBOARD_FAILED:
      return {
        ...state, loading: false, error: payload.error, data: []
      };
    default:
      return state;
  }
};
