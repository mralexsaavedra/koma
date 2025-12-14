import { IComicRepository, Comic } from '@koma/core';
import { prisma } from '../client.js'; // Tu instancia de Prisma Client
import { ComicMapper } from '../mappers/comic-mapper.js';

export class PrismaComicRepository implements IComicRepository {
  async save(comic: Comic): Promise<void> {
    const data = ComicMapper.toPersistence(comic);
    
    // Upsert: Si existe actualiza, si no crea
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

  async listAll(): Promise<Comic[]> {
    const rawList = await prisma.comic.findMany();
    return rawList.map(ComicMapper.toDomain);
  }
}