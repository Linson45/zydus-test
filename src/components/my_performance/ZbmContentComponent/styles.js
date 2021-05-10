import DeviceInfo from 'react-native-device-info';
import Colors from '../../../styles/colorsStyles';

export default {
  container: {
    padding: 25,
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trendButton: {
    borderWidth: 1,
    borderColor: Colors.contentBlue,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  trendIcon: {
    height: 20,
    width: 25,
  },
  dateContainer: {
    flexDirection: 'row',
  },
  tdContainer: {
    marginRight: 20,
    borderWidth: 1,
    borderColor: Colors.contentBlue,
    borderRadius: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  tdText: {
    color: Colors.contentBlue,
  },
  tdContainerSelected: {
    marginRight: 20,
    borderWidth: 1,
    borderColor: Colors.contentBlue,
    backgroundColor: Colors.contentBlue,
    borderRadius: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  tdSelectedText: {
    color: Colors.white,
  },
  calendar: {
    paddingTop: 5,
    paddingBottom: 5,
    height: 25,
    width: 25,
  },
  heading: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 20,
  },
  tabletSales: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mobileSales: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primarySalesContainer: {
    marginTop: 10,
    flex: 1,
    borderTopWidth: 5,
    borderTopColor: '#308CE3',
    padding: 10,
    backgroundColor: '#F3F8FD',
    borderWidth: 1,
    borderColor: Colors.dividerColor,
    borderRadius: 5,
  },
  secondarySalesContainer: {
    marginTop: 10,
    marginLeft: 15,
    flex: 1,
    borderTopWidth: 5,
    borderTopColor: '#7167D1',
    padding: 10,
    backgroundColor: '#F7F6FC',
    borderWidth: 1,
    borderColor: Colors.dividerColor,
    borderRadius: 5,
  },
  rcpaSalesContainer: {
    marginTop: 10,
    marginLeft: DeviceInfo.isTablet() ? 15 : 0,
    flex: 1,
    borderTopWidth: 5,
    borderTopColor: '#9A3DD1',
    padding: 10,
    backgroundColor: '#F9F4FC',
    borderWidth: 1,
    borderColor: Colors.dividerColor,
    borderRadius: 5,
  },
  pcpmSalesContainer: {
    marginTop: 10,
    marginLeft: 15,
    flex: 1,
    borderTopWidth: 5,
    borderTopColor: '#00C48C',
    padding: 10,
    backgroundColor: '#F0FCF8',
    borderWidth: 1,
    borderColor: Colors.dividerColor,
    borderRadius: 5,
  },
  salesHeading: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  salesNumberContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  salesRs: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  salesNumber: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 24,
    fontWeight: 'bold',
  },
  salesPrimaryText: {
    color: '#308CE3',
  },
  salesSecondaryText: {
    color: '#7167D1',
  },
  salesRcpaText: {
    color: '#9A3DD1',
  },
  salesPcpmText: {
    color: '#00C48C',
  },

  salesTarget: {
    marginTop: 10,
    color: Colors.secondaryText,
    fontSize: 14,
  },
  primarySalesBottomContainer: {
    marginTop: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primarySalesChange: {
    textAlign: 'left',
    color: Colors.green,
  },
  primarySalesAch: {
    textAlign: 'right',
    color: Colors.black,
  },
  mcr: '#7167D1',
  mcrContainer: {
    height: 150,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.dividerColor,
    borderRadius: 5,
  },
  mcrText: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    color: '#7167D1',
  },
  tcfa: '#F79661',
  tcfaContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 15,
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.dividerColor,
    borderRadius: 5,
  },
  tcfaText: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    color: '#F79661',
  },
  rcpa: '#44C8B4',
  rcpaContainer: {
    height: 150,
    marginTop: 10,
    marginLeft: DeviceInfo.isTablet() ? 15 : 0,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.dividerColor,
    borderRadius: 5,
  },
  rcpaText: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    color: '#44C8B4',
  },
  callAverage: '#7B3AA1',
  callAverageContainer: {
    height: 150,
    marginTop: 10,
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.dividerColor,
    borderRadius: 5,
  },
  callAverageText: {
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
    color: '#7B3AA1',
  },
  effortValue: {
    fontWeight: '600',
    fontSize: 32,
    textAlign: 'center',
    color: '#2FAED9',
    marginTop: 15
  },
  effortText: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    color: Colors.black,
    marginTop: 15,
  },
  radius: 40,
  circleWidth: 8,
  shadowColor: '#d8dde2',
  white: '#fff',
  totalCallsContainer: {
    height: 250,
    padding: 10,
    marginTop: 25,
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.dividerColor,
    borderRadius: 5,
  },
  subHeading: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: '600',
  },
  totalCalls: {
    width: '100%',
    height: 200
  },
  avgTimeSpentContainer: {
    height: 250,
    padding: 10,
    marginTop: 25,
    marginLeft: 15,
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.dividerColor,
    borderRadius: 5,
  },
  detailingComplianceContainer: {
    height: 250,
    padding: 10,
    marginTop: 25,
    marginLeft: 15,
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.dividerColor,
    borderRadius: 5,
  },
  detailingCompliance: {
    marginTop: 25,
    color: Colors.content,
    marginLeft: 5,
    marginRight: 5,
    fontSize: 24,
    fontWeight: 'bold',
  },
  avgTimeSpentView: {
    marginTop: 25,
    flex: 1,
    flexDirection: 'row',
  },
  avgTimeSpentSubView: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  avgTimeSpentEDetailing: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  avgTimeSpentVirtualDetailing: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  avgTimeSpentMin: {
    marginLeft: 5,
    fontSize: 14,
    color: Colors.secondaryText
  },
  avgTimeSpentValue: {
    marginTop: 15,
    fontSize: 14,
    color: Colors.gray
  },
  eDetailignRow: {
    marginTop: 10,
    height: 3,
    backgroundColor: '#302E8F',
    width: 35
  },
  vDetailignRow: {
    marginTop: 10,
    height: 3,
    backgroundColor: '#9A5FDC',
    width: 35
  },
  brandWiseDetailingHeading: {
    marginTop: 25,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: '600',
  },
  specialityButton: {
    borderWidth: 1,
    borderColor: Colors.dividerColor,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 25,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  specialityButtonText: {
    fontSize: 16,
    color: Colors.gray
  },
  specialityButtonIcon: {
    height: 10,
    width: 10,
    marginLeft: 15,
    tintColor: Colors.gray,
  },
  brandWiseDetailingChart: {
    width: '100%',
    marginTop: 25,
    marginBottom: 25,
    backgroundColor: '#fff',
    height: 300
  },
};
