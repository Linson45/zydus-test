import RNFetchBlob from 'rn-fetch-blob';
import { unzip } from 'react-native-zip-archive';
import * as RNFS from 'react-native-fs';
import uuid from 'react-native-uuid';
import api, { baseURL } from '../api';
import Urls from '../api/urls';
import Adapter from '../util/Adapter';
import { thumbnailFolderPath, unzipFolderPath } from '../util/Constants';
import { toProgressNumber } from '../util/NumberTrasformer';
import {
  createDetailingContent,
  createLandingPage, createTrainingContent,
  getDetailingContents, getLandingPage, getTraining,
  setVAImage
} from '../local-storage/helper/detailing';
import { REFRESH_DAILY_PLAN } from './DailyPlanActions';

export const LOAD_CONTENT_LIST = 'load_content_list';
export const LOAD_CONTENT_LIST_SUCCESS = 'load_content_list_success';
export const LOAD_CONTENT_LIST_FAIL = 'load_content_list_fail';

export const LOAD_LANDING_PAGE_LIST = 'load_landing_page_list';
export const LOAD_LANDING_PAGE_LIST_SUCCESS = 'load_landing_page_list_success';
export const LOAD_LANDING_PAGE_LIST_FAIL = 'load_landing_page_list_fail';

export const LOAD_TRAINING_PAGE_LIST = 'load_training_page_list';
export const LOAD_TRAINING_PAGE_LIST_SUCCESS = 'load_training_page_list_success';
export const LOAD_TRAINING_PAGE_LIST_FAIL = 'load_training_page_list_fail';

export const DOWNLOAD_CONTENT_PROGRESS = 'download_content_progress';
export const DOWNLOAD_CONTENT_SUCCESS = 'download_content_success';
export const DOWNLOAD_CONTENT_FAIL = 'download_content_fail';

export const DOWNLOAD_LANDING_PAGE_PROGRESS = 'download_landing_page_progress';
export const DOWNLOAD_LANDING_PAGE_SUCCESS = 'download_landing_page_success';
export const DOWNLOAD_LANDING_PAGE_FAIL = 'download_landing_page_fail';

export const DOWNLOAD_TRAINING_PAGE_PROGRESS = 'download_training_page_progress';
export const DOWNLOAD_TRAINING_PAGE_SUCCESS = 'download_training_page_success';
export const DOWNLOAD_TRAINING_PAGE_FAIL = 'download_training_page_fail';

export const loadTrainingPages = () => async (dispatch) => {
  const user = await Adapter.getUser();
  const { rep_code, sbu_code, company_code } = user;
  const localContents = await getTraining();
  const localContentIds = localContents.map((content) => content.content_id);

  dispatch({ type: LOAD_TRAINING_PAGE_LIST });
  const { statusCode, errorMessage, data } = await api({
    method: 'GET',
    url: Urls.GET_TRAINING_PAGE_LIST,
    params: { rep_code, sbu_code, company_code },
  });

  if (statusCode === 200) {
    const contents = data.results.map((content) => ({ ...content, downloaded: localContentIds.indexOf(content.content_id) !== -1 }));
    dispatch({ type: LOAD_TRAINING_PAGE_LIST_SUCCESS, payload: contents });
  } else {
    dispatch({ type: LOAD_TRAINING_PAGE_LIST_FAIL, payload: errorMessage });
  }
};

