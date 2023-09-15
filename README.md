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

This project was developed using [TDD](https://www.goodreads.com/book/show/387190.Test_Driven_Development), so checkout the [tests](./src/csv-to-apkg.test.ts) for examples on expected usage.

## How does it work?

`csv-to-apkg` reads your comma delimited data. It takes the first column and treats it as the front of the card. The remaining columns are the back of the card.

## Limitations

Cloze deletion are not supported.

## License

Unless otherwise specified in the source:

The code is licensed under the [MIT](./LICENSE) Copyright (c) 2023, Alexander Alemayhu.
