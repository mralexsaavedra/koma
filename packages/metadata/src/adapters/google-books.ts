import type { ComicMetadata } from "@koma/core";

export interface IMetadataSource {
  getByIsbn(isbn: string): Promise<ComicMetadata | null>;
  search(query: string): Promise<ComicMetadata[]>;
}

interface GoogleBooksResponse {
  items?: GoogleBooksItem[];
}

interface GoogleBooksItem {
  id: string; // Add this
  volumeInfo: {
    title: string;
    publisher?: string;
    authors?: string[];
    description?: string;
    pageCount?: number;
    publishedDate?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    industryIdentifiers?: Array<{
      type: string;
      identifier: string;
    }>;
  };
}

export class GoogleBooksAdapter implements IMetadataSource {
  async getByIsbn(isbn: string): Promise<ComicMetadata | null> {
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
    try {
      const res = await fetch(url);
      const data = (await res.json()) as GoogleBooksResponse;
      if (!data.items || !data.items.length) return null;

      return this.mapToMetadata(data.items[0], isbn);
    } catch {
      return null;
    }
  }

  async search(query: string): Promise<ComicMetadata[]> {
    // Google Books maxResults is 40.
    // To get a full collection (e.g. Naruto has 72 vols), we need multiple pages.
    // We fetch the first 3 pages (0-120 items) in parallel to cover most series.
    const offsets = [0, 40, 80];

    const fetchPage = async (startIndex: number) => {
      const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query,
      )}&maxResults=40&startIndex=${startIndex}`;

      try {
        const res = await fetch(url);
        if (!res.ok) return [];
        const data = (await res.json()) as GoogleBooksResponse;
        return data.items || [];
      } catch {
        return [];
      }
    };

    const resultsArray = await Promise.all(offsets.map(fetchPage));
    const allItems = resultsArray.flat();

    if (allItems.length === 0) return [];

    // Deduplicate by ID before mapping
    const seen = new Set<string>();
    const uniqueItems = [];

    for (const item of allItems) {
      if (item.id && !seen.has(item.id)) {
        // Google Books Item ID
        seen.add(item.id);
        uniqueItems.push(item);
      } else if (!item.id) {
        // Fallback if no ID?
        uniqueItems.push(item);
      }
    }

    return uniqueItems
      .map((item) => {
        const identifiers = item.volumeInfo.industryIdentifiers || [];
        const isbn13 = identifiers.find(
          (id) => id.type === "ISBN_13",
        )?.identifier;
        const isbn10 = identifiers.find(
          (id) => id.type === "ISBN_10",
        )?.identifier;
        const isbn = isbn13 || isbn10;

        if (!isbn) return null;

        return this.mapToMetadata(item, isbn);
      })
      .filter((item): item is ComicMetadata => item !== null);
  }

  private mapToMetadata(item: GoogleBooksItem, isbn: string): ComicMetadata {
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
