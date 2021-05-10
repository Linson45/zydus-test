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
  answers: {
    margin: 5,
    flexDirection: 'row',
    marginTop: 10
  },
  answerContainer: {
    marginRight: 1,
    flex: 1,
    alignItems: 'center',
    marginBottom: 5
  },
  answerDate: {
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    color: Colors.white,
    backgroundColor: Colors.gray_light_1
  },
  answerBox: {
    flexDirection: 'row',
    width: '100%',
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    color: Colors.gray_light_1,
    borderColor: Colors.gray_light_1,
    borderWidth: 1
  },
  answer: {
    width: '100%',
    textAlign: 'center',
    color: Colors.gray_light_1
  },
  dateView: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: Colors.gray_light_1
  },
  date_i: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    marginLeft: 15
  }
};
