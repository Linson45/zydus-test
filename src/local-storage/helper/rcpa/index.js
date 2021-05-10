import moment from 'moment';
import RealmManager from '../../realm-manager';
import {
  PendingRcpa,
  RcpaAllDoc,
  RcpaChemists,
  RcpaGspDoc,
  RcpaHistory,
  RcpaLogs,
  RcpaMultivisitDoc,
  RcpaMyBos,
  RcpaProductMapping
} from '../../schemas';
import Adapter from '../../../util/Adapter';
import { Role } from '../../../util/Constants';

export const getRcpaMyBos = async () => {
  const user = await Adapter.getUser();
  const { user_type } = user;
  const items = await RealmManager.getInstance().read(RcpaMyBos.name);

  if (user_type === Role.ABM) {
    return items;
  } if (user_type === Role.RBM) {
    const areaJson = {};
    items.forEach((item) => {
      const { area_code } = item;
      let bos = areaJson[area_code];
      if (!bos) bos = [];
      bos.push(item);
      areaJson[area_code] = bos;
    });
    return Object.keys(areaJson).map((area_code) => ({
      area_id: area_code,
      area_name: areaJson[area_code][0].area_name,
      bos: areaJson[area_code]
    }));
  } if (user_type === Role.ZBM) {
    const regionJson = {};
    items.forEach((item) => {
      const { region_code } = item;
      let bos = regionJson[region_code];
      if (!bos) bos = [];
      bos.push(item);
      regionJson[region_code] = bos;
    });
    return Object.keys(regionJson).map((region_code) => ({
      region_id: region_code,
      region_name: regionJson[region_code][0].region_name,
      bos: regionJson[region_code]
    }));
  }
  return [];
};

export const createRcpaMyBos = async (items) => {
  deleteRcpaMyBos();
  const user = await Adapter.getUser();
  const { user_type } = user;

  let bos = [];
  if (user_type === Role.ABM) {
    bos = items.map((bo) => {
      const {
        company_code, sbu_code, rep_code, name, hq_name, completion
      } = bo;
      return {
        company_code,
        sbu_code,
        rep_code,
        name,
        hq_name,
        completion
      };
    });
  } else if (user_type === Role.RBM) {
    items.forEach((area) => {
      const { area_id, area_name } = area;
      area.bos.forEach((bo) => {
        const {
          company_code, sbu_code, rep_code, name, hq_name, region_id, region_name, completion
        } = bo;
        bos.push({
          company_code,
          sbu_code,
          rep_code,
          name,
          hq_name,
          area_code: area_id,
          area_name,
          region_code: region_id,
          region_name,
          completion
        });
      });
    });
  } else if (user_type === Role.ZBM) {
    items.forEach((region) => {
      const { region_id, region_name } = region;
      region.bos.forEach((bo) => {
        const {
          company_code, sbu_code, rep_code, name, hq_name, area_id, area_name, completion
        } = bo;
        bos.push({
          company_code,
          sbu_code,
          rep_code,
          name,
          hq_name,
          area_code: area_id,
          area_name,
          region_code: region_id,
          region_name,
          completion
        });
      });
    });
  }

  RealmManager.getInstance().write(RcpaMyBos.name, bos);
};

export const deleteRcpaMyBos = () => {
  RealmManager.getInstance().delete(RcpaMyBos.name);
};

export const getRcpaGspDoc = (rep_code) => {
  const docs = RealmManager.getInstance().read(RcpaGspDoc.name, { rep_code });
  return docs;
};

export const createRcpaGspDoc = (rep_code, docs) => {
  deleteRcpaGspDoc(rep_code);
  const items = docs.map((doc) => {
    const {
      doc_name, doc_spec, visit_category, sales_planning, doc_code, status
    } = doc;
    return {
      doc_name,
      doc_spec,
      visit_category,
      sales_planning,
      doc_code,
      status,
      rep_code
    };
  });

  RealmManager.getInstance().write(RcpaGspDoc.name, items);
};

export const deleteRcpaGspDoc = (rep_code) => {
  RealmManager.getInstance().delete(RcpaGspDoc.name, { rep_code });
};

export const getRcpaMultivisitDoc = (rep_code) => {
  const docs = RealmManager.getInstance().read(RcpaMultivisitDoc.name, { rep_code });
  return docs;
};

export const createRcpaMultivisitDoc = (rep_code, docs) => {
  deleteRcpaMultivisitDoc(rep_code);
  const items = docs.map((doc) => {
    const {
      doc_name, doc_spec, visit_category, sales_planning, doc_code, status
    } = doc;
    return {
      doc_name,
      doc_spec,
      visit_category,
      sales_planning,
      doc_code,
      status,
      rep_code
    };
  });
  RealmManager.getInstance().write(RcpaMultivisitDoc.name, items);
};

export const deleteRcpaMultivisitDoc = (rep_code) => {
  RealmManager.getInstance().delete(RcpaMultivisitDoc.name, { rep_code });
};

export const getRcpaAllDoc = (rep_code) => {
  const docs = RealmManager.getInstance().read(RcpaAllDoc.name, { rep_code });
  return docs;
};

export const createRcpaAllDoc = (rep_code, docs) => {
  deleteRcpaAllDoc(rep_code);
  const items = docs.map((doc) => {
    const {
      doc_name, doc_spec, visit_category, sales_planning, doc_code, status
    } = doc;
    return {
      doc_name,
      doc_spec,
      visit_category,
      sales_planning,
      doc_code,
      status,
      rep_code
    };
  });
  RealmManager.getInstance().write(RcpaAllDoc.name, items);
};

