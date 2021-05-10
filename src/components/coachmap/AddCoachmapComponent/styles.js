import { Dimensions } from 'react-native';
import Colors from '../../../styles/colorsStyles';

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
    marginBottom: 10,
    width: '50%'
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
    marginBottom: 10,
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
  question: {
    fontSize: 13,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    color: Colors.gray_light_1
  },
  answer: {
    fontSize: 14,
    color: Colors.blue,
    fontWeight: '500',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5

  },
  containerMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomView: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute', // Here is the trick
    bottom: 0, // Here is the trick
    flex: 1
  },
  button: {
    paddingLeft: 25,
    paddingRight: 25,
    color: Colors.red,
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonText: {
    paddingLeft: 10,
    paddingRight: 10,
    color: Colors.gray
  },
  buttonIcon: {
    color: Colors.gray
  },
  imageBg: {
    marginLeft: 2,
    marginRight: 2,
    height: '100%',
    paddingTop: 15,
    paddingBottom: 15
  },
  questionView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionTitle: {
    color: Colors.white,
    fontSize: 16
  },
  indicatorView: {
    marginTop: 15,
    flex: 1,
    flexDirection: 'row'
  },
  indicator: {
    marginLeft: 5,
    marginRight: 5,
    width: 35,
    height: 5
  },
  bottomIndicatorView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bottomIndicator: {
    marginLeft: 5,
    marginRight: 5,
    width: 10,
    height: 10
  },
  questionImageBg: {
    width: Dimensions.get('window').width * 7 / 8,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 15,
    paddingLeft: Dimensions.get('window').width / 8,
    paddingRight: Dimensions.get('window').width / 8,
    paddingTop: 15,
  },
  titleImage: {
    height: 40,
    width: 40,
    marginBottom: 15
  },
  titleImageView: {
    justifyContent: 'space-around',
    alignContent: 'center',
    flexDirection: 'row'
  },
  options: {
    marginTop: 20,
    paddingBottom: 20
  },
  option: {
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 10
  },
  optionText: {
    color: Colors.gray_light_1,
    marginLeft: 15,
    textAlign: 'center'
  }
};
