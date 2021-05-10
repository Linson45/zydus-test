import Colors from '../../../styles/colorsStyles';

export default {
  container: {
    backgroundColor: Colors.white,
  },
  loading: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    paddingBottom: 50,
  },
  chemistView: {
    marginTop: 10,
    marginHorizontal: 10,
    borderColor: Colors.dividerColor,
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 20,
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider: {
    marginTop: 15,
    marginBottom: 15,
    height: 0.6,
    backgroundColor: Colors.borderContent
  },
  mainBottom: {
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  right: {
    marginRight: 25,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  name: {
    fontSize: 18,
    color: '#333333',
    fontWeight: '500',
  },
  code: {
    marginTop: 3,
    marginLeft: 20,
    fontSize: 14,
    color: '#999999',
  },
  smallHeading: {
    marginTop: 3,
    marginBottom: 5,
    fontSize: 14,
    color: '#999999',
  },
  rcpaValue: {
    fontSize: 18,
    color: Colors.content,
    fontWeight: '600',
  },
  marginRight25: {
    marginRight: 40,
  },
  email: {
    fontSize: 18,
    color: '#333333',
  },
  mobile: {
    fontSize: 17,
    color: '#333333',
  },
  emailIcon: {
    marginTop: 3,
    height: 20,
    width: 20,
    marginRight: 10,
  },
  search: {
    color: Colors.black,
    borderWidth: 0.3,
    borderColor: Colors.dividerColor,
    borderRadius: 5,
    height: 35,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
};
