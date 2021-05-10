import { Dimensions } from 'react-native';
import Colors from '../../../styles/colorsStyles';

export default {
  thumbnailHeader: {
    width: Dimensions.get('window').width - 50,
    height: 275,
    margin: 25,
  },
  contentTitle: {
    margin: 25,
    fontSize: 22,
    fontWeight: 'bold',
  },
  contentDetailsContainer: {

  },
  bottomView: {
    flex: 1,
    flexDirection: 'row',
    bottom: 0,
    position: 'absolute',
    paddingBottom: 25,
    paddingTop: 25,
    justifyContent: 'center',
    marginHorizontal: 25,
  },
  bottomButtons: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  previewButton: {
    borderColor: Colors.contentBlue,
    borderWidth: 1,
    borderRadius: 5,
    flex: 0.5,
    padding: 10,
    alignItems: 'center',
    text: {
      fontSize: 16,
      color: Colors.contentBlue,
    }
  },
  startButton: {
    marginLeft: 25,
    backgroundColor: Colors.contentBlue,
    borderRadius: 5,
    padding: 10,
    flex: 0.5,
    alignItems: 'center',
    text: {
      fontSize: 16,
      color: Colors.white,
    }
  },
  startButtonDisabled: {
    marginLeft: 25,
    flex: 0.5,
    backgroundColor: '#C3C2BE',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    text: {
      fontSize: 16,
      color: '#666666',
      fontWeight: '500',
    }
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
  filterFooterContainer: {
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 0.8,
    borderTopColor: Colors.dividerColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  doctorRow: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.dividerColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorName: {
    fontSize: 16,
  },
  doctorSpec: {
    marginTop: 5,
    fontSize: 15,
    color: Colors.secondaryText,
  },
  checkboxes: {
    flexDirection: 'row',
  },
  checkboxRow: {
    paddingHorizontal: 20,
    borderBottomColor: Colors.dividerColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsContainer: {
    padding: 10,
    marginHorizontal: 25,
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: Colors.dividerColor,
    flexDirection: 'row',
  },
  detailsContainerBlock: {
    flex: 1,
  },
  smallHeading: {
    fontSize: 16,
  },
  detailsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  searchBox: {
    borderWidth: 0.3,
    borderColor: Colors.dividerColor,
    marginHorizontal: 25,
    marginVertical: 10,
    padding: 15,
    borderRadius: 5,
    fontSize: 16,
  }
};
