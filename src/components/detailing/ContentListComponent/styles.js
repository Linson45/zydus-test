import Colors from '../../../styles/colorsStyles';

export default {
  container: {},

  noData: {
    marginTop: 25,
    justifyContent: 'center',
    textAlign: 'center'
  },

  item: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.dividerColor,
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  left: {
    flex: 0.4,
  },
  middle: {
    flex: 0.15,
  },
  right: {
    flex: 0.45,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
  },
  secondary: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginBottom: 2,
  },
  downloadButton: {
    color: Colors.contentBlue,
  },
  downloadedButton: {
    color: Colors.secondaryText,
  },
  progressText: {
    marginTop: 10,
    color: Colors.contentBlue,
  }
};
