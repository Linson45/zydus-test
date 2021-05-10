export const CHEMIST_DETAILS = 'rx_approved_list_chemist';

export const rx_chemist_code = {
    name: CHEMIST_DETAILS,
    properties: {
        chemist_code: 'string',
        chemist_name: 'string',
    }
  };
export const RX_DR_LIST_APPROVED = 'rx_dr_list_all';

export const Rx_ApprovedList = {
  name: RX_DR_LIST_APPROVED,
  properties: {
    doc_name: 'string',
    dr_access_code: 'string',
    sbu_code: 'string',
    rep_code: 'string',
    sep_code: 'string',
    mcr_no: 'string',
    dr_code: 'string',
    created: 'string',
    status: 'string',
    campaign_code: 'string',
    spec_desc: 'string',
    reason: 'string?',
    visit_category: 'string',
  //  chemist_code:'CHEMIST_DETAILS[]',
    'chemist_code': {
        type: '[]',
        objectType: CHEMIST_DETAILS
    }
  }
};


