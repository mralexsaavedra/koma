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

    const results = await this.metadataProvider.search(input.query);

    if (input.groupBySeries === false) {
      return this.sortResults(results);
    }

    return this.groupAndDeduplicate(results);
  }

  private sortResults(results: ComicMetadata[]): ComicMetadata[] {
    return results.sort((a, b) => {
      const getNumber = (title: string) => {
        const match =
          title.match(/(?:vol\.?|no\.?|#|v)?\s*(\d+)(\s*\/\s*\d+)?$/i) ||
          title.match(/(\d+)$/);
        return match ? parseInt(match[1], 10) : 999999;
      };

      const numA = getNumber(a.title);
      const numB = getNumber(b.title);

      if (numA !== numB) {
        return numA - numB;
      }

      return a.title.localeCompare(b.title);
    });
  }

  private groupAndDeduplicate(results: ComicMetadata[]): ComicMetadata[] {
    const groups = new Map<string, ComicMetadata>();

    for (const result of results) {
      let seriesTitle = SeriesTitleNormalizer.normalize(
        result.title,
      ).toLowerCase();

      if (seriesTitle.length < 2) {
        seriesTitle = result.title.toLowerCase();
      }

      const existing = groups.get(seriesTitle);

      if (!existing) {
        groups.set(seriesTitle, result);
        continue;
      }

      const isExistingAniList = existing.isbn.startsWith("AL-");
      const isCurrentAniList = result.isbn.startsWith("AL-");

      if (isCurrentAniList && !isExistingAniList) {
        groups.set(seriesTitle, result);
        continue;
      }

      if (isExistingAniList && !isCurrentAniList) {
        continue;
      }

      if (result.title.length < existing.title.length) {
        if (existing.coverUrl && !result.coverUrl) {
          result.coverUrl = existing.coverUrl;
        }
        groups.set(seriesTitle, result);
      } else {
        if (result.coverUrl && !existing.coverUrl) {
          existing.coverUrl = result.coverUrl;
        }
      }
    }

    return Array.from(groups.values());
  }
}
