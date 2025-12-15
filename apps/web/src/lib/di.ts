import { AddComicUseCase, SearchComicsExternalUseCase } from "@koma/core";
import { PrismaComicRepository } from "@koma/database";
import {
  AniListAdapter,
  GoogleBooksAdapter,
  MetadataService,
} from "@koma/metadata";

// Adapters
const googleBooksAdapter = new GoogleBooksAdapter();
const aniListAdapter = new AniListAdapter();

// Services
const metadataService = new MetadataService(
  [googleBooksAdapter, aniListAdapter], // Search providers
  aniListAdapter, // Enrichment provider
);

// Repositories
const comicRepository = new PrismaComicRepository();

// Use Cases
export const addComicUseCase = new AddComicUseCase(
  comicRepository,
  metadataService,
);

export const searchComicsExternalUseCase = new SearchComicsExternalUseCase(
  metadataService,
);

// Exports for direct access if needed
export const repositories = {
  comic: comicRepository,
};
