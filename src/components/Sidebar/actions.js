import Adapter from '../../util/Adapter';
import {Role} from '../../util/Constants';
import RealmManager from '../../local-storage/realm-manager';

export const openTraining = navigation => {
  if (navigation) {
    navigation.navigate('Training');
  }
};

export const openCoachmap = async navigation => {
  const user = await Adapter.getUser();
  const {user_type} = user;

  if (user_type === Role.BO) {
    navigation.navigate('CoachMapBo', {user});
  } else if (user_type === Role.ABM) {
    navigation.navigate('CoachMapAbm', {user});
  } else if (user_type === Role.RBM) {
    navigation.navigate('CoachMapRbm', {user});
  } else if (user_type === Role.ZBM) {
    navigation.navigate('CoachmapUserSelection', {user});
  } else {
    navigation.navigate('CoachmapUserSelection', {user});
  }
};

export const openSFE = async navigation => {
  const user = await Adapter.getUser();

  if (user != null) {
    navigation.navigate('SFEContainer', {user});
  }
};

export const openUploadDocId = async navigation => {
  const user = await Adapter.getUser();
  navigation.navigate('UploadDoctorID', {user});
};
export const openRxTracker = async navigation => {
  const user = await Adapter.getUser();
  if (user.user_type === 'BO') {
    navigation.navigate('CampaingsList', {user});
  } else if (user.user_type === 'ABM') {
    navigation.navigate('ABMBoList', {user});
  } else if (user.user_type === 'RBM') {
    navigation.navigate('ABMBoList', {user});
  } else {
  }
};
export const openTpl = async navigation => {
  const user = await Adapter.getUser();
  if (Role.isNonHOUser(user.user_type)) {
    navigation.navigate('Tpl', {user});
  } else {
    navigation.navigate('TplUserSelection');
  }
};

export const openLogout = async navigation => {
  await Adapter.logout();
  RealmManager.getInstance().logout();
  navigation.navigate('Auth');
};

export const openFaq = async navigation => {
  navigation.navigate('Faq');
};

export const openHelp = async navigation => {
  navigation.navigate('Help');
};
