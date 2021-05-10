import { PixelRatio, Dimensions } from 'react-native';
import Colors from '../../../styles/colorsStyles';

export default {
  container: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  loginButtonSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 80,
  },
  loginButton: {
    backgroundColor: 'blue',
    color: 'white'
  },
  SubmitButtonStyle: {
    marginTop: 10,
    padding: 15,
    width: 200,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#F08080',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff'
  },
  SubmitApprovedButtonStyle: {
    marginTop: 10,
    padding: 15,
    width: 200,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#32CD32',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff'
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  ImageContainer: {

    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  ImagePlaceHolderContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    margin: 10,
  },
  greyCircle: {
    borderRadius: 150,
    width: 200,
    height: 200,
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    backgroundColor: 'grey',
    margin: 10,
  },
  ImageContainerWithoutPlaceHolder: {
    borderRadius: 0,
    width: Dimensions.get('window').width - 20,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 30,
  },
  bottomView: {
    width: '90%',
    height: 50,
    backgroundColor: '#DCDCDC',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    borderColor: '#A9A9A9',
    borderWidth: 2,
  },
  textStyle: {
    color: '#000000',
    fontSize: 18,
  },
  absoluteFill: {
    resizeMode: 'stretch',
    padding: 10,
  },
  heading: {
    color: Colors.white,
    padding: 10,
    fontSize: 20
  },
  button: {
    backgroundColor: 'blue',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: '#C0C0C0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submit: {
    width: 100,
    height: 35,
    marginTop: 10,
    padding: 10,
    backgroundColor: '#C0C0C0',
    borderRadius: 30,
  },
  proofSupplyView: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: 100,
    height: 30,
    backgroundColor: '#C0C0C0',
    borderRadius: 30,
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: (Dimensions.get('window').width * 8) / 9,
    height: (Dimensions.get('window').height * 6) / 9,
  },
  docTitle: {
    // color: 'white',
    // padding: 4,
    fontSize: 15,
    textAlign: 'center',
    margin: 0

  },
  doc_item: {
    // color: 'white',
    // padding: 4,
    margin: 0,
    fontSize: 15,
    textAlign: 'center',
  }
};
