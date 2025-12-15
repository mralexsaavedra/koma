import { CollectionStatus, Comic } from "../domain/comic";
import { IComicRepository } from "../ports/comic-repository";
import { IMetadataProvider } from "../ports/metadata-provider";

export interface GetComicDetailsInput {
  idOrIsbn: string;
}

export class GetComicDetailsUseCase {
  constructor(
    private readonly comicRepo: IComicRepository,
    private readonly metadataProvider: IMetadataProvider,
  ) {}

  async execute(input: GetComicDetailsInput): Promise<Comic | null> {
    const byId = await this.comicRepo.findById(input.idOrIsbn);
    if (byId) return byId;

    const byIsbn = await this.comicRepo.findByIsbn(input.idOrIsbn);
    if (byIsbn) return byIsbn;

    const metadata = await this.metadataProvider.getByIsbn(input.idOrIsbn);
    if (!metadata) return null;

    return new Comic(
      "ephemeral",
      metadata.isbn,
      metadata.title,
      metadata.publisher,
      metadata.authors,
      CollectionStatus.WANTED,
      metadata.coverUrl,
      metadata.synopsis,
      undefined,
    );
  }
}
