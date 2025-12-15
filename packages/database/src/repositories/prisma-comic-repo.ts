import { Comic, IComicRepository } from "@koma/core";

import { prisma } from "../client";
import { ComicMapper } from "../mappers/comic-mapper";

export class PrismaComicRepository implements IComicRepository {
  async save(comic: Comic): Promise<void> {
    const data = ComicMapper.toPersistence(comic);

    await prisma.comic.upsert({
      where: { isbn: comic.isbn },
      update: data,
      create: data,
    });
  }

  async findByIsbn(isbn: string): Promise<Comic | null> {
    const raw = await prisma.comic.findUnique({ where: { isbn } });
    if (!raw) return null;
    return ComicMapper.toDomain(raw);
  }

  async findById(id: string): Promise<Comic | null> {
    const raw = await prisma.comic.findUnique({ where: { id } });
    if (!raw) return null;
    return ComicMapper.toDomain(raw);
  }

  async listAll(): Promise<Comic[]> {
    const rawList = await prisma.comic.findMany();
    return rawList.map(ComicMapper.toDomain);
  }
}
