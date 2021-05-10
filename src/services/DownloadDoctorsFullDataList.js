import moment from 'moment';
import api from '../api';
import Urls from '../api/urls';
import Adapter from '../util/Adapter';
import { createAllFullDataDoctors } from '../local-storage/helper/dailyplan';

export const downloadDoctorsFullDataList = async () => {
  const user = await Adapter.getUser();
  const { rep_code, company_code, sbu_code } = user;
  const params = {
    rep_code,
    company_code,
    sbu_code,
    date: moment().format('DD-MMM-YYYY'),
  };

  const { statusCode, data } = await api({
    method: 'GET',
    url: Urls.GET_DAILY_PLAN_BO_ALL_DOCTORS,
    params,
  });

  if (statusCode === 200) {
    createAllFullDataDoctors(rep_code, data);
  }
};
