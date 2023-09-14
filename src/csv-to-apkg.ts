export default function convertCSVToAPKG(): string | null {
  throw new Error("To be implemented")
}


export type CSVColumnHeader = string
export type CSVRow = string

export class CSVReader {
  
  constructor(readonly content: string) {}
  
  getHeaders(): CSVColumnHeader {
    throw new Error("not implemented")
  }
  
  getRows(): CSVRow {
    throw new Error("not implemented")
  }
}