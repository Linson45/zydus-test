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
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
  coloumnItem: { flex: 1, alignSelf: 'center' },
  columnText: {
    padding: 4,
    fontSize: 15,
    textAlign: 'center',
  },
  docTitle: {
    padding: 4,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  doc_item: {
    padding: 4,
    fontSize: 15,
    textAlign: 'center',
  }
};
