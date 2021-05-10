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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#FFF',
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
  optionsContainer: {
    paddingVertical: 20,
    backgroundColor: '#FFF',
  },
  question: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 25,
  },
  subjective: {
    height: 120,
    borderRadius: 5,
    padding: 10,
    borderWidth: 0.3,
    borderColor: Colors.dividerColor,
  },
  star: {
    width: 350,
  },
  radioGroup: {
    flexWrap: 'wrap'
  },
  radioLabel: {
    marginRight: 25
  }
};
