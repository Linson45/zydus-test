import Colors from '../../../styles/colorsStyles';

export default {
  container: {
    marginBottom: 55
  },
  footer: {
    backgroundColor: Colors.white,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  top: {
    marginTop: 15,
    marginLeft: 20,
    marginRight: 20
  },
  topButton: {
    marginTop: 15,
    borderBottomColor: Colors.gray,
    borderBottomWidth: 0.3,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  topButtonIcon: {
    color: Colors.gray_light,
    fontSize: 20,
    paddingLeft: 200
  },
  topButtonHint: {
    fontSize: 14,
    color: Colors.gray_light
  },
  topButtonText: {
    fontSize: 14,
    color: Colors.gray
  },
  topButtonFloatHint: {
    fontSize: 12,
    color: Colors.gray_light,
    marginBottom: 5
  },
  card: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10
  },
  cardHeader: {
    backgroundColor: Colors.colorPrimary
  },
  cardHeaderText: {
    color: Colors.white,
    fontSize: 14
  },
  cardItem: {
    flexDirection: 'row',
    marginTop: 3
  },
  cardItemTextLeft: {
    flex: 1.5,
    marginLeft: 10,
    fontSize: 12,
    color: Colors.gray_dark
  },
  cardItemText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 12,
    color: Colors.gray_dark
  },
  button: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: 25,
    marginBottom: 20
  },
  buttonText: {
    color: Colors.white,
    backgroundColor: Colors.orange,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 10
  }
};
