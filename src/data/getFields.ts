export default function getFields(line: string, delimiter: string = ',') {
  return line.split(delimiter);
}
