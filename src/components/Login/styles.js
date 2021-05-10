import colorsStyles from '../../styles/colorsStyles';

export default {
  container: {
    backgroundColor: '#fff',
    color: 'white',
    flex: 1,
  },
  logo: {
    marginTop: 104,
    alignSelf: 'center',
    width: 238,
    height: 49
  },
  mainBox: {
    flex: 1,
    flexDirection: 'column'
  },
  topBox: {
    flex: 0.4,
    justifyContent: 'space-around'
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  bottomBox: {
    flex: 0.6,
    marginLeft: 32,
    marginRight: 32
  },
  signIn: {
    marginTop: 45,
    fontSize: 18,
    color: 'white'
  },
  textLogo: {
    marginTop: 18,
    alignSelf: 'center',
    fontSize: 16
  },
  containerForm: {
    flex: 1,
    marginLeft: 32,
    marginRight: 32
  },
  contentForm: {
    marginTop: 20.0,
    backgroundColor: colorsStyles.white,
    borderRadius: 10,
    padding: 10
  },
  buttonLogin: {
    borderRadius: 30,
    marginTop: 20,
    backgroundColor: colorsStyles.blue_coachmapdetails
  },
  textLogin: {
    fontSize: 19
  },
  containerEnv: {
    alignItems: 'center',
    marginTop: 20
  },
  textChangeEnv: {
    marginTop: 5
  },
  logoImage: {
    width: 150,
    height: 128
  },
  inputBox: {},
  icon: {
    color: colorsStyles.gray_login
  }
};
