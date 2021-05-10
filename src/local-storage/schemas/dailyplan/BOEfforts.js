export const DAILY_PLAN_BO_EFFORT = 'dailyplan_bo_efforts';

export const DailyPlanBoEffort = {
  name: DAILY_PLAN_BO_EFFORT,
  properties: {
    from_date: 'string',
    rep_code: 'string',
    month: 'string?',
    year: 'string?',
    multivisit_complience: 'double?',
    mcr_coverage_old: 'double?',
    dr_call_average: 'double?',
    sales_achievement_till_date: 'int?',
    sales_achievement_till_date_percent: 'double?',
    coachmap_score: 'double?',
    coachmap_total: 'double?',
    pl_rank: 'int?',
    pl_rank_total: 'int?',
    jfw_with_abm: 'int?',
    jfw_with_rbm: 'int?',
    open_action_items: 'int?',
    last_reporting_date: 'string?'
  }
};
