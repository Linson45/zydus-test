import api from '../api';
import Urls from '../api/urls';
import Adapter from '../util/Adapter';
import { createSurveyConfig, deleteAllSurveyConfig } from '../local-storage/helper/detailing';

export const downloadSurveyConfigs = async () => {
  const user = await Adapter.getUser();
  const { rep_code } = user;

  const { statusCode, data } = await api({
    method: 'GET',
    url: Urls.GET_SURVEY_CONFIGS,
    params: { rep_code },
  });

  if (statusCode === 200) {
    await deleteAllSurveyConfig();
    data.forEach((value) => {
      const {
        brand_code, sbu_code, spec_code, details
      } = value;
      createSurveyConfig(sbu_code, brand_code, spec_code, details);
    });
  }
};
