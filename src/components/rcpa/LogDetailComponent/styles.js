import color from '../../../Constants/colorConstants';
import { LightFontStyle } from '../../../styles/fontsStyles';
import Colors from '../../../styles/colorsStyles';

export default {
  container: {
    width: '90%',
    marginLeft: 20
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
  itemHeading: {
    ...LightFontStyle.fontLarge,
    fontWeight: 'bold'
  },

  itemValues: {
    color: Colors.gray_light_1,
    marginTop: 5
  },
  doctorName: {
    paddingTop: 25,
    fontSize: 14
  },
  chemistName: {
    paddingTop: 10,
    fontSize: 14
  },
  headerStyle: {
    padding: 0
  },
  headerImageBg: {
    height: undefined,
    width: undefined,
    padding: 10
  },
  headerText: {
    color: Colors.white
  },
  headerIcon: {},
  collapse: {
    marginLeft: 5,
    marginRight: 5
  },
  totalContainer: {
    backgroundColor: Colors.blue_coachmapdetails,
  },
  totalListItem: {
    paddingTop: 8,
    paddingBottom: 8
  },
  totalTextLeft: {
    color: Colors.white,
    fontWeight: 'bold',
    marginLeft: 0,
    marginRight: 0
  },
  totalTextRight: {
    color: Colors.white,
    fontWeight: 'bold',
    marginLeft: 0,
    marginRight: 0
  },
  primaryTitle: {
    color: Colors.gray,
    fontSize: 16
  },
  masterTitle: {
    color: Colors.white,
    backgroundColor: Colors.lemon_yellow,
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    alignSelf: 'flex-start'
  },
  secondaryTitle: {
    color: Colors.gray_light_1,
    fontSize: 12,
    marginTop: 5
  }

};
