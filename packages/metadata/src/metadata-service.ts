import type { IMetadataProvider, ComicMetadata } from '@koma/core';
import type { IMetadataSource } from './adapters/google-books.js';
import type { IEnrichmentSource } from './adapters/anilist.js';

export class MetadataService implements IMetadataProvider {
  constructor(
    private readonly sources: IMetadataSource[],
    private readonly enricher: IEnrichmentSource
  ) {}

  async getByIsbn(isbn: string): Promise<ComicMetadata | null> {
    console.log(`[Metadata] Searching for ISBN ${isbn}...`);
    
    let result: ComicMetadata | null = null;
    let foundSource = '';

    // 1. Identification
    for (const source of this.sources) {
      result = await source.getByIsbn(isbn);
      if (result) {
        foundSource = source.constructor.name;
        break;
      }
    }

    if (!result) {
      console.log('[Metadata] Not found in any ISBN source.');
      return null;
    }

    // 2. Enrichment (if missing cover or title seems "bad")
    if (!result.coverUrl || !result.synopsis) {
      console.log(`[Metadata] Enriching "${result.title}" via AniList...`);
      const extraData = await this.enricher.searchByTitle(result.title);
      
      if (extraData) {
        if (extraData.coverUrl && !result.coverUrl) {
            result.coverUrl = extraData.coverUrl;
            console.log('   + Cover added');
        }
        if (extraData.synopsis && !result.synopsis) {
            result.synopsis = extraData.synopsis;
            console.log('   + Synopsis added');
        }
      }
    }

    return result;
  }

  async search(query: string): Promise<ComicMetadata[]> {
    // Not implemented for now, required by interface
    return [];
  }
}
