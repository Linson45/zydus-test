import { Dimensions } from 'react-native';
import color from '../../Constants/colorConstants';
import colorsStyles from '../../styles/colorsStyles';

export default {
  sliderCard: {
    backgroundColor: colorsStyles.white,
    borderRadius: 10,
    marginVertical: 10,
    width: Dimensions.get('window').width - 30,

  },
  sliderCardHeadingContainer: {
    borderBottomWidth: 0.7,
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
    alignItems: 'center',
    flexDirection: 'row',
  },
  sliderBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 10,
    marginBottom: 10
  },
  barContainer: {
    flex: 0.7,
    marginTop: 5,
  },
  rankText: {
    textAlign: 'right',
    fontSize: 11,
    flex: 0.15,
    paddingHorizontal: 5,
    color: colorsStyles.gray
  },
  rankDetailText: {
    fontSize: 11,
    flex: 0.2,
    paddingHorizontal: 5,
    color: colorsStyles.gray
  },
  barBackground: {
    height: 6,
    flex: 0.6,
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
    alignItems: 'center'
  },
  leftText: {
    color: colorsStyles.gray,
    fontSize: 12,
    flex: 0.3,
    textAlign: 'center',
  },
  rightText: {
    color: colorsStyles.gray,
    fontSize: 12,
    flex: 0.7,
    textAlign: 'center'
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
    height: Dimensions.get('window').height / 2 - 30,
    marginTop: 20
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
    paddingVertical: 10,
    padding: 10,
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
    width: 40,
    height: 40,
    resizeMode: 'contain',
    margin: 10
  },
  menuItemLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: colorsStyles.black
  },
  linearGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
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
