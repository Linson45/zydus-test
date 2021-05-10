import { Dimensions } from 'react-native';
import Colors from '../../../styles/colorsStyles';
import { FontStyle } from '../../../styles/fontsStyles';

export default {
  content: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: Dimensions.get('window').width - 35,
    height: Dimensions.get('window').height * 3 / 4,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent'
  },
  heading: {
    color: Colors.white,
    backgroundColor: Colors.transparent,
    padding: 15,
    fontSize: 16
  },
  closeButton: {
    backgroundColor: 'transparent',
    padding: 15,
    alignSelf: 'flex-end'
  },
  closeButtonIcon: {
    width: 25,
    height: 25
  },
  container: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 15
  },
  doctorDetail: {
    textDecorationLine: 'underline',
    fontSize: 14,
    color: Colors.gray_light_1
  },
  mcr: {
    marginTop: 5,
    fontSize: 12,
    color: Colors.gray_dark,
    marginBottom: 3
  },
  name: {
    fontSize: 14,
    color: Colors.gray
  },
  subText: {
    fontSize: 13,
    color: Colors.gray_dark,
    marginTop: 3
  },
  doctorMetric: {
    marginTop: 15,
    marginBottom: 10,
    textDecorationLine: 'underline',
    fontSize: 14,
    color: Colors.gray_light_1
  },
  modalBrands: {
    marginTop: 5,
    marginBottom: 15
  },
  modalBrand: {
    marginLeft: 10,
    marginBottom: 5,
    color: Colors.gray,
    fontSize: 14
  },
  engagementDetail: {
    marginBottom: 5,
    color: Colors.gray,
    fontSize: 13
  },
  flag: {
    flex: 2,
    marginRight: 5,
  },

  flagText: {
    width: 30,
    color: Colors.red,
    borderColor: Colors.gray_light,
    borderWidth: 1,
    borderRadius: 8,
    padding: 2,
    textAlign: 'center',
    flexWrap: 'wrap'
  },
  row: {
    flexDirection: 'row'
  },
  cardHeading: {
    flexDirection: 'row',
    backgroundColor: Colors.colorPrimary,
    padding: 5
  },
  cardRow: {
    marginTop: 5,
    flexDirection: 'row',
    padding: 5
  },
  month: {
    textAlign: 'center',
    flex: 2,
    marginRight: 5,
    color: Colors.white
  },
  cardTitle: {
    fontSize: 13,
    color: Colors.gray_dark,
    flex: 6,
    marginRight: 15
  },
  cardText: {
    textAlign: 'center',
    marginRight: 5,
    fontSize: 13,
    color: Colors.gray,
    flex: 2
  }
};
