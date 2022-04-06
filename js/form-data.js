const OfferType = {
  PALACE: 'palace',
  FLAT: 'flat',
  HOUSE: 'house',
  BUNGALOW: 'bungalow',
  HOTEL: 'hotel'
};

const OfferTypeToReadable = {
  [OfferType.FLAT]: 'Квартира',
  [OfferType.BUNGALOW]: 'Бунгало',
  [OfferType.HOUSE]: 'Дом',
  [OfferType.PALACE]: 'Дворец',
  [OfferType.HOTEL]: 'Отель',
};

const OfferTypeToPrice = {
  [OfferType.PALACE]: 10000,
  [OfferType.FLAT]: 1000,
  [OfferType.BUNGALOW]: 0,
  [OfferType.HOUSE]: 5000,
  [OfferType.HOTEL]: 3000,
};

const ROOMS_CAPACITYS = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

export {OfferType, OfferTypeToReadable, OfferTypeToPrice, ROOMS_CAPACITYS };
