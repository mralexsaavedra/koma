import { Comic } from '../domain/comic.js';

export interface IComicRepository {
  save(comic: Comic): Promise<void>;
  findByIsbn(isbn: string): Promise<Comic | null>;
  listAll(): Promise<Comic[]>;
}