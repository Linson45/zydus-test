import NetInfo from '@react-native-community/netinfo';

export const isInternetConnected = () => {
  NetInfo.isConnected.fetch()
    .then((isConnected) => isConnected);
};
