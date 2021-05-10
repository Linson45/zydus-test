import moment from 'moment';
import api from '../api';
import Urls from '../api/urls';
import {
  createDailyPlan,
  createDailyPlanBoEffort,
  createDailyPlanComment,
  createDailyPlanDoctorsPlanned,
  createDailyPlanMyBos,
  getDailyPlan,
  getDailyPlanAdhocDoctorsPlanned,
  getDailyPlanComments,
  getDailyPlanMyBos,
} from '../local-storage/helper/dailyplan';
import {multisort} from '../util/SortArray';
import Toaster from '../util/Toaster';
import {
  createDetailingHistory,
  createRemoteCompletedDocCodes,
  createVirtualDetailingSummary,
  getCompletedDocCodes,
  getContentsForDoctor,
  getDetailingHistory,
  getRemoteCompletedDocCodes,
  getVirtualDetailingSummary,
} from '../local-storage/helper/detailing';
import {editedNameOfVA, postionOfVA} from '../util/startDeatiling';
import Adapter from '../util/Adapter';
import {Role} from '../util/Constants';

export const LOAD_BO_DAILY_PLAN = 'load_bo_daily_plan';
export const LOAD_BO_DAILY_PLAN_SUCCESS = 'load_bo_daily_plan_success';
export const LOAD_BO_DAILY_PLAN_FAIL = 'load_bo_daily_plan_fail';

export const LOAD_BO_DAILY_PLAN_OFFLINE = 'load_bo_daily_plan_offline';
export const LOAD_BO_DAILY_PLAN_SUCCESS_OFFLINE = 'load_bo_daily_plan_success_offline';
export const LOAD_BO_DAILY_PLAN_FAIL_OFFLINE = 'load_bo_daily_plan_fail_offline';
export const LOAD_DAILY_PLAN_ABM_BO_LIST = 'load_daily_plan_abm_bo_list';
export const LOAD_DAILY_PLAN_ABM_BO_LIST_SUCCESS =
  'load_daily_plan_abm_bo_list_success';
export const LOAD_DAILY_PLAN_ABM_BO_LIST_FAIL =
  'load_daily_plan_abm_bo_list_fail';

export const LOAD_DAILY_PLAN_RBM_BO_LIST = 'load_daily_plan_rbm_bo_list';
export const LOAD_DAILY_PLAN_RBM_BO_LIST_SUCCESS =
  'load_daily_plan_rbm_bo_list_success';
export const LOAD_DAILY_PLAN_RBM_BO_LIST_FAIL =
  'load_daily_plan_rbm_bo_list_fail';

export const LOAD_DAILY_PLAN_ZBM_BO_LIST = 'load_daily_plan_zbm_bo_list';
export const LOAD_DAILY_PLAN_ZBM_BO_LIST_SUCCESS =
  'load_daily_plan_zbm_bo_list_success';
export const LOAD_DAILY_PLAN_ZBM_BO_LIST_FAIL =
  'load_daily_plan_zbm_bo_list_fail';

export const LOAD_DAILY_PLAN_SBUS = 'load_daily_plan_sbus';
export const LOAD_DAILY_PLAN_SBUS_SUCCESS = 'load_daily_plan_sbus_success';
export const LOAD_DAILY_PLAN_SBUS_FAIL = 'load_daily_plan_sbus_fail';

export const LOAD_DAILY_PLAN_REGIONS = 'load_daily_plan_regions';
export const LOAD_DAILY_PLAN_REGIONS_SUCCESS =
  'load_daily_plan_regions_success';
export const LOAD_DAILY_PLAN_REGIONS_FAIL = 'load_daily_plan_regions_fail';
export const RESET_DAILY_PLAN_RBMS = 'reset_daily_plan_regions';

export const LOAD_DAILY_PLAN_DOCTOR_DETAILS = 'load_daily_plan_doctor_details';
export const LOAD_DAILY_PLAN_DOCTOR_DETAILS_SUCCESS =
  'load_daily_plan_doctor_details_success';
