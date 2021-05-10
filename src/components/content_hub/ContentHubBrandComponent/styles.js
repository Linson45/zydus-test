import Colors from '../../../styles/colorsStyles';

export default {
  contentTypeHeadingContainer: {
    paddingHorizontal: 20,
    marginHorizontal: 15,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentTypeHeading: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 10,
  },
  contentTypeSeeAll: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.contentBlue,
    marginVertical: 10,
  },
  contentThumbnail: {
    marginLeft: 10,
    width: 205,
    height: 154,
    borderWidth: 1,
    borderColor: Colors.dividerColor,
    borderRadius: 2,
  },
  contentTitle: {
    marginTop: 10,
    color: Colors.black,
    fontSize: 16,
    fontWeight: 'bold',
    width: 140,
  },
  content: {
    marginTop: 25,
    marginHorizontal: 10,
    flexDirection: 'column',
    textAlign: 'center',
  },
  contentDescView: {
    marginLeft: 10,
  },
  expandedContents: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 15,
  },
  unExpandedContents: {
    marginHorizontal: 15,
  },
};
