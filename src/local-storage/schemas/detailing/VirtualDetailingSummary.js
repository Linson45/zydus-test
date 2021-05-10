export const VIRTUAL_DETAILING_SUMMARY = 'virtual_detailing_summary';

export const VirtualDetailingSummary = {
  name: VIRTUAL_DETAILING_SUMMARY,
  properties: {
    display_date: 'string',
    rep_code: 'string',
    doc_code: 'string',
    end_time: 'string?',
    session_id: 'string?',
    session_token: 'string?',
    start_time: 'string?',
    status: 'string?',
  }
};
