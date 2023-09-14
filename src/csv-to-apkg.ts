import { CSVData } from './data/csvTypes';
import getFields from './data/getFields';
import getFirstLine from './data/getFirstLine';
import getTrimmedLines from './data/getTrimmedLines';

import skipFirstLine from './data/skipFirstLine';

export default function readCSVContent(content: string): CSVData {
  const lines = getTrimmedLines(content);
  const headers = getFields(getFirstLine(lines));
  const rows = skipFirstLine(lines).map((line: string) => getFields(line));

  return {
    headers,
    rows,
  };
}
