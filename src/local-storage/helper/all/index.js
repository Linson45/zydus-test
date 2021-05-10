import RealmManager from '../../realm-manager';
import { Abm, Bo } from '../../schemas/all';

export const getAllBo = async () => {
  const items = await RealmManager.getInstance().read(Bo.name);
  return items.map((item) => ({ ...item }));
};

export const createAllBo = async (items) => {
  deleteAllBo();
  const bos = items.map((bo) => {
    const {
      company_code, group_code, hq_name, first_name, last_name, rep_code, sbu_code
    } = bo;
    return {
      company_code,
      group_code,
      hq_name,
      name: `${first_name || ''} ${last_name || ''}`,
      rep_code,
      sbu_code
    };
  });

  RealmManager.getInstance().write(Bo.name, bos);
};

export const deleteAllBo = () => {
  RealmManager.getInstance().delete(Bo.name);
};

export const getAllAbm = async () => {
  const items = await RealmManager.getInstance().read(Abm.name);
  return items.map((item) => ({ ...item }));
};

export const createAllAbm = async (items) => {
  deleteAllAbm();
  const abms = items.map((abm) => {
    const {
      company_code, group_code, hq_name, first_name, last_name, rep_code, sbu_code
    } = abm;
    return {
      company_code,
      group_code,
      hq_name,
      name: `${first_name || ''} ${last_name || ''}`,
      rep_code,
      sbu_code
    };
  });

  RealmManager.getInstance().write(Abm.name, abms);
};

export const deleteAllAbm = () => {
  RealmManager.getInstance().delete(Abm.name);
};
