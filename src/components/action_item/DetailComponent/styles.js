import { Dimensions } from 'react-native';
import ColorStyles from '../../../styles/colorsStyles';

export default {
  top: {
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20
  },
  heading: {
    borderLeftColor: ColorStyles.blue_light,
    borderLeftWidth: 5,
    paddingLeft: 10
  },
  id: {
    marginTop: 20,
    fontSize: 12,
    color: ColorStyles.gray_light_1
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
  rootHeading: {
    fontSize: 13,
    marginTop: 15
  },
  root: {
    fontSize: 13,
    marginTop: 5,
    color: ColorStyles.gray_light_1
  },
  deadline: {
    fontSize: 12,
    marginTop: 10,
    color: ColorStyles.gray_light_1
  },
  statusView: {
    marginTop: 10,
    flexDirection: 'row'
  },
  assignedTopView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20
  },
  assignHeading: {
    fontSize: 13,
  },
  assign: {
    fontSize: 14,
    color: ColorStyles.gray_light_1,
  },
  comments: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15
  },
  commentDate: {
    fontSize: 10,
    color: ColorStyles.gray_light_1
  },
  commentStatus: {
    marginTop: 10,
    fontSize: 12,
    color: ColorStyles.gray
  },
  commentName: {
    marginTop: 5,
    fontSize: 14,
    color: ColorStyles.gray_light_1
  },
  editButton: {
    marginLeft: 5,
    color: ColorStyles.gray,
    fontSize: 22
  },
  button: {
    justifyContent: 'center',
    marginTop: 10,
    width: Dimensions.get('window').width * 2 / 3
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    margin: 5,
  },
};
