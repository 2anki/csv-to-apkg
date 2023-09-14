export default function convertCSVToAPKG(): string | null {
  throw new Error('To be implemented');
}

export type CSVColumnHeader = string
export type CSVRow = string[]
export type CSVData = {
  headers: CSVColumnHeader[];
  rows: CSVRow[];
}

function skipFirstLine(lines: string[]): string[] {
  return lines.slice(1);
}

function getFields(line: string, delimiter: string = ',') {
  return line.split(delimiter);
}

function getTrimmedLines(content: string): string[] {
  return content.trim()
    .split('\n');
}

function getFirstLine(lines: string[]) {
  return lines[0];
}

export function readCSVContent(content: string): CSVData {
  const lines = getTrimmedLines(content);
  const headers = getFields(getFirstLine(lines));
  const rows = skipFirstLine(lines)
    .map((line) => getFields(line));

  return {
    headers,
    rows,
  };
}

/**
 * https://github.com/2anki/server/blob/main/src/lib/parser/Note.ts
 */
class Note {
  name: string;

  back: string;

  tags: string[];

  cloze = false;

  number = 0;

  enableInput = false;

  answer = '';

  media: string[] = [];

  notionId?: string;

  notionLink?: string;
}

/**
 * https://github.com/2anki/server/blob/main/src/lib/parser/Deck.ts
 */
class Deck {
  name: string;

  cards: Note[];

  image: string | undefined;

  style: string | null;

  id: number;

  constructor(
    name: string,
    cards: Note[],
    image: string | undefined,
    style: string | null,
    id: number,
  ) {
    this.name = name;
    this.cards = cards;
    this.image = image;
    this.style = style;
    this.id = id;
  }
}

interface CreateDeckOptions extends Deck {
  data: CSVData;
}

function locateCards(data: CSVData): Note[] {
  return data.rows.map((row) => {
    const fields = getFields(row.toString());
    const name = getFirstLine(fields);
    const back = skipFirstLine(fields)
      .join(' ');

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

export function createDeck({
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
