import colorsStyles from '../../../styles/colorsStyles';

export default {
  endButtonText: {
    color: '#fff',
    fontSize: 16,
  },
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
    zIndex: 9999999999,
    position: 'absolute',
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 50,
    backgroundColor: colorsStyles.ProgressBarBackground,
    bottom: 50,
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonContentDesign: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonDesign: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  buttonDesignText: {
    fontSize: 10,
    color: colorsStyles.gray_light_1
  },
  redButton: {
    backgroundColor: colorsStyles.pink
  },
  greenButton: {
    backgroundColor: colorsStyles.green
  },
  buttonDesignTextRed: {
    color: colorsStyles.pink
  },
  buttonDesignTextGreen: {
    color: colorsStyles.green
  },
  bottomIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  }
};
