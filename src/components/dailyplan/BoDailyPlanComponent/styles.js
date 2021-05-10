import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Colors from '../../../styles/colorsStyles';

export default {
  container: {
    backgroundColor: Colors.white,
  },
  loader: {
    marginTop: 50,
  },
  calendar: {
    height: 120,
    paddingTop: 5,
    paddingBottom: 5
  },
  calendarHeader: {
    color: '#000',
    marginTop: 10,
    fontSize: 18,
  },
  calendarDateName: {
    backgroundColor: '#7C3AA1',
    width: 35,
    paddingTop: 10,
    color: '#fff',
  },
  calendarDateNumber: {
    backgroundColor: '#7C3AA1',
    width: 35,
    paddingBottom: 10,
    color: '#fff',
  },
  locationContainer: {
    padding: 10,
    backgroundColor: '#F4F4F9',
    flexDirection: 'row'
  },
  locationName: {
    flex: 1,
    margin: 5,
    fontSize: 16,
    color: '#302E8F',
    fontWeight: 'bold',
  },
  hotspots: {
    flex: 0.5,
    textAlign: 'right',
    margin: 5,
    fontSize: 16,
    color: Colors.red,
  },
  gspViewContainer: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.dividerColor,
  },
  gspContainer: {
    padding: 10,
    flex: 1,
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rcpaContainer: {
    padding: 10,
    flex: 1,
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gspValue: {
    fontSize: 20,
    color: '#7C3AA1',
    fontWeight: 'bold',
  },
  gspSub: {
    marginLeft: 5,
    fontSize: 14,
    color: Colors.secondaryText,
  },
  doctorPlannedHeadingContainer: {
    marginTop: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
  },
  doctorPlannedHeading: {
    fontSize: 15,
    fontWeight: '500',
  },
  topJfwLabel: {
    backgroundColor: Colors.orange,
    color: Colors.black,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
    padding: 5
  },
  doctorRow: {
    paddingTop: 20,
    paddingBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.dividerColor,
  },
  doctor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  doctorLeft: {
    flex: 0.5,
  },
  doctorLeftLandscape: {
    flex: 0.4,
    flexDirection: 'row',
  },
  doctorLeftLandscapeName: {
    flex: 0.6,
    flexDirection: 'column',
  },
  doctorLeftLandscapeGsp: {
    flex: 0.5,
    marginLeft: 25,
    flexDirection: 'row',
  },
  doctorRight: {
    alignItems: 'flex-start',
    textAlign: 'right',
    flex: 0.5,
  },
  rcpaRight: {
    alignItems: 'flex-end',
    textAlign: 'right',
    flex: 0.5,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '500',
  },
  doctorSpec: {
    marginTop: 8,
    fontSize: 16,
    color: Colors.secondaryText,
  },
  doctorGsp: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  doctorGspLandscape: {
    fontSize: 16,
    fontWeight: '500',
  },
  startDetailingButton: {
    borderColor: Colors.contentBlue,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
  },
  startDetailingText: {
    fontSize: 16,
    color: Colors.contentBlue,
  },
  startDetailingButtonDisabled: {
    borderColor: Colors.gray_light_1,
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
  },
  startDetailingTextDisabled: {
    fontSize: 16,
    color: Colors.gray_light,
  },
  startDetailingIcon: {
    height: 16,
    width: 20,
    marginRight: 5,
  },
  selectContentButton: {
    paddingTop: 5,
    paddingBottom: 5,
    color: Colors.contentBlue,
    marginBottom: DeviceInfo.isTablet() ? 5 : 15,
    marginRight: DeviceInfo.isTablet() ? 15 : 0,
    flexDirection: 'row',
  },
  row: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  contentContainer: {
    flexDirection: 'row',
    marginTop: 25,
    marginBottom: 25,
  },
  content: {
    flexDirection: 'column',
    textAlign: 'center',
  },
  contentThumbnail: {
    marginLeft: 10,
    width: (Dimensions.get('window').width / 4) - 25,
    height: 120,
    borderWidth: 1,
    borderColor: Colors.dividerColor,
    borderRadius: 2,
  },
  contentTitle: {
    marginTop: 10,
    textAlign: 'center',
  },
  blank: {
    height: 15,
    backgroundColor: '#F4F4F9',
  },
  moreIcon: {
    height: 20,
    width: 20,
    marginLeft: 15,
    paddingTop: 5,
    paddingBottom: 5,
    tintColor: Colors.contentBlue,
    marginBottom: DeviceInfo.isTablet() ? -15 : 15,
  },
  cancelButton: {
    fontSize: 18,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: Colors.gray,
  },
  moreIconDisabled: {
    tintColor: Colors.secondaryText,
    height: 20,
    width: 20,
    marginLeft: 15,
  },
  virtualCallScheduleText: {
    fontSize: 16,
    color: Colors.contentBlue,
  },
  virtualCallScheduleIcon: {
    height: 16,
    width: 20,
    marginRight: 5,
  },
  virtualCallScheduleButton: {
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: DeviceInfo.isTablet() ? 5 : 15,
    marginRight: DeviceInfo.isTablet() ? 30 : 0,
    flexDirection: 'row',
  },
  virtualCallButtonRow: {
    color: Colors.contentBlue,
    marginBottom: DeviceInfo.isTablet() ? 5 : 15,
    marginRight: DeviceInfo.isTablet() ? 30 : 0,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  virtualCallTime: {
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 16,
    color: Colors.gray,
    marginRight: 15,
  },
  virtualCallJoinButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,

    backgroundColor: Colors.contentBlue,
    borderRadius: 5,
  },
  virtualCallJoinText: {
    fontSize: 16,
    color: Colors.white,
  },
};
