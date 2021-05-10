export const RCPA_PRODUCT_MAPPING = 'rcpa_product_mapping';

export const RcpaProductMapping = {
  name: RCPA_PRODUCT_MAPPING,
  properties: {
    sbu_code: 'string',
    brand_code: 'string',
    brand_name: 'string',
    product_code: 'string',
    product_name: 'string',
    competitors: 'string?',
    mkt_rate: 'string?'
  }
};
