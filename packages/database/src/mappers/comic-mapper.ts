import { Comic, CollectionStatus } from '@koma/core'; // Importamos del core
import { Comic as PrismaComic } from '@prisma/client'; // Importamos de Prisma generado

export class ComicMapper {
  static toDomain(raw: PrismaComic): Comic {
    return new Comic(
      raw.id,
      raw.isbn,
      raw.title,
      raw.publisher || 'Unknown',
      raw.authors ? JSON.parse(raw.authors) : [], // SQLite no tiene arrays nativos, usaremos JSON
      raw.status as CollectionStatus,
      raw.coverUrl || undefined,
      raw.acquiredAt || undefined
    );
  }

  static toPersistence(comic: Comic): any {
    return {
      id: comic.id,
      isbn: comic.isbn,
      title: comic.title,
      publisher: comic.publisher,
      authors: JSON.stringify(comic.authors), // Serializamos array a string para SQLite
      status: comic.status,
      coverUrl: comic.coverUrl,
      acquiredAt: comic.acquiredAt
    };
  }
}