export const LOAD_DAILY_PLAN_DOCTOR_DETAILS_FAIL =
  'load_daily_plan_doctor_details_fail';

export const LOAD_DAILY_PLAN_BO_ALL_DOCTORS = 'load_daily_plan_bo_all_doctors';
export const LOAD_DAILY_PLAN_BO_ALL_DOCTORS_SUCCESS =
  'load_daily_plan_bo_all_doctors_success';
export const LOAD_DAILY_PLAN_BO_ALL_DOCTORS_FAIL =
  'load_daily_plan_bo_all_doctors_fail';

export const SUBMIT_DAILYPLAN_COMMENT = 'submit_dailyplan_comment';
export const SUBMIT_DAILYPLAN_COMMENT_SUCCESS =
  'submit_dailyplan_comment_success';
export const SUBMIT_DAILYPLAN_COMMENT_FAIL = 'submit_dailyplan_comment_fail';

export const SUBMIT_DAILYPLAN_STATUS = 'submit_dailyplan_status';
export const SUBMIT_DAILYPLAN_STATUS_SUCCESS =
  'submit_dailyplan_status_success';
export const SUBMIT_DAILYPLAN_STATUS_FAIL = 'submit_dailyplan_status_fail';

export const LOAD_DAILY_PLAN_MY_TEAM = 'load_daily_plan_my_team';
export const LOAD_DAILY_PLAN_MY_TEAM_SUCCESS =
  'load_daily_plan_my_team_success';
export const LOAD_DAILY_PLAN_MY_TEAM_FAIL = 'load_daily_plan_my_team_fail';

export const REFRESH_DAILY_PLAN = 'REFRESH_DAILY_PLAN';
export const DOWNLOAD_DIALOG_DISPLAY = 'DOWNLOAD_DIALOG_DISPLAY';
export const IS_SYNCING_CALLS_MANUALLY = 'IS_SYNCING_CALLS_MANUALLY';

export const SET_DAILY_PLAN_VIRTUAL_DETAILING_FORM = 'set_daily_plan_virtual_detailing_form';
export const DELETE_DAILY_PLAN_VIRTUAL_DETAILING_ITEM = 'delete_daily_plan_virtual_detailing_item';

