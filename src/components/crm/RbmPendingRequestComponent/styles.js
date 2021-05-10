import Colors from '../../../styles/colorsStyles';

export default {

  container: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    marginBottom: 10
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
  }
};
