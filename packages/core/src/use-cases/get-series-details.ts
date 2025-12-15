import { CollectionStatus, Comic } from "../domain/comic";
import { SeriesTitleNormalizer } from "../domain/services/series-title-normalizer";
import { IComicRepository } from "../ports/comic-repository";
import { GetComicDetailsUseCase } from "./get-comic-details";
import { SearchComicsExternalUseCase } from "./search-comics-external";

export interface SeriesDetails {
  series: Comic;
  volumes: Comic[];
}

export class GetSeriesDetailsUseCase {
  constructor(
    private readonly getComicDetails: GetComicDetailsUseCase,
    private readonly searchComics: SearchComicsExternalUseCase,
    private readonly comicRepo: IComicRepository,
  ) {}

  async execute(idOrIsbn: string): Promise<SeriesDetails | null> {
    const comic = await this.getComicDetails.execute({ idOrIsbn });

    if (!comic) {
      return null;
    }

    const seriesTitle = SeriesTitleNormalizer.normalize(comic.title);
    const query = seriesTitle.length > 1 ? seriesTitle : comic.title;

    const metadataVolumes = await this.searchComics.execute({
      query: query,
      groupBySeries: false,
    });

    const myComics = await this.comicRepo.listAll();
    const myComicsMap = new Map(myComics.map((c) => [c.isbn, c]));

    const volumes: Comic[] = metadataVolumes.map((meta) => {
      const owned = myComicsMap.get(meta.isbn);
      if (owned) return owned;

      return new Comic(
        "ephemeral",
        meta.isbn,
        meta.title,
        meta.publisher,
        meta.authors,
        CollectionStatus.WANTED,
        meta.coverUrl,
        meta.synopsis,
        undefined,
      );
    });

    return {
      series: comic,
      volumes: volumes,
    };
  }
}
