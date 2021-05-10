export const DAILY_PLAN_MY_BOS = 'dailyplan_my_bos';

export const DailyPlanMyBos = {
  name: DAILY_PLAN_MY_BOS,
  properties: {
    from_date: 'string',
    company_code: 'string',
    sbu_code: 'string',
    rep_code: 'string',
    name: 'string',
    hq_name: 'string?',
    area_code: 'string?',
    area_name: 'string?',
    region_code: 'string?',
    region_name: 'string?',
    doctor_count: 'int?',
    is_jfw: 'bool'
  }
};
