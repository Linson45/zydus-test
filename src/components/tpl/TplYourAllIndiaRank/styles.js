import { Dimensions } from 'react-native';
import color from '../../../Constants/colorConstants';

export default {
  container: {
    backgroundColor: color.WhiteColor,
    color: 'white',
    // height:'95%',
    // flex:1
  },
  button: {
    height: 60,
    width: Dimensions.get('window').width / 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30
  },
  inActiveButton: {
    height: 48,
    width: Dimensions.get('window').width / 3,
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
  tableHeader: {
    width: '90%',
    flexDirection: 'row',
    marginLeft: 20
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#d7d7d7',
    marginTop: 10
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
    borderRadius: 10
  },
  textMainContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 25
  },
  textInnerContainer: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 21,
    fontWeight: '600'
  },
  subTitle: {
    color: '#fff',
    fontSize: 15,
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
  LeftButtonDynamic: {
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30
  },
  RightButtonDynamic: {
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30
  },
  RankHeader: {
    width: '17%',
    color: '#005ACD'
  },
  ScoreHeader: {
    width: '17%',
    color: '#005ACD'
  },
  NameHeader: {
    width: '46%',
    color: '#005ACD'
  },
  DivisionHeader: {
    width: '20%',
    color: '#005ACD',
    textAlign: 'center'
  },
  RankRow: {
    width: '17%'
  },
  ScoreRow: {
    width: '17%'
  },
  NameRow: {
    width: '46%'
  },
  DivisionRow: {
    width: '20%',
    textAlign: 'center'
  },
  mainContainer: {
    flex: 1
  },
  innerContainer: {
    width: '90%',
    height: 100,
    borderRadius: 10,
    marginTop: 25,
    justifyContent: 'center',
    marginLeft: 20
  },
  tableContainer: {
    marginTop: 10,
    height: Dimensions.get('screen').height - (100 + 25 + 100 + 60 + 40 + 20)
  },
  FilterIcons: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
};
