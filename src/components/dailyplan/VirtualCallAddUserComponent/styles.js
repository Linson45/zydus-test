import Colors from '../../../styles/colorsStyles';

export default {
  container: {
    margin: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  search: {
    color: Colors.black,
    borderWidth: 1,
    borderColor: Colors.dividerColor,
    borderRadius: 5,
    height: 35,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    marginBottom: 25,
  },
  buttonText: {
    backgroundColor: Colors.colorPrimary,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    color: Colors.white,
  },
  listRow: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 10,
  },
  left: {
    flexDirection: 'row',
    flex: 0.4,
    alignItems: 'center',
  },
  middle: {
    flex: 0.3
  },
  right: {
    flex: 0.3
  },
  doctorName: {
    marginLeft: 10,
    fontSize: 16,
    color: '#151522'
  },
  email: {
    marginLeft: 10,
    fontSize: 14,
    color: Colors.secondaryText
  },
  heading: {
    fontWeight: '600',
    color: '#151522',
    fontSize: 16,
    marginVertical: 15,
  },
  divider: {
    height: 0.5,
    backgroundColor: Colors.dividerColor,
    marginTop: 15,
    marginBottom: 15,
  },
};
