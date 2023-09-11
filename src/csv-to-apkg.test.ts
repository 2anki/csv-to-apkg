// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, it, expect } from 'vitest';

import convertCSVToAPKG from './csv-to-apkg';

describe("Convert CSV to APKG", () => {
  it("converts CSV to APKG format", () => {
    expect(convertCSVToAPKG()).toContain("magic")
  });
})

