import type { ComicMetadata } from "@koma/core";

export interface IMetadataSource {
  getByIsbn(isbn: string): Promise<ComicMetadata | null>;
  search(query: string): Promise<ComicMetadata[]>;
}

export class GoogleBooksAdapter implements IMetadataSource {
  async getByIsbn(isbn: string): Promise<ComicMetadata | null> {
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!data.items || !data.items.length) return null;

      return this.mapToMetadata(data.items[0], isbn);
    } catch {
      return null;
    }
  }

  async search(query: string): Promise<ComicMetadata[]> {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (!data.items || !data.items.length) return [];

      return data.items
        .map((item: any) => {
          const identifiers = item.volumeInfo.industryIdentifiers || [];
          const isbn13 = identifiers.find(
            (id: any) => id.type === "ISBN_13",
          )?.identifier;
          const isbn10 = identifiers.find(
            (id: any) => id.type === "ISBN_10",
          )?.identifier;
          const isbn = isbn13 || isbn10;

          if (!isbn) return null;

          return this.mapToMetadata(item, isbn);
        })
        .filter(
          (item: ComicMetadata | null) => item !== null,
        ) as ComicMetadata[];
    } catch {
      return [];
    }
  }

  private mapToMetadata(item: any, isbn: string): ComicMetadata {
    const info = item.volumeInfo;
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
  }
}
