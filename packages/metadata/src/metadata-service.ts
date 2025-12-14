import type { ComicMetadata, IMetadataProvider } from "@koma/core";

import type { IEnrichmentSource } from "./adapters/anilist";
import type { IMetadataSource } from "./adapters/google-books";

export class MetadataService implements IMetadataProvider {
  constructor(
    private readonly sources: IMetadataSource[],
    private readonly enricher: IEnrichmentSource,
  ) {}

  async getByIsbn(isbn: string): Promise<ComicMetadata | null> {
    let result: ComicMetadata | null = null;

    for (const source of this.sources) {
      result = await source.getByIsbn(isbn);
      if (result) {
        break;
      }
    }

    if (!result) {
      return null;
    }

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

  async search(query: string): Promise<ComicMetadata[]> {
    const allResults: ComicMetadata[] = [];

    const promises = this.sources.map((s) => s.search(query));
    const results = await Promise.all(promises);

    results.forEach((r) => allResults.push(...r));
    return allResults;
  }
}
