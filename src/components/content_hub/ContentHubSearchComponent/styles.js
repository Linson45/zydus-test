import Colors from '../../../styles/colorsStyles';

export default {
  headerContainer: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingLeft: 10,
    alignItems: 'center',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.dividerColor,
  },
  back: {
    height: 30,
    tintColor: Colors.black,
    width: 30,
    marginRight: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  search: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.contentBlue,
    borderRadius: 5,
    marginRight: 50,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 18,
  },
  searchCancel: {
    fontSize: 16,
    marginRight: 25,
    color: Colors.contentBlue,
  },
  blank: {
    height: 20,
    backgroundColor: '#F4F4F9',
  },
  rowSearch: {
    paddingVertical: 15,
    paddingLeft: 25,
    flexDirection: 'row',
  },
  rowTitle: {
    fontSize: 16,
    color: Colors.black,
  },
  rowDesc: {
    marginLeft: 25,
    fontSize: 16,
    color: '#999999',
    fontStyle: 'italic',
  },
  recentSearchHeader: {
    paddingTop: 25,
    paddingBottom: 25,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recentSearchHeading: {
    fontSize: 16,
    fontWeight: '600',
  },
  recentSearchClear: {
    fontSize: 16,
    color: Colors.contentBlue,
  },
  rowSearchList: {
    fontSize: 16,
    color: Colors.black,
  },
  loading: {
    marginTop: 25,
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
  }
};
