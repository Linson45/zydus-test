import Colors from '../../../styles/colorsStyles';

export default {
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.contentBlue,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    color: Colors.white,
  },
  headerClose: {

  },
  headerCloseText: {
    fontSize: 16,
    color: Colors.white,
  },
  messages: {
    marginBottom: 20,
  },
  message: {
    alignSelf: 'flex-start',
    margin: 5,
    maxWidth: '80%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: '#F3F3F3',
    alignItems: 'center'
  },
  self: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end'
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gray,
  },
  text: {
    marginLeft: 10,
    paddingLeft: 10,
    fontSize: 16,
    color: Colors.gray,
  },
  time: {
    marginLeft: 10,
    fontSize: 12,
    color: Colors.gray,
  },
  bottomView: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  textInput: {
    borderRadius: 5,
    marginHorizontal: 20,
    padding: 10,
    borderColor: Colors.dividerColor,
    borderWidth: 0.3,
    marginBottom: 5,
    fontSize: 16,
    flex: 1,
  },
  sendButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  sendButtonText: {
    fontSize: 16,
    color: Colors.contentBlue,
  }
};
