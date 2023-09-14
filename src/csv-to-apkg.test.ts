// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import convertCSVToAPKG from './convertCSVToAPKG';
import readCSVContent from './csv-to-apkg';
import createDeck from './data/createDeck';
import defaultDeckOptions from './data/defaultDeckOptions';
import readCSVFile from './filesystem/readCSVFile';
import resolvePath from './filesystem/resolvePath';

const CSV_EXAMPLE = `
Word,Meaning,Tags
お願いします,Please,one
ありがとう,Thank you (impolite),two
ありがとうございます。,Thank you (polite),three
`;

describe('Convert CSV to APKG', () => {
  it('converts CSV to APKG format', async () => {
    const apkg = await convertCSVToAPKG(CSV_EXAMPLE);
    expect(apkg.length).toEqual(53466);
  });

  it('reads the CSV content correctly', () => {
    const { headers, rows } = readCSVContent(CSV_EXAMPLE);

    expect(headers).toEqual(['Word', 'Meaning', 'Tags']);
    expect(rows).toEqual([
      ['お願いします', 'Please', 'one'],
      ['ありがとう', 'Thank you (impolite)', 'two'],
      ['ありがとうございます。', 'Thank you (polite)', 'three'],
    ]);
  });

  it('Transform to decks / notes', () => {
    const data = readCSVContent(CSV_EXAMPLE);
    const deck = createDeck({
      ...defaultDeckOptions(),
      data,
    });

    expect(deck.name).toEqual('Default');
    expect(deck.cards[0].name).toEqual('お願いします');
    expect(deck.cards[0].back).toEqual('Please one');
  });

  it('uses custom filename as deck name', () => {
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
});
