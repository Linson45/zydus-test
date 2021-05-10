import { Toast } from 'native-base';

export default class Toaster {
  static show(message) {
    Toast.show({
      text: message,
      duration: 2000,
      position: 'bottom',
      textStyle: { textAlign: 'center' }
    });
  }
}
