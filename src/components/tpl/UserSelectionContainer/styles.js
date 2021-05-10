import { Dimensions } from 'react-native';
import Colors from '../../../Constants/colorConstants';
import ColorStyles from '../../../styles/colorsStyles';

export default {
  container: {
    height: '100%',
    width: '100%'
  },
  headerImg: {
    height: Dimensions.get('window').height / 2,
    width: '100%',
    resizeMode: 'contain'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Dimensions.get('window').width / 8,
    marginRight: Dimensions.get('window').width / 8,
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
  }
};
