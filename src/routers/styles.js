import { Platform } from 'react-native';
import Colors from '../styles/colorsStyles';

export default {
  headerStyle: {
    backgroundColor: Colors.primary,
    elevation: 0, // remove shadow on Android
    shadowOpacity: 0, // remove shadow on iOS,
    shadowColor: 'transparent',
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    textAlign: 'center',
    flex: 1,
    fontSize: 18
  },
  headerTintColor: Colors.black,
  headerSmallTitleStyle: {
    textAlign: 'center',
    flex: 1,
    fontSize: 14
  },
  headerLeftTitle: {
    textAlign: 'left',
    flex: 1,
    fontSize: 20,
    color: Colors.black,
    marginLeft: Platform.OS === 'ios' ? -25 : 0,
  },
  headerLeftTitleNoBack: {
    textAlign: 'left',
    flex: 1,
    fontSize: 20,
    color: Colors.black,
  },
  subHeaderStyle: {
    backgroundColor: Colors.content,
  },
  bottomIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    margin: 10,
  }
};
