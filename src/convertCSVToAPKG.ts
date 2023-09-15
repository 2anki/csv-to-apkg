import readCSVContent from './csv-to-apkg';
import createDeck from './data/createDeck';
import defaultDeckOptions from './data/defaultDeckOptions';
import Exporter from './domain/exporter';

export default function convertCSVToAPKG(
  csvContent: string,
  exporter: Exporter
): Promise<Buffer> {
  const data = readCSVContent(csvContent);
  const deck = createDeck({
    ...defaultDeckOptions(),
    data,
  });
  exporter.configure([deck]);
  return exporter.save();
}
