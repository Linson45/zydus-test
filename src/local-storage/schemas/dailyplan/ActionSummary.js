export const DAILY_PLAN_ACTION_SUMMARY = 'dailyplan_action_summary';

export const DailyPlanActionSummary = {
  name: DAILY_PLAN_ACTION_SUMMARY,
  properties: {
    from_date: 'string',
    rep_code: 'string',
    action_comment: 'string?',
    action_plan: 'string?',
    action_status_name: 'string?',
    action_summary_code: 'string?',
    approval_status: 'string?',
    assigned_by: 'string?',
    assigned_on: 'string?',
    problem_description: 'string?',
    review_by: 'string?',
    review_by_name: 'string?',
    review_comment: 'string?',
    review_date: 'string?',
    review_status: 'string?',
    review_status_name: 'string?',
    root_cause: 'string?',
    target_date: 'string?'
  }
};
