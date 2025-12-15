import { CollectionStatus, Comic, ComicMetadata } from "@koma/core";

import { ComicViewModel } from "@/presentation/view-models/comic-view-model";

export class ComicMapper {
  static toViewModel(comic: Comic | ComicMetadata): ComicViewModel {
    // Determine ID: Comic has 'id', Metadata uses 'isbn' or 'id' if available
    const id = "id" in comic ? comic.id : comic.isbn || "unknown";

    // Determine Status: Comic has it, Metadata defaults to WANTED
    const status = "status" in comic ? comic.status : CollectionStatus.WANTED;

    // Determine AcquiredAt: Comic has it, Metadata doesn't
    const acquiredAt = "acquiredAt" in comic ? comic.acquiredAt : undefined;

    return {
      id,
      isbn: comic.isbn,
      title: comic.title,
      publisher: comic.publisher || "",
      authors: comic.authors || [],
      status,
      coverUrl: comic.coverUrl,
      synopsis: comic.synopsis,
      acquiredAt,
    };
  }

  static toViewModelList(comics: (Comic | ComicMetadata)[]): ComicViewModel[] {
    return comics.map(this.toViewModel);
  }
}
