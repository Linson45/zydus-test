import Colors from '../../../styles/colorsStyles';

export default {

  date_heading: {
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: 'center',
    color: Colors.gray_dark
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
  headerIcon: {},
  docName: {
    // color: Colors.text_dark_gray_73,
    // ...FontStyle.fontLarge
  },
  docDetails: {
    // color: Colors.text_light_gray,
    // ...LightFontStyle.fontTiny
  },
  docDetailsRight: {
    // color: Colors.text_light_gray,
    // ...LightFontStyle.fontTiny,
    textAlign: 'right'
  },
  tp_search: {
    flex: 0.9,
    color: Colors.gray_light,
    fontSize: 12,
    padding: 0,
    textAlign: 'left'
  },
  search_bg: {
    justifyContent: 'flex-end',
    flex: 0.1,
    alignItems: 'center',
  },
  image_search: {
    color: Colors.gray_light
  },
  search_in_row_container: {
    margin: 5,
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
};
