import Colors from '../../../styles/colorsStyles';
import { LightFontStyle } from '../../../styles/fontsStyles';

export default {

  date_heading: {
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: 'center',
    color: Colors.gray_dark
  },

  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  rowItem: {
    marginTop: 8,
    width: '50%'
  },

  itemHeading: {
    ...LightFontStyle.fontLarge,
    fontWeight: 'bold'
  },

  itemValues: {
    ...LightFontStyle.fontSmall
  },

  itemMarginTop: {
    ...LightFontStyle.fontSmall,
    marginTop: 10
  }
};
