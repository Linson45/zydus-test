import moment from 'moment';
import api from '../api';
import Urls from '../api/urls';
import {
  deleteDailyPlanOfflineComment,
  getFirstOfflineDailyPlanComment,
} from '../local-storage/helper/dailyplan';
import Adapter from '../util/Adapter';

export const syncDailyPlanComment = async () => {
  const pendingComment = await getFirstOfflineDailyPlanComment();
  if (pendingComment) {
    const {
      rep_code, doc_code, status, note, u_id, comment_date
    } = pendingComment;
    const { company_code, sbu_code } = await Adapter.getUser();

    const payload = {
      company_code,
      sbu_code,
      rep_code,
      doc_code,
      status,
      comment: note,
      date: comment_date
    };
    if (comment_date) {
      payload.date = new moment(comment_date).format('DD-MMM-YY');
    }

    const { statusCode } = await api({
      method: 'POST',
      url: Urls.POST_COMMENT,
      data: payload
    });

    if (statusCode === 200) {
      await deleteDailyPlanOfflineComment(u_id);
      syncDailyPlanComment();
    } else {
      setTimeout(() => {
        syncDailyPlanComment();
      }, 5000);
    }
  } else {
    setTimeout(() => {
      syncDailyPlanComment();
    }, 5000);
  }
};
