import color from '../../../Constants/colorConstants';
import { LightFontStyle } from '../../../styles/fontsStyles';
import Colors from '../../../styles/colorsStyles';

export default {
  container: {
  },
  bannerStyle: {
    height: 100,
    width: '100%',
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  bannerContent: {
    marginRight: 20
  },
  month: {
    textAlign: 'right',
    fontSize: 13,
    color: color.WhiteColor
  },
  year: {
    textAlign: 'right',
    fontSize: 18,
    color: color.YellowDark
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20
  },
  addButton: {
    padding: 5,
    margin: 5,
    backgroundColor: color.YellowDark,
    width: 115,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: color.WhiteColor,
    fontSize: 15
  },
  historyButton: {
    padding: 5,
    margin: 5,
    backgroundColor: color.DarkBlue,
    width: 115,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemHeading: {
    ...LightFontStyle.fontLarge,
    fontWeight: 'bold',
    color: Colors.light_black
  },

  itemValues: {
    color: Colors.gray_light_1,
    marginTop: 5
  },

};
