import { randomUUID } from "crypto";

import { CollectionStatus, Comic } from "../domain/comic";
import { IComicRepository } from "../ports/comic-repository";
import { IMetadataProvider } from "../ports/metadata-provider";

export interface AddComicInput {
  isbn: string;
  collectionStatus?: CollectionStatus;
}

export class AddComicUseCase {
  constructor(
    private readonly comicRepo: IComicRepository,
    private readonly metadataProvider: IMetadataProvider,
  ) {}

  async execute(input: AddComicInput): Promise<Comic> {
    // 1. Check if exists
    const existing = await this.comicRepo.findByIsbn(input.isbn);
    if (existing) {
      throw new Error(`Comic with ISBN ${input.isbn} already exists`);
    }

    // 2. Fetch metadata
    const metadata = await this.metadataProvider.getByIsbn(input.isbn);
    if (!metadata) {
      throw new Error(`Metadata not found for ISBN ${input.isbn}`);
    }

    // 3. Create Entity
    const newComic = new Comic(
      randomUUID(),
      metadata.isbn,
      metadata.title,
      metadata.publisher,
      metadata.authors,
      input.collectionStatus || CollectionStatus.WANTED,
      metadata.coverUrl,
      new Date(),
    );

    // 4. Persist
    await this.comicRepo.save(newComic);

    return newComic;
  }
}
