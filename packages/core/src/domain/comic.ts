export type ComicId = string;

// Value Object para el estado (ejemplo DDD)
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
    public acquiredAt?: Date,
  ) {}

  // Lógica de dominio aquí (no solo datos)
  markAsRead() {
    this.status = CollectionStatus.READ;
  }
}
