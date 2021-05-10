import { Dimensions } from 'react-native';
import Colors from '../../../styles/colorsStyles';
import { LightFontStyle } from '../../../styles/fontsStyles';

export default {
  content: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: Dimensions.get('window').width - 35
  },
  imageTop: {
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  leftTopRow: {
    backgroundColor: 'transparent',
    padding: 15,
    flex: 0.7,
    alignItems: 'flex-start'
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
  topContainer: {
    padding: 20,
  },
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
    height: 35
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
    height: 35
  },
  topRow: {
    flexDirection: 'row',
  },
  summaryHeader: {
    marginTop: 10,
    marginBottom: 5
  },
  textSummary: {
    fontWeight: 'bold',
    ...LightFontStyle.fontMedium
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  currentMonthBox: {
    flex: 0.5,
    backgroundColor: Colors.light_blue,
    alignItems: 'center',
    padding: 5,
    marginRight: 5
  },
  lastMonthBox: {
    flex: 0.5,
    backgroundColor: Colors.blue,
    alignItems: 'center',
    padding: 5,
    marginLeft: 5
  },
  currentMonthText: {
    color: Colors.white
  },
  multivisitText: {
    flex: 0.3,
    alignItems: 'center',
    ...LightFontStyle.fontMedium
  },
  center: {
    color: Colors.blue,
    textAlign: 'center'
  },
  mcrText: {
    flex: 0.3,
    alignItems: 'center',
    ...LightFontStyle.fontMedium
  },
  callAvgText: {
    flex: 0.3,
    alignItems: 'center',
    ...LightFontStyle.fontMedium
  },
  boEffortTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
};
