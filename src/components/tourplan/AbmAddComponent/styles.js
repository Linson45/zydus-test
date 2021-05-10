import { Dimensions } from 'react-native';
import Colors from '../../../styles/colorsStyles';

export default {
  topRow: {
    flexDirection: 'row',
  },
  rightTopRow: {
    flex: 0.3,
    marginVertical: 3,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  leftTopRow: {
    marginVertical: 3,
    backgroundColor: 'transparent',
    flex: 0.7,
    alignItems: 'flex-start'
  },
  modalDrWiseTp: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: Dimensions.get('window').width - 35,
    height: Dimensions.get('window').height - 35
  },
  imageTop: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  closeButton: {
    backgroundColor: 'transparent',
    padding: 15,
    flex: 0.3,
    alignItems: 'flex-end'
  },
  closeButtonIcon: {
    width: 25,
    height: 25
  },
  row: { flexDirection: 'row' },
  buttonRight: {
    backgroundColor: Colors.blue_coachmapdetails,
    flex: 0.3,
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
    backgroundColor: Colors.warning,
    flex: 0.3,
    padding: 5,
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: 'center',
    color: Colors.white,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
  },
};
