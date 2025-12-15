import { Comic } from "@koma/core";

export type ComicViewModel = Pick<
  Comic,
  | "id"
  | "isbn"
  | "title"
  | "publisher"
  | "authors"
  | "status"
  | "coverUrl"
  | "synopsis"
>;
