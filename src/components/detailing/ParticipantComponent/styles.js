import { Dimensions } from 'react-native';
import colorsStyles from '../../../styles/colorsStyles';

export default {
  container: {
    // alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
    margin: 25,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: Dimensions.get('window').width - 50,
    maxWidth: 650,
  },
  row: {
    paddingHorizontal: 10,
    paddingTop: 10,
    flexDirection: 'row',
  },
  rowText: {
    fontSize: 16,
    fontWeight: '500',
    color: colorsStyles.black
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
    color: colorsStyles.black,
    fontSize: 20,
    marginRight: 15,
  },
  closeIcon: {
    color: colorsStyles.secondaryText,
  },
};
