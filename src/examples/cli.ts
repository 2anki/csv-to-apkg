import fs from 'fs';
import os from 'os';

import resolvePath from '../filesystem/resolvePath';
import Workspace from '../filesystem/Workspace';
import APKGExporter from '../filesystem/APKGExporter';
import convertCSVToAPKG from '../convertCSVToAPKG';

const workspace = new Workspace(os.tmpdir());
const exporter = new APKGExporter('Default', workspace.location);

const csvFile = fs
  .readFileSync(
    resolvePath(
      __dirname,
      '../mocks/Japanese Words 71594f63607d440fa080879385ec0acc.csv'
    ),
    'utf-8'
  )
  .toString();

/* eslint-disable no-console */
console.log('workspace.location', workspace.location);
convertCSVToAPKG(csvFile, exporter)
  .then(() => {
    console.log('Files available at: ', workspace.location);
    console.info('Done!');
  })
  .catch(console.error);
