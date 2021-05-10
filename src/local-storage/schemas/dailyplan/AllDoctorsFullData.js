export const ALL_DOCTORS_FULL_DATA = 'all_doctors_full_data';

export const AllDoctorsFullData = {
  name: ALL_DOCTORS_FULL_DATA,
  properties: {
    rep_code: 'string',
    doc_code: 'string',
    doc_name: 'string',
    doc_spec: 'string?',
    is_current_month_rcpa: 'bool?',
    is_last_month_rcpa: 'bool?',
    last_month_rcpa: 'double?',
    mcr_no: 'string',
    pob_amount: 'double?',
    priority_brands: 'string?',
    sales_planning: 'double?',
    status: 'string?',
    visit_category: 'string?',
    spec_code: 'string?',
    mobile_no: 'string?',
    email: 'string?',
  }
};
