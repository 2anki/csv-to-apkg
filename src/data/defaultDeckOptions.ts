import get16DigitRandomId from '../identifiers/get16DigitRandomId';

export default function defaultDeckOptions() {
  return {
    name: 'Default',
    cards: [],
    image: undefined,
    style: null,
    id: get16DigitRandomId(),
  };
}
