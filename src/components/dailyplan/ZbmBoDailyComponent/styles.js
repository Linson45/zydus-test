import Colors from '../../../styles/colorsStyles';
import { LightFontStyle } from '../../../styles/fontsStyles';

export default {
  topRow: {
    flexDirection: 'row',
  },
  rightTopRow: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  rightTopRowTextContainer: { justifyContent: 'center', alignItems: 'center' },
  rightTopRowContainer: { flexDirection: 'row', justifyContent: 'center' },
  rightTopRowText: {
    color: Colors.light_black,
    ...LightFontStyle.fontMedium
  },
  date_heading: {
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: 'center',
    color: Colors.gray_dark
  },
  secondaryTitle: {
    marginTop: 5
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
  container: {
    backgroundColor: Colors.white,
  },
  loader: {
    marginTop: 50,
  },
  calendar: {
    height: 100,
    paddingTop: 5,
    paddingBottom: 5
  },
  calendarHeader: {
    color: '#000',
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
  otherMembersContainer: {
    marginTop: 10,
    padding: 10,
  },
  otherMembersHeading: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 10,
    marginBottom: 20,
  },
  doctorView: {
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.dividerColor,
  },
  doctorLeft: {
    flex: 0.6,
  },
  doctorRight: {
    flex: 0.4,
    alignItems: 'flex-end'
  },
  boName: {
    fontSize: 14,
    fontWeight: '500',
  },
  boHq: {
    marginTop: 5,
    fontSize: 13,
    color: Colors.secondaryText,
  },
  visits: {
    fontSize: 14,
    fontWeight: '500',
  },
  blank: {
    height: 15,
    backgroundColor: '#F4F4F9',
  },

  jfwView: {
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    borderTopWidth: 0.3,
    borderTopColor: Colors.dividerColor,
  },
  jfwLeft: {
    flex: 0.5,
  },
  jfwRight: {
    flex: 0.5,
    alignItems: 'flex-end',
  },
  topJfwLabel: {
    backgroundColor: Colors.orange,
    color: Colors.black,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 10,
    padding: 5
  },
  row: {
    flexDirection: 'row',
  }
};
