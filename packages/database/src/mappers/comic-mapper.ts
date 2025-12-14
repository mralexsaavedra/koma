import { Comic as PrismaComic } from "@prisma/client";

import { CollectionStatus, Comic } from "@koma/core";

export class ComicMapper {
  static toDomain(raw: PrismaComic): Comic {
    return new Comic(
      raw.id,
      raw.isbn,
      raw.title,
      raw.publisher || "Unknown",
      raw.authors ? JSON.parse(raw.authors) : [],
      raw.status as CollectionStatus,
      raw.coverUrl || undefined,
      raw.acquiredAt || undefined,
    );
  }

  static toPersistence(comic: Comic): PrismaComic {
    return {
      id: comic.id,
      isbn: comic.isbn,
      title: comic.title,
      publisher: comic.publisher,
      authors: JSON.stringify(comic.authors),
      status: comic.status,
      coverUrl: comic.coverUrl ?? null,
      acquiredAt: comic.acquiredAt ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
