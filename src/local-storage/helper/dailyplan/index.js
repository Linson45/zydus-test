import moment from 'moment';
import uuid from 'react-native-uuid';
import RealmManager from '../../realm-manager';
import Adapter from '../../../util/Adapter';
import {Role} from '../../../util/Constants';
import {
  AllDoctors,
  AllDoctorsFullData,
  DailyPlan,
  DailyPlanActionSummary,
  DailyPlanAdhocDoctorPlanned,
  DailyPlanBoEffort,
  DailyPlanDoctorComment,
  DailyPlanDoctorPlanned,
  DailyPlanMyBos,
  DailyPlanPendingActionSummary,
} from '../../schemas/dailyplan';
import {dynamicSort} from '../../../util/ArrayUtil';

export const getDailyPlanMyBos = async from_date => {
  const user = await Adapter.getUser();
  const {user_type} = user;
  const items = await RealmManager.getInstance().read(DailyPlanMyBos.name, {
    from_date,
  });

  if (user_type === Role.ABM) {
    return items;
  }
  if (user_type === Role.RBM) {
    const areaJson = {};
    items.forEach(item => {
      const {area_code} = item;
      let bos = areaJson[area_code];
      if (!bos) bos = [];
      bos.push(item);
      areaJson[area_code] = bos;
    });
    return Object.keys(areaJson).map(area_code => ({
      area_id: area_code,
      area_name: areaJson[area_code][0].area_name,
      bos: areaJson[area_code],
    }));
  }
  if (user_type === Role.ZBM) {
    const regionJson = {};
    items.forEach(item => {
      const {region_code} = item;
      let bos = regionJson[region_code];
      if (!bos) bos = [];
      bos.push(item);
      regionJson[region_code] = bos;
    });
    return Object.keys(regionJson).map(region_code => ({
      region_id: region_code,
      region_name: regionJson[region_code][0].region_name,
      bos: regionJson[region_code],
    }));
  }
  return [];
};

export const createDailyPlanMyBos = async (from_date, items) => {
  deleteDailyPlanMyBos(from_date);
  const user = await Adapter.getUser();
  const {user_type} = user;

  let bos = [];
  if (user_type === Role.ABM) {
    bos = items.map(bo => {
      const {
        company_code,
        sbu_code,
        rep_code,
        name,
        hq_name,
        is_jfw,
        doctor_count,
      } = bo;
      return {
        from_date,
        company_code,
        sbu_code,
        rep_code,
        name,
        hq_name,
        is_jfw,
        doctor_count,
      };
    });
  } else if (user_type === Role.RBM) {
    items.forEach(area => {
      const {area_id, area_name} = area;
      area.bos.forEach(bo => {
        const {
          company_code,
          sbu_code,
          rep_code,
          name,
          hq_name,
          region_id,
          region_name,
          is_jfw,
          doctor_count,
        } = bo;
        bos.push({
          from_date,
          company_code,
          sbu_code,
          rep_code,
          name,
          hq_name,
          area_code: area_id,
          area_name,
          region_code: region_id,
          region_name,
          is_jfw,
          doctor_count,
        });
      });
    });
  } else if (user_type === Role.ZBM) {
    items.forEach(region => {
      const {region_id, region_name} = region;
      region.bos.forEach(bo => {
        const {
          company_code,
          sbu_code,
          rep_code,
          name,
          hq_name,
          area_id,
          area_name,
          is_jfw,
          doctor_count,
        } = bo;
        bos.push({
          from_date,
          company_code,
          sbu_code,
          rep_code,
          name,
          hq_name,
          area_code: area_id,
          area_name,
          region_code: region_id,
          region_name,
          is_jfw,
          doctor_count,
        });
      });
    });
  }

  RealmManager.getInstance().write(DailyPlanMyBos.name, bos);
};

export const deleteDailyPlanMyBos = from_date => {
  RealmManager.getInstance().delete(DailyPlanMyBos.name, {from_date});
};

export const getDailyPlan = async (from_date, rep_code) => {
  let dailyPlan = await RealmManager.getInstance().read(DailyPlan.name, {
    from_date,
    rep_code,
  });
  dailyPlan = dailyPlan[0];
  if (dailyPlan) {
    dailyPlan.date = dailyPlan.from_date;
    const doctors = await getDailyPlanDoctorsPlanned(from_date, rep_code);
    const boEffort = await getDailyPlanBoEffort(from_date, rep_code);
    const actionSummary = await getDailyPlanActionSummary(from_date, rep_code);
    dailyPlan.doctors_planned = doctors;
    dailyPlan.bo_effort = boEffort;
    dailyPlan.action_items = actionSummary;
  }
  return dailyPlan;
};

