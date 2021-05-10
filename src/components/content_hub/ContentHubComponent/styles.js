import Colors from '../../../styles/colorsStyles';

export default {
  container: {
    backgroundColor: Colors.white,
  },
  brandHeading: {
    fontSize: 20,
    fontWeight: '500',
    paddingHorizontal: 20,
    marginLeft: 15,
  },
  brandRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.dividerColor,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginLeft: 15,
  },
  brandRowIcon: {
    color: Colors.secondaryText,
    fontSize: 16,
    marginRight: 10,
  },
  caseStudyHeading: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 20,
    paddingHorizontal: 20,
    marginLeft: 15,
    marginBottom: 25,
  },
  caseStudyContainer: {
    marginBottom: 25,
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
    marginLeft: 10,
    marginTop: 10,
    color: Colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentDesc: {
    marginLeft: 10,
    marginTop: 5,
    color: Colors.black,
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    marginHorizontal: 15,
    flexDirection: 'column',
    textAlign: 'center',
  },
  contentDescView: {
    marginTop: 10,
  },
  noData: {
    marginTop: 25,
    justifyContent: 'center',
    textAlign: 'center'
  },
  headingContainer: {
    marginTop: 25,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  specialityButton: {
    borderWidth: 1,
    borderColor: Colors.dividerColor,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
  },
  specialityButtonText: {
    fontSize: 16,
    color: Colors.gray
  },
  specialityButtonIcon: {
    height: 10,
    width: 10,
    marginLeft: 15,
    tintColor: Colors.gray,
  },
};
