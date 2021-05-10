import moment from 'moment';
import api from '../api';
import Urls from '../api/urls';
import Adapter from '../util/Adapter';
import { createAllDoctors } from '../local-storage/helper/dailyplan';

export const downloadDoctorsList = async () => {
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
    url: Urls.GET_ALL_DOCS,
    params,
  });

  if (statusCode === 200) {
    createAllDoctors(rep_code, data);
  }
};