export const createDailyPlan = async (from_date, rep_code, item) => {
  deleteDailyPlan(from_date, rep_code);
  const {jfw_abm_name, jfw_rbm_name, pob_amount, routes} = item;
  const data = {
    from_date,
    rep_code,
    jfw_abm_name,
    jfw_rbm_name,
    pob_amount,
    routes,
  };

  RealmManager.getInstance().write(DailyPlan.name, [data]);
};

export const deleteDailyPlan = (from_date, rep_code) => {
  RealmManager.getInstance().delete(DailyPlan.name, {from_date, rep_code});
};

export const getDailyPlanDoctorsPlanned = async (from_date, rep_code) => {
  let items = await RealmManager.getInstance().read(DailyPlanDoctorPlanned.name, { from_date, rep_code });
  items = items.map((item) => {
    item = { ...item };
    item.date = item.from_date;
    item.priority_brands = JSON.parse(item.priority_brands);
    return item;
  });
  return items;
};

export const createDailyPlanDoctorsPlanned = async (
  from_date,
  rep_code,
  doctors,
) => {
  deleteDailyPlanDoctorsPlanned(from_date, rep_code);
  const items = doctors.map(doctor => {
    const {
      doc_code,
      doc_name,
      doc_spec,
      visit_category,
      sales_planning,
      mcr_no,
      visit_last,
      last_month_rcpa,
      is_last_month_rcpa,
      is_current_month_rcpa,
      last_month_visit_date,
      this_month_visit_date,
      priority_brands,
      spec_code,
    } = doctor;
    const item = {
      from_date,
      rep_code,
      doc_code,
      doc_name,
      doc_spec,
      visit_category,
      sales_planning,
      mcr_no,
      visit_last,
      last_month_rcpa,
      is_last_month_rcpa,
      is_current_month_rcpa,
      last_month_visit_date,
      this_month_visit_date,
      spec_code,
      priority_brands: JSON.stringify(priority_brands),
    };
    return item;
  });

  RealmManager.getInstance().write(DailyPlanDoctorPlanned.name, items);
};

export const deleteDailyPlanDoctorsPlanned = (from_date, rep_code) => {
  RealmManager.getInstance().delete(DailyPlanDoctorPlanned.name, {
    from_date,
    rep_code,
  });
};

export const getDailyPlanActionSummary = async (from_date, rep_code) =>
  RealmManager.getInstance().read(DailyPlanActionSummary.name, {
    from_date,
    rep_code,
  });

export const createDailyPlanActionSummary = async (
  from_date,
  rep_code,
  actions,
) => {
  deleteDailyPlanActionSummary(from_date, rep_code);

  const items = actions.map(action => {
    const {
      action_comment,
      action_plan,
      action_status_name,
      action_summary_code,
      approval_status,
      assigned_by,
      assigned_on,
      problem_description,
      review_by,
      review_by_name,
      review_comment,
      review_date,
      review_status,
      review_status_name,
      root_cause,
      target_date,
    } = action;
    return {
      from_date,
      rep_code,
      action_comment,
      action_plan,
      action_status_name,
      action_summary_code,
      approval_status,
      assigned_by,
      assigned_on,
      problem_description,
      review_by,
      review_by_name,
      review_comment,
      review_date,
      review_status,
      review_status_name,
      root_cause,
      target_date,
    };
  });

  RealmManager.getInstance().write(DailyPlanActionSummary.name, items);
};

export const deleteDailyPlanActionSummary = (from_date, rep_code) => {
  RealmManager.getInstance().delete(DailyPlanActionSummary.name, {
    from_date,
    rep_code,
  });
};

export const getDailyPlanBoEffort = async (from_date, rep_code) => {
  let dailyPlanEffort = await RealmManager.getInstance().read(
    DailyPlanBoEffort.name,
    {from_date, rep_code},
  );
  dailyPlanEffort = dailyPlanEffort[0];
  return dailyPlanEffort;
};

