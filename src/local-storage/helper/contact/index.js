import RealmManager from '../../realm-manager';
import { ContactChemist, ContactDoctor } from '../../schemas/contact';

export const getContactChemist = async () => {
  const items = await RealmManager.getInstance().read(ContactChemist.name);
  let count = 0;
  return items.map((chemist) => {
    count += 1;
    return { ...chemist, count: `${count}` };
  });
};

export const createContactChemists = async (chemists) => {
  deleteContactChemists();
  const items = chemists.map((doctor) => {
    const {
      chemist_code, name, location, mobile, email, last_month_rcpa, last_rcpa_date
    } = doctor;
    return {
      chemist_code,
      name,
      location,
      mobile,
      email,
      last_month_rcpa: last_month_rcpa ? `${last_month_rcpa}` : '0',
      last_rcpa_date
    };
  });
  RealmManager.getInstance().write(ContactChemist.name, items);
};

export const deleteContactChemists = () => {
  RealmManager.getInstance().delete(ContactChemist.name);
};

export const getContactDoctor = async () => {
  const items = await RealmManager.getInstance().read(ContactDoctor.name);
  let count = 0;
  return items.map((doctor) => {
    count += 1;
    const { priority_brands, content_consumptions, chemists } = doctor;
    return {
      ...doctor,
      count: `${count}`,
      priority_brands: JSON.parse(priority_brands),
      content_consumptions: JSON.parse(content_consumptions),
      chemists: JSON.parse(chemists),
    };
  });
};

export const createContactDoctors = async (doctors) => {
  deleteContactDoctors();
  const items = doctors.map((doctor) => {
    const {
      doc_name, doc_spec, spec_code, dob, priority_brands, visit_category, mobile_no, email, doc_code, mcr_no, status,
      last_month_rcpa, gender, practice_type, fees, opd_monthly_volume, whatsapp, last_detailed_date,
      content_consumptions, chemists
    } = doctor;
    return {
      doc_name,
      doc_spec,
      spec_code,
      dob,
      priority_brands: JSON.stringify(priority_brands),
      visit_category,
      mobile_no,
      email,
      doc_code,
      mcr_no,
      status,
      last_month_rcpa: last_month_rcpa ? `${last_month_rcpa}` : '0',
      gender,
      practice_type,
      fees: fees ? `${fees}` : null,
      opd_monthly_volume,
      whatsapp,
      last_detailed_date,
      content_consumptions: JSON.stringify(content_consumptions),
      chemists: JSON.stringify(chemists),
    };
  });
  RealmManager.getInstance().write(ContactDoctor.name, items);
};

export const deleteContactDoctors = () => {
  RealmManager.getInstance().delete(ContactDoctor.name);
};
