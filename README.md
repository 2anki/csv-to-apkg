# CSV to APKG

A small library to convert CSV files to APKG files.

## Install

> npm i @2anki/csv-to-apkg

## Usage

Below is an example showing you how to convert your csv (string).

```typescript
import convertCSVToAPKG from 'get-notion-object-title';

const csvContent = `Front,Back
What is the capital of Germany?,Berlin`;

convertCSVToAPKG(csvContent); // Promise<Buffer>
```

## How does it work?

`csv-to-apkg` reads your comma delimited data. It takes the first column and treats it as the front of the card. The remaining columns are the back of the card.

## Limitations

Cloze deletion are not supported.

## License

Unless otherwise specified in the source:

The code is licensed under the [MIT](./LICENSE) Copyright (c) 2023, Alexander Alemayhu.
