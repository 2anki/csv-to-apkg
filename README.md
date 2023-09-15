# CSV to APKG

A small library to convert CSV files to APKG files.

## Dependencies

This project is part of [2anki.net](https://2anki.net/) and uses the following dependencies:

-   [2anki/create_deck](https://github.com/2anki/create_deck)
-   [2anki/server](https://github.com/2anki/2anki.net)

Make sure these projects are available one level above this project:

```
git clone https://github.com/2anki/2anki.net ../server
git clone https://github.com/2anki/create_deck ../create_deck
```

## Install

> npm i @2anki/csv-to-apkg

## Usage

Below is an example showing you how to convert your csv (string).

```typescript
import convertCSVToAPKG from '@2anki/csv-to-apkg';

const csvContent = `Front,Back
What is the capital of Germany?,Berlin`;

convertCSVToAPKG(csvContent); // Promise<Buffer>

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
```

## How does it work?

`csv-to-apkg` reads your comma delimited data. It takes the first column and treats it as the front of the card. The remaining columns are the back of the card.

## Limitations

Cloze deletion are not supported.

## License

Unless otherwise specified in the source:

The code is licensed under the [MIT](./LICENSE) Copyright (c) 2023, Alexander Alemayhu.
