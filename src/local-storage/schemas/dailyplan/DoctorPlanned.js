export const DAILY_PLAN_DOCTOR_PLANNED = 'dailyplan_doctor_planned';

export const DailyPlanDoctorPlanned = {
  name: DAILY_PLAN_DOCTOR_PLANNED,
  properties: {
    from_date: 'string',
    rep_code: 'string',
    doc_code: 'string',
    doc_name: 'string',
    doc_spec: 'string',
    visit_category: 'string',
    sales_planning: 'double?',
    mcr_no: 'string',
    visit_last: 'string?',
    last_month_rcpa: 'double?',
    is_last_month_rcpa: 'bool?',
    is_current_month_rcpa: 'bool?',
    last_month_visit_date: 'string?',
    this_month_visit_date: 'string?',
    priority_skus: 'string?',
    doc_potential: 'double?',
    doc_planned: 'double?',
    new_prescriber: 'string?',
    share_target: 'double?',
    is_met_today: 'bool?',
    sales_planned: 'string?',
    rcpa: 'string?',
    comments: 'string?',
    priority_brands: 'string?',
    spec_code: 'string?',
  }
};
