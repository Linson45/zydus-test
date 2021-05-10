import { Dimensions } from 'react-native';
import Colors from '../../../styles/colorsStyles';

export default {
  content: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: Dimensions.get('window').width - 35,
    height: Dimensions.get('window').height * 3 / 4,
  },
  imageTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent'
  },
  heading: {
    color: Colors.white,
    backgroundColor: Colors.transparent,
    padding: 15,
    fontSize: 16
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
  container: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 15
  },
  potentialLabel: {
    fontSize: 12,
    marginTop: 5,
    color: Colors.gray
  },
  potentialInput: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.gray_light,
    color: Colors.gray,
    fontSize: 14,
    paddingTop: 0
  },
  row: {
    justifyContent: 'center',
    marginTop: 15,
    flexDirection: 'row',
    flex: 1
  }
};
