import { AddComicUseCase } from "@koma/core";
import { PrismaComicRepository } from "@koma/database";
import {
  AniListAdapter,
  GoogleBooksAdapter,
  MetadataService,
} from "@koma/metadata";

const comicRepository = new PrismaComicRepository();

const metadataService = new MetadataService(
  [new GoogleBooksAdapter()],
  new AniListAdapter(),
);

export const addComicUseCase = new AddComicUseCase(
  comicRepository,
  metadataService,
);

export const comicRepo = comicRepository;
