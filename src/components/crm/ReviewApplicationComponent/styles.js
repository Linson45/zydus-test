import Colors from '../../../styles/colorsStyles';

export default {

  header: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10
  },
  input: {
    borderWidth: 0.5,
    borderColor: Colors.gray_light,
    borderRadius: 10,
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15
  },
  secondaryTitle: {
    color: Colors.gray,
    marginTop: 5
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
