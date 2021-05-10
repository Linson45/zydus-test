import DeviceInfo from 'react-native-device-info';

export const getSidebarFlex = () => {
  if (DeviceInfo.isTablet()) {
    return 0.5;
  }
  return 0.2;
};
