import axios from 'axios';
import UserAgent from 'react-native-user-agent';
import { objectKeysToLowerCase } from '../util/NumberTrasformer';
import Adapter from '../util/Adapter';
import { UNAUTH_STATUS_CODE } from '../util/Constants';

/**
 * Create an Axios Client with defaults
 */
 export const baseURL = 'http://52.172.208.133:8083/index.php/api';//Rx UAT
//export const baseURL = 'http://52.172.208.133:8081/index.php/api';//UAT
 //export const baseURL = 'http://52.172.147.86:8082/index.php/api'; //Prod
const client = axios.create({
  baseURL,
});

/**
 * Request Wrapper with default success/error actions
 */
const api = async (options) => {
  const onSuccess = (response) => {
    console.log('Request Successful!', response);

    const { data } = response;
    if (data.data === undefined) {
      if (data.payload) data.data = objectKeysToLowerCase(data.payload);
      else data.data = objectKeysToLowerCase(JSON.parse(JSON.stringify(data)));
    }

    if (!data.statusCode) data.statusCode = response.status;
    return data;
  };

  const onError = (error) => {
    console.log('Request Failed:', error.config);
    let message = null;

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
      console.log('Headers:', error.response.headers);

      if (error.response.status === UNAUTH_STATUS_CODE) {
        if (global.logoutMethod) {
          global.logoutMethod();
        }
      }

      if (error.response.data && typeof (error.response.data) === 'string') {
        message = error.response.data;
      } else {
        message = error.response.message;
        if (!message && error.response.data) {
          message = error.response.data.message;
        }
      }
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.log('Error Message:', error.message);
      message = error.message;
    }
    if (!message) { message = 'Net connectivity not available'; }

    // Toaster.show(message);

    return {
      statusCode: 500,
      errorMessage: message
    };
  };

  let headers = await Adapter.getAuthHeader();
  if (!headers) {
    headers = {};
  }
  headers['secret-key'] = '$2b$10$vWThKSy6mrX9m6CvzMr2ceVBmYCcq4volBE6cWCOOJVhUCVpwVUvu';
  headers['User-Agent'] = UserAgent.getUserAgent();
  options = { ...options, headers };

  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export default api;
