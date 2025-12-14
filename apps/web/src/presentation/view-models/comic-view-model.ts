import { CollectionStatus } from "@koma/core";

export interface ComicViewModel {
  id: string;
  isbn: string;
  title: string;
  publisher: string;
  authors: string[];
  status: CollectionStatus;
  coverUrl?: string;
}
