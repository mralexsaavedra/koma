import { CollectionStatus, Comic } from "../domain/comic";
import { SeriesTitleNormalizer } from "../domain/services/series-title-normalizer";
import { IComicRepository } from "../ports/comic-repository";
import { GetComicDetailsUseCase } from "./get-comic-details";
import { SearchComicsExternalUseCase } from "./search-comics-external";

export interface SeriesDetails {
  series: Comic;
  volumes: Comic[]; // Return full Comic domain objects (persisted or ephemeral)
}

export class GetSeriesDetailsUseCase {
  constructor(
    private readonly getComicDetails: GetComicDetailsUseCase,
    private readonly searchComics: SearchComicsExternalUseCase,
    private readonly comicRepo: IComicRepository,
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

    // 3. Search for all volumes in the series (metadata)
    const metadataVolumes = await this.searchComics.execute({
      query: query,
      groupBySeries: false,
    });

    // 4. Fetch user's owned comics to check status
    // Optimization: We could search by simplified title or just listAll if dataset is small.
    // For now, let's listAll and match by ISBN for 100% accuracy, assuming local library isn't massive.
    // A better approach in a real backend would be `repo.findByIsbns(list)`
    const myComics = await this.comicRepo.listAll();
    const myComicsMap = new Map(myComics.map((c) => [c.isbn, c]));

    // 5. Merge Metadata with Ownership
    const volumes: Comic[] = metadataVolumes.map((meta) => {
      const owned = myComicsMap.get(meta.isbn);
      if (owned) return owned;

      // Create ephemeral comic for unowned volume
      return new Comic(
        "ephemeral",
        meta.isbn,
        meta.title,
        meta.publisher,
        meta.authors,
        CollectionStatus.WANTED, // Default status
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
