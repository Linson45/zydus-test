import * as RNFS from 'react-native-fs';
import RealmManager from '../../realm-manager';
import {
  DetailingContent,
  DetailingContentShowCase,
  EDetailingCompletedDoctors,
  EDetailingHistory,
  FeedbackConfig,
  PendingEDetailingState,
  SpecBrandMapping,
  SurveyConfig
} from '../../schemas';
import {
  PendingEDetailing, TrainingPage, EDetailingVAThumbNails, LandingPage, VirtualDetailingSummary
} from '../../schemas/detailing';
import { thumbnailFolderPath, unzipFolderPath } from '../../../util/Constants';
import { dynamicSort } from '../../../util/ArrayUtil';
import { readConfigFromFile } from '../../../util/startDeatiling';

const processItem = (item) => {
  const thumbnail_location = [thumbnailFolderPath, item.thumbnail_location].join('/');
  const content_location = [unzipFolderPath, item.content_location].join('/');
  const content_path = item.content_location;
  return {
    ...item,
    thumbnail_location,
    content_location,
    content_path
  };
};

const processLandingPage = (item) => {
  const content_location = [unzipFolderPath, item.content_location].join('/');
  const content_path = item.content_location;
  return {
    ...item,
    content_location,
    content_path
  };
};

export const getContentSpecialities = async () => {
  const items = await RealmManager.getInstance().read(SpecBrandMapping.name);
  const contentMap = {};
  items.forEach((item) => {
    const { spec_code, spec_desc } = item;
    contentMap[spec_code] = spec_desc;
  });
  return Object.keys(contentMap).map((speciality) => ({
    speciality,
    speciality_name: contentMap[speciality]
  }));
};

export const getDetailingContents = async () => {
  const items = await RealmManager.getInstance().read(DetailingContent.name);
  return items.map((item) => processItem(item));
};

export const getTraining = async () => {
  const items = await RealmManager.getInstance().read(TrainingPage.name);
  return items.map((item) => processItem(item));
};

export const createTrainingContent = async (content) => {
  const {
    content_id, publish_date, expiry_date, brand, division, speciality, title, status, type, content_size,
    content_type, thumbnail_location, content_location, brand_name, speciality_name
  } = content;
  const item = {
    content_id,
    publish_date,
    expiry_date,
    brand,
    division,
    speciality,
    title,
    status,
    type,
    content_size,
    content_type,
    thumbnail_location,
    content_location,
    brand_name,
    speciality_name,
  };
  RealmManager.getInstance().write(TrainingPage.name, [item]);
  // eslint-disable-next-line func-names
  (function () {
    try {
      const {
        content_location
      } = processItem(item);
      readConfigFromFile(content_location).then((slides) => {
        for (const slide of slides) {
          const thumbnail = [content_location, slide.thumbnail].join('/');
          RNFS.exists(thumbnail).then((response) => {
            if (response) {
              RNFS.readFile(thumbnail, 'base64').then((image) => {
                setVAImage(content_id, slide.position.toString(), image);
              }).catch((e) => console.log(e));
            }
          }).catch((e) => console.log(e));
        }
      }).catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  }());
};

export const getTrainingByDate = async () => {
  const brands = await RealmManager.getInstance().read(TrainingPage.name);
  brands.sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date));
  const items = await RealmManager.getInstance().read(TrainingPage.name);
  items.sort((a, b) => +b.content_id - +a.content_id);
  const brandItemsMap = {};
  items.forEach((item) => {
    let brandItems = brandItemsMap[item.publish_date];
    if (!brandItems) {
      brandItems = [];
    }
    brandItems.push(item);
    brandItemsMap[item.publish_date] = brandItems;
  });

  const finalItems = [];
  const usedItemsId = [];

  brands.forEach((brand) => {
    const { publish_date } = brand;
    const items = brandItemsMap[publish_date];
    if (items) {
      items.forEach((item) => {
        if (usedItemsId.indexOf(item.content_id) === -1) {
          finalItems.push(processItem(item));
          usedItemsId.push(item.content_id);
        }
      });
    }
  });
  items.forEach((item) => {
    if (usedItemsId.indexOf(item.content_id) === -1) {
      finalItems.push(processItem(item));
      usedItemsId.push(item.content_id);
    }
  });
  return finalItems;
};

