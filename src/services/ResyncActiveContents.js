import api from '../api';
import Urls from '../api/urls';
import Adapter from '../util/Adapter';
import {
  getAllFeedbackConfigs, getAllLandingPages,
  getAllSurveyConfigs,
  getDetailingContents
} from '../local-storage/helper/detailing';
import RealmManager from '../local-storage/realm-manager';
import {
  DetailingContent, SurveyConfig, FeedbackConfig, LandingPage
} from '../local-storage/schemas/detailing';

export const updateActiveData = async () => {
  const user = await Adapter.getUser();
  const { company_code, sbu_code } = user;
  const params = {
    company_code,
    division: sbu_code,
  };

  const { statusCode, data } = await api({
    method: 'GET',
    url: Urls.GET_ACTIVE_DETAILING_DATA,
    params,
  });

  if (statusCode === 200) {
    const {
      contents, feedbacks, surveys, landingpages
    } = data;
    const localContents = await getDetailingContents();
    const localFeedbacks = await getAllFeedbackConfigs();
    const localSurveys = await getAllSurveyConfigs();
    const localLandingPages = await getAllLandingPages();

    localContents.forEach((content) => {
      const { content_id } = content;
      if (contents.indexOf(content_id) === -1) {
        RealmManager.getInstance().delete(DetailingContent.name, { content_id });
      }
    });

    localFeedbacks.forEach((feedback) => {
      const { survey_id } = feedback;
      if (feedbacks.indexOf(survey_id) === -1) {
        RealmManager.getInstance().delete(FeedbackConfig.name, { survey_id });
      }
    });

    localSurveys.forEach((survey) => {
      const { survey_id } = survey;
      if (surveys.indexOf(survey_id) === -1) {
        RealmManager.getInstance().delete(SurveyConfig.name, { survey_id });
      }
    });

    localLandingPages.forEach((landingPage) => {
      const { content_id } = landingPage;
      if (landingpages.indexOf(content_id) === -1) {
        RealmManager.getInstance().delete(LandingPage.name, { content_id });
      }
    });
  }
};
