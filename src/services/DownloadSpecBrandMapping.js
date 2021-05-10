import api from '../api';
import Urls from '../api/urls';
import Adapter from '../util/Adapter';
import { createSpecBrandMapping } from '../local-storage/helper/detailing';

export const downloadSpecBrandMapping = async () => {
  const user = await Adapter.getUser();
  const { company_code, sbu_code } = user;
  const params = {
    company_code,
    sbu_code,
  };

  const { statusCode, data } = await api({
    method: 'GET',
    url: Urls.GET_BRAND_SPEC_MAPPING,
    params,
  });

  if (statusCode === 200) {
    await createSpecBrandMapping(data);
  }
};
