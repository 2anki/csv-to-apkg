import os from 'os';

import Workspace from './filesystem/Workspace';
import CustomExporter from './filesystem/CustomExporter';
import readCSVContent from './csv-to-apkg';
import createDeck from './data/createDeck';
import defaultDeckOptions from './data/defaultDeckOptions';

export default function convertCSVToAPKG(csvContent: string): Promise<Buffer> {
  const data = readCSVContent(csvContent);
  const deck = createDeck({
    ...defaultDeckOptions(),
    data,
  });

  const workspace = new Workspace(os.tmpdir());
  const exporter = new CustomExporter('Default', workspace.location);
  exporter.configure([deck]);
  return exporter.save();
}

export function getCardsFromCSV(csvContent: string) {
  const data = readCSVContent(csvContent);
  const deck = createDeck({
    ...defaultDeckOptions(),
    data,
  });

  return deck.cards;
}
