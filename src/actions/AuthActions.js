import api from '../api';
import Urls from '../api/urls';
import Adapter from '../util/Adapter';

export const LOGIN_USER = 'login_user';
export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_FAIL = 'login_fail';

export const loginUser = ({ userId, password }) => async (dispatch) => {
  dispatch({ type: LOGIN_USER });

  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'POST',
    url: Urls.LOGIN,
    data: { UserId: userId, Password: password }
  });

  if (statusCode === 200) {
    const newData = { ...data, user_id: userId, password };
    dispatch({ type: LOGIN_SUCCESS, payload: newData });
  } else {
    const user = await Adapter.getUser();
    if (user) {
      dispatch({ type: LOGIN_SUCCESS, payload: user });
    } else {
      dispatch({
        type: LOGIN_FAIL,
        payload: { error: errorMessage }
      });
    }
  }
};
