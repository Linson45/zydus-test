import { FontStyle, LightFontStyle } from '../../../styles/fontsStyles';
import colorsStyles from '../../../styles/colorsStyles';

export default {
  mainView: {
    margin: 10,
    marginLeft: 15,
    marginRight: 15
  },
  topRow: {
    flexDirection: 'row',
  },
  topRowBorder: {
    flexDirection: 'row',
    borderLeftColor: colorsStyles.blue,
    borderLeftWidth: 5,
    paddingLeft: 15,
    padding: 5
  },
  leftTopRow: {
    flex: 0.7,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  rightTopRow: {
    flex: 0.3,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  summaryHeader: { marginTop: 10, marginBottom: 5 },
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
    backgroundColor: colorsStyles.light_blue,
    alignItems: 'center',
    padding: 5,
    marginRight: 5
  },
  lastMonthBox: {
    flex: 0.5,
    backgroundColor: colorsStyles.blue,
    alignItems: 'center',
    padding: 5,
    marginLeft: 5
  },
  currentMonthText: {
    color: colorsStyles.white
  },
  blueText: {
    ...FontStyle.fontMedium,
    color: colorsStyles.blue_coachmapdetails,
  },
  boEffortTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  summaryHeaderBottom: { marginBottom: 5 },
  multivisitText: {
    flex: 0.3,
    alignItems: 'center',
    ...LightFontStyle.fontMedium
  },
  center: {
    color: colorsStyles.blue,
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
};
