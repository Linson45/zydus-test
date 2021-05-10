// import moment from 'moment';
// import uuid from 'react-native-uuid';
import RealmManager from '../../realm-manager';
import api from '../../../../src/api';
import Urls from '../../../../src/api/urls';
// import Adapter from '../../../util/Adapter';
// import { Role } from '../../../util/Constants';
import {
  CampaingListData,  //old not used
  ApprovedDocBoList,
  RxUploadDataBo,
  RX_CampaingListData,
  Rx_ApprovedList,
  Rx_TrackerList,
  RX_DrChemist_Submit,
  rx_chemist_code,
  rx_tracker_chemist_code,
  RxUploadSave

} from '../../schemas/Rx';
// import { dynamicSort } from '../../../util/ArrayUtil';

//Campaign list
export const deleteCampaingsList = async sbu_code => {
  // console.log('sonali:deleteCampaingsList:',sbu_code)
  await RealmManager.getInstance().delete(RX_CampaingListData.name, { sbu_code });
};

export const createCampaingsList = async (campaingsList, campDetails) => {
  const { sbu_code, company_code } = campDetails;
  await deleteCampaingsList(sbu_code);

  const items = campaingsList.map((campaing) => {
    const { campaign_code, campaign_name } = campaing;
    return {
      campaign_code,
      campaign_name,
      sbu_code,
      company_code,
    };
  });
  RealmManager.getInstance().write(RX_CampaingListData.name, items);
};

export const getCampaingsList = (campaingDet) => {
  const { sbu_code, company_code } = campaingDet
  const items = RealmManager.getInstance().read(RX_CampaingListData.name, { sbu_code });
  return items;
};

//Approved Dr. List
export const createApprovedList = async (approvedDrList, campaign_code) => {
  //console.log('sonali:createApprovedList:',campaign_code)

  await deleteApprovedDrList(campaign_code);
  const items = approvedDrList.map((dr) => {
    const
      { doc_name,
        dr_access_code,
        sbu_code,
        rep_code,
        sep_code,
        mcr_no,
        dr_code,
        created,
        status,
        campaign_code,
        spec_desc,
        reason,
        visit_category,
        chemist_code,
      } = dr;
    return {
      doc_name,
      dr_access_code,
      sbu_code,
      rep_code,
      sep_code,
      mcr_no,
      dr_code,
      created,
      status,
      campaign_code,
      spec_desc,
      reason,
      visit_category,
      chemist_code,
    };
  });
  RealmManager.getInstance().write(Rx_ApprovedList.name, items);
};

export const deleteApprovedDrList = async campaign_code => {
  //console.log('sonali:deleteApprovedDrList:',campaign_code)
  await RealmManager.getInstance().delete(rx_chemist_code.name);
  await RealmManager.getInstance().delete(Rx_ApprovedList.name, {
    campaign_code,
  });

};

export const getApprovedDrList = (campaign_code) => {
  const items = RealmManager.getInstance().read(Rx_ApprovedList.name, { campaign_code });
  return items;
};

// export const getApprovedChemistList = (campaign_code) => {
//   const items =  RealmManager.getInstance().read(Rx_ApprovedList.name, {chemist_code});
//   return items;
// };

//RX Tracker list all
export const createRxTrackerList = async (trackerList, reqBody) => {
  // console.log('sonali:createRxTrackerList:')

  await deleteRxTrackerList(reqBody);
  const { sbu_code, rep_code, campaign_code, company_code } = reqBody
  const items = trackerList.map((rx) => {
    const
      { doc_name,
        dr_access_code,
        sbu_code,
        rep_code,
        sep_code,
        mcr_no,
        dr_code,
        prescription,
        status,
        campaign_code,
        brand_name,
        prd_code,
        created_at,
        reason,
        chemist_data,
      } = rx;
    return {
      doc_name,
      dr_access_code,
      sbu_code,
      rep_code,
      sep_code,
      mcr_no,
      dr_code,
      prescription,
      status,
      campaign_code,
      brand_name,
      prd_code,
      created_at,
      reason,
      company_code,
      chemist_data,
    };
  });
  RealmManager.getInstance().write(Rx_TrackerList.name, items);
};

export const deleteRxTrackerList = async body => {
  // console.log('sonali:deleteRxTrackerList:')
  const { sbu_code, rep_code, campaign_code, company_code } = body
  await RealmManager.getInstance().delete(rx_tracker_chemist_code.name)
  await RealmManager.getInstance().delete(Rx_TrackerList.name, {
    campaign_code, company_code, sbu_code, rep_code
  });
};

export const getRxTrackerList = (reqBody) => {
  const { sbu_code, rep_code, campaign_code, company_code } = reqBody
  const items = RealmManager.getInstance().read(Rx_TrackerList.name, { campaign_code, company_code, sbu_code, rep_code, });
  return items;
};

////////end Rx tracker

//Dr Submit 
export const createDrSubmit = async (data) => {

  const { campaign_code,
    company_code,
    sbu_code,
    rep_code,
    doc_code,
    chemist_code } = data;

  RealmManager.getInstance().write(RX_DrChemist_Submit.name, [data]);
};
export const deleteDrSubmit = async (rep_code, doc_code) => {

  await RealmManager.getInstance().delete(RX_DrChemist_Submit.name, { rep_code, doc_code });
};

export const getDrSubmitted = async (rep_code, doc_code) => {
  const item = await RealmManager.getInstance().read(RX_DrChemist_Submit.name, { rep_code, doc_code });
  return item;
};