export const downloadTraining = (content) => async (dispatch) => {
  const { content_path, content_id, thumbnail } = content;
  const { content_size } = content;
  const fileUrl = `${baseURL}${Urls.DOWNLOAD_CONTENT}?filename=${content_path}`;
  const thumbnailUrl = `${baseURL}${Urls.DOWNLOAD_CONTENT}?filename=${thumbnail}`;
  const thumbnail_name = thumbnail;

  dispatch({ type: DOWNLOAD_TRAINING_PAGE_PROGRESS, payload: { progress: toProgressNumber(0), content_id } });
  let headers = await Adapter.getAuthHeader();
  if (!headers) {
    headers = {};
  }

  RNFetchBlob.config({
    path: `${thumbnailFolderPath}/${thumbnail_name}`,
    fileCache: false
  }).fetch('GET', thumbnailUrl, { ...headers, 'Cache-Control': 'no-store' })
    .then(() => {
      RNFetchBlob.config({
        path: `${unzipFolderPath}/${content_path}`,
        fileCache: false
      }).fetch('GET', fileUrl, { ...headers, 'Cache-Control': 'no-store' })
        .progress({ count: 100000 }, (received, total) => {
          // eslint-disable-next-line eqeqeq
          if (total == -1) {
            if (content_size) {
              total = parseFloat(content_size.toLowerCase().replace('mb', ''));
              total = total * 1024 * 1024;
            }
          }
          dispatch({
            type: DOWNLOAD_TRAINING_PAGE_PROGRESS,
            payload: { progress: toProgressNumber(received / total), content_id }
          });
        })
        .then(async (res) => {
          if (fileUrl.indexOf('.zip') !== -1) {
            const uuidValue = uuid.v1();
            const unzipPath = [unzipFolderPath, uuidValue].join('/');
            await RNFS.mkdir(unzipPath);
            unzip(res.path(), unzipPath)
              .then((path) => {
                dispatch({ type: DOWNLOAD_TRAINING_PAGE_SUCCESS, payload: { content_id } });
                RNFetchBlob.fs.ls(path).then((files) => {
                  const fileName = files[0];
                  if (fileName) {
                    content.content_location = `${uuidValue}/${fileName}`;
                    content.thumbnail_location = thumbnail_name;
                    createTrainingContent(content);
                    RNFS.exists(`${thumbnailFolderPath}/${thumbnail_name}`).then((response) => {
                      if (response) {
                        RNFS.readFile(`${thumbnailFolderPath}/${thumbnail_name}`, 'base64').then((image) => {
                          setVAImage(content_id, 'main', image);
                        }).catch((e) => console.log(e));
                      }
                    }).catch((e) => console.log(e));
                    RNFS.unlink(res.path())
                      .then(() => {
                        console.log('Downloaded ZIP FILE DELETED');
                      })
                      .catch((err) => {
                        console.log(err);
                        dispatch({ type: DOWNLOAD_TRAINING_PAGE_FAIL, payload: { content_id } });
                      });
                  } else {
                    console.log('No File');
                    dispatch({ type: DOWNLOAD_TRAINING_PAGE_FAIL, payload: { content_id } });
                  }
                }).catch((error) => {
                  console.log(error);
                  dispatch({ type: DOWNLOAD_TRAINING_PAGE_FAIL, payload: { content_id } });
                });
              })
              .catch((error) => {
                console.log(error, res.path());
                RNFS.unlink(res.path())
                  .then(() => {
                    console.log('Downloaded ZIP FILE DELETED');
                  })
                  .catch((err) => {
                    console.log(err);
                    dispatch({ type: DOWNLOAD_TRAINING_PAGE_FAIL, payload: { content_id } });
                  });
                dispatch({ type: DOWNLOAD_TRAINING_PAGE_FAIL, payload: { content_id } });
              });
          } else {
            dispatch({ type: DOWNLOAD_TRAINING_PAGE_SUCCESS, payload: { content_id } });
            content.content_location = content_path;
            content.thumbnail_location = thumbnail_name;
            createTrainingContent(content);
          }
        })
        .catch((errorMessage) => {
          console.log('errorMessage: ', errorMessage);
          dispatch({ type: DOWNLOAD_TRAINING_PAGE_FAIL, payload: { content_id } });
        });
    })
    .catch(() => {
      dispatch({ type: DOWNLOAD_TRAINING_PAGE_FAIL, payload: { content_id } });
    });
};

export const loadContentList = () => async (dispatch) => {
  const user = await Adapter.getUser();
  const { rep_code } = user;
  const localContents = await getDetailingContents();
  const localContentIds = localContents.map((content) => content.content_id);

  dispatch({ type: LOAD_CONTENT_LIST });
  const { statusCode, errorMessage, data } = await api({
    method: 'GET',
    url: Urls.GET_CONTENT_LIST,
    params: { rep_code },
  });

  if (statusCode === 200) {
    const contents = data.results.map((content) => ({ ...content, downloaded: localContentIds.indexOf(content.content_id) !== -1 }));
    dispatch({ type: LOAD_CONTENT_LIST_SUCCESS, payload: contents });
  } else {
    dispatch({ type: LOAD_CONTENT_LIST_FAIL, payload: errorMessage });
  }
};

