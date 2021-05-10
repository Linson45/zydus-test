import api from '../api';
import Urls from '../api/urls';
import { deletePendingActionSummary, getFirstPendingActionSummary } from '../local-storage/helper/dailyplan';

export const syncDailyPlanAction = async () => {
  const pendingDailyPlanAction = await getFirstPendingActionSummary();

  if (pendingDailyPlanAction) {
    const summary = JSON.parse(pendingDailyPlanAction.action_summary);

    const payload = {
      action_status_name: summary.action_status_name,
      action_summary_code: summary.action_summary_code,
      action_comment: summary.action_comment,
    };
    const { statusCode } = await api({
      method: 'POST',
      url: Urls.POST_STATUS,
      data: payload
    });

    if (statusCode === 200) {
      deletePendingActionSummary(summary.assigned_on, summary.action_summary_code);
      syncDailyPlanAction();
    } else {
      setTimeout(() => {
        syncDailyPlanAction();
      }, 5000);
    }
  } else {
    setTimeout(() => {
      syncDailyPlanAction();
    }, 5000);
  }
};