export const loadBoDailyPlan = (body) => async (dispatch) => {
  dispatch({ type: LOAD_BO_DAILY_PLAN });
  const completedDocCodes = await getCompletedDocCodes(body.rep_code, body.date);

  const completedRemoteDocs = await loadCompleteDocCodes(body.rep_code, body.date);
  if (completedRemoteDocs) {
    completedRemoteDocs.forEach(docCode => {
      completedDocCodes.push(docCode);
    });
  }

  const virtualDoctorCodes = [];
  const virtualDetailingSchedule = await loadVirtualCallSchedule(body.rep_code, body.date);
  const virtualDetailingScheduleDict = {};
  if (virtualDetailingSchedule) {
    virtualDetailingSchedule.forEach(session => {
      const {status, doc_code} = session;
      if (status === '2') {
        completedDocCodes.push(doc_code);
      }
      virtualDoctorCodes.push(doc_code);
      virtualDetailingScheduleDict[doc_code] = session;
    });
  }

  const adhocDocs = await getDailyPlanAdhocDoctorsPlanned(
    body.date,
    body.rep_code,
  );

  const {statusCode, data} = await api({
    method: 'GET',
    url: Urls.GET_DAILY_PLAN_BO,
    params: body,
  });
  const {rep_code, date} = body;

  if (statusCode === 200) {
    let {doctors_planned} = data;
    adhocDocs.forEach(doc => {
      doctors_planned.push(doc);
    });
    doctors_planned = await Promise.all(
      doctors_planned.map(async doctor => {
        doctor.contents = await getContentsForDoctor(doctor);
        if (doctor && doctor.contents && doctor.contents.length > 0) {
          const {doc_code} = doctor;
          for (const index in doctor.contents) {
            if (doctor.contents.hasOwnProperty(index)) {
              const {content_id} = doctor.contents[index];
              doctor.contents[index].name = await editedNameOfVA(
                doc_code,
                content_id,
              );
              let vaPosition = await postionOfVA(doc_code, content_id);
              if (!vaPosition) {
                vaPosition = 99999999;
              }
              doctor.contents[index].vaPosition = vaPosition;
            }
          }
        }
        try {
          multisort(doctor.contents, ['vaPosition'], ['ASC']);
        } catch (e) {}
        doctor.virtual_call_schedule =
          virtualDetailingScheduleDict[doctor.doc_code];
        doctor.is_completed = completedDocCodes.indexOf(doctor.doc_code) !== -1;
        loadEDetailingHistory(rep_code, doctor.doc_code);
        return doctor;
      }),
    );
    data.doctors_planned = doctors_planned;
    data.virtual_doctor_codes = virtualDoctorCodes;
    dispatch({type: LOAD_BO_DAILY_PLAN_SUCCESS, payload: data});
    createDailyPlan(date, rep_code, data);
    createDailyPlanDoctorsPlanned(date, rep_code, doctors_planned);
    createDailyPlanBoEffort(date, rep_code, data.bo_effort);
    // createDailyPlanActionSummary(date, rep_code, data.action_items);
  } else {
    let data = await getDailyPlan(date, rep_code);
    if (!data) {
      data = {
        action_items: [],
        bo_effort: {},
        date: body.date,
        doctors_planned: [],
        rep_code: body.rep_code,
        routes: '',
      };
    }
    let {doctors_planned} = data;
    adhocDocs.forEach(doc => {
      doctors_planned.push(doc);
    });
    doctors_planned = await Promise.all(doctors_planned.map(async (doctor) => {
      doctor.contents = await getContentsForDoctor(doctor);
      doctor.virtual_call_schedule = virtualDetailingScheduleDict[doctor.doc_code];
      doctor.is_completed = completedDocCodes.indexOf(doctor.doc_code) !== -1;
      loadEDetailingHistory(rep_code, doctor.doc_code);
      return doctor;
    }));
    data.doctors_planned = doctors_planned;
    dispatch({ type: LOAD_BO_DAILY_PLAN_SUCCESS, payload: data });
  }
};

