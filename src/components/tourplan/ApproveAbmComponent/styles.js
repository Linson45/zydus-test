import { Dimensions } from 'react-native';
import colorsStyles from '../../../styles/colorsStyles';

export default {
  imageBgTop: {
    width: Dimensions.get('window').width - 40,
    height: 60,
    alignSelf: 'center',
    margin: 15,
  },
  buttonBottom: {
    width: 150,
    height: 40,
    alignSelf: 'center',
    padding: 10,
    alignItems: 'center',
    backgroundColor: colorsStyles.dashboardHeader,
    borderRadius: 20
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: Dimensions.get('window').width - 35
  },
  modalDrWiseTp: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
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
  border: {
    borderWidth: 0.5,
    borderColor: colorsStyles.light_grey,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  leftBorder: {
    borderWidth: 0.5,
    borderColor: colorsStyles.light_grey,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'flex-start'
  },
  signDetails: { fontSize: 10, paddingHorizontal: 5 },
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
};
