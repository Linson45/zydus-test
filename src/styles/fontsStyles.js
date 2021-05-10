import { Platform } from 'react-native';
import Strings from './stringsStyles';

export function normalize(size) {
  if (Platform.OS === 'ios') {
    return Math.round(size);
  }
  return Math.round(size);
}

const fixed = 6;
const steps = 2;

const micro = normalize(fixed + steps);
const tiny = normalize(fixed + 2 * steps);
const small = normalize(fixed + 3 * steps);
const medium = normalize(fixed + 4 * steps);
const large = normalize(fixed + 5 * steps);
const xlarge = normalize(fixed + 6 * steps);
const xxlarge = normalize(fixed + 7 * steps);
const huge = normalize(fixed + 8 * steps);

export const FontStyle = {
  fontMicro: {
    fontFamily: Strings.regular,
    fontSize: micro,
  },
  fontTiny: {
    fontFamily: Strings.regular,
    fontSize: tiny,
  },
  fontSmall: {
    fontFamily: Strings.regular,
    fontSize: small,
  },
  fontMedium: {
    fontFamily: Strings.regular,
    fontSize: medium,
  },
  fontLarge: {
    fontFamily: Strings.regular,
    fontSize: large,
  },
  fontXLarge: {
    fontFamily: Strings.regular,
    fontSize: xlarge,
  },
  fontXXLarge: {
    fontFamily: Strings.regular,
    fontSize: xxlarge,
  },
  fontHuge: {
    fontFamily: Strings.regular,
    fontSize: huge,
  },
};

export const LightFontStyle = {
  fontMicro: {
    fontFamily: Strings.light,
    fontSize: micro,
  },
  fontTiny: {
    fontFamily: Strings.light,
    fontSize: tiny,
  },
  fontSmall: {
    fontFamily: Strings.light,
    fontSize: small,
  },
  fontMedium: {
    fontFamily: Strings.light,
    fontSize: medium,
  },
  fontLarge: {
    fontFamily: Strings.light,
    fontSize: large,
  },
  fontXLarge: {
    fontFamily: Strings.light,
    fontSize: xlarge,
  },
  fontXXLarge: {
    fontFamily: Strings.light,
    fontSize: xxlarge,
  },
  fontHuge: {
    fontFamily: Strings.light,
    fontSize: huge,
  },
};

export const FSblack = {
  fontMicro: {
    fontFamily: Strings.black,
    fontSize: micro,
  },
  fontTiny: {
    fontFamily: Strings.black,
    fontSize: tiny,
  },
  fontSmall: {
    fontFamily: Strings.black,
    fontSize: small,
  },
  fontMedium: {
    fontFamily: Strings.black,
    fontSize: medium,
  },
  fontLarge: {
    fontFamily: Strings.black,
    fontSize: large,
  },
  fontXLarge: {
    fontFamily: Strings.black,
    fontSize: xlarge,
  },
  fontXXLarge: {
    fontFamily: Strings.black,
    fontSize: xxlarge,
  },
  fontHuge: {
    fontFamily: Strings.black,
    fontSize: huge,
  },
};

export const FSBold = {
  fontMicro: {
    fontFamily: Strings.bold,
    fontSize: micro,
  },
  fontTiny: {
    fontFamily: Strings.bold,
    fontSize: tiny,
  },
  fontSmall: {
    fontFamily: Strings.bold,
    fontSize: small,
  },
  fontMedium: {
    fontFamily: Strings.bold,
    fontSize: medium,
  },
  fontLarge: {
    fontFamily: Strings.bold,
    fontSize: large,
  },
  fontXLarge: {
    fontFamily: Strings.bold,
    fontSize: xlarge,
  },
  fontXXLarge: {
    fontFamily: Strings.bold,
    fontSize: xxlarge,
  },
  fontHuge: {
    fontFamily: Strings.bold,
    fontSize: huge,
  },
};

export const FSExtraBold = {
  fontMicro: {
    fontFamily: Strings.extraBold,
    fontSize: micro,
  },
  fontTiny: {
    fontFamily: Strings.extraBold,
    fontSize: tiny,
  },
  fontSmall: {
    fontFamily: Strings.extraBold,
    fontSize: small,
  },
  fontMedium: {
    fontFamily: Strings.extraBold,
    fontSize: medium,
  },
  fontLarge: {
    fontFamily: Strings.extraBold,
    fontSize: large,
  },
  fontXLarge: {
    fontFamily: Strings.extraBold,
    fontSize: xlarge,
  },
  fontXXLarge: {
    fontFamily: Strings.extraBold,
    fontSize: xxlarge,
  },
  fontHuge: {
    fontFamily: Strings.extraBold,
    fontSize: huge,
  },
};

