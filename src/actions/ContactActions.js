import api from '../api';
import Urls from '../api/urls';
import Adapter from '../util/Adapter';
import {
  createContactChemists,
  createContactDoctors,
  getContactChemist,
  getContactDoctor,
} from '../local-storage/helper/contact';

export const LOAD_CONTACT_DOCTOR = 'load_contact_doctor';
export const LOAD_CONTACT_DOCTOR_SUCCESS = 'load_contact_doctor_success';
export const LOAD_CONTACT_DOCTOR_FAIL = 'load_contact_doctor_fail';

export const LOAD_CONTACT_CHEMIST = 'load_contact_chemist';
export const LOAD_CONTACT_CHEMIST_SUCCESS = 'load_contact_chemist_success';
export const LOAD_CONTACT_CHEMIST_FAIL = 'load_contact_chemist_fail';

export const loadContactDoctors = () => async dispatch => {
  const user = await Adapter.getUser();
  const {company_code, sbu_code, rep_code} = user;
  const localDoctors = await getContactDoctor();

  dispatch({type: LOAD_CONTACT_DOCTOR, payload: localDoctors});
  const {statusCode, errorMessage, data} = await api({
    method: 'GET',
    url: Urls.LOAD_CONTACT_DOCTOR,
    params: {company_code, sbu_code, rep_code},
  });

  if (statusCode === 200) {
    let count = 0;
    const doctors = data.map(doctor => {
      count += 1;
      return {...doctor, count: `${count}`};
    });
    createContactDoctors(doctors);
    dispatch({type: LOAD_CONTACT_DOCTOR_SUCCESS, payload: doctors});
  } else {
    if (localDoctors.length) {
      dispatch({type: LOAD_CONTACT_DOCTOR_SUCCESS, payload: localDoctors});
      return;
    }
    dispatch({type: LOAD_CONTACT_DOCTOR_FAIL, payload: errorMessage});
  }
};

export const loadContactChemists = () => async dispatch => {
  const user = await Adapter.getUser();
  const {company_code, sbu_code, rep_code} = user;
  const localChemists = await getContactChemist();

  dispatch({type: LOAD_CONTACT_CHEMIST, payload: localChemists});
  const {statusCode, errorMessage, data} = await api({
    method: 'GET',
    url: Urls.LOAD_CONTACT_CHEMIST,
    params: {company_code, sbu_code, rep_code},
  });

  if (statusCode === 200) {
    let count = 0;
    const chemists = data.map(chemist => {
      count += 1;
      return {...chemist, count: `${count}`};
    });
    createContactChemists(chemists);
    dispatch({type: LOAD_CONTACT_CHEMIST_SUCCESS, payload: chemists});
  } else {
    if (localChemists.length) {
      dispatch({type: LOAD_CONTACT_CHEMIST_SUCCESS, payload: localChemists});
      return;
    }
    dispatch({type: LOAD_CONTACT_CHEMIST_FAIL, payload: errorMessage});
  }
};
