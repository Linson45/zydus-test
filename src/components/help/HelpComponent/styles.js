import { StyleSheet } from 'react-native';
import Colors from '../../../styles/colorsStyles';

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    minWidth: 250,
    fontSize: 16,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderColor: Colors.dividerColor,
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    minWidth: 250,
    fontSize: 16,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderColor: Colors.dividerColor,
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default {
  container: {
    marginHorizontal: 30,
  },
  categoryRow: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerHeading: {
    marginBottom: 10,
    fontSize: 14,
    color: Colors.black,
  },
  picker: pickerSelectStyles,
  queryHeading: {
    marginTop: 25,
    marginBottom: 10,
    fontSize: 14,
    color: Colors.black,
  },
  notesInput: {
    height: 80,
    borderColor: Colors.dividerColor,
    borderWidth: 1,
    width: '100%',
    padding: 10,
    borderRadius: 5,
    paddingVertical: 15,
  },
  buttons: {
    marginTop: 25,
    justifyContent: 'flex-end',
    flex: 1,
    flexDirection: 'row'
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
  loader: {
    marginTop: 50,
  },
  queryRow: {
    flex: 1,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.dividerColor,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginLeft: 15,
  },
  queryTitle: {
    fontSize: 16,
  },
  queryRowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  queryRowSubContainer: {
    flex: 1,
  },
  category: {
    fontSize: 16,
    marginTop: 5,
  },
  date: {
    fontSize: 14,
    marginTop: 5,
  },
  status: {
    textAlign: 'right',
    fontSize: 16,
  }
};
