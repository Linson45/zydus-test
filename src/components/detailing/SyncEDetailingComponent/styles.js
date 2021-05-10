import Colors from '../../../styles/colorsStyles';

export default {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    marginTop: 50,
    fontSize: 13,
    color: Colors.gray,
  },
  syncButton: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.contentBlue,
    padding: 10,
    borderRadius: 5,
  },
  syncingButton: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.contentBlue,
    opacity: 0.5,
    padding: 10,
    borderRadius: 5,
  },
  syncButtonText: {
    color: Colors.white
  },
  syncingDesc: {
    color: Colors.gray,
    fontSize: 12,
    marginTop: 25,
  }
};
