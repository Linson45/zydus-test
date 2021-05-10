import { Dimensions } from 'react-native';
import Colors from '../../../styles/colorsStyles';
import { FontStyle } from '../../../styles/fontsStyles';

export default {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: Dimensions.get('window').width - 50,
    maxWidth: 650,
  },

  topContainer: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowRev: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5
  },
  topButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: Colors.blue_dark,
    borderWidth: 1,
    borderRadius: 10,
    margin: 5
  },
  topButtonText: {
    color: Colors.blue_dark,
    fontSize: 14,
  },
  topButtonSelected: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: Colors.blue_dark,
    backgroundColor: Colors.blue_dark,
    borderRadius: 10,
    margin: 5
  },
  topButtonSelectedText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold'
  },
  imageTop: {
    backgroundColor: 'transparent'
  },
  heading: {
    backgroundColor: Colors.header_gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10
  },
  headingTextLeft: {
    color: Colors.colorPrimary,
    flex: 5,
    ...FontStyle.fontLarge
  },
  headingText: {
    color: Colors.colorPrimary,
    flex: 2,
    ...FontStyle.fontLarge
  },
  textLeft: {
    paddingLeft: 15,
    color: Colors.black,
    flex: 5,
    fontSize: 16,
  },
  blankColumn: {
    flex: 0.1
  },
  row: {
    backgroundColor: Colors.header_gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  text: {
    color: Colors.gray_light_1,
    flex: 2,
    fontSize: 16,
  },
  tab: {
    margin: 5
  },
  closeButton: {
    marginTop: 10,
    marginRight: 15
  },
  closeButtonIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.black,
  },
  subHeading: {
    marginTop: 20,
    paddingVertical: 10,
    paddingLeft: 15,
    fontSize: 16,
    fontWeight: '600'
  },
  detailingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.dividerColor,
  },
};
