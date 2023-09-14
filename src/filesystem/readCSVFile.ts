import fs from 'fs';

export type CSVFile = {
  name: string;
  contents: string;
};

export default function readCSVFile(path: string): CSVFile {
  const parts = path.split('/');
  const defaultName = 'Default';
  const name = (parts.pop() ?? defaultName)
    .replace(/([0-9a-fA-F]{32})/, '')
    .replace(/\.csv$/, '')
    .trim();
  const contents = fs.readFileSync(path).toString();
  return { name, contents };
}
