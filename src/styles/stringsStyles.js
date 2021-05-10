import { Platform } from 'react-native';

export default {
  ...Platform.select({
    android: {
      regular: 'Amazon-Ember-Regular',
      light: 'Roboto-Light',
      black: 'Nunito-Black',
      bold: 'Nunito-Bold',
      extraBold: 'Nunito-ExtraBold',
      extraLight: 'Nunito-ExtraLight',
      nLight: 'Nunito-Light',
      medium: 'Nunito-Medium',
      nRegular: 'Nunito-Regular',
      semiBold: 'Nunito-SemiBold',
    }
  })
};
