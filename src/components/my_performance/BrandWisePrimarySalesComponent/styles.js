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
    marginTop: 8
  },
  search_in_row_container: {
    padding: 5,
    paddingLeft: 10,
    alignSelf: 'stretch',
    flexDirection: 'row',
    borderRadius: 20,
    borderColor: Colors.colorPrimary,
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  tp_search: {
    flex: 0.9,
    color: Colors.gray_light,
    fontSize: 12,
    padding: 0,
    textAlign: 'left'
  },
  view_search: {
    justifyContent: 'flex-end',
    flex: 0.1,
  },
  search_bg: {
    justifyContent: 'flex-end',
    flex: 0.1,
    alignItems: 'center',
  },
  image_search: {
    color: Colors.gray_light
  }
};
