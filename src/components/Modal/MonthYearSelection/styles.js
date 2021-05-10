import { Dimensions } from 'react-native';
import Colors from '../../../styles/colorsStyles';

export default {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: Dimensions.get('window').width - 50,
    maxWidth: 350,
  },
  imageTop: {
    backgroundColor: 'transparent'
  },
  closeButton: {
    backgroundColor: 'transparent',
    padding: 15,
    alignSelf: 'flex-end'
  },
  closeButtonIcon: {
    width: 25,
    height: 25
  },
  topContainer: {
    padding: 20,
  },
  buttonRight: {
    width: 100,
    backgroundColor: Colors.blue_coachmapdetails,
    padding: 5,
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: 'center',
    color: Colors.white,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
  },
  buttonLeftText: {
    color: Colors.white,
  },
  buttonRightText: {
    color: Colors.white,
  },
  buttonLeft: {
    width: 100,
    backgroundColor: Colors.warning,
    padding: 5,
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: 'center',
    color: Colors.white,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
  },
  buttons: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'flex-end',

  },
};
