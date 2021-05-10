import colorsStyles from '../../../styles/colorsStyles';
import { LightFontStyle } from '../../../styles/fontsStyles';

export default {
  mainView: {
    margin: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  topRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colorsStyles.dividerColor,
    borderRadius: 5,
    marginTop: 5,

  },
  leftTopRow: {
    flex: 0.7,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  rightTopRow: {
    flex: 0.3,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  rightTopRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  rightTopRowText: {
    color: colorsStyles.light_black,
    ...LightFontStyle.fontMedium
  },
  doctorName: {
    fontSize: 14,
  },
  doctorSPec: {
    fontSize: 12,
    color: colorsStyles.secondaryText,
    marginTop: 5,
  },
  search: {
    borderWidth: 1,
    borderColor: colorsStyles.dividerColor,
    borderRadius: 5,
    height: 35,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    marginBottom: 25,
  },
  buttonText: {
    backgroundColor: colorsStyles.colorPrimary,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    color: colorsStyles.white,
  }
};