export const loadBoDailyPlanOffline=body=>async dispatch=>{
  dispatch({ type: LOAD_BO_DAILY_PLAN_OFFLINE });
  const completedDocCodes = await getCompletedDocCodes(body.rep_code, body.date);

  const completedRemoteDocs = await loadCompleteDocCodes(body.rep_code, body.date);
  if (completedRemoteDocs) {
    completedRemoteDocs.forEach((docCode) => {
      completedDocCodes.push(docCode);
    });
  }

  const virtualDoctorCodes = [];
  const virtualDetailingSchedule = await loadVirtualCallSchedule(body.rep_code, body.date);
  const virtualDetailingScheduleDict = {};
  if (virtualDetailingSchedule) {
    virtualDetailingSchedule.forEach((session) => {
      const { status, doc_code } = session;
      if (status === '2') {
        completedDocCodes.push(doc_code);
      }
      virtualDoctorCodes.push(doc_code);
      virtualDetailingScheduleDict[doc_code] = session;
    });
  }

  const adhocDocs = await getDailyPlanAdhocDoctorsPlanned(body.date, body.rep_code);
  const { rep_code, date } = body;
  let data = await getDailyPlan(date, rep_code);
    if (!data) {
      data = {
        action_items: [], 
        bo_effort: {},
        date: body.date,
        doctors_planned: [],
        rep_code: body.rep_code,
        routes: '',
      };
    }
    let {doctors_planned} = data;
    adhocDocs.forEach(doc => {
      doctors_planned.push(doc);
    });
    doctors_planned = await Promise.all(doctors_planned.map(async (doctor) => {
      doctor.contents = await getContentsForDoctor(doctor);
      doctor.virtual_call_schedule = virtualDetailingScheduleDict[doctor.doc_code];
      doctor.is_completed = completedDocCodes.indexOf(doctor.doc_code) !== -1;
      loadEDetailingHistory(rep_code, doctor.doc_code);
      return doctor;
    }));
    data.doctors_planned = doctors_planned;
    console.log('Data from action',data)
    if(data.doctors_planned.length){
      console.log('Inside offline',data)
      dispatch({ type: LOAD_BO_DAILY_PLAN_SUCCESS_OFFLINE, payload: data });
    }else{
      console.log('Goes online',data)
      const { statusCode, data } = await api({
        method: 'GET',
        url: Urls.GET_DAILY_PLAN_BO,
        params: body,
      });
      const { rep_code, date } = body;
      if (statusCode === 200) {
        let {doctors_planned} = data;
        adhocDocs.forEach(doc => {
          doctors_planned.push(doc);
        });
        doctors_planned = await Promise.all(
          doctors_planned.map(async doctor => {
            doctor.contents = await getContentsForDoctor(doctor);
            if (doctor && doctor.contents && doctor.contents.length > 0) {
              const {doc_code} = doctor;
              for (const index in doctor.contents) {
                if (doctor.contents.hasOwnProperty(index)) {
                  const {content_id} = doctor.contents[index];
                  doctor.contents[index].name = await editedNameOfVA(
                    doc_code,
                    content_id,
                  );
                  let vaPosition = await postionOfVA(doc_code, content_id);
                  if (!vaPosition) {
                    vaPosition = 99999999;
                  }
                  doctor.contents[index].vaPosition = vaPosition;
                }
              }
            }
            try {
              multisort(doctor.contents, ['vaPosition'], ['ASC']);
            } catch (e) {}
            doctor.virtual_call_schedule =
              virtualDetailingScheduleDict[doctor.doc_code];
            doctor.is_completed = completedDocCodes.indexOf(doctor.doc_code) !== -1;
            loadEDetailingHistory(rep_code, doctor.doc_code);
            return doctor;
          }),
        );
        data.doctors_planned = doctors_planned;
        data.virtual_doctor_codes = virtualDoctorCodes;
        dispatch({ type: LOAD_BO_DAILY_PLAN_SUCCESS_OFFLINE, payload: data });
        console.log('Data from from online',data)
        createDailyPlan(date, rep_code, data);
        createDailyPlanDoctorsPlanned(date, rep_code, doctors_planned);
        createDailyPlanBoEffort(date, rep_code, data.bo_effort);
        // createDailyPlanActionSummary(date, rep_code, data.action_items);
        }else{
          console.log('Goes into nothing')
            let dataNothing = {
              action_items: [],
              bo_effort: {},
              date: body.date,
              doctors_planned: [],
              rep_code: body.rep_code,
              routes: '',
            };
            dispatch({ type: LOAD_BO_DAILY_PLAN_SUCCESS_OFFLINE, payload: dataNothing });
        }
      }  
   
  }
  export const loadBoDailyPlanFiveTimes = async (dataGot)=> {
    console.log('Five Times called top')
    dataGot.map(async (body)=>{
      console.log('Five Times called inside')
      const completedDocCodes = await getCompletedDocCodes(body.rep_code, body.date);

      const completedRemoteDocs = await loadCompleteDocCodes(body.rep_code, body.date);
      if (completedRemoteDocs) {
        completedRemoteDocs.forEach((docCode) => {
          completedDocCodes.push(docCode);
        });
      }
    
      const virtualDoctorCodes = [];
      const virtualDetailingSchedule = await loadVirtualCallSchedule(body.rep_code, body.date);
      const virtualDetailingScheduleDict = {};
      if (virtualDetailingSchedule) {
        virtualDetailingSchedule.forEach((session) => {
          const { status, doc_code } = session;
          if (status === '2') {
            completedDocCodes.push(doc_code);
          }
          virtualDoctorCodes.push(doc_code);
          virtualDetailingScheduleDict[doc_code] = session;
        });
      }
    
      const adhocDocs = await getDailyPlanAdhocDoctorsPlanned(body.date, body.rep_code);
      console.log('above url came')
      const { statusCode, data } = await api({
        method: 'GET',
        url: Urls.GET_DAILY_PLAN_BO,
        params: body,
      });
      const { rep_code, date } = body;
    
      if (statusCode === 200) {
        let {doctors_planned} = data;
        adhocDocs.forEach(doc => {
          doctors_planned.push(doc);
        });
        console.log('URL call came')
        doctors_planned = await Promise.all(
          doctors_planned.map(async doctor => {
            doctor.contents = await getContentsForDoctor(doctor);
            if (doctor && doctor.contents && doctor.contents.length > 0) {
              const {doc_code} = doctor;
              for (const index in doctor.contents) {
                if (doctor.contents.hasOwnProperty(index)) {
                  const {content_id} = doctor.contents[index];
                  doctor.contents[index].name = await editedNameOfVA(
                    doc_code,
                    content_id,
                  );
                  let vaPosition = await postionOfVA(doc_code, content_id);
                  if (!vaPosition) {
                    vaPosition = 99999999;
                  }
                  doctor.contents[index].vaPosition = vaPosition;
                }
              }
            }
            try {
              multisort(doctor.contents, ['vaPosition'], ['ASC']);
              console.log('Try came')
            } catch (e) {}
            doctor.virtual_call_schedule =
              virtualDetailingScheduleDict[doctor.doc_code];
            doctor.is_completed = completedDocCodes.indexOf(doctor.doc_code) !== -1;
            loadEDetailingHistory(rep_code, doctor.doc_code);
            console.log('catch came')
            return doctor;
          }),
        );
        data.doctors_planned = doctors_planned;
        data.virtual_doctor_codes = virtualDoctorCodes;
        console.log('created before',data)
        createDailyPlan(date, rep_code, data);
        createDailyPlanDoctorsPlanned(date, rep_code, doctors_planned);
        createDailyPlanBoEffort(date, rep_code, data.bo_effort);
        // createDailyPlanActionSummary(date, rep_code, data.action_items);
        console.log('created after',data)
      }
    })
   
  }

