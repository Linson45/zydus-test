/* eslint-disable */
import * as RNFS from 'react-native-fs';
import {
  createDetailingContentShowcase,
  deleteDailyShowCase,
  getDetailingContentConfig
} from '../local-storage/helper/detailing';

export const showcaseStatus = async (doc_code, content_id) => {
  const VA = await getDetailingContentConfig(doc_code, content_id);
  return !!(VA && VA.in_showcase);
};

export const readConfigFromFile = async (folderPath) => {
  const filePath = [
    folderPath,
    'config.json'
  ].join('/');

  if (await RNFS.exists(filePath)) {
    return await RNFS
      .readFile(filePath)
      .then((config) => {
        config = JSON.parse(config);
        return config;
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });
  }
  return [];
};

export const readConfig = async (folderPath, doc_code, content_id, datum, force_load = false) => {
  if (!force_load) {
    const VA = await getDetailingContentConfig(doc_code, content_id);
    const { config } = VA;
    if (config && config.length > 0) {
      return config;
    }
  }

  const filePath = [
    folderPath,
    'config.json'
  ].join('/');

  if (await RNFS.exists(filePath)) {
    return await RNFS
      .readFile(filePath)
      .then((config) => {
        deleteDailyShowCase(
          doc_code,
          content_id
        );
        config = JSON.parse(config);
        datum[config] = config;
        createDetailingContentShowcase(
          doc_code,
          content_id,
          datum
        );
        return config;
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });
  }
  return [];
};

export const editedNameOfVA = async (doc_code, content_id) => {
  const VA = await getDetailingContentConfig(doc_code, content_id);
  return VA.name;
};

export const postionOfVA = async (doc_code, content_id) => {
  const VA = await getDetailingContentConfig(doc_code, content_id);
  return VA.vaPosition;
};

const processContents = async (contents, doc_code) => {
  const brands = [];
  const brandCodeList = [];
  for (const content of contents) {
    const {
      brand,
      brand_name,
      thumbnail_location,
      title,
      publish_date,
      content_location,
      content_id,
      speciality
    } = content;
    let position = brandCodeList.indexOf(brand);
    if (position === -1) {
      brandCodeList.push(
        brand
      );
      const va = {
        name: brand_name || (`NA: ${brand}`),
        data: []
      };
      brands.push(va);
      position = brandCodeList.indexOf(brand);
    }
    const VA = await getDetailingContentConfig(doc_code, content_id);
    const { name } = VA;
    let { config } = VA;
    const vaPosition = parseInt(VA.vaPosition);
    const datum = {
      thumbnail: ['file:/', thumbnail_location].join('/'),
      duration: '',
      last_shared: '',
      date: publish_date,
      name: name || title,
      title,
      content_location,
      brand,
      in_showcase: !!(VA && VA.in_showcase),
      doc_code,
      speciality,
      content_id,
      vaPosition,
    };
    if (!config || config.length < 0) {
      config = await readConfig(content_location, doc_code, content_id, datum);
      if (!config || config.length < 0) {
        config = await readConfig(content_location, doc_code, content_id, datum, true);
      }
    }
    datum.config = config;
    brands[position].data.push(
      datum
    );
  }
  return brands;
};

export const loadVADetailsWithConfig = async (doc_code, contents) => await processContents(contents, doc_code);

const processTraining = async (contents, doc_code) => {
  const brands = [];
  const brandCodeList = [];
  for (const content of contents) {
    const {
      brand,
      brand_name,
      thumbnail_location,
      title,
      publish_date,
      content_location,
      content_id,
      speciality
    } = content;
    let position = brandCodeList.indexOf(publish_date);
    if (position === -1) {
      brandCodeList.push(
          publish_date
      );
      const va = {
        name: publish_date || (`NA: ${publish_date}`),
        data: []
      };
      brands.push(va);
      position = brandCodeList.indexOf(publish_date);
    }
    const datum = {
      thumbnail: ['file:/', thumbnail_location].join('/'),
      duration: '',
      last_shared: '',
      brand_name: brand_name,
      date: publish_date,
      name: title,
      title,
      content_location,
      brand,
      in_showcase: true,
      doc_code,
      speciality,
      content_id
    };
    datum.config = await readConfig(content_location, doc_code, content_id, datum, true);
    brands[position].data.push(
        datum
    );
  }
  return brands;
};

export const loadTrainingData = async (doc_code, contents) => await processTraining(contents, doc_code);
