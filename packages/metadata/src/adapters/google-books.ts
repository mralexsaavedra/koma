import type { ComicMetadata } from "@koma/core";

export interface IMetadataSource {
  getByIsbn(isbn: string): Promise<ComicMetadata | null>;
}

export class GoogleBooksAdapter implements IMetadataSource {
  async getByIsbn(isbn: string): Promise<ComicMetadata | null> {
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!data.items || !data.items.length) return null;

      const info = data.items[0].volumeInfo;
      return {
        isbn: isbn,
        title: info.title,
        publisher: info.publisher || "",
        authors: info.authors || [],
        coverUrl:
          info.imageLinks?.thumbnail ||
          info.imageLinks?.smallThumbnail ||
          undefined,
        synopsis: info.description,
        pageCount: info.pageCount,
        ...(info.publishedDate
          ? { publishedDate: new Date(info.publishedDate) }
          : {}),
      };
    } catch {
      return null;
    }
  }
}
