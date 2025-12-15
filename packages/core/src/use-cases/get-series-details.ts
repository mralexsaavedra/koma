import { Comic } from "../domain/comic";
import { SeriesTitleNormalizer } from "../domain/services/series-title-normalizer";
import { ComicMetadata } from "../ports/metadata-provider";
import { GetComicDetailsUseCase } from "./get-comic-details";
import { SearchComicsExternalUseCase } from "./search-comics-external";

export interface SeriesDetails {
  series: Comic;
  volumes: ComicMetadata[];
}

export class GetSeriesDetailsUseCase {
  constructor(
    private readonly getComicDetails: GetComicDetailsUseCase,
    private readonly searchComics: SearchComicsExternalUseCase,
  ) {}

  async execute(idOrIsbn: string): Promise<SeriesDetails | null> {
    // 1. Get the "seed" comic/series info
    const comic = await this.getComicDetails.execute({ idOrIsbn });

    if (!comic) {
      return null;
    }

    // 2. Normalize title to find related volumes
    const seriesTitle = SeriesTitleNormalizer.normalize(comic.title);
    const query = seriesTitle.length > 1 ? seriesTitle : comic.title;

    // 3. Search for all volumes in the series
    const volumes = await this.searchComics.execute({
      query: query,
      groupBySeries: false, // We want individual volumes
    });

    return {
      series: comic,
      volumes: volumes,
    };
  }
}
