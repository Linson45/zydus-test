import api from '../api';
import Urls from '../api/urls';

export const syncEDetailing = async (body) => {
  const response = await api({
    method: 'POST',
    url: Urls.SYNC_EDETAILING,
    data: body
  });
  return response;
};

export const syncVDetailing = async (body) => {
  const response = await api({
    method: 'POST',
    url: Urls.SYNC_VDETAILING,
    data: body
  });
  return response;
};
