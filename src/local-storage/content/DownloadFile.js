import RNFetchBlob from 'rn-fetch-blob';
import { unzip } from 'react-native-zip-archive';
import * as RNFS from 'react-native-fs';
import { unzipFolderPath } from '../../util/Constants';

export const downloadFile = (contentId, fileName, fileUrl, brand) => {
  const { dirs } = RNFetchBlob.fs;
  const filePath = `${dirs.DocumentDir}`;
  RNFetchBlob.config({
    path: `${filePath}/${fileName}`,
    fileCache: false
  })
    .fetch('GET', fileUrl, { 'Cache-Control': 'no-store' })
    .progress({ count: 100 }, (received, total) => {
      console.log('progress', received, total);
    })
    .then((res) => {
      const unzipPath = [
        unzipFolderPath,
        brand,
        fileName
      ].join('/');
      unzip(res.path(), unzipPath)
        .then((path) => {
          console.log(`unzip completed at ${path}`);
        })
        .catch((error) => {
          console.error(error);
        });
      RNFS.unlink(res.path())
        .then(() => {
          console.log('Downloaded ZIP FILE DELETED');
        })
        .catch((err) => {
          console.log(err.message);
        });
    })
    .catch((errorMessage) => {
      console.log('error with downloading file', errorMessage);
    });
};
