export default function getTrimmedLines(content: string): string[] {
  return content.trim().split('\n');
}
