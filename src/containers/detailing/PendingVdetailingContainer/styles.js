import Colors from '../../../styles/colorsStyles';

export default {
  container: {
    flex: 1,
    backgroundColor: '#0D0D23',
  },
  content: {
    flex: 1,
    backgroundColor: '#0D0D23',
  },
  endButton: {
    position: 'absolute',
    right: 50,
    top: 50,
    backgroundColor: '#FF647C',
    padding: 10,
    borderRadius: 5,
  },
  preViewOverlay: {
    position: 'absolute',
    top: 100,
    right: 50,
  },
  previewText: {
    color: Colors.gray_login,
    fontSize: 100,
  },
  endButtonText: {
    color: '#fff',
    fontSize: 16,
  }
};
