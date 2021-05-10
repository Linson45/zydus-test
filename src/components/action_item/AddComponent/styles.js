import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../../styles/colorsStyles';

export default {
  topCard: {
    borderRadius: 10,
  },
  topButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 5,
    borderBottomWidth: 0.3,
    paddingLeft: 5,
    borderBottomColor: Colors.white
  },
  topSecondButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 5,
    borderBottomWidth: 0.3,
    paddingLeft: 5,
    borderBottomColor: Colors.white
  },
  topButtonText: {
    paddingLeft: 5,
    fontSize: 16,
    color: Colors.white
  },
  topButtonIcon: {
    color: Colors.white,
    fontSize: 16
  },
  form: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15
  },
  label: {
    fontSize: 13,
    marginBottom: 5,
    color: Colors.gray_light
  },
  input: {
    height: 80,
    borderColor: Colors.gray_light,
    borderWidth: 0.5,
    width: '100%',
    padding: 10,
    borderRadius: 10
  },
  pickerSelectStyles: StyleSheet.create({
    inputIOS: {
      marginTop: 15,
      marginLeft: 10,
      marginRight: 10,
      paddingBottom: 5,
      borderBottomWidth: 0.3,
      paddingLeft: 5,
      borderBottomColor: Colors.white
    },
    inputAndroid: {
      marginTop: 5,
      marginLeft: 10,
      marginRight: 10,
      paddingBottom: 5,
      borderBottomWidth: 0.3,
      paddingLeft: 5,
      borderBottomColor: Colors.white,
      paddingRight: 30, // to ensure the text is never behind the icon
    }
  }),
  icon: {
    marginTop: 15,
    marginRight: 15
  },
  button: {
    justifyContent: 'center',
    marginTop: 10,
    width: Dimensions.get('window').width * 2 / 3,
    borderRadius: 30,
    padding: 10
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    margin: 5,
  },
};
