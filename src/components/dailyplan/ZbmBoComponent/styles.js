import Colors from '../../../styles/colorsStyles';
import { LightFontStyle } from '../../../styles/fontsStyles';

export default {
  topRow: {
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
  date_heading: {
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: 'center',
    color: Colors.gray_dark
  },
  secondaryTitle: {
    marginTop: 5
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
};
