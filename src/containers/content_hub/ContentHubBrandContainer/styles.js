import Colors from '../../../styles/colorsStyles';

export default {
  up: {
    height: 20,
    tintColor: Colors.contentBlue,
    width: 20,
    marginRight: 20,
  },
  filterHeaderContainer: {
    padding: 20,
    borderBottomWidth: 0.8,
    borderBottomColor: Colors.dividerColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterHeading: {
    fontSize: 18,
    fontWeight: '600',
  },
  filterClose: {
    fontSize: 16,
    color: Colors.contentBlue,
  },
  documentType: {
    fontSize: 18,
    paddingLeft: 20,
    paddingTop: 20,
    fontWeight: '600',
  },
  filterItem: {
    alignItems: 'center',
    flexDirection: 'row',
    fontSize: 16,
    paddingLeft: 20,
    paddingTop: 10,
  },
  filterItemText: {
    fontSize: 16,
  },
  filterFooterContainer: {
    alignItems: 'center',
    marginBottom: 50,
    padding: 20,
    paddingBottom: 50,
    borderTopWidth: 0.8,
    borderTopColor: Colors.dividerColor,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  applyButton: {
    backgroundColor: Colors.contentBlue,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  applyButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
  clearAllText: {
    marginRight: 15,
    color: Colors.contentBlue,
    fontSize: 16,
  },
};