export const getTrainingContentConfig = async (doc_code, content_id) => {
  if (!doc_code && !content_id) {
    return [];
  }
  const filters = {
    doc_code,
    content_id
  };
  const items = await RealmManager.getInstance().read(TrainingPage.name, filters);
  if (items && items.length > 0) {
    return JSON.parse(items[0].showcase_config);
  }
  return [];
};

export const getLandingPage = async () => {
  const items = await RealmManager.getInstance().read(LandingPage.name);
  return items.map((item) => processLandingPage(item));
};

export const createLandingPage = async (content) => {
  const {
    content_id, publish_date, expiry_date, division, title, status, type, content_size,
    content_type, content_location, brand_name, speciality_name
  } = content;
  const item = {
    content_id,
    publish_date,
    expiry_date,
    division,
    title,
    status,
    type,
    content_size,
    content_type,
    content_location,
    brand_name,
    speciality_name,
  };
  RealmManager.getInstance().write(LandingPage.name, [item]);
};

export const getAllLandingPages = async () => {
  const items = await RealmManager.getInstance().read(LandingPage.name);
  return items.map((item) => processItem(item));
};

export const createDetailingContent = async (content) => {
  const {
    content_id, publish_date, expiry_date, brand, division, speciality, title, status, type, content_size,
    content_type, thumbnail_location, content_location, brand_name, speciality_name
  } = content;
  const item = {
    content_id,
    publish_date,
    expiry_date,
    brand,
    division,
    speciality,
    title,
    status,
    type,
    content_size,
    content_type,
    thumbnail_location,
    content_location,
    brand_name,
    speciality_name,
  };
  RealmManager.getInstance().write(DetailingContent.name, [item]);
  // eslint-disable-next-line func-names
  (function () {
    try {
      const {
        content_location
      } = processItem(item);
      readConfigFromFile(content_location).then((slides) => {
        for (const slide of slides) {
          const thumbnail = [content_location, slide.thumbnail].join('/');
          RNFS.exists(thumbnail).then((response) => {
            if (response) {
              RNFS.readFile(thumbnail, 'base64').then((image) => {
                setVAImage(content_id, slide.position.toString(), image);
              }).catch((e) => console.log(e));
            }
          }).catch((e) => console.log(e));
        }
      }).catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  }());
};

export const getContentsForDoctor = async (doctor) => {
  const { spec_code, priority_brands } = doctor;
  const contents = [];
  const exploredContentIds = [];

  const realmContents = await RealmManager.getInstance().read(DetailingContent.name);
  const items = realmContents.map((content) => processItem(content));
  items.sort((a, b) => +b.content_id - +a.content_id);

  const brandMap = {};
  items.forEach((content) => {
    let brandContents = brandMap[content.brand];
    if (!brandContents) {
      brandContents = [];
    }
    brandContents.push(content);
    brandMap[content.brand] = brandContents;
  });

  for (const brand of priority_brands) {
    const localContents = brandMap[brand.brand_code];
    if (localContents) {
      localContents.forEach((content) => {
        if (exploredContentIds.indexOf(content.content_id !== -1)) {
          contents.push(content);
          exploredContentIds.push(content.content_id);
        }
      });
      delete brandMap[brand.brand_code];
    }
  }

  const spec_brands = await getSpecBrandMapping(spec_code);
  for (const brand of spec_brands) {
    const localContents = brandMap[brand.brand_code];
    if (localContents) {
      localContents.forEach((content) => {
        if (exploredContentIds.indexOf(content.content_id !== -1)) {
          contents.push(content);
          exploredContentIds.push(content.content_id);
        }
      });
      delete brandMap[brand.brand_code];
    }
  }

  Object.keys(brandMap).forEach((brand_code) => {
    const localContents = brandMap[brand_code];
    if (localContents) {
      localContents.forEach((content) => {
        if (exploredContentIds.indexOf(content.content_id !== -1)) {
          contents.push(content);
          exploredContentIds.push(content.content_id);
        }
      });
      delete brandMap[brand_code];
    }
  });
  return contents;
};

export const getContentsForSpec = async () => {
  let brands = await RealmManager.getInstance().read(SpecBrandMapping.name);
  brands = brands.map((item) => {
    const { priority } = item;
    let numberPriority = 10000;
    if (priority) {
      numberPriority = +priority.replace('P', '');
    }
    return { ...item, numberPriority };
  });
  brands = brands.sort(dynamicSort('numberPriority'));

  const items = await RealmManager.getInstance().read(DetailingContent.name);
  items.sort((a, b) => +b.content_id - +a.content_id);

  const brandItemsMap = {};
  items.forEach((item) => {
    let brandItems = brandItemsMap[item.brand];
    if (!brandItems) {
      brandItems = [];
    }
    brandItems.push(item);
    brandItemsMap[item.brand] = brandItems;
  });

  const finalItems = [];
  const usedItemsId = [];

  brands.forEach((brand) => {
    const { brand_code } = brand;
    const items = brandItemsMap[brand_code];
    if (items) {
      items.forEach((item) => {
        if (usedItemsId.indexOf(item.content_id) === -1) {
          finalItems.push(processItem(item));
          usedItemsId.push(item.content_id);
        }
      });
    }
  });
  items.forEach((item) => {
    if (usedItemsId.indexOf(item.content_id) === -1) {
      finalItems.push(processItem(item));
      usedItemsId.push(item.content_id);
    }
  });
  return finalItems;
};

export const createDetailingContentShowcase = async (doc_code, content_id, showcase_config) => {
  const item = {
    doc_code,
    content_id,
    showcase_config: JSON.stringify(showcase_config),
  };
  RealmManager.getInstance().write(DetailingContentShowCase.name, [item]);
};

export const getDetailingContentConfig = async (doc_code, content_id) => {
  if (!doc_code && !content_id) {
    return [];
  }
  const filters = {
    doc_code,
    content_id
  };
  const items = await RealmManager.getInstance().read(DetailingContentShowCase.name, filters);
  if (items && items.length > 0) {
    return JSON.parse(items[0].showcase_config);
  }
  return [];
};

export const getDetailingContentData = async (content_id) => {
  if (!content_id) {
    return [];
  }
  const filters = {
    content_id
  };
  const items = await RealmManager.getInstance().read(DetailingContent.name, filters);
  if (items && items.length > 0) {
    return processItem(items[0]);
  }
  return [];
};

export const getShowcaseForDoctor = async (doc_code) => {
  const items = await RealmManager.getInstance().read(DetailingContentShowCase.name, { doc_code });
  return items.map((item) => {
    const { content_id, doc_code, showcase_config } = item;
    return {
      content_id,
      doc_code,
      showcase_config: JSON.parse(showcase_config),
    };
  });
};

export const deleteDailyShowCase = (doc_code, content_id) => {
  if (!doc_code && !content_id) {
    return;
  }
  const filters = {
    doc_code,
  };
  if (content_id) {
    filters.content_id = content_id;
  }
  RealmManager.getInstance().delete(DetailingContentShowCase.name, filters);
};

export const getAllFeedbackConfigs = async () => {
  const items = await RealmManager.getInstance().read(FeedbackConfig.name);
  return items.map((item) => ({ ...item }));
};

export const getFeedbackConfig = async (division_code) => {
  const items = await RealmManager.getInstance().read(FeedbackConfig.name, { division_code });
  return items.map((item) => ({ ...item, feedback_config: JSON.parse(item.feedback_config) }))[0];
};

export const createFeedbackConfig = async (division_code, feedback_config) => {
  await deleteFeedbackConfig(division_code);
  RealmManager.getInstance().write(FeedbackConfig.name, [{
    division_code, feedback_config: JSON.stringify(feedback_config), survey_id: feedback_config.survey_id,
  }]);
};

export const deleteFeedbackConfig = async (division_code) => {
  const filters = {
    division_code,
  };
  await RealmManager.getInstance().delete(FeedbackConfig.name, filters);
};

export const getAllSurveyConfigs = async () => {
  const items = await RealmManager.getInstance().read(SurveyConfig.name);
  return items.map((item) => ({ ...item }));
};

// eslint-disable-next-line no-unused-vars
export const getSurveyConfig = async (division_code, brand_code, spec_code) => {
  const filters = {
    division_code,
  };
  if (brand_code) {
    filters.brand_code = brand_code;
  }
  // if (spec_code) {
  //     filters['spec_code'] = spec_code;
  // }
  const items = await RealmManager.getInstance().read(SurveyConfig.name, filters);
  return items.map((item) => ({ ...item, survey_config: JSON.parse(item.survey_config) }));
};

export const createSurveyConfig = async (division_code, brand_code, spec_code, survey_config) => {
  RealmManager.getInstance().write(SurveyConfig.name, [{
    division_code, brand_code, spec_code, survey_id: survey_config.survey_id, survey_config: JSON.stringify(survey_config),
  }]);
};

export const deleteSurveyConfig = async (division_code, brand_code, spec_code) => {
  const filters = {
    division_code,
  };
  if (brand_code) {
    filters.brand_code = brand_code;
  }
  if (spec_code) {
    filters.spec_code = spec_code;
  }
  await RealmManager.getInstance().delete(SurveyConfig.name, filters);
};

export const deleteAllSurveyConfig = async () => {
  await RealmManager.getInstance().delete(SurveyConfig.name);
};

export const createPendingEDetailingState = async (body) => {
  let { rep_code } = body;
  const { u_id } = body;
  if (!rep_code) {
    rep_code = 'empty';
  }
  await deletePendingEDetailingState(u_id, rep_code);
  RealmManager.getInstance().write(PendingEDetailingState.name, [{
    u_id, rep_code, state: JSON.stringify(body),
  }]);
};

export const deletePendingEDetailingState = async (u_id, rep_code) => {
  if (!rep_code) {
    rep_code = 'empty';
  }
  const filters = {
    u_id
  };
  await RealmManager.getInstance().delete(PendingEDetailingState.name, filters);
};

export const getFirstPendingEDetailingState = async () => {
  const eDetailings = await RealmManager.getInstance().read(PendingEDetailingState.name);
  const eDetailing = eDetailings[0];
  if (eDetailing) {
    return { ...eDetailing };
  }
  return null;
};

export const createPendingEDetailing = async (body) => {
  const {
    u_id, rep_code, date
  } = body;
  let { doc_codes } = body;
  if (typeof (doc_codes) !== 'string') {
    doc_codes = doc_codes.join(',');
  }
  await deletePendingEDetailing(u_id, rep_code);
  RealmManager.getInstance().write(PendingEDetailing.name, [{
    u_id, rep_code, doc_codes, display_date: date, items: JSON.stringify(body),
  }]);
};

export const deletePendingEDetailing = async (u_id, rep_code) => {
  const filters = {
    u_id, rep_code,
  };
  await RealmManager.getInstance().delete(PendingEDetailing.name, filters);
};

export const getFirstPendingEDetailing = async () => {
  const eDetailings = await RealmManager.getInstance().read(PendingEDetailing.name);
  const eDetailing = eDetailings[0];
  if (eDetailing) {
    return { ...eDetailing };
  }
  return null;
};

export const getPendingEDetailingCount = async () => {
  const eDetailings = await RealmManager.getInstance().read(PendingEDetailing.name);
  return eDetailings.length;
};

export const getCompletedDocCodes = async (rep_code, display_date) => {
  const filters = {
    rep_code,
    display_date,
  };
  const docCodes = [];
  const eDetailings = await RealmManager.getInstance().read(PendingEDetailing.name, filters);
  eDetailings.forEach((item) => {
    let { doc_codes } = item;
    if (doc_codes) {
      doc_codes = doc_codes.split(',');
      doc_codes.forEach((doc_code) => {
        docCodes.push(doc_code);
      });
    }
  });
  return docCodes;
};

export const getRemoteCompletedDocCodes = async (rep_code, display_date) => {
  const filters = {
    rep_code,
    display_date,
  };
  let docCodes = [];
  let codes = await RealmManager.getInstance().read(EDetailingCompletedDoctors.name, filters);
  codes = codes[0];
  if (codes) {
    docCodes = codes.doc_codes.split(',');
  }
  return docCodes;
};

export const createRemoteCompletedDocCodes = async (rep_code, display_date, doc_codes) => {
  const filters = {
    rep_code,
    display_date,
  };
  await RealmManager.getInstance().delete(EDetailingCompletedDoctors.name, filters);
  RealmManager.getInstance().write(EDetailingCompletedDoctors.name, [{
    rep_code, display_date, doc_codes: JSON.stringify(doc_codes.join(',')),
  }]);
};

export const getDetailingHistory = async (rep_code, doc_code) => {
  const filters = {
    rep_code,
    doc_code,
  };
  let history = [];
  let codes = await RealmManager.getInstance().read(EDetailingHistory.name, filters);
  codes = codes[0];
  if (codes) {
    history = JSON.parse(codes.history);
  }
  return history;
};

export const createDetailingHistory = async (rep_code, doc_code, history) => {
  const filters = {
    rep_code,
    doc_code,
  };
  await RealmManager.getInstance().delete(EDetailingHistory.name, filters);
  RealmManager.getInstance().write(EDetailingHistory.name, [{
    rep_code, doc_code, history: JSON.stringify(history),
  }]);
};

export const deleteSpecBrandMapping = async () => {
  await RealmManager.getInstance().delete(SpecBrandMapping.name);
};

export const createSpecBrandMapping = async (data) => {
  await deleteSpecBrandMapping();
  const items = data.map((item) => {
    const {
      brand_code, brand_name, priority, spec_code, spec_desc
    } = item;
    return {
      brand_code,
      brand_name,
      priority,
      spec_code,
      spec_desc,
    };
  });
  RealmManager.getInstance().write(SpecBrandMapping.name, items);
};

export const getSpecBrandMapping = async (spec_code) => {
  let items = await RealmManager.getInstance().read(SpecBrandMapping.name, { spec_code });
  items = items.map((item) => {
    const { priority } = item;
    let numberPriority = 10000;
    if (priority) {
      numberPriority = +priority.replace('P', '');
    }
    return { ...item, numberPriority };
  });
  return items.sort(dynamicSort('numberPriority'));
};

export const getSpecialities = async () => {
  const items = await RealmManager.getInstance().read(SpecBrandMapping.name);
  const itemsMap = {};
  items.forEach((item) => {
    itemsMap[item.spec_code] = item.spec_desc;
  });
  const result = Object.keys(itemsMap).map((spec_code) => ({
    spec_code,
    spec_name: itemsMap[spec_code],
  }));
  return result.sort(dynamicSort('spec_name'));
};

export const setVAImage = async (content_id, position, image) => {
  const filters = {
    content_id,
    position
  };
  await RealmManager.getInstance().delete(EDetailingVAThumbNails.name, filters);
  RealmManager.getInstance().write(EDetailingVAThumbNails.name, [{
    content_id, position, image
  }]);
};

export const getVAImage = async (content_id, position) => {
  const filters = {
    content_id,
    position,
  };
  const items = await RealmManager.getInstance().read(EDetailingVAThumbNails.name, filters);
  if (items && items.length > 0) {
    return items[0].image;
  }
  return '';
};

export const deleteVAImage = async (content_id, position) => {
  const filters = {
    content_id,
    position,
  };
  await RealmManager.getInstance().delete(EDetailingVAThumbNails.name, filters);
};

export const getVirtualDetailingSummary = async (rep_code, display_date) => {
  const filters = {
    rep_code,
    display_date,
  };
  let summaries = await RealmManager.getInstance().read(VirtualDetailingSummary.name, filters);
  summaries = summaries.map((summary) => ({ ...summary }));
  return summaries;
};

export const createVirtualDetailingSummary = async (rep_code, display_date, summaries) => {
  const filters = {
    rep_code,
    display_date,
  };
  await RealmManager.getInstance().delete(VirtualDetailingSummary.name, filters);
  summaries.forEach((summary) => {
    const {
      doc_code, end_time, session_id, session_token, start_time, status
    } = summary;
    RealmManager.getInstance().write(VirtualDetailingSummary.name, [{
      rep_code, display_date, doc_code, end_time, session_id, session_token, start_time, status
    }]);
  });
};