export const loadLandingPages = () => async (dispatch) => {
  const user = await Adapter.getUser();
  const { rep_code, sbu_code, company_code } = user;
  const localContents = await getLandingPage();
  const localContentIds = localContents.map((content) => content.content_id);

  dispatch({ type: LOAD_LANDING_PAGE_LIST });
  const { statusCode, errorMessage, data } = await api({
    method: 'GET',
    url: Urls.GET_LANDING_PAGE_LIST,
    params: { rep_code, sbu_code, company_code },
  });

  if (statusCode === 200) {
    const contents = data.results.map((content) => ({ ...content, downloaded: localContentIds.indexOf(content.content_id) !== -1 }));
    dispatch({ type: LOAD_LANDING_PAGE_LIST_SUCCESS, payload: contents });
  } else {
    dispatch({ type: LOAD_LANDING_PAGE_LIST_FAIL, payload: errorMessage });
  }
};

export const downloadLandingPage = (content) => async (dispatch) => {
  const { content_path, content_id } = content;
  const { content_size } = content;
  const fileUrl = `${baseURL}${Urls.DOWNLOAD_CONTENT}?filename=${content_path}`;
  dispatch({ type: DOWNLOAD_LANDING_PAGE_PROGRESS, payload: { progress: toProgressNumber(0), content_id } });

  let headers = await Adapter.getAuthHeader();
  if (!headers) {
    headers = {};
  }

  RNFetchBlob.config({
    path: `${unzipFolderPath}/${content_path}`,
    fileCache: false
  }).fetch('GET', fileUrl, { ...headers, 'Cache-Control': 'no-store' })
    .progress({ count: 100000 }, (received, total) => {
      // eslint-disable-next-line eqeqeq
      if (total == -1) {
        if (content_size) {
          total = parseFloat(content_size.toLowerCase().replace('mb', ''));
          total = total * 1024 * 1024;
        }
      }
      dispatch({
        type: DOWNLOAD_LANDING_PAGE_PROGRESS,
        payload: { progress: toProgressNumber(received / total), content_id }
      });
    })
    .then(async (res) => {
      if (fileUrl.indexOf('.zip') !== -1) {
        const uuidValue = uuid.v1();
        const unzipPath = [unzipFolderPath, uuidValue].join('/');
        await RNFS.mkdir(unzipPath);
        unzip(res.path(), unzipPath)
          .then((path) => {
            dispatch({ type: DOWNLOAD_LANDING_PAGE_SUCCESS, payload: { content_id } });
            RNFetchBlob.fs.ls(path).then((files) => {
              const fileName = files[0];
              Adapter.set(REFRESH_DAILY_PLAN, true);
              if (fileName) {
                content.content_location = `${uuidValue}/${fileName}`;
                createLandingPage(content);
                RNFS.unlink(res.path())
                  .then(() => {
                    console.log('Downloaded ZIP FILE DELETED');
                  })
                  .catch((err) => {
                    console.log(err);
                    dispatch({ type: DOWNLOAD_LANDING_PAGE_FAIL, payload: { content_id } });
                  });
              } else {
                console.log('No File');
                dispatch({ type: DOWNLOAD_LANDING_PAGE_FAIL, payload: { content_id } });
              }
            }).catch((error) => {
              console.log(error);
              dispatch({ type: DOWNLOAD_LANDING_PAGE_FAIL, payload: { content_id } });
            });
          })
          .catch((error) => {
            console.log(error, res.path());
            RNFS.unlink(res.path())
              .then(() => {
                console.log('Downloaded ZIP FILE DELETED');
              })
              .catch((err) => {
                console.log(err);
                dispatch({ type: DOWNLOAD_LANDING_PAGE_FAIL, payload: { content_id } });
              });
            dispatch({ type: DOWNLOAD_LANDING_PAGE_FAIL, payload: { content_id } });
          });
      } else {
        dispatch({ type: DOWNLOAD_LANDING_PAGE_SUCCESS, payload: { content_id } });
        content.content_location = content_path;
        createLandingPage(content);
      }
    })
    .catch((errorMessage) => {
      console.log('errorMessage: ', errorMessage);
      dispatch({ type: DOWNLOAD_LANDING_PAGE_FAIL, payload: { content_id } });
    });
};

