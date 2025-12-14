import { ComicMetadata, IMetadataProvider } from "../ports/metadata-provider";

export interface SearchComicsExternalInput {
  query: string;
}

export class SearchComicsExternalUseCase {
  constructor(private readonly metadataProvider: IMetadataProvider) {}

  async execute(input: SearchComicsExternalInput): Promise<ComicMetadata[]> {
    if (!input.query || input.query.trim().length === 0) {
      return [];
    }
    return this.metadataProvider.search(input.query);
  }
}
