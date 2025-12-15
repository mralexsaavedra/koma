import { SeriesTitleNormalizer } from "../domain/services/series-title-normalizer";
import { ComicMetadata, IMetadataProvider } from "../ports/metadata-provider";

export interface SearchComicsExternalInput {
  query: string;
  groupBySeries?: boolean;
}

export class SearchComicsExternalUseCase {
  constructor(private readonly metadataProvider: IMetadataProvider) {}

  async execute(input: SearchComicsExternalInput): Promise<ComicMetadata[]> {
    if (!input.query || input.query.trim().length === 0) {
      return [];
    }

    // Increase limit to try and fetch more of the collection (Google max is usually 40 per request)
    // For a real production app, we would need recursive pagination here.
    const results = await this.metadataProvider.search(input.query);

    // Default to true if undefined
    if (input.groupBySeries === false) {
      return this.sortResults(results);
    }

    return this.groupAndDeduplicate(results);
  }

  private sortResults(results: ComicMetadata[]): ComicMetadata[] {
    return results.sort((a, b) => {
      // Extract numbers from titles like "Naruto 1", "Naruto Vol. 1", "Naruto #1", "Naruto no 63/72"
      const getNumber = (title: string) => {
        const match =
          title.match(/(?:vol\.?|no\.?|#|v)?\s*(\d+)(\s*\/\s*\d+)?$/i) ||
          title.match(/(\d+)$/); // Fallback to just number at end
        return match ? parseInt(match[1], 10) : 999999;
      };

      const numA = getNumber(a.title);
      const numB = getNumber(b.title);

      if (numA !== numB) {
        return numA - numB;
      }

      // Fallback to title string comparison
      return a.title.localeCompare(b.title);
    });
  }

  private groupAndDeduplicate(results: ComicMetadata[]): ComicMetadata[] {
    const groups = new Map<string, ComicMetadata>();

    for (const result of results) {
      // 1. Normalize title to identify series
      let seriesTitle = SeriesTitleNormalizer.normalize(
        result.title,
      ).toLowerCase();

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
