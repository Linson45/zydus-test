import { deletePendingEDetailing, getFirstPendingEDetailing } from '../local-storage/helper/detailing';
import { IS_SYNCING_CALLS_MANUALLY, syncEDetailing } from '../actions';
import Adapter from '../util/Adapter';

export const syncEDetailingJob = async () => {
  const pendingEDetailing = await getFirstPendingEDetailing();
  const isSyncingManually = await Adapter.get(IS_SYNCING_CALLS_MANUALLY);

  if (pendingEDetailing && !isSyncingManually) {
    try {
      const payload = JSON.parse(pendingEDetailing.items);
      let resp = await syncEDetailing(payload);
      if (resp) {
        resp = resp.trim();
      }
      if (resp === 'Session Captured') {
        await deletePendingEDetailing(payload.u_id, payload.rep_code);
        syncEDetailingJob();
      } else {
        setTimeout(() => {
          syncEDetailingJob();
        }, 5000);
      }
    } catch (e) {
      setTimeout(() => {
        syncEDetailingJob();
      }, 5000);
    }
  } else {
    setTimeout(() => {
      syncEDetailingJob();
    }, 5000);
  }
};
