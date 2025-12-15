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
    // 1. Try to find by UUID (persisted comic)
    const byId = await this.comicRepo.findById(input.idOrIsbn);
    if (byId) return byId;

    // 2. Try to find by ISBN in DB (persisted comic)
    const byIsbn = await this.comicRepo.findByIsbn(input.idOrIsbn);
    if (byIsbn) return byIsbn;

    // 3. Not in DB? Fetch from metadata providers (Ephemeral comic)
    const metadata = await this.metadataProvider.getByIsbn(input.idOrIsbn);
    if (!metadata) return null;

    // Return a transient Comic object (not saved to DB yet)
    // We use a temporary ID or just the ISBN as ID for display purposes
    return new Comic(
      "ephemeral", // Temporary ID
      metadata.isbn,
      metadata.title,
      metadata.publisher,
      metadata.authors,
      CollectionStatus.WANTED, // Default status for display
      metadata.coverUrl,
      metadata.synopsis,
      undefined, // No acquired date
    );
  }
}