export const FSExtraLight = {
  fontMicro: {
    fontFamily: Strings.extraLight,
    fontSize: micro,
  },
  fontTiny: {
    fontFamily: Strings.extraLight,
    fontSize: tiny,
  },
  fontSmall: {
    fontFamily: Strings.extraLight,
    fontSize: small,
  },
  fontMedium: {
    fontFamily: Strings.extraLight,
    fontSize: medium,
  },
  fontLarge: {
    fontFamily: Strings.extraLight,
    fontSize: large,
  },
  fontXLarge: {
    fontFamily: Strings.extraLight,
    fontSize: xlarge,
  },
  fontXXLarge: {
    fontFamily: Strings.extraLight,
    fontSize: xxlarge,
  },
  fontHuge: {
    fontFamily: Strings.extraLight,
    fontSize: huge,
  },
};

export const FSLight = {
  fontMicro: {
    fontFamily: Strings.nLight,
    fontSize: micro,
  },
  fontTiny: {
    fontFamily: Strings.nLight,
    fontSize: tiny,
  },
  fontSmall: {
    fontFamily: Strings.nLight,
    fontSize: small,
  },
  fontMedium: {
    fontFamily: Strings.nLight,
    fontSize: medium,
  },
  fontLarge: {
    fontFamily: Strings.nLight,
    fontSize: large,
  },
  fontXLarge: {
    fontFamily: Strings.nLight,
    fontSize: xlarge,
  },
  fontXXLarge: {
    fontFamily: Strings.nLight,
    fontSize: xxlarge,
  },
  fontHuge: {
    fontFamily: Strings.nLight,
    fontSize: huge,
  },
};

export const FSMedium = {
  fontMicro: {
    fontFamily: Strings.medium,
    fontSize: micro,
  },
  fontTiny: {
    fontFamily: Strings.medium,
    fontSize: tiny,
  },
  fontSmall: {
    fontFamily: Strings.medium,
    fontSize: small,
  },
  fontMedium: {
    fontFamily: Strings.medium,
    fontSize: medium,
  },
  fontLarge: {
    fontFamily: Strings.medium,
    fontSize: large,
  },
  fontXLarge: {
    fontFamily: Strings.medium,
    fontSize: xlarge,
  },
  fontXXLarge: {
    fontFamily: Strings.medium,
    fontSize: xxlarge,
  },
  fontHuge: {
    fontFamily: Strings.medium,
    fontSize: huge,
  },
};

export const FSRegular = {
  fontMicro: {
    fontFamily: Strings.nRegular,
    fontSize: micro,
  },
  fontTiny: {
    fontFamily: Strings.nRegular,
    fontSize: tiny,
  },
  fontSmall: {
    fontFamily: Strings.nRegular,
    fontSize: small,
  },
  fontMedium: {
    fontFamily: Strings.nRegular,
    fontSize: medium,
  },
  fontLarge: {
    fontFamily: Strings.nRegular,
    fontSize: large,
  },
  fontXLarge: {
    fontFamily: Strings.nRegular,
    fontSize: xlarge,
  },
  fontXXLarge: {
    fontFamily: Strings.nRegular,
    fontSize: xxlarge,
  },
  fontHuge: {
    fontFamily: Strings.nRegular,
    fontSize: huge,
  },
};

export const FSSemiBold = {
  fontMicro: {
    fontFamily: Strings.semiBold,
    fontSize: micro,
  },
  fontTiny: {
    fontFamily: Strings.semiBold,
    fontSize: tiny,
  },
  fontSmall: {
    fontFamily: Strings.semiBold,
    fontSize: small,
  },
  fontMedium: {
    fontFamily: Strings.semiBold,
    fontSize: medium,
  },
  fontLarge: {
    fontFamily: Strings.semiBold,
    fontSize: large,
  },
  fontXLarge: {
    fontFamily: Strings.semiBold,
    fontSize: xlarge,
  },
  fontXXLarge: {
    fontFamily: Strings.semiBold,
    fontSize: xxlarge,
  },
  fontHuge: {
    fontFamily: Strings.semiBold,
    fontSize: huge,
  },
};
