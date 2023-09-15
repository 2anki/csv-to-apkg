// eslint-disable-next-line import/no-extraneous-dependencies
import { test, expect } from 'vitest';

import convertCSVToAPKG from './convertCSVToAPKG';
import readCSVContent, { getCardsFromCSV } from './csv-to-apkg';
import createDeck from './data/createDeck';
import defaultDeckOptions from './data/defaultDeckOptions';
import readCSVFile from './filesystem/readCSVFile';
import resolvePath from './filesystem/resolvePath';
import Exporter from './domain/exporter';
import Deck from './entities/deck';
import skipFirstLine from './data/skipFirstLine';

const CSV_EXAMPLE = `
Word,Meaning,Tags
お願いします,Please,one
ありがとう,Thank you (impolite),two
ありがとうございます。,Thank you (polite),three
`;
const EXPECTED_ROWS = [
  ['お願いします', 'Please', 'one'],
  ['ありがとう', 'Thank you (impolite)', 'two'],
  ['ありがとうございます。', 'Thank you (polite)', 'three'],
];
const MOCK_BUF_LENGTH = 53466;

test('converts CSV to APKG format', async () => {
  const exporter: Exporter = {
    // eslint-disable-next-line no-unused-vars
    configure(payload: Deck[]): void {},
    save(): Promise<Buffer> {
      return Promise.resolve(Buffer.alloc(MOCK_BUF_LENGTH));
    },
  };
  const apkg = await convertCSVToAPKG(CSV_EXAMPLE, exporter);
  expect(apkg.length).toEqual(MOCK_BUF_LENGTH);
});

test('reads the CSV content correctly', () => {
  const { headers, rows } = readCSVContent(CSV_EXAMPLE);
  expect(headers).toEqual(['Word', 'Meaning', 'Tags']);
  expect(rows).toEqual(EXPECTED_ROWS);
});

test('Transform to decks / notes', () => {
  const data = readCSVContent(CSV_EXAMPLE);
  const deck = createDeck({
    ...defaultDeckOptions(),
    data,
  });

  expect(deck.name).toEqual('Default');
  expect(deck.cards[0].name).toEqual('お願いします');
  expect(deck.cards[0].back).toEqual('Please one');
});

test('uses custom filename as deck name', () => {
  const { name, contents } = readCSVFile(
    resolvePath(
      __dirname,
      './mocks/Japanese Words 71594f63607d440fa080879385ec0acc.csv'
    )
  );
  const deck = createDeck({
    ...defaultDeckOptions(),
    data: readCSVContent(contents),
    name,
  });
  expect(deck.name).toEqual('Japanese Words');
});

const CARD_TEST_CASES = EXPECTED_ROWS.map((row, index) => [index, row[0], skipFirstLine(row).join(' ')]);
test.each(CARD_TEST_CASES)('card at index %i has the correct values', (index, expectedName, expectedBack) => {
  const cards = getCardsFromCSV(CSV_EXAMPLE);
  expect(cards[index].name).toEqual(expectedName);
  expect(cards[index].back).toEqual(expectedBack);
});
