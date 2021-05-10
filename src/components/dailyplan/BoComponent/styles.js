import colorsStyles from '../../../styles/colorsStyles';
import { LightFontStyle } from '../../../styles/fontsStyles';

export default {
  topRow: {
    flexDirection: 'row',
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
  rightTopRowContainer: { flexDirection: 'row', justifyContent: 'center' },
  rightTopRowTextContainer: { justifyContent: 'center', alignItems: 'center' },
  rightTopRowText: {
    color: colorsStyles.light_black,
    ...LightFontStyle.fontMedium
  },
  rightTopRowTextBold: {
    color: colorsStyles.light_black,
    fontWeight: 'bold',
    ...LightFontStyle.fontMedium
  },
  textSummary: {
    fontWeight: 'bold',
    ...LightFontStyle.fontMedium
  },
  currentMonthText: {
    color: colorsStyles.white
  },
  currentMonthBox: {
    flex: 0.5,
    backgroundColor: colorsStyles.light_blue,
    alignItems: 'center',
    padding: 10,
    marginRight: 5
  },
  lastMonthBox: {
    flex: 0.5,
    backgroundColor: colorsStyles.blue,
    alignItems: 'center',
    padding: 10,
    marginLeft: 5
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemHeading: {
    ...LightFontStyle.fontLarge,
    fontWeight: 'bold'
  },
  itemValues: {
    color: colorsStyles.light_black,
    marginTop: 5
  },
  summaryHeader: { marginTop: 5, marginBottom: 2 },
  summaryHeaderBottom: { marginBottom: 5 },
  itemDrList: {
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 0.3,
    borderColor: colorsStyles.gray_login
  },
  multivisit: {
    flex: 0.3,
    backgroundColor: colorsStyles.cyan,
    alignItems: 'center',
    padding: 10,
    marginRight: 5
  },
  mcr: {
    flex: 0.3,
    backgroundColor: colorsStyles.light_blue,
    alignItems: 'center',
    padding: 10,
    marginRight: 5
  },
  callAvg: {
    flex: 0.3,
    backgroundColor: colorsStyles.blue,
    alignItems: 'center',
    padding: 10,
    marginRight: 5
  },
  boEffortTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  multivisitText: {
    flex: 0.3,
    alignItems: 'center',
    ...LightFontStyle.fontMedium
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
  center: {
    color: colorsStyles.light_black,
    textAlign: 'center'
  },
  bgBlue: {
    backgroundColor: colorsStyles.blue,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  topJfw: {
    marginBottom: 10,
    fontWeight: 'bold',
    color: colorsStyles.black,
    ...LightFontStyle.fontMedium
  },
  topJfwLabel: {
    color: colorsStyles.blue_coachmapdetails,
    ...LightFontStyle.fontSmall,
    marginBottom: 5
  },
  boEffortText: {
    color: colorsStyles.blue_coachmapdetails,
  }
};
