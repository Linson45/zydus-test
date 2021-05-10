import color from '../../Constants/colorConstants';

export default {
  container: {
    backgroundColor: color.WhiteColor,
    width: 100,
    height: 150,
    paddingLeft: 15,
    borderRadius: 10,
    shadowColor: color.ShadowColor,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    elevation: 2
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    marginTop: 15
  },
  scoreText: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 5
  },
  score: {
    color: color.LightColorText
  },

};
