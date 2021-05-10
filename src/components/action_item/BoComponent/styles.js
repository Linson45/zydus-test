import { Dimensions } from 'react-native';
import ColorStyles from '../../../styles/colorsStyles';

export default {
  container: {},
  headerImg: {
    width: '100%',
  },
  cardTopContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  cardBottomContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  card: {
    borderRadius: 5,
    borderLeftWidth: 5,
    width: Dimensions.get('window').width / 2 - 30
  },
  number: {
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: 10,
    marginTop: 10
  },
  numberText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
    marginTop: 5,
    marginBottom: 10,
    color: ColorStyles.gray_dark
  },
  listParent: {
    marginTop: 25
  },
  heading: {
    marginTop: 25,
    fontSize: 18,
    marginLeft: 15,
    color: ColorStyles.gray_light_1,
    fontWeight: '500'
  },
  noData: {
    marginTop: 25,
    justifyContent: 'center',
    textAlign: 'center'
  },
  rowHeading: {
    fontSize: 13
  },
  problemHeading: {
    fontSize: 13,
    marginTop: 10
  },
  problem: {
    fontSize: 13,
    marginTop: 5,
    color: ColorStyles.gray_light_1
  },
  deadline: {
    fontSize: 12,
    marginTop: 10,
    color: ColorStyles.gray_light_1
  },
  status: {
    fontSize: 15,
    marginTop: 10,
    color: ColorStyles.gray
  },
  lastRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  arrow: {
    fontSize: 16,
    color: ColorStyles.gray_light_1
  }
};