export const getDrSubmittedAll = async () => {
  const item = await RealmManager.getInstance().read(RX_DrChemist_Submit.name);
  return item;
};
//end Dr Submit
export const syncRxData = async () => {
  const items = await RealmManager.getInstance().read(RX_DrChemist_Submit.name);
  if (items && items.length) {

    items.forEach(async (item) => {
      const { campaign_code,
        company_code,
        sbu_code,
        rep_code,
        doc_code,
        chemist_code } = item
      const { statusCode } = await api({
        method: 'POST',
        url: Urls.SUBMIT_CHEMIST_DATA,
        item,
      });
      if (statusCode === 200) {
        deleteDrSubmit(rep_code, doc_code);
      }
    });
  }
  else {
    //console.log('sonali:pp:no data');
  }
}
//Rx upload
//Rx upload
export const createRxSubmit = async (selected_chemist, proof_of_supply,rx_upload,qty,data,isSave) => {
  const { campaign_code, company_code, rep_code,
    sbu_code, dr_code, mcr_no, prd_code, brand_code } = data
  await deleteRxSubmit(campaign_code,rep_code);
  
  //for deleting save data if it was there
  await deleteRxSave(rep_code,dr_code)
  
 let status =0
  const item = { 
      campaign_code, 
      company_code, 
      rep_code,
      sbu_code,
       dr_code, 
       mcr_no,
       prd_code,
        brand_code,
      proof_of_supply,
      selected_chemist,
      qty,
      rx_upload,
      status,
    }
  //console.log('sonali:createRxSubmit:',)
  RealmManager.getInstance().write(RxUploadDataBo.name, [item]);
};
export const deleteRxSubmit = async (campaign_code,rep_code) => {
  await RealmManager.getInstance().delete(RxUploadDataBo.name, {
    campaign_code,rep_code
  });
};


export const getRxSubmit = async (campaign_code, rep_code) => {
  console.log('Get method',campaign_code, rep_code)

  const items = RealmManager.getInstance().read(RxUploadDataBo.name, {
    campaign_code, rep_code
  });
  return items
};

//end Rx upload

//Rx save
export const saveRxSubmit = async (selected_chemist, proof_of_supply, rx_upload, qty, data, status) => {
  const { campaign_code, company_code, rep_code,
    sbu_code, dr_code, mcr_no, prd_code, brand_code,doc_name,
    created_at,brand_name} = data
  await deleteRxSave(rep_code,dr_code);

  const item = {
    campaign_code,
    company_code,
    rep_code,
    sbu_code,
    dr_code,
    mcr_no,
    prd_code,
    brand_code,
    proof_of_supply,
    selected_chemist,
    qty,
    rx_upload,
    status,
    doc_name,
    created_at,
    brand_name
  }
  console.log('Apsel:SaveRxSubmit:', item)
  RealmManager.getInstance().write(RxUploadSave.name, [item]);
};

export const deleteRxSave = async (rep_code,dr_code) => {
  await RealmManager.getInstance().delete(RxUploadSave.name, {
    rep_code,dr_code
  });
}; 

export const getRxSave = async (campaign_code, rep_code) => {
  console.log('Get method',campaign_code, rep_code)

  const items = RealmManager.getInstance().read(RxUploadSave.name, {
    campaign_code, rep_code
  });
  return items
};
//end Rx save

export const createRxUploadData = async rxdatalist => {
  const items = rxdatalist.map(rxdata => {
    const {
      doc_name,
      dr_code,
      mcr_no,
      rep_code,
      sbu_code,
      sep_code,
      status,
    } = approvedBoDoc;
    return {
      created,
      doc_name,
      dr_access_code,
      dr_code,
      mcr_no,
      rep_code,
      sbu_code,
      sep_code,
      status,
      campaign_code,
    };
  });
  RealmManager.getInstance().write(ApprovedDocBoList.name, items);
};


// export const createRxUploadData = async rxdatalist => {
//   const items = rxdatalist.map(rxdata => {
//     const {
//       doc_name,
//       dr_code,
//       mcr_no,
//       rep_code,
//       sbu_code,
//       sep_code,
//       status,
//       campaign_code,
//       company_code,
//       month,
//       year,
//       prd_code,
//       brand_code,
//       file1,
//       qty_1,
//       qty_2,
//       qty_3,
//       qty_4,
//       qty_5,
//       pos_1,
//       pos_2,
//       pos_3,
//       pos_4,
//       pos_5,
//       chem_code_1,
//       chem_code_2,
//       chem_code_3,
//       chem_code_4,
//       chem_code_5,
//     } = rxdata;
//     return {
//       doc_name,
//       dr_code,
//       mcr_no,
//       rep_code,
//       sbu_code,
//       sep_code,
//       status,
//       campaign_code,
//       company_code,
//       month,
//       year,
//       prd_code,
//       brand_code,
//       file1,
//       qty_1,
//       qty_2,
//       qty_3,
//       qty_4,
//       qty_5,
//       pos_1,
//       pos_2,
//       pos_3,
//       pos_4,
//       pos_5,
//       chem_code_1,
//       chem_code_2,
//       chem_code_3,
//       chem_code_4,
//       chem_code_5,
//     };
//   });
//   RealmManager.getInstance().write(RxUploadDataBo.dr_code, items);
// };

export const getApprovedBoDocList = async campaign_code => {
  const items = await RealmManager.getInstance().read(ApprovedDocBoList.name, {
    campaign_code,
  });
  return items;
};
