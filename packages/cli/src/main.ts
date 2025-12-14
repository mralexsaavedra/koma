import { AddComicUseCase } from "@koma/core";
import { PrismaComicRepository } from "@koma/database";
import {
  MetadataService,
  GoogleBooksAdapter,
  AniListAdapter,
} from "@koma/metadata";

async function main() {
  process.stdout.write("🚀 Starting Koma Integration Test...\n");

  // 1. Setup Infrastructure
  const comicRepo = new PrismaComicRepository();
  const metadataProvider = new MetadataService(
    [new GoogleBooksAdapter()],
    new AniListAdapter(),
  );

  // 2. Setup Application Layer
  const addComicUseCase = new AddComicUseCase(comicRepo, metadataProvider);

  // 3. Execute Use Case
  // ISBN for "Yona of the Dawn, Vol. 28"
  const TEST_ISBN = "9788467942606";

  process.stdout.write(`\n📚 Adding comic with ISBN: ${TEST_ISBN}\n`);

  try {
    const comic = await addComicUseCase.execute({ isbn: TEST_ISBN });
    process.stdout.write("\n✅ Comic added successfully:\n");
    process.stdout.write(JSON.stringify(comic, null, 2) + "\n");
  } catch (error) {
    if (error instanceof Error && error.message.includes("already exists")) {
      process.stdout.write("\n⚠️ Comic already exists in DB.\n");
    } else {
      process.stderr.write(`\n❌ Error adding comic: ${error}\n`);
    }
  }
}

main();
