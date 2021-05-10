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
  logoImage: {
    width: 75,
    height: 75
  },
};
