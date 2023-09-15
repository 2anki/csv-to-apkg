import Deck from '../entities/deck';
import Note from '../entities/note';
import { CSVData } from './csvTypes';
import getFields from './getFields';
import getFirstLine from './getFirstLine';
import skipFirstLine from './skipFirstLine';

export interface CreateDeckOptions extends Deck {
  data: CSVData;
}

const mapRowToCard = (row: string[]): Note => {
  const fields = getFields(row.toString());
  const name = getFirstLine(fields);
  const back = skipFirstLine(fields).join(' ');

  return {
    name,
    back,
    tags: [],
    cloze: false,
    number: 0,
    enableInput: false,
    answer: '',
    media: [],
  };
};

export function locateCards(data: CSVData): Note[] {
  return data.rows.map((row) => mapRowToCard(row));
}

export default function createDeck(options: CreateDeckOptions): Deck {
  const { name, cards, image, style, id, data } = options;

  return new Deck(name, [...cards, ...locateCards(data)], image, style, id);
}
