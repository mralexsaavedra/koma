import { AddComicUseCase } from '@koma/core';
import { PrismaComicRepository } from '@koma/database';
import { MetadataService, GoogleBooksAdapter, AniListAdapter } from '@koma/metadata';

async function main() {
  console.log('🚀 Starting Koma Integration Test...');

  // 1. Setup Infrastructure
  const comicRepo = new PrismaComicRepository();
  const metadataProvider = new MetadataService(
    [new GoogleBooksAdapter()],
    new AniListAdapter()
  );

  // 2. Setup Application Layer
  const addComicUseCase = new AddComicUseCase(comicRepo, metadataProvider);

  // 3. Execute Use Case
  // ISBN for "Yona of the Dawn, Vol. 28"
  const TEST_ISBN = "9788467942606"; 
  
  console.log(`\n📚 Adding comic with ISBN: ${TEST_ISBN}`);

  try {
    const comic = await addComicUseCase.execute({ isbn: TEST_ISBN });
    console.log("\n✅ Comic added successfully:");
    console.log(JSON.stringify(comic, null, 2));
  } catch (error) {
    if (error instanceof Error && error.message.includes('already exists')) {
       console.log('\n⚠️ Comic already exists in DB.');
    } else {
       console.error("\n❌ Error adding comic:", error);
    }
  }
}

main();
