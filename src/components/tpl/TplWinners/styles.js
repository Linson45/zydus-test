import Colors from '../../../Constants/colorConstants';

export default {
  container: {
    height: '100%',
    width: '100%'
  },
  winningCup: {
    width: null,
    height: 150,
    margin: 15,
    resizeMode: 'contain'
  },
  headerContainer: {
    alignItems: 'center'
  },
  textContainer: {
    backgroundColor: Colors.YellowDark,
    padding: 5,
    marginTop: -21,
    borderRadius: 5
  },
  text: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '700'
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    marginLeft: 20
  },
  cardInternalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  cardOuter: {
    backgroundColor: Colors.WhiteColor,
    width: '30%',
    height: 150,
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginTop: 15,
    marginLeft: 5,
    marginRight: 5
  },
  cardImageSection: {
    backgroundColor: Colors.WhiteColor,
    width: '100%',
    height: 125,
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  image: {
    width: 60,
    height: 60,
    margin: 15
  },
  name: {
    fontSize: 11,
    textAlign: 'center'
  },
  cardFooter: {
    backgroundColor: '#074BA1',
    width: '100%',
    height: 30,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scoreLabel: {
    flexDirection: 'row'
  },
  score: {
    color: Colors.YellowDark
  }
};
