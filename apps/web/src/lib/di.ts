import {
  AddComicUseCase,
  GetComicDetailsUseCase,
  GetLibraryUseCase,
  GetSeriesDetailsUseCase,
  SearchComicsExternalUseCase,
} from "@koma/core";
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

// Exports for direct access if needed
export const repositories = {
  comic: comicRepository,
};

// Use Cases
export const addComicUseCase = new AddComicUseCase(
  comicRepository,
  metadataService,
);

export const getLibraryUseCase = new GetLibraryUseCase(comicRepository);

export const searchComicsExternalUseCase = new SearchComicsExternalUseCase(
  metadataService,
);

export const getComicDetailsUseCase = new GetComicDetailsUseCase(
  comicRepository,
  metadataService,
);

export const getSeriesDetailsUseCase = new GetSeriesDetailsUseCase(
  getComicDetailsUseCase,
  searchComicsExternalUseCase,
);
