import { Dimensions } from 'react-native';
import color from '../../../Constants/colorConstants';

export default {
  container: {
    backgroundColor: '#F6F6F7',
    color: '#ddd',
    flex: 1
  },
  button: {
    height: 60,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30
  },
  inActiveButton: {
    height: 50,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  whiteText: {
    color: '#fff'
  },
  blackText: {
    color: '#000'
  },
  row: {
    width: '90%',
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 10
  },
  bannerImage: {
    height: 100,
    width: '100%',
    // marginLeft:20,
    borderRadius: 10,
  },
  textMainContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 25
  },
  textInnerContainer: {
    height: 100,
    width: 150,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'left'
  },
  subTitle: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'left'

  },
  buttonContainer: {
    flexDirection: 'row',
    height: 60,
    width: '90%',
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  yourScoreText: {
    color: color.YellowDark,
    fontSize: 17

  },
  TotalScoreText: {
    color: '#fff',
    fontSize: 17
  },
  miniText: {
    fontSize: 10
  },
  boldText: {
    fontWeight: '600'
  },
  selectorButton: {
    marginLeft: 5
  },
  LeftDynamic: {
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30
  },
  RightDynamic: {
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30
  },
  RowContainer: {
    width: '90%',
    marginLeft: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5
  },
  FirstInternal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  },
  SecondInternal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    marginTop: 5
  },
  ImageContainer: {
    width: '90%',
    height: 100,
    borderRadius: 10,
    // backgroundColor:'red',
    marginTop: 25,
    justifyContent: 'center',
    marginLeft: 20
  },
  Text: {
    flexDirection: 'row'
  },
  dataContainer: {
    marginTop: 10,
    height: Dimensions.get('screen').height - (100 + 25 + 100 + 60 + 40 + 20)
  }

};
