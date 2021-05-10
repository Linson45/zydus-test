import { Dimensions } from 'react-native';
import color from '../../../Constants/colorConstants';
import ColorStyles from '../../../styles/colorsStyles';
import { LightFontStyle } from '../../../styles/fontsStyles';

export default {
  container: {
    marginVertical: 10,
    marginHorizontal: 15,
    flex: 1
  },
  bannerStyle: {
    height: 80,
    width: '100%',
    borderRadius: 10,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  bannerContent: {
    marginRight: 15
  },
  month: {
    textAlign: 'right',
    fontSize: 13,
    color: color.WhiteColor,
  },
  year: {
    textAlign: 'right',
    fontSize: 18,
    color: color.YellowDark
  },
  headerImageBg: {
    height: undefined,
    width: undefined,
  },
  headerStyle: {
    padding: 0,
    backgroundColor: ColorStyles.header_gray,
    borderBottomWidth: 0.3,
    borderTopWidth: 0.1,
    borderColor: ColorStyles.gray_light
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40
  },
  addButton: {
    padding: 5,
    margin: 5,
    backgroundColor: color.YellowDark,
    width: 115,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: color.WhiteColor,
    fontSize: 15
  },
  historyButton: {
    padding: 5,
    margin: 5,
    backgroundColor: color.DarkBlue,
    width: 115,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  doctorName: {
    paddingTop: 15,
    fontSize: 14
  },
  chemistName: {
    paddingTop: 10,
    fontSize: 14
  },
  chemistDetailContainer: {
    marginVertical: 5,
  },
  chemistDetailText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 3
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
    alignItems: 'center'
  },
  rowLeftContent: {
    width: '80%'
  },
  companyZydus: {
    backgroundColor: ColorStyles.orange,
    width: 50,
    color: color.WhiteColor,
    fontSize: 14,
    marginBottom: 5,
    borderRadius: 8,
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: 5
  },
  productName: {
    fontSize: 12,
    color: ColorStyles.gray_dark,
    marginLeft: 10,
    ...LightFontStyle.fontSmall
  },
  input: {
    width: '20%',
    backgroundColor: '#eee',
    borderRadius: 10,
    height: 30,
    textAlign: 'center',
    fontSize: 15,
    padding: 0,
    borderColor: ColorStyles.blue_coachmapdetails,
    borderWidth: 1,
    ...LightFontStyle.fontMedium
  },
  competitor: {
    fontSize: 14,
    fontWeight: '400',
    color: ColorStyles.light_black
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
    backgroundColor: ColorStyles.colorPrimary,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  modalHeaderText: {
    fontSize: 16,
    color: ColorStyles.white,
    marginLeft: 10,
    padding: 8
  },
  modalContent: {
    backgroundColor: 'white',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: Dimensions.get('window').width * 8 / 9,
    height: Dimensions.get('window').height * -60,
  },
  headerText: {
    color: ColorStyles.black,
    paddingLeft: 15,
    paddingTop: 8,
    paddingBottom: 8,
    fontWeight: '500',
    fontSize: 15
  },
  secondaryTitle: {
    marginTop: 5
  },
  popupButtonContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    flex: 1,
    width: Dimensions.get('window').width * 8 / 9,
  },
  popupLeftButton: {
    backgroundColor: ColorStyles.gray,
    flex: 1
  },
  popupRightButton: {
    backgroundColor: ColorStyles.colorPrimary,
    flex: 1
  },
  popupButtonText: {
    fontSize: 18,
    color: ColorStyles.white,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    textAlign: 'center'
  },
  product: {
    color: ColorStyles.gray_light_1,
    fontSize: 15
  },
  brandModalHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  checkbox: {
    alignItems: 'flex-end',
    marginRight: 5,
    marginTop: 5
  },
  brandIcon: {
    marginLeft: 10,
    flexDirection: 'row'
  },
  brand: {
    color: ColorStyles.white,
    paddingLeft: 15,
    paddingTop: 8,
    paddingBottom: 8,
    fontWeight: '500',
    fontSize: 15
  },

};
