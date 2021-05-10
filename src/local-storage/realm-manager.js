import {
  CoachmapQuestionTemplate,
  DailyPlan,
  DailyPlanActionSummary,
  DailyPlanBoEffort,
  DailyPlanDoctorPlanned,
  DailyPlanMyBos,
  DailyPlanPendingActionSummary,
  DailyPlanPendingDoctors,
  PendingRcpa,
  RcpaAllDoc,
  RcpaChemists,
  RcpaGspDoc,
  RcpaHistory,
  RcpaLogs,
  RcpaMultivisitDoc,
  RcpaMyBos,
  RcpaProductMapping,
  DetailingContent,
  DetailingContentShowCase,
  FeedbackConfig,
  SurveyConfig,
  EDetailingCompletedDoctors,
  EDetailingHistory,
  AllDoctors,
  DailyPlanAdhocDoctorPlanned,
  AllDoctorsFullData,
  DailyPlanDoctorComment,
  SpecBrandMapping,
  EDetailingVAThumbNails,
  Bo,
  Abm,
  PendingEDetailingState,
  LandingPage,
  PendingEDetailing,
  VirtualDetailingSummary,
  ContactChemist,
  ContactDoctor,
  CampaingListData,
  ApprovedBoDataList,
  RxUploadDataBo,
  RX_CampaingListData,
  Rx_ApprovedList,
  rx_chemist_code,
  Rx_TrackerList,
  rx_tracker_chemist_code,
  RX_DrChemist_Submit,
  RxUploadSave,
} from './schemas';
import { CurrentVDetailingState, TrainingPage } from './schemas/detailing';

const Realm = require('realm');

export default class RealmManager {
  static sharedInstance = null;

  databaseOptions = {
    path: 'realmT4.realm',
    schema: [
      RcpaMyBos,
      RcpaGspDoc,
      RcpaMultivisitDoc,
      RcpaAllDoc,
      RcpaChemists,
      RcpaLogs,
      RcpaHistory,
      RcpaProductMapping,
      PendingRcpa,
      DailyPlanMyBos,
      DailyPlan,
      DailyPlanDoctorPlanned,
      DailyPlanBoEffort,
      DailyPlanActionSummary,
      DailyPlanPendingDoctors,
      DailyPlanPendingActionSummary,
      CoachmapQuestionTemplate,
      DetailingContent,
      DetailingContentShowCase,
      FeedbackConfig,
      SurveyConfig,
      PendingEDetailing,
      EDetailingCompletedDoctors,
      EDetailingHistory,
      AllDoctors,
      DailyPlanAdhocDoctorPlanned,
      AllDoctorsFullData,
      DailyPlanDoctorComment,
      SpecBrandMapping,
      EDetailingVAThumbNails,
      Bo,
      Abm,
      PendingEDetailingState,
      CurrentVDetailingState,
      LandingPage,
      VirtualDetailingSummary,
      TrainingPage,
      ContactChemist,
      ContactDoctor,
      CampaingListData,
      ApprovedBoDataList,
      RxUploadDataBo,
      RX_CampaingListData,
      Rx_ApprovedList,
      rx_chemist_code,
      Rx_TrackerList,
      rx_tracker_chemist_code,
      RX_DrChemist_Submit,
      RxUploadSave
    ],
    schemaVersion: 1,
  };

  static getInstance() {
    if (RealmManager.sharedInstance == null) {
      RealmManager.sharedInstance = new RealmManager();
    }
    return this.sharedInstance;
  }

  async read(schema, filterBy = null) {
    const realm = await Realm.open(this.databaseOptions);
    let result = await realm.objects(schema);
    if (filterBy) {
      result = await result.filtered(this.getFilterString(filterBy));
    }
    return result.map(x => x);
  }

  async readByString(schema, filterBy) {
    const realm = await Realm.open(this.databaseOptions);
    let result = await realm.objects(schema);
    if (filterBy) {
      result = await result.filtered(filterBy);
    }
    return result.map(x => x);
  }

  async readByStringArray(schema, filterBy) {
    const realm = await Realm.open(this.databaseOptions);
    let result = await realm.objects(schema);
    if (filterBy) {
      for (const query of filterBy) {
        result = await result.filtered(query);
      }
    }
    return result.map(x => x);
  }

  getFilterString(filterBy) {
    const keys = Object.keys(filterBy);
    let filterString = '';
    let appender = '';
    if (keys.length) {
      keys.forEach(key => {
        filterString += `${appender + key} = `;
        if (typeof filterBy[key] === 'string') {
          filterString += `"${filterBy[key]}"`;
        } else {
          filterString += filterBy[key];
        }
        appender = ' AND ';
      });
    }
    return filterString;
  }

  write(schema, properties) {
    Realm.open(this.databaseOptions).then(realm => {
      realm.write(() => {
        properties.forEach(item => {
          realm.create(schema, item);
        });
      });
    });
  }

