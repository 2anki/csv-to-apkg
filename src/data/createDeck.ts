import Deck from '../entities/deck';
import Note from '../entities/note';
import { CSVData } from './csvTypes';
import getFields from './getFields';
import getFirstLine from './getFirstLine';
import skipFirstLine from './skipFirstLine';

interface CreateDeckOptions extends Deck {
  data: CSVData;
}

function locateCards(data: CSVData): Note[] {
  return data.rows.map((row) => {
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
  });
}

export default function createDeck({
  name,
  cards,
  image,
  style,
  id,
  data,
}: CreateDeckOptions): Deck {
  const newCards = locateCards(data);
  return new Deck(name, [...cards, ...newCards], image, style, id);
}
