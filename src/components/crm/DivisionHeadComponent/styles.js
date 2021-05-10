import Colors from '../../../styles/colorsStyles';

export default {
  header: {
    margin: 10
  },
  headerRow: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerView: {
    backgroundColor: Colors.sky_blue,
    flex: 1,
    marginLeft: 10
  },
  headerHeading: {
    marginLeft: 10,
    marginTop: 10,
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold'
  },
  headerNumber: {
    textAlign: 'right',
    marginRight: 15,
    marginTop: 1,
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold'
  },
  headerNumberText: {
    marginTop: 5,
    textAlign: 'right',
    marginRight: 10,
    color: Colors.white,
    fontSize: 12,
    marginBottom: 10
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerButton: {
    borderColor: Colors.gray_light,
    borderWidth: 0.5,
    borderRadius: 5,
    marginLeft: 20,
    justifyContent: 'center',
    flex: 1
  },
  headerButtonRight: {
    borderColor: Colors.gray_light,
    borderWidth: 0.5,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 20,
    flex: 1,
    justifyContent: 'center',
  },
  headerButtonText: {
    textAlign: 'center',
    marginTop: 0,
    color: Colors.gray,
    fontSize: 12,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5
  },
  top50Header: {
    marginTop: 10,
    justifyContent: 'center',
    backgroundColor: Colors.colorPrimary
  },
  top50HeaderText: {
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    color: Colors.white,
    fontSize: 16
  },
  item: {
    borderRadius: 8,
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: Colors.gray_light,
    marginTop: 5
  },
  collapseContainer: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 15
  },
  mcr: {
    fontSize: 12,
    color: Colors.gray_dark,
    marginBottom: 3
  },
  name: {
    fontSize: 14,
    color: Colors.gray
  },
  subText: {
    fontSize: 12,
    color: Colors.gray_dark,
    marginTop: 3
  },
  views: {
    flexDirection: 'row',
    flex: 1
  },
  roundView: {
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
    borderWidth: 0.3,
    borderColor: Colors.gray_light,
    flexDirection: 'column',
    flex: 1,
    alignItem: 'center'
  },
  marketingEfforts: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.greenish_sky_blue,
    fontWeight: 'bold'
  },
  romeEfforts: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.black,
  },
  effortText: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.light_black,
    marginTop: 3
  },
};