  delete(schema, filterBy = null) {
    Realm.open(this.databaseOptions).then(realm => {
      realm.write(() => {
        let objects = realm.objects(schema);
        if (filterBy) {
          objects = objects.filtered(this.getFilterString(filterBy));
        }
        realm.delete(objects);
      });
    });
  }

  // async update(schema,filterBy = null,data){
  //   Realm.open(this.databaseOptions).then(realm => {
  //   realm.write(() => {
  //     let result =  realm.objects(schema);
  //     console.log('Data for Rx upload in realm',data,schema,filterBy)
  //     if (filterBy) {
  //       result =  result.filtered(this.getFilterString(filterBy));
  //     }
  //     console.log('Result Update',result)
  //     if(result.length>0){
  //       console.log('Data for Rx upload in result',data)
  //       result[0].campaign_code = data.campaign_code
  //       result[0].company_code = data.company_code
  //       result[0].rep_code = data.rep_code
  //       result[0].sbu_code = data.sbu_code
  //       result[0].dr_code = data.dr_code
  //       result[0].mcr_no = data.mcr_no
  //       result[0].prd_code =data.prd_code
  //       result[0].brand_code = data.brand_code
  //       result[0].proof_of_supply = data.proof_of_supply
  //       result[0].selected_chemist = data.selected_chemist
  //       result[0].qty = data.qty
  //       result[0].rx_upload = data.rx_upload
  //       result[0].status = data.status
  //       result[0].doc_name = data.doc_name
  //       result[0].created_at = data.created_at
  //       result[0].brand_name = data.brand_name
  //     }
  //     })})
  // }
  logout() {
    Realm.open(this.databaseOptions).then(realm => {
      realm.write(() => {
        realm.delete(realm.objects(RcpaMyBos.name));
        realm.delete(realm.objects(RcpaGspDoc.name));
        realm.delete(realm.objects(RcpaMultivisitDoc.name));
        realm.delete(realm.objects(RcpaAllDoc.name));
        realm.delete(realm.objects(RcpaChemists.name));
        realm.delete(realm.objects(RcpaLogs.name));
        realm.delete(realm.objects(RcpaHistory.name));
        realm.delete(realm.objects(PendingRcpa.name));
        realm.delete(realm.objects(RcpaProductMapping.name));
        realm.delete(realm.objects(DailyPlanMyBos.name));
        realm.delete(realm.objects(DailyPlan.name));
        realm.delete(realm.objects(DailyPlanDoctorPlanned.name));
        realm.delete(realm.objects(DailyPlanBoEffort.name));
        realm.delete(realm.objects(DailyPlanActionSummary.name));
        realm.delete(realm.objects(DailyPlanPendingActionSummary.name));
        realm.delete(realm.objects(DailyPlanPendingDoctors.name));
        realm.delete(realm.objects(CoachmapQuestionTemplate.name));
        realm.delete(realm.objects(DetailingContent.name));
        realm.delete(realm.objects(DetailingContentShowCase.name));
        realm.delete(realm.objects(FeedbackConfig.name));
        realm.delete(realm.objects(SurveyConfig.name));
        realm.delete(realm.objects(PendingEDetailing.name));
        realm.delete(realm.objects(EDetailingCompletedDoctors.name));
        realm.delete(realm.objects(EDetailingHistory.name));
        realm.delete(realm.objects(AllDoctors.name));
        //realm.delete(realm.objects(DailyPlanAdhocDoctorPlanned.name));
        realm.delete(realm.objects(AllDoctorsFullData.name));
        realm.delete(realm.objects(DailyPlanDoctorComment.name));
        realm.delete(realm.objects(SpecBrandMapping.name));
        realm.delete(realm.objects(EDetailingVAThumbNails.name));
        realm.delete(realm.objects(Bo.name));
        realm.delete(realm.objects(Abm.name));
        realm.delete(realm.objects(PendingEDetailingState.name));
        realm.delete(realm.objects(CurrentVDetailingState.name));
        realm.delete(realm.objects(LandingPage.name));
        realm.delete(realm.objects(VirtualDetailingSummary.name));
        realm.delete(realm.objects(TrainingPage.name));
        realm.delete(realm.objects(ContactChemist.name));
        realm.delete(realm.objects(ContactDoctor.name));
        realm.delete(realm.objects(CampaingListData.name));
        realm.delete(realm.objects(ApprovedBoDataList.name));
        realm.delete(realm.objects(RxUploadDataBo.name));
        realm.delete(realm.objects(RxUploadSave.name));
        realm.delete(realm.objects(RX_CampaingListData.name));
        realm.delete(realm.objects(Rx_TrackerList.name));
        realm.delete(realm.objects(Rx_ApprovedList.name));
        realm.delete(realm.objects(rx_chemist_code.name));
        realm.delete(realm.objects(rx_tracker_chemist_code.name));
        realm.delete(realm.objects(RX_DrChemist_Submit.name));
      });
    });
  }
}
