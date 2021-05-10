import { Dimensions } from 'react-native';
import Colors from '../../../styles/colorsStyles';

export default {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: Dimensions.get('window').width - 50,
    maxWidth: 650,
    maxHeight: Dimensions.get('window').height * 4 / 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#F3F3F3',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerHeading: {
    fontWeight: '500',
    fontSize: 22,
  },
  headingIcon: {
    color: Colors.black,
    fontSize: 20,
    marginRight: 15,
  },
  closeIcon: {
    color: Colors.secondaryText,
  },
  bottomContainer: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 0.5,
    borderColor: Colors.dividerColor,
  },
  submitButton: {
    marginRight: 25,
    borderWidth: 1,
    borderColor: Colors.contentBlue,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  submitButtonText: {
    fontSize: 18,
    color: Colors.contentBlue,
  },
  nextButton: {
    borderWidth: 1,
    borderColor: Colors.contentBlue,
    backgroundColor: Colors.contentBlue,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  nextButtonText: {
    fontSize: 18,
    color: Colors.white,
  },
  doctorContainer: {
    marginLeft: 5,
    flexDirection: 'column',
  },
  doctorRow: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.dividerColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorName: {
    fontSize: 16,
  },
  doctorSpec: {
    marginTop: 5,
    fontSize: 15,
    color: Colors.secondaryText,
  },
  practiceContainer: {
    backgroundColor: '#E2E1EE',
    paddingVertical: 15,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  radioLabel: {
    marginRight: 25
  },
  searchBox: {
    borderWidth: 0.3,
    borderColor: Colors.dividerColor,
    marginHorizontal: 25,
    marginVertical: 10,
    padding: 15,
    borderRadius: 5,
    fontSize: 16,
  }
};
