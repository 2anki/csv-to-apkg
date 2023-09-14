// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, it } from 'vitest';

import convertCSVToAPKG, { createDeck, readCSVContent } from './csv-to-apkg';
import get16DigitRandomId from './get16DigitRandomId';

const CSV_EXAMPLE = `
Word,Meaning,Tags
お願いします,Please,one
ありがとう,Thank you (impolite),two
ありがとうございます。,Thank you (polite),three
`;

describe('Convert CSV to APKG', () => {
  it.skip('converts CSV to APKG format', () => {
    expect(convertCSVToAPKG())
      .toContain('magic');
  });

  it('reads the CSV content correctly', () => {
    const {
      headers,
      rows,
    } = readCSVContent(CSV_EXAMPLE);

    expect(headers)
      .toEqual(['Word', 'Meaning', 'Tags']);
    expect(rows)
      .toEqual(
        [
          ['お願いします', 'Please', 'one'],
          ['ありがとう', 'Thank you (impolite)', 'two'],
          ['ありがとうございます。', 'Thank you (polite)', 'three'],
        ],
      );
  });

  it('Transform to decks / notes', () => {
    const data = readCSVContent(CSV_EXAMPLE);
    const deck = createDeck({
      name: 'Default',
      cards: [],
      image: undefined,
      style: null,
      id: get16DigitRandomId(),
      data,
    });

    expect(deck.name)
      .toEqual('Default');
    expect(
      deck.cards[0].name,
    )
      .toEqual('お願いします');
    expect(
      deck.cards[0].back,
    )
      .toEqual('Please one');
  });

  it.skip('uses filename as deck name', () => {
    console.info('to be implemented');
  });

  it.skip('uses custom filename as deck name', () => {
    console.info('to be implemented');
  });
});
