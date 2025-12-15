import { Comic } from "../domain/comic";
import { SeriesTitleNormalizer } from "../domain/services/series-title-normalizer";
import { IComicRepository } from "../ports/comic-repository";

export interface LibrarySeries {
  seriesTitle: string;
  representativeComic: Comic; // The comic to show (cover, metadata)
  totalVolumes: number;
  comics: Comic[];
}

export class GetLibraryUseCase {
  constructor(private readonly comicRepo: IComicRepository) {}

  async execute(): Promise<LibrarySeries[]> {
    const allComics = await this.comicRepo.listAll();

    const seriesMap = new Map<string, Comic[]>();

    // 1. Group by normalized series title
    for (const comic of allComics) {
      const normalizedTitle = SeriesTitleNormalizer.normalize(comic.title);
      if (!seriesMap.has(normalizedTitle)) {
        seriesMap.set(normalizedTitle, []);
      }
      seriesMap.get(normalizedTitle)!.push(comic);
    }

    // 2. Transform into LibrarySeries objects
    const library: LibrarySeries[] = [];

    for (const [title, comics] of seriesMap.entries()) {
      // Sort comics by volume number/title if needed, but for now we just want a representative
      // Ideally pick volume 1 or the earliest volume as representative
      const representative = comics[0]; // Simplification for now

      library.push({
        seriesTitle: title,
        representativeComic: representative,
        totalVolumes: comics.length,
        comics: comics,
      });
    }

    // 3. Sort library by series title A-Z
    return library.sort((a, b) => a.seriesTitle.localeCompare(b.seriesTitle));
  }
}
