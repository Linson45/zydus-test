import colorsStyles from '../../../styles/colorsStyles';

export default {
  container: {
    flex: 1,
  },
  endButton: {
    position: 'absolute',
    right: 50,
    top: 50,
    backgroundColor: '#FF647C',
    padding: 10,
    borderRadius: 5,
  },
  preViewOverlay: {
    position: 'absolute',
    top: 100,
    right: 50,
  },
  previewText: {
    color: colorsStyles.gray_login,
    fontSize: 100,
  },
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
    marginHorizontal: 25,
  },
  buttonDesign: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorsStyles.ProgressBarBackground,
    borderRadius: 10
  },
  buttonDesignText: {
    fontSize: 10,
    marginVertical: 5,
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
  }
};
