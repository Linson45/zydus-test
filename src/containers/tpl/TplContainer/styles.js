import color from '../../../Constants/colorConstants';
import size from '../../../Constants/sizeConstants';

export default {
  container: {
    backgroundColor: color.WhiteColor,
    color: 'white',
    // height:'95%',
    // flex:1
  },
  innerTopContainer: {
    width: '100%',
    height: '33%',
    justifyContent: 'space-between',
  },
  monthContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    height: 32,
    paddingTop: 10,
    paddingRight: 10
  },
  icon: {
    resizeMode: 'contain',
    width: size.iconWidth,
    height: size.iconHeight
  },
  iconLabel: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    marginRight: 10
  },
  extraBoldText: {
    color: color.LeaderBoardColor,
    fontSize: 30,
    fontWeight: '900',
  },
  headingContainer: {
    paddingLeft: 20,
    justifyContent: 'space-between',
    height: 60
  },
  positionText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '300',
    marginRight: 10
  },
  rankHeaderContainer: {
    height: 32,
    marginTop: 10,
    paddingLeft: 20,
    justifyContent: 'center'
  },
  rankHeader: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
    marginRight: 10
  },
  rankContainer: {
    marginTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  teamScoreContainer: {
    width: '90%',
    marginLeft: 15,
  },
  teamScoreBgImage: {
    height: 80,
    resizeMode: 'contain',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 40,
  },
  yourScoreBgImage: {
    alignItems: 'flex-start',
    paddingLeft: 40,
  },
  winnerBgImage: {
    height: 50,
    resizeMode: 'contain',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 40
  },
  yellowText: {
    color: color.LeaderBoardColor
  },
  scoreDetailsContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 150,
    paddingLeft: 15,
    paddingRight: 15,
    alignItem: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  scoreDetailDiv: {
    width: '32%',
    // height:150,
    alignItems: 'center',
    justifyContent: 'space-around',
    // marginRight:4,
  },
  score: {
    flexDirection: 'row'
  },
  centerText: {
    textAlign: 'center',
    fontSize: 12,
  },
  scoreContainer: {
    height: 80,
    width: '100%',
    backgroundColor: color.YellowDark,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 22,
    borderRadius: 5,
    // paddingRight:20
  }
};