export const downloadContent = (content) => async (dispatch) => {
  const { content_path, content_id, thumbnail } = content;
  const { content_size } = content;
  const fileUrl = `${baseURL}${Urls.DOWNLOAD_CONTENT}?filename=${content_path}`;
  const thumbnailUrl = `${baseURL}${Urls.DOWNLOAD_CONTENT}?filename=${thumbnail}`;
  const thumbnail_name = thumbnail;

  dispatch({ type: DOWNLOAD_CONTENT_PROGRESS, payload: { progress: toProgressNumber(0), content_id } });
  let headers = await Adapter.getAuthHeader();
  if (!headers) {
    headers = {};
  }

  RNFetchBlob.config({
    path: `${thumbnailFolderPath}/${thumbnail_name}`,
    fileCache: false
  }).fetch('GET', thumbnailUrl, { ...headers, 'Cache-Control': 'no-store' })
    .then(() => {
      RNFetchBlob.config({
        path: `${unzipFolderPath}/${content_path}`,
        fileCache: false
      }).fetch('GET', fileUrl, { ...headers, 'Cache-Control': 'no-store' })
        .progress({ count: 100000 }, (received, total) => {
          // eslint-disable-next-line eqeqeq
          if (total == -1) {
            if (content_size) {
              total = parseFloat(content_size.toLowerCase().replace('mb', ''));
              total = total * 1024 * 1024;
            }
          }
          dispatch({
            type: DOWNLOAD_CONTENT_PROGRESS,
            payload: { progress: toProgressNumber(received / total), content_id }
          });
        })
        .then(async (res) => {
          if (fileUrl.indexOf('.zip') !== -1) {
            const uuidValue = uuid.v1();
            const unzipPath = [unzipFolderPath, uuidValue].join('/');
            await RNFS.mkdir(unzipPath);
            unzip(res.path(), unzipPath)
              .then((path) => {
                dispatch({ type: DOWNLOAD_CONTENT_SUCCESS, payload: { content_id } });
                RNFetchBlob.fs.ls(path).then((files) => {
                  const fileName = files[0];
                  Adapter.set(REFRESH_DAILY_PLAN, true);
                  if (fileName) {
                    content.content_location = `${uuidValue}/${fileName}`;
                    content.thumbnail_location = thumbnail_name;
                    createDetailingContent(content);
                    RNFS.exists(`${thumbnailFolderPath}/${thumbnail_name}`).then((response) => {
                      if (response) {
                        RNFS.readFile(`${thumbnailFolderPath}/${thumbnail_name}`, 'base64').then((image) => {
                          setVAImage(content_id, 'main', image);
                        }).catch((e) => console.log(e));
                      }
                    }).catch((e) => console.log(e));
                    RNFS.unlink(res.path())
                      .then(() => {
                        console.log('Downloaded ZIP FILE DELETED');
                      })
                      .catch((err) => {
                        console.log(err);
                        dispatch({ type: DOWNLOAD_CONTENT_FAIL, payload: { content_id } });
                      });
                  } else {
                    console.log('No File');
                    dispatch({ type: DOWNLOAD_CONTENT_FAIL, payload: { content_id } });
                  }
                }).catch((error) => {
                  console.log(error);
                  dispatch({ type: DOWNLOAD_CONTENT_FAIL, payload: { content_id } });
                });
              })
              .catch((error) => {
                console.log(error, res.path());
                RNFS.unlink(res.path())
                  .then(() => {
                    console.log('Downloaded ZIP FILE DELETED');
                  })
                  .catch((err) => {
                    console.log(err);
                    dispatch({ type: DOWNLOAD_CONTENT_FAIL, payload: { content_id } });
                  });
                dispatch({ type: DOWNLOAD_CONTENT_FAIL, payload: { content_id } });
              });
          } else {
            dispatch({ type: DOWNLOAD_CONTENT_SUCCESS, payload: { content_id } });
            content.content_location = content_path;
            content.thumbnail_location = thumbnail_name;
            createDetailingContent(content);
          }
        })
        .catch((errorMessage) => {
          console.log('errorMessage: ', errorMessage);
          dispatch({ type: DOWNLOAD_CONTENT_FAIL, payload: { content_id } });
        });
    })
    .catch(() => {
      dispatch({ type: DOWNLOAD_CONTENT_FAIL, payload: { content_id } });
    });
};

export const arePendingDownloads = async () => {
  const user = await Adapter.getUser();
  const { rep_code } = user;
  const localContents = await getDetailingContents();
  console.log('localContents : ', localContents);
  const localContentIds = localContents.map((content) => content.content_id);

  const { statusCode, data } = await api({
    method: 'GET',
    url: Urls.GET_CONTENT_LIST,
    params: { rep_code },
  });

  if (statusCode === 200) {
    let downloadable = false;
    console.log('localContentIds : ', localContentIds);
    data.results.forEach((content) => {
      downloadable = downloadable || (localContentIds.indexOf(content.content_id) === -1);
    });
    return downloadable;
  }
  return false;
};
