import RNFirebase from 'react-native-firebase';

class Firebase {
    static firebaseApp = RNFirebase.initializeApp({ debug: false });

    static setScreen(screenname) {
      try {
        this.firebaseApp.analytics().setCurrentScreen(screenname, screenname);
      } catch (e) {

      }
    }

    static pushEvent(event_name, params = {}) {
      try {
        this.firebaseApp.analytics().logEvent(event_name, params);
      } catch (e) {

      }
    }
}

export default Firebase;
