import Colors from '../../../styles/colorsStyles';
import { LightFontStyle } from '../../../styles/fontsStyles';

export default {
  headerContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'center',
    margin: 10,
  },
  bannerImage: {
    width: '100%',
    backgroundColor: Colors.blue_dark,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: {
    marginLeft: 15,
    marginTop: 10,
    fontSize: 14,
    marginBottom: 10
  },
  leftUserType: {
    color: Colors.white,
    fontSize: 14
  },
  leftUserName: {
    marginTop: 10,
    color: Colors.white,
    fontSize: 16,
  },
  headerRight: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    fontSize: 14,
    marginBottom: 10
  },
  month: {
    color: Colors.white,
    fontSize: 12,
    textAlign: 'right',
  },
  date: {
    color: Colors.orange,
    fontSize: 16,
    marginTop: 10
  },
  collapseParent: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10
  },
  collapseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  collapseHeaderSub: {
    marginTop: 5,
    color: Colors.gray_light_1,
    fontSize: 12
  },
  collapseBody: {
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyDate: {
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 5
  },
  name: {
    color: Colors.gray,
    ...LightFontStyle.fontMedium
  },
  city: {
    marginTop: 2,
    color: Colors.gray_light_1,
    ...LightFontStyle.fontMedium
  },
  row_date: {
    marginTop: 2,
    color: Colors.gray_login,
    ...LightFontStyle.fontSmall
  },
  countCard: {
    flex: 1,
    borderLeftColor: Colors.red,
    borderLeftWidth: 5,
    alignContent: 'center'
  },
  count: {
    fontSize: 18,
    paddingTop: 5,
    textAlign: 'center'
  },
  countText: {
    fontSize: 12,
    paddingTop: 5,
    textAlign: 'center',
    paddingBottom: 5,
    color: Colors.gray
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttons: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignContent: 'flex-end'
  },
  buttonLeft: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    borderRadius: 15,
    marginRight: 10,
    alignItems: 'center',
    backgroundColor: Colors.transparent
  },
  buttonRight: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: Colors.gray_light
  },
  whiteText: {
    color: '#fff'
  },
  blackText: {
    color: '#000'
  },
  button: {
    height: 60,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30
  },
  inActiveButton: {
    height: 50,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    marginLeft: 5
  },
  LeftButtonDynamic: {
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30
  },
  RightButtonDynamic: {
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30
  },
  buttonContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendIcon: {
    width: 40,
    height: 40
  },
};
