import os from 'os';

import { createDeck, defaultDeckOptions, readCSVContent } from './csv-to-apkg';
import Workspace from './Workspace';
import CustomExporter from './CustomExporter';

export default function convertCSVToAPKG(csvContent: string): Promise<Buffer> {
  const data = readCSVContent(csvContent);
  const deck = createDeck({
    ...defaultDeckOptions(),
    data,
  });
  const isNew = true;
  const type = 'fs';
  const workspace = new Workspace(os.tmpdir());
  const exporter = new CustomExporter('Default', workspace.location);
  exporter.configure([deck]);
  return exporter.save();
}
