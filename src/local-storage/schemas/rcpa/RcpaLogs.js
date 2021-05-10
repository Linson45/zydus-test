export const RCPA_LOGS = 'rcpa_logs';

export const RcpaLogs = {
  name: RCPA_LOGS,
  properties: {
    created_by: 'string',
    price: 'double',
    creation_date: 'string?',
    suggest_id: 'string?',
    doc_code: 'string',
    chemist_code: 'string',
    product_details: 'string?'
  }
};
