import { Dimensions, Platform } from 'react-native';
import colorsStyles from '../../../styles/colorsStyles';

export default {
  base: {
    width: Dimensions.get('window').width / 7,
    height: 65,
    borderWidth: 0.5,
    borderColor: colorsStyles.gray_light,
    padding: 3
  },
  text: {
    fontSize: 15,
    textAlign: 'right',
    fontFamily: 'System',
    fontWeight: '300',
    color: colorsStyles.black,
    backgroundColor: 'rgba(255, 255, 255, 0)'
  },
  alignedText: {
    marginTop: Platform.OS === 'android' ? 4 : 6
  },
  selected: {
    backgroundColor: '#ffffff',
    borderRadius: 16
  },
  today: {
    backgroundColor: undefined
  },
  todayText: {
    color: '#00adf5'
  },
  selectedText: {
    color: '#ffffff'
  },
  disabledText: {
    color: '#ffffff'
  },
  dot: {
    width: 25,
    height: 8,
    marginTop: 1,
    marginLeft: 1,
    marginRight: 1,
    borderRadius: 5,
    opacity: 0,
  },
  visibleDot: {
    opacity: 1,
    backgroundColor: '#00adf5'
  },
  selectedDot: {
    backgroundColor: '#00adf5'
  },
  drDetail: {
    height: 14,
    alignItems: 'center'
  }
};