export const loadDailyPlanAbmBOs = body => async dispatch => {
  dispatch({type: LOAD_DAILY_PLAN_ABM_BO_LIST});

  const {statusCode, errorMessage, data} = await api({
    method: 'GET',
    url: Urls.GET_DAILY_PLAN_ABM_BO_LIST,
    params: body,
  });

  if (statusCode === 200) {
    dispatch({type: LOAD_DAILY_PLAN_ABM_BO_LIST_SUCCESS, payload: data});
    createDailyPlanMyBos(body.date, data);
  } else {
    const bos = await getDailyPlanMyBos(body.date);
    if (bos && bos.length) {
      dispatch({type: LOAD_DAILY_PLAN_ABM_BO_LIST_SUCCESS, payload: bos});
      return;
    }
    dispatch({
      type: LOAD_DAILY_PLAN_ABM_BO_LIST_FAIL,
      payload: {error: errorMessage},
    });
  }
};

export const loadDailyPlanRbmBOs = body => async dispatch => {
  dispatch({type: LOAD_DAILY_PLAN_RBM_BO_LIST});

  const {statusCode, errorMessage, data} = await api({
    method: 'GET',
    url: Urls.GET_DAILY_PLAN_RBM_BO_LIST,
    params: body,
  });

  if (statusCode === 200) {
    dispatch({type: LOAD_DAILY_PLAN_RBM_BO_LIST_SUCCESS, payload: data});
    createDailyPlanMyBos(body.date, data);
  } else {
    const bos = await getDailyPlanMyBos(body.date);
    if (bos && bos.length) {
      dispatch({type: LOAD_DAILY_PLAN_RBM_BO_LIST_SUCCESS, payload: bos});
      return;
    }
    dispatch({
      type: LOAD_DAILY_PLAN_RBM_BO_LIST_FAIL,
      payload: {error: errorMessage},
    });
  }
};

