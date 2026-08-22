# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Small TypeScript library that converts CSV content into Anki decks (`.apkg`), published to npm as `@2anki/csv-to-apkg` (semantic-release from `main`, conventional commits). The first CSV column becomes the card front; the remaining columns become the back. Cloze deletions are not supported.

**Legacy status:** the 2anki server no longer consumes this package — it parses CSV in-repo and vendors its own `create_deck` copy. This library remains a standalone npm package; changes here don't affect 2anki.net.

## Commands

- Install: `npm install`
- Test: `npm test` (vitest) — watch: `npm run test:watch`, coverage: `npm run coverage`
- Single test file: `npx vitest run src/csv-to-apkg.test.ts`
- Lint: `npm run lint` / `npm run lint:fix` (eslint, airbnb-base)
- Build: `npm run build` (cleans `dist/`, then tsc + vite library build → ES + CJS bundles in `dist/`)

## Sibling-repo dependency (APKG export only)

`src/filesystem/CardGenerator.ts` produces the actual `.apkg` by shelling out to the Python script `create_deck.py` (`/usr/bin/python3` on Unix) and passing it a `deck_info.json` plus the card-template directory from the 2anki server repo. Both repos must be checked out one level above this one:

- `../create_deck` — https://github.com/2anki/create_deck (override location with `CREATE_DECK_DIR`)
- `../server` — https://github.com/2anki/2anki.net (templates read from `server/src/templates/`)

The pure parsing path (`getCardsFromCSV` and everything under `src/data/`) has no external dependency — only APKG export does. Tests exercise the parsing path, so they run without the siblings.

## Architecture

Flow: CSV string → `readCSVContent` (headers + rows) → `locateCards` → `Note[]` → `Deck` → `deck_info.json` in a temp `Workspace` → `CardGenerator` (python) → `.apkg` bytes.

- `src/csv-to-apkg.ts` — entry point: `readCSVContent`, `getCardsFromCSV`
- `src/data/` — pure parsing helpers (line trimming, field splitting, deck/card construction, default deck options)
- `src/entities/` — `Deck` and `Note` domain objects
- `src/filesystem/` — I/O side: `readCSVFile`, `Workspace` (temp dirs), `APKGExporter`, `CardGenerator` (external python call)
- `src/examples/cli.ts` — runnable example using the fixture CSV in `src/mocks/`
- Tests are colocated (`src/csv-to-apkg.test.ts`) and double as usage documentation — this project is developed TDD-style.
