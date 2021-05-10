export const UPLOAD_CHEMIST_DETAILS_SAVE = 'rx_upload_save_selected_chemists';

export const rx_upload_chemist_code_save = {
    name: UPLOAD_CHEMIST_DETAILS_SAVE,
    properties: {
        chemist_code: 'string',
        chemist_name: 'string',
    }
  };

// export const UPLOAD_CHEMIST_DETAILS = 'rx_upload_selected_chemists';

// export const rx_upload_chemist_code = {
//     name: UPLOAD_CHEMIST_DETAILS,
//     properties: {
//         chemist_code: 'string',
//         chemist_name: 'string',
//     }
//   };

export const RX_UPLOAD_SAVE = 'rxupload_data_save';

export const RxUploadSave = {
  name: RX_UPLOAD_SAVE,
  properties: {
    campaign_code: 'string',
    company_code: 'string',
    rep_code: 'string',
    sbu_code: 'string',
    dr_code: 'string',
    mcr_no: 'string',

   // month: 'string',
   // year: 'string',
    prd_code: 'string',
    brand_code: 'string',

    proof_of_supply: 'string[]',
    selected_chemist: 'string[]',
    qty:'int[]',
    rx_upload: 'string',
    status:'int',
    //for displaying list
    doc_name: 'string',
    created_at:'string',
    brand_name:'string',

    // sep_code: 'string',
    // status: 'string',
    // campaign_code: 'string',
    // company_code: 'String',
 
    // file1: 'NSData?',
    // qty_1: 'int',
    // qty_2: 'int',
    // qty_3: 'int',
    // qty_4: 'int',
    // qty_5: 'int',
 
    // chem_code_1: 'string',
    // chem_code_2: 'string?',
    // chem_code_3: 'string?',
    // chem_code_4: 'string?',
    // chem_code_5: 'string?',

 
  },
};