export const loadDailyPlanZbmBOs = body => async dispatch => {
  dispatch({type: LOAD_DAILY_PLAN_ZBM_BO_LIST});

  const {statusCode, errorMessage, data} = await api({
    method: 'GET',
    url: Urls.GET_DAILY_PLAN_ZBM_BO_LIST,
    params: body,
  });

  if (statusCode === 200) {
    dispatch({type: LOAD_DAILY_PLAN_ZBM_BO_LIST_SUCCESS, payload: data});
    createDailyPlanMyBos(body.date, data);
  } else {
    const bos = await getDailyPlanMyBos(body.date);
    if (bos && bos.length) {
      dispatch({type: LOAD_DAILY_PLAN_ZBM_BO_LIST_SUCCESS, payload: bos});
      return;
    }
    dispatch({
      type: LOAD_DAILY_PLAN_ZBM_BO_LIST_FAIL,
      payload: {error: errorMessage},
    });
  }
};

export const loadDailyPlanSbus = body => async dispatch => {
  dispatch({type: LOAD_DAILY_PLAN_SBUS});

  const {statusCode, errorMessage, data} = await api({
    method: 'GET',
    url: Urls.GET_DAILY_PLAN_SBUS,
    params: body,
  });

  if (statusCode === 200) {
    dispatch({type: LOAD_DAILY_PLAN_SBUS_SUCCESS, payload: data});
  } else {
    dispatch({
      type: LOAD_DAILY_PLAN_SBUS_FAIL,
      payload: {error: errorMessage},
    });
  }
};

export const loadDailyPlanRegions = body => async dispatch => {
  dispatch({type: LOAD_DAILY_PLAN_REGIONS});

  const {statusCode, errorMessage, data} = await api({
    method: 'GET',
    url: Urls.GET_DAILY_PLAN_REGIONS,
    params: body,
  });

  if (statusCode === 200) {
    dispatch({type: LOAD_DAILY_PLAN_REGIONS_SUCCESS, payload: data});
  } else {
    dispatch({
      type: LOAD_DAILY_PLAN_REGIONS_FAIL,
      payload: {error: errorMessage},
    });
  }
};

export const resetDailyPlanRegions = () => async dispatch => {
  dispatch({type: RESET_DAILY_PLAN_RBMS});
};

export const loadDailyPlanDoctorDetails = body => async dispatch => {
  dispatch({type: LOAD_DAILY_PLAN_DOCTOR_DETAILS});

  const {statusCode, errorMessage, data} = await api({
    method: 'GET',
    url: Urls.GET_DAILY_PLAN_DOCTOR_DETAILS,
    params: body,
  });
  const {rep_code, doc_code} = body;

  if (statusCode === 200) {
    const {comments} = data;
    if (comments) {
      comments.forEach(comment => {
        const {date, note} = comment;
        createDailyPlanComment(rep_code, doc_code, note, date, null, false);
      });
    }
    dispatch({type: LOAD_DAILY_PLAN_DOCTOR_DETAILS_SUCCESS, payload: data});
  } else {
    const comments = await getDailyPlanComments(rep_code, doc_code);
    let status = 'N';
    comments.forEach(comment => {
      if (comment.status === 'Y') {
        status = 'Y';
      }
    });
    if (comments.length) {
      dispatch({
        type: LOAD_DAILY_PLAN_DOCTOR_DETAILS_SUCCESS,
        payload: {comments, status},
      });
      return;
    }
    dispatch({
      type: LOAD_DAILY_PLAN_DOCTOR_DETAILS_FAIL,
      payload: {error: errorMessage},
    });
  }
};

