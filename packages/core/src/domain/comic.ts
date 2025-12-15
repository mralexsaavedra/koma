export type ComicId = string;

export enum CollectionStatus {
  WANTED = "WANTED",
  OWNED = "OWNED",
  READ = "READ",
}

export class Comic {
  constructor(
    public readonly id: ComicId,
    public readonly isbn: string,
    public title: string,
    public publisher: string,
    public authors: string[],
    public status: CollectionStatus,
    public coverUrl?: string,
    public synopsis?: string,
    public acquiredAt?: Date,
  ) {}

  markAsRead() {
    this.status = CollectionStatus.READ;
  }
}
