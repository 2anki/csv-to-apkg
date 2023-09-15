import Deck from '../entities/deck';

export default interface Exporter {
    // eslint-disable-next-line no-unused-vars
    configure(payload: Deck[]): void;
    save(): Promise<Buffer>;
}
