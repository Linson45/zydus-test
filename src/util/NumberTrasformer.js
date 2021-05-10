export const numberTransformer = (value, decimalPlaces = 2) => {
  value = +value;
  if (isNaN(value)) {
    return `₹${0}`;
  }
  const trillion = 999999999999;
  const billion = 999999999;
  const crore = 9999999;
  const lakh = 99999;
  const thousand = 999;
  const isNegative = value < 0;
  value = Math.abs(value);

  if (value > trillion) {
    value = `${(value / (crore + 1)).toFixed(decimalPlaces)}Trillion`;
  } if (value > billion) {
    value = `${(value / (crore + 1)).toFixed(decimalPlaces)}Billion`;
  } else if (value > crore) {
    value = `${(value / (crore + 1)).toFixed(decimalPlaces)}Cr`;
  } else if (value > lakh) {
    value = `${(value / (lakh + 1)).toFixed(decimalPlaces)}L`;
  } else if (value > thousand) {
    value = `${(value / (thousand + 1)).toFixed(decimalPlaces)}k`;
  } else {
    value = value.toFixed(decimalPlaces);
  }
  if (isNegative) value = `-${value}`;
  return `₹${value}`;
};

export const numberTransformerNoSymbol = (value, decimalPlaces = 2) => {
  value = +value;
  if (isNaN(value)) {
    return 0;
  }
  const trillion = 999999999999;
  const billion = 999999999;
  const crore = 9999999;
  const lakh = 99999;
  const thousand = 999;
  const isNegative = value < 0;
  value = Math.abs(value);

  if (value > trillion) {
    value = `${(value / (crore + 1)).toFixed(decimalPlaces)} Tr`;
  } if (value > billion) {
    value = `${(value / (crore + 1)).toFixed(decimalPlaces)} Bi`;
  } else if (value > crore) {
    value = `${(value / (crore + 1)).toFixed(decimalPlaces)} Cr`;
  } else if (value > lakh) {
    value = `${(value / (lakh + 1)).toFixed(decimalPlaces)} Lakhs`;
  } else if (value > thousand) {
    value = `${(value / (thousand + 1)).toFixed(decimalPlaces)} K`;
  } else {
    value = value.toFixed(decimalPlaces);
  }
  if (isNegative) value = `-${value}`;
  return value;
};

export const addPercentageSign = (value) => {
  value = +value;
  if (isNaN(value)) {
    return '--%';
  }
  return `${value.toFixed(0)}%`;
};

export const displayDecimal = (value) => {
  value = +value;
  if (isNaN(value)) {
    return '0.0';
  }
  return value.toFixed(0.0);
};

export const addPercentageSignWithDecimal = (value) => {
  value = +value;
  if (isNaN(value)) {
    return '--%';
  }
  return `${value.toFixed(2)}%`;
};

export const removeDecimal = (value) => {
  value = +value;
  return +value.toFixed(0);
};

export const priceFormatWithoutDecimal = (x) => {
  x = +x;
  if (!x || isNaN(x)) return `₹ ${0}`;

  x = Math.ceil(x).toString();
  let lastThree = x.substring(x.length - 3);
  const otherNumbers = x.substring(0, x.length - 3);
  if (otherNumbers !== '') lastThree = `,${lastThree}`;
  const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
  return `₹${res}`;
};

export const priceFormatWithDecimal = (x) => {
  x = +x;
  if (!x || isNaN(x)) return `₹ ${0.0}`;

  x = x.toString();
  let afterPoint = '';
  if (x.indexOf('.') > 0) afterPoint = x.substring(x.indexOf('.'), x.length);
  x = Math.floor(x);
  x = x.toString();
  let lastThree = x.substring(x.length - 3);
  const otherNumbers = x.substring(0, x.length - 3);
  if (otherNumbers !== '') lastThree = `,${lastThree}`;
  const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree + afterPoint;

  return `₹${res}`;
};

export const transform = (value, type, decimalPlaces = 2) => {
  value = +value;
  if (type === 'curr') return numberTransformer(value, decimalPlaces);
  if (type === 'perc') return `${value.toFixed(1)}%`;
  return value;
};

export const objectKeysToLowerCase = (input) => {
  if (!input) {
    return input;
  }
  if (typeof input !== 'object') return input;
  if (Array.isArray(input)) return input.map(objectKeysToLowerCase);
  return Object.keys(input).reduce((newObj, key) => {
    const val = input[key];
    newObj[key.toLowerCase()] = (typeof val === 'object') ? objectKeysToLowerCase(val) : val;
    return newObj;
  }, {});
};

export const toProgressNumber = (progress) => {
  if (!progress) {
    return 0;
  }
  return Math.round(progress * 100);
};

export const toFixed = (value, precision) => {
  try {
    value = +value;
    return value.toFixed(precision);
  } catch (e) {
    return 0;
  }
};
