export default function convertCSVToAPKG(): string | null {
  throw new Error("To be implemented")
}


export type CSVColumnHeader = string
export type CSVRow = string
export type CSVData = {
  headers: CSVColumnHeader[];
  rows: CSVRow[];
}

export class CSVReader {
  
  constructor(readonly content: string) { }
  
  getHeaders(): CSVColumnHeader[] {
    throw new Error("not implemented")
  }
  
  getRows(): CSVRow[] {
    throw new Error("not implemented")
  }
  
  parseSync(): CSVData {
    throw new Error("To be implemented")
  }
}

export type Note = {
  id: number;
  front: string;
  back: string;
  tags: string;  
}

export type Deck = {
  subDecks: Deck[];
  name: string;
  notes: Note[];
}
export class DataMapper {
  getDecks(): Deck {
    throw new Error("To be implemented")
  }
}