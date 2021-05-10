import Colors from '../../../styles/colorsStyles';

export default {
  header: {
    backgroundColor: Colors.colorPrimary,
    padding: 15
  },
  container: {
    marginLeft: 10,
    marginRight: 10
  },
  headerStyle: {
    padding: 0
  },
  headerImageBg: {
    height: undefined,
    width: undefined,
    padding: 10,
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row'
  },
  headerText: {
    color: Colors.white
  },
  headerRowSubText: {
    color: Colors.white,
    fontSize: 12
  },
  secondaryTitle: {
    color: Colors.gray,
    marginTop: 5
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  rowItem: {
    marginTop: 8,
    width: '50%'
  },
  item: {
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.gray,
    marginTop: 5
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
  rowHeading: {
    fontSize: 13,
    color: Colors.black,
    marginTop: 10
  },
  status: {
    marginTop: 5,
    fontSize: 14,
    color: Colors.black
  },
  buttons: {
    marginTop: 15,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  buttonLeft: {
    borderRadius: 10,
    backgroundColor: Colors.blue_coachmapdetails,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    color: Colors.white
  },
  buttonRight: {
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: Colors.orange,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    color: Colors.white
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
  headerCardView: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  headerCard: {
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 2,
    flex: 1,
    padding: 5
  },
  headerNumber: {
    color: Colors.white,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  headerSubText: {
    color: Colors.white,
    fontSize: 14,
    textAlign: 'center',
  }
};
