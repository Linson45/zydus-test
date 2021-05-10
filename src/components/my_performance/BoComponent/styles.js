import Colors from '../../../styles/colorsStyles';
import { FontStyle, LightFontStyle } from '../../../styles/fontsStyles';

export default {
  topContainer: {
    padding: 20,
  },
  salesCard: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.gray_light,
    flex: 1
  },
  cardHeader: {
    padding: 5,
    color: Colors.text_dark_gray_73,
    ...LightFontStyle.fontLarge
  },
  salesContainer: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.my_perf_gray_light,
    padding: 5
  },
  cardTopContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0
  },
  secCard: {
    flex: 0.5,
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
    backgroundColor: Colors.blue_coachmapdetails,
    margin: 5,
    height: 100,
  },
  primaryCard: {
    flex: 0.5,
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
    backgroundColor: Colors.blue_light,
    margin: 5,
    height: 100,
  },
  gspCard: {
    flex: 0.5,
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
    backgroundColor: Colors.purple,
    margin: 5,
    height: 100,
  },
  rcpaCard: {
    flex: 0.5,
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
    backgroundColor: Colors.purple_dark,
    margin: 5,
    height: 100,
  },
  callAverageBox: {
    flex: 0.7,
    flexDirection: 'column',
    margin: 5,
  },
  cardFloatLeft: {
    ...LightFontStyle.fontMedium,
    textAlign: 'left',
    color: 'white'
  },
  cardFloatRight: {
    ...LightFontStyle.fontSmall,
    textAlign: 'left',
    color: 'white'
  },
  cardFloatLeftBold: {
    ...LightFontStyle.fontMedium,
    textAlign: 'left',
    fontWeight: 'bold',
    color: 'white'
  },
  cardFloatLeftTiny: {
    ...LightFontStyle.fontTiny,
    textAlign: 'left',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFloatLeftTinyIcon: {
    ...LightFontStyle.fontSmall,
    textAlign: 'left',
    color: 'white'
  },
  cardFloatRightTiny: {
    ...LightFontStyle.fontTiny,
    textAlign: 'right',
    color: 'white'
  },
  callCoverage: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardFloatRightMedium: {
    ...FontStyle.fontMedium,
    textAlign: 'right',
    color: Colors.gray_dark,
  },
  cardFloatRightMediumBlue: {
    ...FontStyle.fontMedium,
    textAlign: 'right',
    color: Colors.blue_dark,
  },
  effortHeader: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  effortHeaderLeft: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: Colors.text_dark_gray_73,
    ...FontStyle.fontLarge,
  },
  effortHeaderRight: {
    textAlign: 'right',
    color: Colors.text_dark_gray,
    ...LightFontStyle.fontSmall,
  },
  progressCycleText: {
    textAlign: 'center',
    color: Colors.progressCircleText,
    ...LightFontStyle.fontMedium,
  },
  radius: 40,
  circleWidth: 15,
  circleColor: '#42D3CC',
  circleContainer: {
    height: 160,
    paddingTop: 10,
  },
  accountTieCss: {
    height: 50,
    width: 50,
  },
  topButtonLeft: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    height: 25,
    borderColor: Colors.blue_coachmapdetails,
    borderRadius: 15,
    margin: 5
  },
  topButtonLeftText: {
    color: Colors.blue_coachmapdetails,
    ...FontStyle.fontSmall
  },
  topButtonRightImage: {
    paddingTop: 2,
    paddingBottom: 2,
    margin: 5,
    width: 30
  },
  topButtonRight: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    height: 25,
    borderColor: Colors.blue_coachmapdetails,
    borderRadius: 15,
    margin: 5
  },
  topButtonRightText: {
    color: Colors.blue_coachmapdetails,
    ...FontStyle.fontSmall
  },
  topButtonRightSelected: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    height: 25,
    backgroundColor: Colors.blue_coachmapdetails,
    borderColor: Colors.blue_coachmapdetails,
    borderRadius: 15,
    margin: 5
  },
  topButtonRightTextSelected: {
    color: Colors.white,
    ...FontStyle.fontSmall
  },
  tableHead: { height: 40, backgroundColor: '#f1f8ff' },
  tableText: { margin: 6 }
};
