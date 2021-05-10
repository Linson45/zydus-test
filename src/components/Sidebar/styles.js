import DeviceInfo from 'react-native-device-info';
import Colors from '../../styles/colorsStyles';

export default {
  container: {
    flex: 1,
    backgroundColor: '#0D0D23',
    paddingHorizontal: 30,
  },
  topBar: {
    marginTop: 30,
    flexDirection: 'row',
  },
  profilePic: {
    height: DeviceInfo.isTablet() ? 100 : 50,
    width: DeviceInfo.isTablet() ? 100 : 50,
  },
  topBarRight: {
    marginLeft: 0,
  },
  name: {
    color: Colors.white,
    fontSize: 20,
  },
  desc: {
    marginTop: 15,
    color: Colors.white,
    fontSize: 15,
  },
  list1: {
    marginTop: 25,
  },
  list2: {
    marginTop: 75,
  },
  list2Header: {
    fontSize: 16,
    color: Colors.white,
    opacity: 0.34,
  },
  rowTitle: {
    fontSize: 20,
    color: Colors.white,
  },
  rowIcon: {
    color: Colors.white,
    fontSize: 19,
    marginRight: 10,
  },
  row: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  logoutButton: {
    backgroundColor: 'transparent',
  },
  topRow: {
    flexDirection: 'row',
  },
  rightTopRow: {
    margin: 15,
    marginVertical: 3,
  },
  leftTopRow: {
    marginVertical: 3,
    backgroundColor: 'transparent',
    alignItems: 'flex-start'
  },
  image: {
    flexGrow: 1,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: Colors.gray_light,
    margin: 3,
    marginVertical: 10
  },
  versionCode: {
    fontSize: 16,
    color: Colors.white,
  },
};
