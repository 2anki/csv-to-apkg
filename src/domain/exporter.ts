import Deck from '../entities/deck';

export default interface Exporter {
  configure(payload: Deck[]): void;
  save(): Promise<Buffer>;
}
