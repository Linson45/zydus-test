import Adapter from '../util/Adapter';
import { CLEANED_JUNK_CACHE_1 } from '../util/Constants';
import RealmManager from './realm-manager';
import { PendingEDetailing } from './schemas';

export const clearCache = async () => {
  const cache1 = await Adapter.get(CLEANED_JUNK_CACHE_1);
  if (!cache1) {
    await RealmManager.getInstance().delete(PendingEDetailing.name);
    await Adapter.set(CLEANED_JUNK_CACHE_1, true);
  }
};
