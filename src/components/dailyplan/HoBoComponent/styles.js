import { Dimensions } from 'react-native';
import Colors from '../../../styles/colorsStyles';

import { LightFontStyle } from '../../../styles/fontsStyles';

export default {
  topRow: {
    backgroundColor: 'rgb(248,248,248)',
    flexDirection: 'row',
  },
  rightTopRow: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  rightTopRowTextContainer: { justifyContent: 'center', alignItems: 'center' },
  rightTopRowContainer: { flexDirection: 'row', justifyContent: 'center' },
  rightTopRowText: {
    color: Colors.light_black,
    ...LightFontStyle.fontMedium
  },
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
    color: Colors.white,
    backgroundColor: Colors.colorPrimary,
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
  headerStyle: {
    padding: 0
  },
  headerImageBg: {
    height: undefined,
    width: undefined,
    padding: 10
  },
  headerText: {
    color: Colors.white
  },
  secondaryTitle: {
    marginTop: 5
  },
  masterTitle: {
    color: Colors.white,
    backgroundColor: Colors.lemon_yellow,
    fontSize: 12,
    fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginRight: 10,
  },
  rightAlign: {
    flexDirection: 'row'
  }
};
