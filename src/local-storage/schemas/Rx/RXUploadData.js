export const RXUPLOAD_DATA_BO = 'rxupload_data_bo';

export const RxUploadDataBo = {
  name: RXUPLOAD_DATA_BO,
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
    // doc_name: 'string',


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
