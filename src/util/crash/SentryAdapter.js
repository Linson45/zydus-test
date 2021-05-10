import * as Sentry from '@sentry/react-native';
import Adapter from '../Adapter';

// eslint-disable-next-line import/prefer-default-export
export const setupSentry = async () => {
  const token = 'https://0acd0f9cccb34beba7fe511bdba7749c@o437856.ingest.sentry.io/5434491';
  const user = await Adapter.getUser();

  Sentry.init({
    dsn: token
  });

  if (user) {
    const {
      user_name, user_type, rep_code, sbu_code, company_code
    } = user;
    Sentry.setTag('user_name', user_name);
    Sentry.setTag('user_type', user_type);
    Sentry.setTag('rep_code', rep_code);
    Sentry.setTag('sbu_code', sbu_code);
    Sentry.setTag('company_code', company_code);
  }
};
