import Colors from '../../../styles/colorsStyles';
import { LightFontStyle } from '../../../styles/fontsStyles';

export default {
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
    color: Colors.gray_light_1,
    marginTop: 5
  },

  itemMarginTop: {
    ...LightFontStyle.fontSmall,
    marginTop: 10
  },
  absoluteFill: {
    resizeMode: 'stretch'
  },
  heading: {
    color: Colors.white,
    padding: 10
  },
  imageContainer: {
    padding: 5,
  }
};
