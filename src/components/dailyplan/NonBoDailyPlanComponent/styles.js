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
  pobContainer: {
    marginTop: 10,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  pob: {
    fontSize: 14,
    marginTop: 5,
  },
  date: {
    color: Colors.colorPrimary,
    fontSize: 14,
    marginTop: 5,
  },
  calendar: {
    color: Colors.colorPrimary,
    width: 25,
    height: 25,
    marginLeft: 5,
    marginRight: 5
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
    flex: 1,
    flexDirection: 'row',
  },
  doctorLeft: {
    flex: 0.5,
  },
  doctorRight: {
    alignItems: 'flex-end',
    textAlign: 'right',
    flex: 0.5,
  },
  doctorName: {
    fontSize: 14,
    fontWeight: '500',
  },
  doctorSpec: {
    marginTop: 5,
    fontSize: 13,
    color: Colors.secondaryText,
  },
  doctorGsp: {
    marginTop: 5,
    fontSize: 13,
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
  startDetailingIcon: {
    color: Colors.contentBlue,
    fontSize: 16,
    marginRight: 10,
  },
  selectContentButton: {
    color: Colors.contentBlue,
    marginBottom: 5,
    marginRight: 15,
    flexDirection: 'row',
  },
  row: {
    marginTop: 15,
    flexDirection: 'row',
  },
  tabs: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
  },
  tab: {
    borderTopColor: Colors.dividerColor,
    borderTopWidth: 0.3,
    borderBottomColor: Colors.dividerColor,
    borderBottomWidth: 0.3,
    paddingTop: 10,
    paddingBottom: 10,
    flex: 1,
    textAlign: 'center',
  },
  selectedTab: {
    borderBottomColor: Colors.colorPrimary,
    borderBottomWidth: 1.5,
  },
  tabText: {
    textAlign: 'center',
  },
  selectedTabText: {
    color: Colors.colorPrimary,
    borderBottomColor: Colors.colorPrimary,
    borderBottomWidth: 5,
    textAlign: 'center',
  },
  rcpaSubmitted: {
    marginTop: 10,
    fontSize: 12,
    color: Colors.green,
    fontWeight: '500',
  },
  rcpaPending: {
    marginTop: 15,
    fontSize: 16,
    color: Colors.orange,
  },

  boEffortContainer: {
    margin: 10,
    borderRadius: 2,
    borderWidth: 0.3,
    borderColor: Colors.dividerColor,
  },
  boEffortTopContainer: {
    flex: 1,
    backgroundColor: Colors.header_gray,
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boEffortTopValueContainer: {
    padding: 10,
    flex: 1,
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    value: {
      fontSize: 16,
      color: Colors.content,
    },
    subHeading: {
      fontSize: 12,
      color: Colors.secondaryText,
    }
  },
  boEffortValueContainer: {
    flex: 1,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ach: {
    fontSize: 10,
    textAlign: 'right',
    color: Colors.content,
  },
  divider: {
    borderBottomColor: Colors.dividerColor,
    borderBottomWidth: 0.5,
    margin: 10,
  },
  lastReporting: {
    fontSize: 12,
    color: Colors.secondaryText,
  },
  rank: {
    color: Colors.content,
  },
  actionItemContainer: {
    padding: 10,
    margin: 5,
    borderWidth: 0.3,
    borderColor: Colors.dividerColor,
    borderRadius: 2,
  },
  actionPlanHeading: {
    fontSize: 14,
  },
  actionPlanReasonContainer: {
    flexDirection: 'row',
  },
  actionPlanReason: {
    marginTop: 15,
    flex: 1,
  },
  actionPlanSubHeading: {
    fontSize: 10,
    color: Colors.secondaryText,
    marginBottom: 5,
  },
  actionPlanAssignedBy: {
    fontSize: 12,
    color: Colors.secondaryText,
    marginBottom: 5,
  },
  actionPlanRow: {
    flexDirection: 'row',
  },
  actionPlanDeadline: {
    color: Colors.colorPrimary,
    fontSize: 12,
    marginTop: 5,
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
  rowPlain: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
};
