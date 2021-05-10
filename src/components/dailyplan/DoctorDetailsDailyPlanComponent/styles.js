import Colors from '../../../styles/colorsStyles';

export default {
  headerContainer: {
    padding: 15,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
  },
  doctorSpec: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginTop: 5,
  },
  headerActions: {
    marginTop: 15,
    flex: 1,
    flexDirection: 'row',
  },
  headerLeft: {
    flex: 0.6
  },
  headerRight: {
    flex: 0.4,
    alignItems: 'flex-end',
  },
  row: {
    flexDirection: 'row',
  },
  visits: {
    fontSize: 13,
    fontWeight: '600',
    marginRight: 10,
  },
  last3Month: {
    fontSize: 13,
    color: Colors.colorPrimary,
  },
  dates: {
    marginTop: 10,
    fontSize: 13,
    marginRight: 10,
    color: Colors.secondaryText,
  },
  rcpa: {
    color: Colors.colorPrimary,
    fontWeight: '500',
  },
  gspViewContainer: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.dividerColor,
    borderTopWidth: 0.3,
    borderTopColor: Colors.dividerColor,
    paddingLeft: 10,
    paddingRight: 10,
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
  blank: {
    height: 15,
    backgroundColor: '#F4F4F9',
  },
  brandsContainer: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.dividerColor,
    borderTopWidth: 0.3,
    borderTopColor: Colors.dividerColor,
  },
  brandLeft: {
    flex: 0.8,
  },
  brandRight: {
    flex: 0.2,
    alignItems: 'flex-end',
  },
  brandHeading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  brands: {
    fontSize: 14,
  },
  viewAll: {
    color: Colors.colorPrimary,
    fontWeight: '500',
  },
  contentContainer: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.dividerColor,
    borderTopWidth: 0.3,
    borderTopColor: Colors.dividerColor,
  },
  contentLeft: {
    flex: 0.7,
  },
  contentRight: {
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  startDetailingIcon: {
    color: Colors.contentBlue,
    height: 16,
    width: 20,
    marginRight: 5,
  },
  selectContentButton: {
    color: Colors.contentBlue,
    marginRight: 15,
  },
  contentHeading: {
    fontSize: 14,
    marginBottom: 10,
  },
  historyContainer: {
    flex: 1,
    padding: 15,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.dividerColor,
    borderTopWidth: 0.3,
    borderTopColor: Colors.dividerColor,
  },
  historyHeading: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: '600',
  },
  historySharedContainer: {
    marginBottom: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historySharedLastShared: {
    color: '#666666',
    fontSize: 16,
  },
  viewSharedHistory: {
    color: Colors.contentBlue,
    fontSize: 16,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '500',
  },
  displayView: {
    marginTop: 10,
    flexDirection: 'row',
  },
  displayClock: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  displayTime: {
    color: Colors.black,
    fontSize: 16,
  },
  brand: {
    flex: 1,
    textAlign: 'center',
  },
  detailingType: {
    flex: 1,
    textAlign: 'right',
  },

  commentContainer: {
    padding: 15,
    borderTopWidth: 0.3,
    borderTopColor: Colors.dividerColor,
  },
  commentHeading: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '600',
  },
  comment: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: Colors.dividerColor,
  },
  commentDate: {
    fontSize: 14,
    color: Colors.secondaryText,
  },
  commentNote: {
    fontSize: 16,
    marginTop: 5,
  },
  doctorMetContainer: {
    padding: 15,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.dividerColor,
    borderTopWidth: 0.3,
    borderTopColor: Colors.dividerColor,
  },
  doctorMetHeading: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 15,
  },
  doctorToggle: {
    borderColor: Colors.blue,
    borderWidth: 1
  },
  doctorNotesHeading: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 15,
    marginBottom: 15,
  },
  notesInput: {
    height: 80,
    borderColor: Colors.dividerColor,
    borderWidth: 1,
    width: '100%',
    padding: 10,
    borderRadius: 5
  },

  submitButtonContainer: {
    marginTop: 10,
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  submitButton: {
    paddingVertical: 15,
    backgroundColor: Colors.contentBlue,
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingLeft: 75,
    paddingRight: 75,
  },
  submitButtonText: {
    fontSize: 16,
    color: Colors.white,
  },
  doctorMetHeadingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  chart: {
    width: '100%',
    marginTop: 25,
    marginBottom: 25,
    backgroundColor: '#fff',
    height: 300
  },
};
