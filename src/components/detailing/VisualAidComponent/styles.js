import { Dimensions } from 'react-native';
import Colors from '../../../styles/colorsStyles';

export default {
  imageContainer: {
    margin: 5,
  },
  image: {
    borderWidth: 1,
    borderColor: Colors.dividerColor,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  bottomView: {
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    bottom: 50,
  },
  bottomButtons: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  startButton: {
    width: Dimensions.get('window').width / 2 - 50,
    backgroundColor: Colors.contentBlue,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    text: {
      paddingVertical: 5,
      fontSize: 16,
      color: Colors.white,
    }
  },
  title: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
    textAlign: 'center',
  },
  titleInput: {
    borderRadius: 5,
    padding: 10,
    minWidth: 550,
    borderColor: Colors.dividerColor,
    borderWidth: 0.3,
    marginBottom: 15,
    fontSize: 16,
  },
  titleInputHeading: {
    fontSize: 12,
    marginBottom: 10,
  },
  iconButtonStyle: {
    padding: 5,
    alignItems: 'flex-end',
  },
  deleteIcon: {
    color: Colors.red,
    fontSize: 20,
  },
  addIcon: {
    color: Colors.contentBlue,
    fontSize: 20,
  },
  lockIcon: {
    color: Colors.contentBlue,
    fontSize: 20,
  }
};