export const loadDailyPlanBoAllDoctors = body => async dispatch => {
  const {localDocs} = body;
  dispatch({type: LOAD_DAILY_PLAN_BO_ALL_DOCTORS});
  if (localDocs && localDocs.length) {
    multisort(localDocs, ['doc_name'], ['ASC']);
    dispatch({
      type: LOAD_DAILY_PLAN_BO_ALL_DOCTORS_SUCCESS,
      payload: localDocs,
    });
    return;
  }

  const {statusCode, errorMessage, data} = await api({
    method: 'GET',
    url: Urls.GET_DAILY_PLAN_BO_ALL_DOCTORS,
    params: body,
  });

  if (statusCode === 200) {
    multisort(data, ['doc_name'], ['ASC']);
    dispatch({type: LOAD_DAILY_PLAN_BO_ALL_DOCTORS_SUCCESS, payload: data});
  } else {
    dispatch({
      type: LOAD_DAILY_PLAN_BO_ALL_DOCTORS_FAIL,
      payload: {error: errorMessage},
    });
  }
};

export const submitComment = body => async dispatch => {
  dispatch({type: SUBMIT_DAILYPLAN_COMMENT});

  const {statusCode, data} = await api({
    method: 'POST',
    url: Urls.POST_COMMENT,
    data: body,
  });

  if (statusCode === 200) {
    Toaster.show('Doctor details are updated successfully');
    dispatch({type: SUBMIT_DAILYPLAN_COMMENT_SUCCESS, payload: data});
  } else {
    const {status, rep_code, doc_code, comment} = body;
    createDailyPlanComment(
      rep_code,
      doc_code,
      comment,
      new moment(body.date).format('DD-MMM-YY'),
      status,
      true,
    );
    Toaster.show('Doctor details are saved offline');
    dispatch({type: SUBMIT_DAILYPLAN_COMMENT_SUCCESS, payload: data});
  }
};

export const submitStatus = body => async dispatch => {
  dispatch({type: SUBMIT_DAILYPLAN_STATUS});

  const {statusCode, errorMessage, data} = await api({
    method: 'POST',
    url: Urls.POST_STATUS,
    data: body,
  });

  if (statusCode === 200) {
    dispatch({type: SUBMIT_DAILYPLAN_STATUS_SUCCESS, payload: data});
  } else {
    dispatch({
      type: SUBMIT_DAILYPLAN_STATUS_FAIL,
      payload: {error: errorMessage},
    });
  }
};

export const loadCompleteDocCodes = async (rep_code, date) => {
  const {data} = await api({
    method: 'GET',
    url: Urls.GET_EDETAILING_COMPLETED_DOCS,
    params: {date, rep_code},
  });

  const me = await Adapter.getUser();
  let doctors = [];
  if (data) {
    doctors = data.doctors;
    await createRemoteCompletedDocCodes(rep_code, date, doctors);
    if (me.user_type !== Role.BO) {
      const response = await api({
        method: 'GET',
        url: Urls.GET_EDETAILING_COMPLETED_DOCS,
        params: {date, rep_code: me.rep_code},
      });
      if (response.statusCode === 200 && response.data) {
        const nonBoDoctors = response.data.doctors;
        if (nonBoDoctors) {
          await createRemoteCompletedDocCodes(me.rep_code, date, nonBoDoctors);
          nonBoDoctors.forEach(doctorCode => {
            doctors.push(doctorCode);
          });
        }
      }
    }
  } else {
    doctors = getRemoteCompletedDocCodes(rep_code, date);
    if (me.user_type !== Role.BO) {
      const nonBoDoctors = getRemoteCompletedDocCodes(me.rep_code, date);
      if (nonBoDoctors) {
        nonBoDoctors.forEach((doctorCode) => {
          doctors.push(doctorCode);
        });
      }
    }
  }
  return doctors;
};

