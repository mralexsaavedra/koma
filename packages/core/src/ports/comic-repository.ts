import { Comic } from "../domain/comic";

export interface IComicRepository {
  save(comic: Comic): Promise<void>;
  findByIsbn(isbn: string): Promise<Comic | null>;
  findById(id: string): Promise<Comic | null>;
  listAll(): Promise<Comic[]>;
}
