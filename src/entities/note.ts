/**
 * https://github.com/2anki/server/blob/main/src/lib/parser/Note.ts
 */
export default class Note {
  name: string;

  back: string;

  tags: string[];

  cloze = false;

  number = 0;

  enableInput = false;

  answer = '';

  media: string[] = [];

  notionId?: string;

  notionLink?: string;
}
