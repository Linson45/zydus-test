import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import color from '../../Constants/colorConstants';
import colorsStyles from '../../styles/colorsStyles';

export default {
  imageBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: null, // for full screen
    height: null, // for full screen
    zIndex: -1
  },
  performanceSlider: {
    flex: 0.5,
    justifyContent: 'flex-start',
    paddingTop: 25,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: null, // for full screen
    height: null, // for full screen
    zIndex: -1
  },
  sliderCard: {
    marginTop: 10,
    backgroundColor: colorsStyles.white,
    borderRadius: 10,
    marginRight: 20,
    maxHeight: 2 * Dimensions.get('window').height / 8,
  },
  sliderCardHeadingContainer: {
    borderBottomWidth: 0.7,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomColor: colorsStyles.dividerColor,
  },
  sliderCardHeading: {
    fontSize: 16,
    marginHorizontal: 15,
    marginVertical: 5,
  },
  sliderHeadingSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: color.LineColor
  },
  sliderInternalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  sliderBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '75%',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 10
  },
  barContainer: {
    marginTop: 5
  },
  rankText: {
    width: 30,
    fontSize: 11,
    color: colorsStyles.gray
  },
  rankDetailText: {
    fontSize: 11,
    color: colorsStyles.gray
  },
  barBackground: {
    width: 100,
    height: 6,
    borderRadius: 3,
    backgroundColor: color.ProgressBarBackground
  },
  leftScore: {
    alignItems: 'center', backgroundColor: `${colorsStyles.dashboard_score}90`, padding: 10, borderWidth: 2, borderRadius: 5, borderColor: colorsStyles.dashboard_score
  },
  barFill: {
    height: 6,
    borderBottomLeftRadius: 3,
    borderTopLeftRadius: 3,
    backgroundColor: color.ProgressFill
  },
  bottomTextContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 5,
  },
  leftText: {
    color: colorsStyles.gray,
    fontSize: 12,
    marginRight: 95,
    marginLeft: 10,
  },
  rightText: {
    color: colorsStyles.gray,
    fontSize: 12,
  },
  welcomeText: {
    marginTop: 2,
    color: color.WhiteColor,
    fontSize: 16,
  },
  nameText: {
    color: color.WhiteColor,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 2,
  },
  posLocText: {
    color: color.WhiteColor,
    fontSize: 16,
    marginTop: 2,
  },
  menuSlider: {
    flex: 0.5,
    marginTop: 10,
    justifyContent: 'flex-end'
  },
  menuItem: {
    backgroundColor: color.WhiteColor,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: color.BlackColor,
    shadowOpacity: 0.2,
    shadowOffset: { width: 3, height: 3 },
    borderRadius: 10,
    elevation: 2,
    padding: 5,
    margin: 5,
    flex: 1,
  },
  menuItemContainer: {
    marginVertical: 15,
    marginHorizontal: 10,
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  menuItemImage: {
    width: DeviceInfo.isTablet() ? 55 : 40,
    height: DeviceInfo.isTablet() ? 55 : 40,
    resizeMode: 'contain',
    margin: 10
  },
  menuItemLabel: {
    marginTop: DeviceInfo.isTablet() ? 10 : 0,
    textAlign: 'center',
    fontSize: 18,
    color: colorsStyles.black
  },
  linearGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerCircle: {
    backgroundColor: colorsStyles.white,
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  centerCircleText: {
    fontSize: 12
  },
};
