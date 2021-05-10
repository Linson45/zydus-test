import api from '../api';
import Urls from '../api/urls';
import Adapter from '../util/Adapter';
import { createAllAbm, createAllBo } from '../local-storage/helper/all';
import { Role } from '../util/Constants';

export const downloadBoList = async () => {
  const user = await Adapter.getUser();
  const {
    rep_code, company_code, sbu_code, user_type
  } = user;
  const params = {
    rep_code,
    company_code,
    sbu_code,
  };

  if (user_type === Role.ABM) {
    const { statusCode, data } = await api({
      method: 'GET',
      url: Urls.GET_BO_LIST_ABM,
      params,
    });

    if (statusCode === 200) {
      await createAllBo(data);
    }
  } else {
    const { statusCode, data } = await api({
      method: 'GET',
      url: Urls.GET_BO_LIST_RBM,
      params,
    });

    if (statusCode === 200) {
      await createAllBo(data);
    }

    const abmResponse = await api({
      method: 'GET',
      url: Urls.GET_ABM_LIST_RBM,
      params,
    });

    if (abmResponse.statusCode === 200) {
      await createAllAbm(abmResponse.data);
    }
  }
};
