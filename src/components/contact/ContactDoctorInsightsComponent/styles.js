import Colors from '../../../styles/colorsStyles';

export default {
  container: {
    backgroundColor: Colors.white,
    paddingBottom: 25,
  },
  smallHeading: {
    marginTop: 3,
    marginBottom: 10,
    fontSize: 14,
    color: '#999999',
  },
  topValue: {
    fontSize: 18,
    color: '#333333',
    fontWeight: '600',
  },
  emailIcon: {
    marginTop: 3,
    height: 20,
    width: 20,
    marginRight: 10,
    tintColor: '#333333'
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
  },
  column2: {
    flex: 2,
    flexDirection: 'column',
  },
  main: {
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: 25,
    paddingBottom: 25,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  divider: {
    marginTop: 5,
    marginBottom: 5,
    height: 10,
    backgroundColor: '#F3F3F3'
  },
  heading: {
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: 25,
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  chemistRow: {
    marginLeft: 25,
    marginRight: 25,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: Colors.dividerColor,
  },
  chemistName: {
    fontSize: 16,
    color: '#151522',
  },
  chemistLocation: {
    fontSize: 12,
    color: '#999999',
  },

  consumptionContainer: {
    height: 250,
    padding: 10,
    marginTop: 25,
    flex: 1,
  },
  consumptionChart: {
    width: '100%',
    height: 200
  },

};
