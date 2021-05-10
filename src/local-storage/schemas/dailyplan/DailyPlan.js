export const DAILY_PLAN = 'dailyplan';

export const DailyPlan = {
  name: DAILY_PLAN,
  properties: {
    from_date: 'string',
    rep_code: 'string',
    jfw_abm_name: 'string?',
    jfw_rbm_name: 'string?',
    pob_amount: 'double?',
    routes: 'string?',
  }
};
