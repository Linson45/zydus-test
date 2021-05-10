import api from '../api';
import Urls from '../api/urls';
import Adapter from '../util/Adapter';
import { dynamicSort } from '../util/ArrayUtil';

export const LOAD_CONTENT_HUB = 'load_content_hub';
export const LOAD_CONTENT_HUB_SUCCESS = 'load_content_hub_success';
export const LOAD_CONTENT_HUB_FAIL = 'load_content_hub_fail';

export const LOAD_CONTENT_HUB_BRAND_DETAIL = 'load_content_hub_brand_detail';
export const LOAD_CONTENT_HUB_BRAND_DETAIL_SUCCESS = 'load_content_hub_brand_detail_success';
export const LOAD_CONTENT_HUB_BRAND_DETAIL_FAIL = 'load_content_hub_brand_detail_fail';

export const loadContentHub = () => async (dispatch) => {
  const user = await Adapter.getUser();
  const { company_code, sbu_code } = user;

  dispatch({ type: LOAD_CONTENT_HUB });
  const { statusCode, errorMessage, data } = await api({
    method: 'GET',
    url: Urls.GET_BRAND_SPEC_MAPPING,
    params: { company_code, sbu_code },
  });

  if (statusCode === 200) {
    const specJson = {};
    const specNameJson = {};
    data.forEach((item) => {
      const { spec_code, spec_desc } = item;
      if (!specNameJson[spec_code]) {
        specNameJson[spec_code] = spec_desc;
      }
      let brands = specJson[spec_code];
      if (!brands) {
        brands = [];
      }

      const { priority } = item;
      let numberPriority = 10000;
      if (priority) {
        numberPriority = +priority.replace('P', '');
      }
      item.numberPriority = numberPriority;

      brands.push(item);
      specJson[spec_code] = brands;
    });

    const latest_case_studies = await loadLatestCaseStudies();
    const items = await Promise.all(Object.keys(specNameJson).map(async (spec_code) => {
      const brands = specJson[spec_code];
      brands.sort(dynamicSort('numberPriority'));
      return {
        spec_code,
        spec_desc: specNameJson[spec_code],
        brands
      };
    }));

    dispatch({ type: LOAD_CONTENT_HUB_SUCCESS, payload: { items, latest_case_studies } });
  } else {
    dispatch({ type: LOAD_CONTENT_HUB_FAIL, payload: errorMessage });
  }
};

export const loadLatestCaseStudies = async () => {
  const user = await Adapter.getUser();
  const { sbu_code, company_code } = user;

  const { statusCode, data } = await api({
    method: 'GET',
    url: Urls.GET_LATEST_CASE_STUDIES,
    params: { division: sbu_code, company_code },
  });
  if (statusCode === 200) {
    // eslint-disable-next-line no-return-await
    return await Promise.all(data.results.map(async (item) => {
      const { thumbnail } = item;
      const previewRes = await getPreview(thumbnail);
      if (previewRes) {
        const { url } = previewRes;
        item.thumbnail_url = url;
      }
      return item;
    }));
  }
  return [];
};

export const loadBrandContentHub = (brand) => async (dispatch) => {
  const user = await Adapter.getUser();
  const { sbu_code, company_code } = user;
  const { brand_code } = brand;

  dispatch({ type: LOAD_CONTENT_HUB_BRAND_DETAIL });
  const { statusCode, errorMessage, data } = await api({
    method: 'GET',
    url: Urls.GET_BRAND_CONTENT_HUB,
    params: { division: sbu_code, company_code, brand: brand_code },
  });

  if (statusCode === 200) {
    let items = data.results;
    items = await Promise.all(items.map(async (item) => {
      const { thumbnail } = item;
      const previewRes = await getPreview(thumbnail);
      if (previewRes) {
        const { url } = previewRes;
        item.thumbnail_url = url;
      }
      if (item.content_type === 'Drug Information') {
        item.priority = 1;
      } else if (item.content_type === 'Articles/Presentations') {
        item.priority = 2;
      } else if (item.content_type === 'Webinars/CMEs') {
        item.priority = 3;
      } else if (item.content_type === 'Patient Education') {
        item.priority = 4;
      } else if (item.content_type === 'Others') {
        item.priority = 5;
      } else {
        item.priority = 100;
      }
      return item;
    }));

    items = items.sort(dynamicSort('priority'));
    const contentTypeJson = {};
    items.forEach((item) => {
      const { content_type } = item;
      let contentItems = contentTypeJson[content_type];
      if (!contentItems) {
        contentItems = [];
      }
      contentItems.push(item);
      contentTypeJson[content_type] = contentItems;
    });
    const result = Object.keys(contentTypeJson).map((content_type) => ({
      content_type,
      contents: contentTypeJson[content_type],
    }));
    dispatch({ type: LOAD_CONTENT_HUB_BRAND_DETAIL_SUCCESS, payload: result });
  } else {
    dispatch({ type: LOAD_CONTENT_HUB_BRAND_DETAIL_FAIL, payload: errorMessage });
  }
};

export const getPreview = async (filename) => {
  const { data } = await api({
    method: 'GET',
    url: Urls.GET_FILE_PREVIEW,
    params: { filename },
  });
  return data;
};

export const shareContent = async (body) => {
  const response = await api({
    method: 'POST',
    url: Urls.SHARE_CONTENT,
    data: body,
  });
  return response;
};

export const searchContentHub = async (search_text) => {
  const user = await Adapter.getUser();
  const { sbu_code, company_code } = user;

  const { statusCode, data } = await api({
    method: 'GET',
    url: Urls.SEARCH_CONTENT_HUB,
    params: { division: sbu_code, company_code, search_text },
  });
  if (statusCode === 200) {
    let items = data.results;
    items = await Promise.all(items.map(async (item) => {
      const { thumbnail } = item;
      const previewRes = await getPreview(thumbnail);
      if (previewRes) {
        const { url } = previewRes;
        item.thumbnail_url = url;
      }
      return item;
    }));
    return items;
  }
  return [];
};
