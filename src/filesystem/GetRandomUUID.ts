import crypto from 'crypto';

export default function getRandomUUID() {
  return crypto.randomUUID();
}
