import type { ComicMetadata, IMetadataProvider } from "@koma/core";

import type { IEnrichmentSource } from "./adapters/anilist.js";
import type { IMetadataSource } from "./adapters/google-books.js";

export class MetadataService implements IMetadataProvider {
  constructor(
    private readonly sources: IMetadataSource[],
    private readonly enricher: IEnrichmentSource,
  ) {}

  async getByIsbn(isbn: string): Promise<ComicMetadata | null> {
    let result: ComicMetadata | null = null;

    // 1. Identification
    for (const source of this.sources) {
      result = await source.getByIsbn(isbn);
      if (result) {
        break;
      }
    }

    if (!result) {
      return null;
    }

    // 2. Enrichment (if missing cover or title seems "bad")
    if (!result.coverUrl || !result.synopsis) {
      const extraData = await this.enricher.searchByTitle(result.title);

      if (extraData) {
        if (extraData.coverUrl && !result.coverUrl) {
          result.coverUrl = extraData.coverUrl;
        }
        if (extraData.synopsis && !result.synopsis) {
          result.synopsis = extraData.synopsis;
        }
      }
    }

    return result;
  }

  async search(_query: string): Promise<ComicMetadata[]> {
    // Not implemented for now, required by interface
    return [];
  }
}
