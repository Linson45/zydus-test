import { Dimensions, Platform } from 'react-native';
import * as RNFS from 'react-native-fs';

export class Role {
    static BO = 'BO';

    static ABM = 'ABM';

    static RBM = 'RBM';

    static ZBM = 'ZBM';

    static HO = 'HO';

    static DIVISION_HEAD = 'DIVH';

    static SBU_HEAD = 'SBUH';

    static CRM = 'CRM';

    static isNonHOUser(user_type) {
      if (!user_type) user_type = '';
      user_type = user_type.toUpperCase();
      return user_type === this.BO || user_type === this.ABM || user_type === this.RBM || user_type === this.ZBM;
    }

    static isHOUser(user_type) {
      return !this.isNonHOUser(user_type);
    }

    static isAboveRbm(user_type) {
      if (!user_type) user_type = '';
      user_type = user_type.toUpperCase();
      return user_type !== this.BO && user_type !== this.ABM && user_type !== this.RBM;
    }
}

export const CLEANED_JUNK_CACHE_1 = 'CLEANED_JUNK_CACHE_1';

export const myWidth = Dimensions.get('window').width;
const myHeight = Dimensions.get('window').height;
const isPlatformIOS = (Platform.OS === 'ios');
const handleSize = (num) => {
  if (num <= 0) return 0;
  if (num > 100) return 1;

  return num / 100;
};
const width = (num) => myWidth * handleSize(num);
const height = (num) => myHeight * handleSize(num);
const isiPhoneX = isPlatformIOS && myHeight > 800;

const standardWidth = 375.0;
const standardHeight = 667.0;

const widthScale = (dimension) => (dimension / standardWidth) * myWidth;

const heightScale = (dimension) => (dimension / standardHeight) * myHeight;

const widthPer = (persentage) => (persentage / 100) * myWidth;
const heightPer = (persentage) => (persentage / 100) * myHeight;

const unzipFolderPath = `${RNFS.DocumentDirectoryPath}/VisualAidUnzip`;
const thumbnailFolderPath = `${RNFS.DocumentDirectoryPath}/VisualAidThumbnail`;

const UNAUTH_STATUS_CODE = 401;

export {
  width, height, widthScale, heightScale, isiPhoneX, isPlatformIOS, widthPer, heightPer, unzipFolderPath, thumbnailFolderPath, UNAUTH_STATUS_CODE,
};
