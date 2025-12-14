export interface ComicMetadata {
  isbn: string;
  title: string;
  publisher: string;
  authors: string[];
  coverUrl?: string;
  synopsis?: string;
  pageCount?: number;
  publishedDate?: Date;
}

export interface IMetadataProvider {
  getByIsbn(isbn: string): Promise<ComicMetadata | null>;
  search(query: string): Promise<ComicMetadata[]>;
}
