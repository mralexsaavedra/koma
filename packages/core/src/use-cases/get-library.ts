import { Comic } from "../domain/comic";
import { SeriesTitleNormalizer } from "../domain/services/series-title-normalizer";
import { IComicRepository } from "../ports/comic-repository";

export interface LibrarySeries {
  seriesTitle: string;
  representativeComic: Comic;
  totalVolumes: number;
  comics: Comic[];
}

export class GetLibraryUseCase {
  constructor(private readonly comicRepo: IComicRepository) {}

  async execute(): Promise<LibrarySeries[]> {
    const allComics = await this.comicRepo.listAll();

    const seriesMap = new Map<string, Comic[]>();

    for (const comic of allComics) {
      const normalizedTitle = SeriesTitleNormalizer.normalize(comic.title);
      if (!seriesMap.has(normalizedTitle)) {
        seriesMap.set(normalizedTitle, []);
      }
      seriesMap.get(normalizedTitle)!.push(comic);
    }

    const library: LibrarySeries[] = [];

    for (const [title, comics] of seriesMap.entries()) {
      comics.sort((a, b) => {
        return a.title.localeCompare(b.title, undefined, {
          numeric: true,
          sensitivity: "base",
        });
      });

      const representative = comics[0];

      library.push({
        seriesTitle: title,
        representativeComic: representative,
        totalVolumes: comics.length,
        comics: comics,
      });
    }

    return library.sort((a, b) => a.seriesTitle.localeCompare(b.seriesTitle));
  }
}