export const loadEDetailingHistory = async (rep_code, doc_code) => {
  const {data} = await api({
    method: 'GET',
    url: Urls.GET_DETAILING_HISTORY,
    params: {doc_code, rep_code},
  });

  if (data) {
    await createDetailingHistory(rep_code, doc_code, data);
    return data;
  }
  return getDetailingHistory(rep_code, doc_code);
};

export const loadTeam = (body) => async (dispatch) => {
  dispatch({ type: LOAD_DAILY_PLAN_MY_TEAM });
  const {
    statusCode, errorMessage, data
  } = await api({
    method: 'GET',
    url: Urls.GET_MY_TEAM,
    params: body,
  });

  if (statusCode === 200) {
    multisort(data, ['name'], ['ASC']);
    dispatch({type: LOAD_DAILY_PLAN_MY_TEAM_SUCCESS, payload: data});
  } else {
    dispatch({
      type: LOAD_DAILY_PLAN_MY_TEAM_SUCCESS,
      payload: {error: errorMessage},
    });
  }
};

export const setVirtualDetailingForm = (team, doctors) => async (dispatch) => {
  dispatch({ type: SET_DAILY_PLAN_VIRTUAL_DETAILING_FORM, payload: { team, doctors } });
};

export const deleteVirtualDetailingFormItem = (type, code) => async (dispatch) => {
  dispatch({ type: DELETE_DAILY_PLAN_VIRTUAL_DETAILING_ITEM, payload: { type, code } });
};

export const scheduleVirtualCall = async body => {
  const response = await api({
    method: 'POST',
    url: Urls.SCHEDULE_VIRTUAL_CALL,
    data: body,
  });
  if (response.statusCode === 200) {
    const {token} = response;
    api({
      method: 'GET',
      url: Urls.SCHEDULE_VIRTUAL_CALL_SHARE_INVITE,
      params: {token},
    });
  }
  return response;
};

export const cancelVirtualCall = async token => {
  const response = await api({
    method: 'POST',
    url: Urls.CANCEL_VIRTUAL_CALL,
    data: {token},
  });
  return response;
};

export const resendLink = async token => {
  const response = await api({
    method: 'POST',
    url: Urls.RESEND_LINK,
    data: {token},
  });
  return response;
};

export const joinVirtualCall = async token => {
  const response = await api({
    method: 'GET',
    url: Urls.JOIN_VIRTUAL_CALL,
    params: {token},
  });
  return response;
};

export const loadVirtualCallSchedule = async (rep_code, date) => {
  const {data} = await api({
    method: 'GET',
    url: Urls.GET_VIRTUAL_CALL_SCHEDULE,
    params: {date, rep_code},
  });
  let items = [];

  const me = await Adapter.getUser();
  if (data) {
    data.forEach(item => {
      if (item.status !== '0') {
        items.push(item);
      }
    });
    await createVirtualDetailingSummary(rep_code, date, items);
    if (me.user_type !== Role.BO) {
      const response = await api({
        method: 'GET',
        url: Urls.GET_VIRTUAL_CALL_SCHEDULE,
        params: {date, rep_code: me.rep_code},
      });
      if (response.statusCode === 200 && response.data) {
        const nonBoItems = [];
        if (response.data) {
          response.data.forEach(nonItem => {
            if (nonItem.status !== '0') {
              nonBoItems.push(nonItem);
            }
          });
          await createVirtualDetailingSummary(me.rep_code, date, nonBoItems);
          nonBoItems.forEach(nonBoItem => {
            items.push(nonBoItem);
          });
        }
      }
      return items;
    }
  } else {
    items = getVirtualDetailingSummary(rep_code, date);
    if (me.user_type !== Role.BO) {
      const nonBoItems = getVirtualDetailingSummary(me.rep_code, date);
      if (nonBoItems) {
        nonBoItems.forEach(item => {
          items.push(item);
        });
      }
    }
    return items;
  }
  return items;
};