export const createDailyPlanBoEffort = async (from_date, rep_code, item) => {
  deleteDailyPlanBoEffort(from_date, rep_code);
  const {
    month,
    year,
    multivisit_complience,
    mcr_coverage_old,
    dr_call_average,
    sales_achievement_till_date,
    sales_achievement_till_date_percent,
    coachmap_score,
    coachmap_total,
    pl_rank,
    pl_rank_total,
    jfw_with_abm,
    jfw_with_rbm,
    open_action_items,
    last_reporting_date,
  } = item;

  const data = {
    from_date,
    rep_code,
    month,
    year,
    multivisit_complience,
    mcr_coverage_old,
    dr_call_average,
    sales_achievement_till_date,
    sales_achievement_till_date_percent,
    coachmap_score,
    coachmap_total,
    pl_rank,
    pl_rank_total,
    jfw_with_abm,
    jfw_with_rbm,
    open_action_items,
    last_reporting_date,
  };

  RealmManager.getInstance().write(DailyPlanBoEffort.name, [data]);
};

export const deleteDailyPlanBoEffort = (from_date, rep_code) => {
  RealmManager.getInstance().delete(DailyPlanBoEffort.name, {
    from_date,
    rep_code,
  });
};

export const deletePendingActionSummary = (from_date, action_item_code) => {
  RealmManager.getInstance().delete(DailyPlanPendingActionSummary.name, {
    from_date,
    action_item_code,
  });
};

export const addPendingActionSummary = (
  from_date,
  action_item_code,
  summary,
) => {
  deletePendingActionSummary(from_date, action_item_code);
  const data = {
    from_date,
    action_item_code,
    action_summary: JSON.stringify(summary),
  };
  RealmManager.getInstance().write(DailyPlanPendingActionSummary.name, [data]);
};

export const getPendingActionSummaries = async () =>
  RealmManager.getInstance().read(DailyPlanPendingActionSummary.name);

export const getFirstPendingActionSummary = async () => {
  const summary = await RealmManager.getInstance().read(
    DailyPlanPendingActionSummary.name,
  );
  return summary[0];
};

export const mergeDailyPlan = (dailyPlan, pendingActionSummaries) => {
  if (dailyPlan) {
    const {action_items} = dailyPlan;
    if (action_items) {
      const newActionItems = [];
      action_items.forEach(actionItem => {
        let isAdded = false;
        pendingActionSummaries.forEach(pendingSummary => {
          if (
            actionItem.action_summary_code ===
              pendingSummary.action_item_code &&
            actionItem.assigned_on === pendingSummary.from_date
          ) {
            newActionItems.push(JSON.parse(pendingSummary.action_summary));
            isAdded = true;
          }
        });
        if (!isAdded) {
          newActionItems.push(actionItem);
        }
      });
      dailyPlan.action_items = newActionItems;
    }
  }
  return dailyPlan;
};

export const deleteAllDoctors = async rep_code => {
  await RealmManager.getInstance().delete(AllDoctors.name, {rep_code});
};

export const createAllDoctors = async (rep_code, doctors) => {
  await deleteAllDoctors(rep_code);
  const items = [];
  const doc_code_list = [];
  doctors.map(doctor => {
    const {
      doc_code,
      doc_name,
      doc_spec,
      spec_code,
      visit_category,
      mobile_no,
      email,
    } = doctor;
    if (doc_code_list.indexOf(doc_code) > -1) {
      return [];
    }
    doc_code_list.push(doc_code);
    items.push({
      rep_code,
      doc_code,
      doc_name,
      doc_spec,
      visit_category,
      spec_code,
      mobile_no,
      email,
    });
    return [];
  });
  RealmManager.getInstance().write(AllDoctors.name, items);
};

export const getAllDoctors = async rep_code => {
  let items = await RealmManager.getInstance().read(AllDoctors.name, {
    rep_code,
  });
  items = items.sort(dynamicSort('doc_name'));
  return items.map(item => ({...item}));
};

export const getDailyPlanAdhocDoctorsPlanned = async (from_date, rep_code) => {
  let items = await RealmManager.getInstance().read(
    DailyPlanAdhocDoctorPlanned.name,
    {from_date, rep_code},
  );
  items = items.map(item => {
    item = {...item};
    item.date = item.from_date;
    item.priority_brands = JSON.parse(item.priority_brands);
    return item;
  });
  return items;
};

