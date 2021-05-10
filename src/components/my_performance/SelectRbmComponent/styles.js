import { Dimensions } from 'react-native';
import Colors from '../../../styles/colorsStyles';
import { FontStyle } from '../../../styles/fontsStyles';

export default {
  content: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: Dimensions.get('window').width - 35
  },
  topContainer: {
    padding: 20,
  },
  rowRev: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5
  },
  topButton: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    height: 25,
    borderColor: Colors.blue_dark,
    borderRadius: 8,
    margin: 5
  },
  topButtonText: {
    color: Colors.blue_dark,
    ...FontStyle.fontSmall
  },
  topButtonSelected: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    height: 25,
    borderColor: Colors.blue_dark,
    backgroundColor: Colors.blue_dark,
    borderRadius: 8,
    margin: 5
  },
  topButtonSelectedText: {
    color: Colors.white,
    ...FontStyle.fontSmall,
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
    color: Colors.black,
    flex: 5,
    ...FontStyle.fontMedium
  },
  blankColumn: {
    flex: 0.1
  },
  row: {
    backgroundColor: Colors.header_gray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10
  },
  text: {
    color: Colors.gray_light_1,
    flex: 2,
    ...FontStyle.fontMedium
  },
  tab: {
    margin: 5
  },
  closeButton: {
    backgroundColor: 'transparent',
    padding: 15,
    alignSelf: 'flex-end'
  },
  closeButtonIcon: {
    width: 25,
    height: 25
  }
};
