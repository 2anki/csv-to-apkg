import path from 'path';

export default function resolvePath(dir: string, x: string) {
  const p = path
    .resolve(path.join(dir, x))
    .replace(/app.asar/g, 'app.asar.unpacked');
  return x.endsWith('/') ? `${p}/` : p;
}
