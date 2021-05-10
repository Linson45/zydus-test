export const TRACKER_CHEMIST_DETAILS = 'rx_tracker_chemist';

export const rx_tracker_chemist_code = {
    name: TRACKER_CHEMIST_DETAILS,
    properties: {
        chemist_code: 'string',
        chemist_name: 'string',
        qty: 'string',
        proof_of_supply_path: 'string',

    }
  };
  
export const RX_TRACKER_LIST_ = 'rx_tracker_list';

export const Rx_TrackerList = {
  name: RX_TRACKER_LIST_,
  properties: {
    doc_name: 'string',
    dr_access_code: 'string',
    sbu_code: 'string',
    rep_code: 'string',
    sep_code: 'string',
    mcr_no: 'string',
    dr_code: 'string',
    prescription: 'string',
     // proof_supply: 'string',
    status: 'string',
    campaign_code: 'string',
    brand_name: 'string',
    prd_code: 'string',
    created_at: 'string',
    reason: 'string?',
    company_code: 'string',
    'chemist_data': {
      type: '[]',
      objectType: TRACKER_CHEMIST_DETAILS
  } 
 }
};

