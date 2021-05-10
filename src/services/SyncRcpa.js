import { deletePendingRcpa, getFirstPendingRcpa } from '../local-storage/helper/rcpa';
import api from '../api';
import Urls from '../api/urls';

export const syncRcpa = async () => {
  const pendingRcpa = await getFirstPendingRcpa();
  if (pendingRcpa) {
    const payload = JSON.parse(pendingRcpa.items);
    const { statusCode } = await api({
      method: 'POST',
      url: Urls.POST_RCPA_DOC,
      data: payload
    });
    if (statusCode === 200) {
      deletePendingRcpa(pendingRcpa.rep_code, pendingRcpa.chem_code, pendingRcpa.doc_code);
      syncRcpa();
    } else {
      setTimeout(() => {
        syncRcpa();
      }, 5000);
    }
  } else {
    setTimeout(() => {
      syncRcpa();
    }, 5000);
  }
};
