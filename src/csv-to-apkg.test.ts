// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, it, expect, fail } from 'vitest';

import convertCSVToAPKG, { CSVReader, DataMapper } from './csv-to-apkg';

const CSV_EXAMPLE = `
Word,Meaning,Tags
お願いします,Please,one
ありがとう,Thank you (impolite),two
ありがとうございます。,Thank you (polite),three
`;

describe("Convert CSV to APKG", () => {
  it.skip("converts CSV to APKG format", () => {
    expect(convertCSVToAPKG()).toContain("magic")
  });
  
  it.skip("reads the CSV content correctly", () => {
    const reader = new CSVReader(CSV_EXAMPLE);
    expect(reader.getHeaders()).toBe(['Word', 'Meaning', 'Tags']);
    expect(reader.getRows()).toBe(
      [
        ['お願いします', 'Please', 'one'],
        ['ありがとう', 'Thank you (impolite)', 'two'],
        ['ありがとうございます。', 'Thank you (polite)', 'three']
      ]
    )
  });
  
  it.skip("Transform to decks / notes", () => {
    const reader = new CSVReader(CSV_EXAMPLE);
    const mapper = new DataMapper(reader.parseSync())
    expect(mapper.getDecks()).toBe(['Default'])
  });
  
  it.skip("uses filename as deck name", () => {
    console.info("to be implemented");
  })
  
  it.skip("uses custom filename as deck name", () => {
    console.info("to be implemented");
  })
  
})

