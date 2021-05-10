import colorsStyles from '../../../styles/colorsStyles';

export default {
  buttonTextContainer: {
    position: 'absolute',
    bottom: 135,
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonContentDesign: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContentDesignText: {
    width: '100%',
    flex: 1,
    position: 'absolute',
    top: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  rowText: {
    fontSize: 12,
    color: colorsStyles.white
  },
  buttonDesign: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorsStyles.ProgressBarBackground,
    borderRadius: 5
  },
  buttonDesignText: {
    fontSize: 10,
    marginVertical: 5,
    color: colorsStyles.gray_light_1
  },
  buttonDesignTextRed: {
    color: colorsStyles.pink
  },
  buttonDesignTextGreen: {
    color: colorsStyles.green
  }
};
