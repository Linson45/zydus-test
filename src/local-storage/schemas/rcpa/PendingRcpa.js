export const PENDING_RCPA = 'pending_rcpa';

export const PendingRcpa = {
  name: PENDING_RCPA,
  properties: {
    rep_code: 'string',
    doc_code: 'string',
    chem_code: 'string',
    creation_date: 'string',
    total: 'double',
    items: 'string',
  }
};