export const deleteRcpaAllDoc = (rep_code) => {
  RealmManager.getInstance().delete(RcpaAllDoc.name, { rep_code });
};

// Fetch Chemists List from Realm
export const getRcpaChemists = (doc_code) => {
  RealmManager.getInstance().read(RcpaChemists.name, { doc_code });
};

// Delete Chemists List from Realm
export const deleteRcpaChemists = (doc_code) => {
  RealmManager.getInstance().delete(RcpaChemists.name, { doc_code });
};

// Add / Update Chemists List in Realm
export const createRcpaChemists = (doc_code, chemists) => {
  deleteRcpaChemists(doc_code);
  const items = chemists.map((chemist) => {
    const { chemist_code, chemist_name } = chemist;
    return {
      doc_code,
      chemist_code,
      chemist_name
    };
  });
  RealmManager.getInstance().write(RcpaChemists.name, items);
};

export const getRcpaLogs = async (doc_code, chemist_code) => {
  let logs = await RealmManager.getInstance().read(RcpaLogs.name, { doc_code, chemist_code });
  logs = logs.map((log) => {
    log.details = JSON.parse(log.product_details);
    return log;
  });
  return logs;
};

export const deleteRcpaLogs = (doc_code, chemist_code) => {
  RealmManager.getInstance().delete(RcpaLogs.name, { doc_code, chemist_code });
};

export const createRcpaLogs = (doc_code, chemist_code, logs) => {
  deleteRcpaLogs(doc_code, chemist_code);
  const items = logs.map((log) => {
    const {
      price, creation_date, created_by, suggest_id, details
    } = log;
    return {
      doc_code,
      chemist_code,
      price,
      creation_date,
      created_by,
      suggest_id,
      product_details: JSON.stringify(details)
    };
  });
  RealmManager.getInstance().write(RcpaLogs.name, items);
};

export const getRcpaHistory = async (rep_code, doc_code, chemist_code) => {
  let brands = await RealmManager.getInstance().read(RcpaHistory.name, { rep_code, doc_code, chemist_code });
  brands = brands.map((brand) => {
    brand.products = JSON.parse(brand.product_details);
    return brand;
  });
  return brands;
};

export const deleteRcpaHistory = (rep_code, doc_code, chemist_code) => {
  RealmManager.getInstance().delete(RcpaHistory.name, { rep_code, doc_code, chemist_code });
};

export const createRcpaHistory = (rep_code, doc_code, chemist_code, brands) => {
  deleteRcpaHistory(rep_code, doc_code, chemist_code);
  const items = brands.map((brand) => {
    const { brand_code, brand_name, products } = brand;
    return {
      rep_code,
      doc_code,
      chemist_code,
      brand_code,
      brand_name,
      product_details: JSON.stringify(products)
    };
  });
  RealmManager.getInstance().write(RcpaHistory.name, items);
};

export const getRcpaProductMapping = async (sbu_code) => {
  const items = await RealmManager.getInstance().read(RcpaProductMapping.name, { sbu_code });
  const brandsJson = {};
  items.forEach((item) => {
    const newItem = { ...item };
    let products = brandsJson[item.brand_code];
    if (!products) products = [];
    newItem.competitors = JSON.parse(item.competitors);
    products.push(newItem);
    brandsJson[newItem.brand_code] = products;
  });

  const brands = [];
  Object.keys(brandsJson).forEach((brand_code) => {
    brands.push({
      brand_code,
      brand_name: brandsJson[brand_code][0].brand_name,
      items: brandsJson[brand_code]
    });
  });
  return brands;
};

export const deleteRcpaProductMapping = (sbu_code) => {
  RealmManager.getInstance().delete(RcpaProductMapping.name, { sbu_code });
};

export const createRcpaProductMapping = (sbu_code, brands) => {
  deleteRcpaProductMapping(sbu_code);
  const products = [];
  brands.forEach((brand) => {
    const { brand_code, brand_name, items } = brand;
    items.forEach((item) => {
      const {
        product_code, product_name, mkt_rate, competitors
      } = item;
      const product = {
        sbu_code,
        brand_code,
        brand_name,
        product_code,
        product_name,
        mkt_rate: `${mkt_rate}`,
        competitors: JSON.stringify(competitors)
      };
      products.push(product);
    });
  });
  RealmManager.getInstance().write(RcpaProductMapping.name, products);
};

export const createPendingRcpa = (rep_code, chem_code, doc_code, total, items) => {
  const product = {
    rep_code,
    doc_code,
    chem_code,
    creation_date: moment().format('DD-MMM-YYYY'),
    total,
    items,
  };
  RealmManager.getInstance().write(PendingRcpa.name, [product]);
};

export const pendingRcpaDoctorCodes = async () => {
  const items = await RealmManager.getInstance().read(PendingRcpa.name);
  return items.map((item) => item.doc_code);
};

export const getPendingRcpaLogs = async (rep_code, chem_code, doc_code) => {
  const logs = await RealmManager.getInstance().read(PendingRcpa.name, { rep_code, doc_code, chem_code });
  return logs.map((log) => ({ ...log, details: JSON.parse(log.items).product_details }));
};

export const getFirstPendingRcpa = async () => {
  const logs = await RealmManager.getInstance().read(PendingRcpa.name);
  return logs[0];
};

export const deletePendingRcpa = (rep_code, chem_code, doc_code) => {
  RealmManager.getInstance().delete(PendingRcpa.name, { rep_code, chem_code, doc_code });
};
