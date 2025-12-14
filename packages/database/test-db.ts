import { PrismaComicRepository } from './src/repositories/prisma-comic-repo';
import { Comic, CollectionStatus } from '@koma/core';

// Generador de IDs "barato" para la prueba
const randomId = () => Math.random().toString(36).substring(2, 15);

(async () => {
  const repo = new PrismaComicRepository();

  console.log('💾 Intentando guardar un cómic en SQLite...');

  // Creamos una entidad de Dominio pura (sin saber nada de Prisma)
  const myComic = new Comic(
    randomId(),
    '978-84-00000-00-1', // ISBN Falso
    'Test Comic: La Venganza de Prisma', // Título
    'Editorial Koma',
    ['Alex Saavedra', 'Gemini AI'], // Array de autores (Probando JSON serialization)
    CollectionStatus.OWNED,
    'https://via.placeholder.com/150',
    new Date()
  );

  try {
    await repo.save(myComic);
    console.log('✅ Cómic guardado correctamente.');

    console.log('🔎 Consultando la BD para verificar...');
    const savedComic = await repo.findByIsbn('978-84-00000-00-1');

    if (savedComic) {
      console.log('📦 RECUPERADO EXITOSAMENTE:');
      console.log('   Título:', savedComic.title);
      console.log('   Autores:', savedComic.authors); // ¿Sigue siendo un array?
      console.log('   Estado:', savedComic.status);
    } else {
      console.error('❌ Error: No se encontró el cómic después de guardarlo.');
    }
  } catch (error) {
    console.error('💥 Explotó:', error);
  }
})();