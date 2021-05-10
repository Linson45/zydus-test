export const DAILY_PLAN_DOCTOR_COMMENT = 'dailyplan_doctor_comment';

export const DailyPlanDoctorComment = {
  name: DAILY_PLAN_DOCTOR_COMMENT,
  properties: {
    rep_code: 'string',
    doc_code: 'string',
    status: 'string?',
    note: 'string?',
    comment_date: 'string?',
    is_offline: 'bool',
    u_id: 'string?',
  }
};