export const createDetailingAdhocDoctorsPlanned = async (
  from_date,
  rep_code,
  doc_codes,
) => {
  const localDocs = await getAllFullDataDoctors(rep_code);
  const selectedDocs = [];
  localDocs.forEach(doc => {
    if (doc_codes.indexOf(doc.doc_code) !== -1) {
      selectedDocs.push(doc);
    }
  });
  await createDailyPlanAdhocDoctorsPlanned(from_date, rep_code, selectedDocs);
};

export const createDailyPlanAdhocDoctorsPlanned = async (
  from_date,
  rep_code,
  doctors,
) => {
  const items = doctors.map(doctor => {
    const {
      doc_code,
      doc_name,
      doc_spec,
      visit_category,
      sales_planning,
      mcr_no,
      visit_last,
      last_month_rcpa,
      is_last_month_rcpa,
      is_current_month_rcpa,
      last_month_visit_date,
      this_month_visit_date,
      priority_brands,
      spec_code,
    } = doctor;
    return {
      from_date,
      rep_code,
      doc_code,
      doc_name,
      doc_spec,
      visit_category,
      sales_planning,
      mcr_no,
      visit_last,
      last_month_rcpa,
      is_last_month_rcpa,
      is_current_month_rcpa,
      last_month_visit_date,
      this_month_visit_date,
      spec_code,
      priority_brands: JSON.stringify(priority_brands),
    };
  });

  await RealmManager.getInstance().write(
    DailyPlanAdhocDoctorPlanned.name,
    items,
  );
};

export const deleteAllFullDataDoctors = async rep_code => {
  await RealmManager.getInstance().delete(AllDoctorsFullData.name, {rep_code});
};

export const createAllFullDataDoctors = async (rep_code, doctors) => {
  await deleteAllFullDataDoctors(rep_code);
  const items = doctors.map(doctor => {
    const {
      doc_code,
      doc_name,
      doc_spec,
      spec_code,
      visit_category,
      is_current_month_rcpa,
      is_last_month_rcpa,
      last_month_rcpa,
      mcr_no,
      pob_amount,
      priority_brands,
      sales_planning,
      status,
      mobile_no,
      email,
    } = doctor;
    return {
      rep_code,
      doc_code,
      doc_name,
      doc_spec,
      visit_category,
      spec_code,
      is_current_month_rcpa,
      is_last_month_rcpa,
      last_month_rcpa,
      mcr_no,
      pob_amount,
      priority_brands: JSON.stringify(priority_brands),
      sales_planning,
      status,
      mobile_no,
      email,
    };
  });
  RealmManager.getInstance().write(AllDoctorsFullData.name, items);
};

export const getAllFullDataDoctors = async rep_code => {
  const items = await RealmManager.getInstance().read(AllDoctorsFullData.name, {
    rep_code,
  });
  return items.map(item => ({
    ...item,
    priority_brands: JSON.parse(item.priority_brands),
  }));
};

export const deleteDailyPlanOnlineComments = async (rep_code, doc_code) => {
  await RealmManager.getInstance().delete(DailyPlanDoctorComment.name, {
    rep_code,
    doc_code,
    is_offline: false,
  });
};

export const deleteDailyPlanOfflineComment = async u_id => {
  await RealmManager.getInstance().delete(DailyPlanDoctorComment.name, {u_id});
};

export const createDailyPlanComment = async (
  rep_code,
  doc_code,
  note,
  comment_date,
  status,
  is_offline,
) => {
  if (!is_offline) {
    await deleteDailyPlanOnlineComments(rep_code, doc_code);
  }
  const item = {
    rep_code,
    doc_code,
    note,
    status,
    comment_date: comment_date || new moment().format('DD-MMM-YY'),
    is_offline: !!is_offline,
  };
  if (is_offline) {
    item.u_id = uuid.v1();
  }
  RealmManager.getInstance().write(DailyPlanDoctorComment.name, [item]);
};

export const getDailyPlanComments = async (rep_code, doc_code) => {
  const items = await RealmManager.getInstance().read(
    DailyPlanDoctorComment.name,
    {rep_code, doc_code},
  );
  return items.map(item => ({
    date: item.comment_date,
    ...item,
  }));
};

export const getFirstOfflineDailyPlanComment = async () => {
  const items = await RealmManager.getInstance().read(
    DailyPlanDoctorComment.name,
    {is_offline: true},
  );
  return items[0];
};
