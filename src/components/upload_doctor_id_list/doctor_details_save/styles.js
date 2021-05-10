import { PixelRatio, Dimensions } from 'react-native';
import Colors from '../../../styles/colorsStyles';

export default {
  container: {
    flex: 1,
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
  },
  heading: {
    color: Colors.white,
    padding: 10,
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
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
