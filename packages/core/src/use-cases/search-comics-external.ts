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
    const results = await this.metadataProvider.search(input.query);
    return this.groupAndDeduplicate(results);
  }

  private groupAndDeduplicate(results: ComicMetadata[]): ComicMetadata[] {
    const groups = new Map<string, ComicMetadata>();

    for (const result of results) {
      // 1. Normalize title to identify series
      // Remove "Vol. 1", "#1", "No 1", "No 19/72", etc.
      let seriesTitle = result.title
        .toLowerCase()
        .replace(/\b(vol|no|volume|part|v)\.?\s*\d+(\s*\/\s*\d+)?/g, "") // Vol. 1, No 19/72
        .replace(/#\d+/g, "") // #1
        .replace(/\s\d+\s*(\/\s*\d+)?$/g, "") // " 63" or " 63/72" at end
        .replace(/[^\w\s]/g, "") // Remove remaining special chars like / or - to be safe
        .replace(/\s+/g, " ")
        .trim();

      // If it's very short (e.g. just a number), ignore this heuristic and keep original
      if (seriesTitle.length < 2) {
        seriesTitle = result.title.toLowerCase();
      }

      const existing = groups.get(seriesTitle);

      if (!existing) {
        groups.set(seriesTitle, result);
        continue;
      }

      // 2. Selection Strategy:
      // Prefer AniList (starts with AL-) over Google Books
      const isExistingAniList = existing.isbn.startsWith("AL-");
      const isCurrentAniList = result.isbn.startsWith("AL-");

      if (isCurrentAniList && !isExistingAniList) {
        groups.set(seriesTitle, result);
        continue;
      }

      if (isExistingAniList && !isCurrentAniList) {
        continue; // Keep existing
      }

      // If same source type, prefer the one with the shorter original title
      // but TRY TO KEEP THE BEST COVER if possible

      if (result.title.length < existing.title.length) {
        // We are swapping to the new result because it has a shorter title.
        // If the OLD result had a cover and the NEW one doesn't, we might want to carry it over?
        // Typically shorter title is better, but let's check cover.
        if (existing.coverUrl && !result.coverUrl) {
          result.coverUrl = existing.coverUrl;
        }
        groups.set(seriesTitle, result);
      } else {
        // We are keeping the existing result.
        // But if the new result has a cover and existing doesn't, take the cover.
        if (result.coverUrl && !existing.coverUrl) {
          existing.coverUrl = result.coverUrl;
          // We don't need to groups.set because we modified the reference in place
        }
      }
    }

    return Array.from(groups.values());
  }
}
