import { Dimensions } from 'react-native';
import Colors from '../../../styles/colorsStyles';

export default {
  container: {
    paddingHorizontal: Dimensions.get('window').width / 4,
  },
  heading: {
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
    color: Colors.black,
    fontSize: 14,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderColor: Colors.borderContent,
    borderWidth: 1,
    borderRadius: 5,
  },
  addParticipantsContainer: {
    borderColor: Colors.contentBlue,
    marginTop: 20,
  },
  placeholder: {
    color: Colors.dividerColor,
  },
  dropdownIcon: {
    height: 15,
    width: 15,
    marginLeft: 15,
    tintColor: Colors.dividerColor,
  },
  addIcon: {
    height: 20,
    width: 20,
    marginLeft: 15,
    tintColor: Colors.contentBlue,
  },
  calendarIcon: {
    height: 20,
    width: 20,
    tintColor: Colors.gray,
  },
  subjectInput: {
    color: Colors.black,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: Colors.borderContent,
  },
  disabledContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#F3F3F3',
    paddingVertical: 15,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  halfContainer: {
    flex: 0.5,
  },
  participantContainer: {
    marginTop: 10,
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#F3F3F3',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  participantName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  participantEmail: {
    fontSize: 16,
    marginBottom: 5,
  },
  participantRemove: {
    color: Colors.red,
    fontSize: 16,
  },
  bottomView: {
    paddingBottom: 25,
    paddingTop: 25,
  },
  bottomButtons: {
    marginLeft: 50,
    marginRight: 50,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  startButton: {
    flex: 0.5,
    borderColor: Colors.contentBlue,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    color: Colors.contentBlue,
  },
  scheduleButton: {
    flex: 0.5,
    marginLeft: 25,
    backgroundColor: Colors.contentBlue,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  scheduleButtonText: {
    fontSize: 16,
    color: Colors.white,
  }
};
