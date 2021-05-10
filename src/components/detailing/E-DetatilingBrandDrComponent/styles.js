import { Dimensions } from 'react-native';
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
  selectContentButton: {
    color: Colors.contentBlue,
    marginRight: 25,
  },
  startDetailingButton: {
    backgroundColor: Colors.contentBlue,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    align: 'center',
    width: 150,
  },
  startDirectDetailing: {
    borderColor: Colors.contentBlue,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: 'flex-end',
    text: {
      fontSize: 16,
      color: Colors.contentBlue,
    }
  },
  startDetailingDisabledText: {
    padding: 10,
    alignItems: 'flex-end',
    fontSize: 16,
    color: Colors.secondaryText,
  },
  editText: {
    color: Colors.contentBlue,
    fontSize: 14
  },
  startDetailingText: {
    color: Colors.white,
    fontSize: 14,
    textAlign: 'center',
    icon: {
      color: Colors.contentBlue,
      fontSize: 14,
      marginRight: 10,
    }
  },
  addToShowCase: {
    color: Colors.white,
    fontSize: 14,
    textAlign: 'center',
  },
  besideImage: {
    marginLeft: 25,
    padding: 5,
    flex: 1,
    flexDirection: 'column',
  },
  vaName: {
    color: '#333',
    fontSize: 16,
  },
  durationText: {
    marginTop: 5,
    fontSize: 14,
    justifyContent: 'flex-end',
    color: Colors.secondaryText,
  },
  lastSharedBottonText: {
    fontSize: 14,
    justifyContent: 'flex-end',
    color: Colors.secondaryText,
  },
  left: {
    flex: 0.6,
    flexDirection: 'row'
  },
  right: {
    flexDirection: 'row',
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
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
  bottomView: {
    paddingBottom: 25,
    paddingTop: 25,
  },
  bottomButtons: {
    paddingTop: 15,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  topButtons: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  active: {
    borderColor: Colors.contentBlue,
    borderRadius: 5,
    borderBottomWidth: 2,
  },
  newButton: {
    width: Dimensions.get('window').width / 2 - 50,
    padding: 10,
    alignItems: 'center',
    text: {
      fontSize: 16,
      color: Colors.contentBlue,
    }
  },
  sharedHistoryButton: {
    marginLeft: 25,
    padding: 10,
    width: Dimensions.get('window').width / 2 - 50,
    alignItems: 'center',
    text: {
      fontSize: 16,
      color: Colors.contentBlue,
    }
  },
  previewButton: {
    width: Dimensions.get('window').width / 2 - 50,
    borderColor: Colors.contentBlue,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    text: {
      fontSize: 16,
      color: Colors.contentBlue,
      fontWeight: '600'
    }
  },
  startButton: {
    marginLeft: 25,
    width: Dimensions.get('window').width / 2 - 50,
    backgroundColor: Colors.contentBlue,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    text: {
      fontSize: 16,
      color: Colors.white,
    }
  },
  blank: {
    height: 15,
    backgroundColor: '#F4F4F9',
  },
  showcaseContainer: {
    paddingTop: 25,
    paddingHorizontal: 25,
  },
  showcaseHeading: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: '600',
  },
  showcase: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    backgroundColor: Colors.header_gray,
    borderRadius: 5,
  },
  showcaseThumbnail: {
    height: 75,
    width: 75,
  },
  showcaseRightView: {
    marginLeft: 15,
    marginRight: 15,
  },
  showcaseRemove: {
    marginTop: 10,
    flexDirection: 'row',
    text: {
      color: Colors.red,
      fontSize: 14,
    },
    icon: {
      color: Colors.red,
      fontSize: 14,
      marginRight: 5,
    }
  },
  row: {
    flexDirection: 'row',
  },
  imageTop: {
    width: 200,
    height: 120,
    borderWidth: 1,
    borderColor: Colors.dividerColor,
    borderRadius: 2,
  },
  dropDownView: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  dropDown: {
    borderRadius: 10,
    paddingHorizontal: 50,
    borderWidth: 1,
    borderColor: Colors.dividerColor,
    width: 250,
  },
  bottomButtonsPart: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  bottomButtonsRightPart: {
    paddingRight: 25,
    flexDirection: 'row',
  },
  previewButtonPart: {
    borderColor: Colors.contentBlue,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  startButtonPart: {
    marginLeft: 25,
    backgroundColor: Colors.contentBlue,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },

};
