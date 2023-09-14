import path from 'path';
import fs from 'fs';

import getRandomUUID from './getRandomUUID';

class Workspace {
  location: string;

  constructor(base: string) {
    this.location = path.join(base, getRandomUUID());
    this.ensureExists();
  }

  private ensureExists() {
    if (!fs.existsSync(this.location)) {
      fs.mkdirSync(this.location, { recursive: true });
    }
  }
}

export default Workspace;
