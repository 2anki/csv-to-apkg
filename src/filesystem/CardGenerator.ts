import { execFile } from 'child_process';
import { homedir } from 'os';
import path from 'path';

import resolvePath from './resolvePath';

export const CREATE_DECK_DIR =
  process.env.CREATE_DECK_DIR || path.join(__dirname, '../../../create_deck/');

export const CREATE_DECK_SCRIPT_PATH = path.join(
  CREATE_DECK_DIR,
  'create_deck.py'
);

function PYTHON() {
  const os = process.platform;
  if (os === 'win32') {
    return `${homedir}\\AppData\\Local\\Programs\\Python\\Python38\\python.exe`;
  }
  return '/usr/bin/python3';
}

interface Generator {
  run(): Promise<string>;
}

class CardGenerator implements Generator {
  currentDirectory: string;

  constructor(workspace: string) {
    this.currentDirectory = workspace;
  }

  run(): Promise<string> {
    const deckInfo = path.join(this.currentDirectory, 'deck_info.json');
    const templateDirectory = resolvePath(
      __dirname,
      '../../../server/src/templates/'
    );

    const createDeckScriptPathARGS = [
      CREATE_DECK_SCRIPT_PATH,
      deckInfo,
      templateDirectory,
    ];
    console.log('execFile', PYTHON(), createDeckScriptPathARGS);
    return new Promise((resolve, reject) => {
      execFile(
        PYTHON(),
        createDeckScriptPathARGS,
        { cwd: this.currentDirectory },
        (err, stdout) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(stdout);
          }
        }
      );
    });
  }
}

export default CardGenerator;
