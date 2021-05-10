import { Dimensions } from 'react-native';
import color from '../../../Constants/colorConstants';
import { LightFontStyle } from '../../../styles/fontsStyles';
import Colors from '../../../styles/colorsStyles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default {
  container: {
    marginVertical: 10,
    marginHorizontal: 15,
    flex: 1,
  },
  submit: {
    width: 130,
    height: 35,
    marginTop: 10,
    padding: 10,
    backgroundColor: Colors.colorPrimary,
    borderRadius: 8,
  },
  submitRX: {
    width: 130,
    height: 35,

    padding: 10,
    backgroundColor: Colors.colorPrimary,
    borderRadius: 8,
  },
  buttonsText: {
    width: 130,
    height: 35,

    padding: 10,
    backgroundColor: Colors.colorPrimary,
    borderRadius: 8,
  },
  uploadRemoveButton: {
    width: 100,
    height: 35,
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.colorPrimary,
    borderRadius: 8,
    marginLeft: 20,
  },
  removeButton: {
    width: 100,
    height: 35,
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    marginLeft: 20,
    borderColor: '#482c80',

    borderWidth: 1,
  },
  remove: {
    color: Colors.colorPrimary,
    textAlign: 'center',
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
  },
  search: {
    borderWidth: 1,
    borderColor: Colors.dividerColor,
    borderRadius: 5,
    height: 35,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    paddingHorizontal: 10,
  },
  bottomView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    height: 50,
    position: 'absolute', // Here is the trick
    bottom: 15, // Here is the trick
  },
  saveButton: {
    width: 100,
    height: 35,
    // marginTop: 20,
    // padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    marginLeft: 20,
    borderColor: '#482c80',

    borderWidth: 1,
    textAlign: 'center',
  },
  saveText: {
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
    marginLeft: '25%',
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
  },
  absoluteFill: {
    resizeMode: 'stretch',
    padding: 5,
  },
  heading: {
    color: Colors.white,
    padding: 5,
    fontSize: 15,
  },
  bannerStyle: {
    height: 100,
    width: '100%',
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  bannerContent: {
    marginRight: 20,
  },
  month: {
    textAlign: 'right',
    fontSize: 13,
    color: color.WhiteColor,
  },
  year: {
    textAlign: 'right',
    fontSize: 18,
    color: color.YellowDark,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
  },
  addButton: {
    padding: 5,
    margin: 5,
    backgroundColor: color.YellowDark,
    width: 115,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: color.WhiteColor,
    fontSize: 15,
  },
  historyButton: {
    padding: 5,
    margin: 5,
    backgroundColor: color.DarkBlue,
    width: 115,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemHeading: {
    ...LightFontStyle.fontSmall,
    fontWeight: 'bold',
    color: Colors.white,
  },

  itemValues: {
    color: Colors.gray_light_1,
    marginTop: 5,
  },
  topRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.dividerColor,
    borderRadius: 5,
    margin: 5,
  },
  leftTopRow: {
    flex: 0.7,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rightTopRow: {
    flex: 0.3,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rightTopRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rightTopRowText: {
    color: Colors.light_black,
    ...LightFontStyle.fontMedium,
  },
  doctorName: {
    fontSize: 14,
  },
  headerImageBg: {
    height: undefined,
    width: undefined,
  },
  headerStyle: {
    padding: 0,
    backgroundColor: Colors.header_gray,
    borderBottomWidth: 0.3,
    borderTopWidth: 0.1,
    borderColor: Colors.gray_light,
  },
  chemistName: {
    paddingTop: 10,
    fontSize: 14,
  },
  chemistDetailContainer: {
    marginVertical: 5,
  },
  chemistDetailText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 3,
  },
  rowContainer: {
    borderBottomWidth: 1,
    borderColor: '#d7d7d7',
    padding: 5,
    // backgroundColor:'#eee'
  },
  rowContainerCompetitors: {
    borderBottomWidth: 1,
    borderColor: '#d7d7d7',
    padding: 5,
    // backgroundColor:'#fff'
  },
  rowInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLeftContent: {
    width: '80%',
  },
  companyZydus: {
    backgroundColor: Colors.orange,
    width: 50,
    color: color.WhiteColor,
    fontSize: 14,
    marginBottom: 5,
    borderRadius: 8,
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: 5,
  },
  productName: {
    fontSize: 12,
    color: Colors.gray_dark,
    marginLeft: 10,
    ...LightFontStyle.fontSmall,
  },
  input: {
    width: '20%',
    backgroundColor: '#eee',
    borderRadius: 10,
    height: 30,
    textAlign: 'center',
    fontSize: 15,
    padding: 0,
    borderColor: Colors.blue_coachmapdetails,
    borderWidth: 1,
    ...LightFontStyle.fontMedium,
  },
  competitor: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.light_black,
  },
  selectCheckBox: {
    fontSize: 20,
    color: 'black',
    paddingLeft: 10,
  },
  unselectCheckBox: {
    fontSize: 20,
    color: 'black',
    paddingLeft: 10,
  },
  modalHeaderComponent: {
    backgroundColor: Colors.colorPrimary,
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 5,
  },
  modalHeaderText: {
    fontSize: 16,
    color: Colors.white,
    marginLeft: 10,
    padding: 8,
  },
  modalContent: {
    backgroundColor: 'white',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: (Dimensions.get('window').width * 8) / 9,
    height: (Dimensions.get('window').height * 6) / 9,
  },
  headerText: {
    color: Colors.black,
    paddingLeft: 15,
    paddingTop: 8,
    paddingBottom: 8,
    fontWeight: '500',
    fontSize: 15,
  },
  secondaryTitle: {
    marginTop: 5,
  },
  popupButtonContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    flex: 1,
    width: (Dimensions.get('window').width * 8) / 9,
  },
  popupLeftButton: {
    backgroundColor: Colors.gray,
    flex: 1,
  },
  popupRightButton: {
    backgroundColor: Colors.colorPrimary,
    flex: 1,
  },
  popupButtonText: {
    fontSize: 18,
    color: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    textAlign: 'center',
  },
  product: {
    color: Colors.gray_light_1,
    fontSize: 15,
  },
  brandModalHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkbox: {
    alignItems: 'flex-end',
    marginRight: 5,
    marginTop: 5,
  },
  brandIcon: {
    marginLeft: 10,
    flexDirection: 'row',
  },
  brand: {
    color: Colors.white,
    paddingLeft: 15,
    paddingTop: 8,
    paddingBottom: 8,
    fontWeight: '500',
    fontSize: 15,
  },
  dropdownDesign: {
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 1},
    // shadowOpacity: 0.8,
    // shadowRadius: 1,
    // alignSelf: 'center',

    // width: Dimensions.get('window').width,
    // alignSelf: 'center',
    // width: Dimensions.get('window').width,
    width: Dimensions.get('window').width - 165,
    // width: wp('100%') + 100,
  },
  quantityInput: {
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 5,
    height: 35,
    width: 65,
    borderWidth: 1,
    // paddingVertical: 5,
    // paddingHorizontal: 10,
    textAlign: 'center'
    // position: 'absolute',
    // left: 20,
  },
  chemistDropDown: {
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 1},
    // shadowOpacity: 0.8,
    // shadowRadius: 1,
    alignSelf: 'flex-start',
    // width: Dimensions.get('window').width - 400,
    width: Dimensions.get('window').width - 680,
    // width: 350,
    // width: wp('40%'),
    marginTop: -15,
  },
  add: {
    width: 75,
    height: 35,
    marginTop: 5,
    padding: 10,
    backgroundColor: Colors.colorPrimary,
    borderRadius: 8,
    marginLeft: 90,
  },
  totalQuantity: {
    flex: 1,
    flexDirection: 'row',

    // marginLeft: Dimensions.get('window').width - 625, // left went//600 also right went 
    marginLeft: Dimensions.get('window').width - 622,
    marginTop: 7,
  },
  quantityText: {
    
    // marginLeft: Dimensions.get('window').width - 560,//right
    marginLeft: Dimensions.get('window').width - 585,//right
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 3,
    width: 100,
    position: 'absolute',
    marginLeft: Dimensions.get('window').width - 580,
  },
};
