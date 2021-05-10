import api from '../api';
import Urls from '../api/urls';
import Adapter from '../util/Adapter';
import { createFeedbackConfig } from '../local-storage/helper/detailing';

export const downloadFeedbackConfigs = async () => {
  const user = await Adapter.getUser();
  const { rep_code } = user;

  const { statusCode, data } = await api({
    method: 'GET',
    url: Urls.GET_FEEDBACK_CONFIGS,
    params: { rep_code },
  });

  if (statusCode === 200) {
    Object.keys(data).forEach((key) => {
      const feedback = data[key];
      createFeedbackConfig(key, feedback);
    });
  }
};
