import { Dimensions } from 'react-native';
import Colors from '../../../Constants/colorConstants';
import ColorStyles from '../../../styles/colorsStyles';

export default {
  headerImg: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Dimensions.get('window').width / 16,
    marginRight: Dimensions.get('window').width / 16,
    marginBottom: Dimensions.get('window').width / 4
  },
  textHeading: {
    color: Colors.WhiteColor,
    backgroundColor: ColorStyles.colorPrimary,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  dropDownView: {
    marginLeft: 10,
    marginRight: 10
  },
  button1: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'orange',
    marginRight: 20,
    borderRadius: 8
  },
  button2: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'blue',
    borderRadius: 8
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20
  },
};
