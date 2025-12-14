import { ComicMetadata } from "@koma/core";

export interface IEnrichmentSource {
  searchByTitle(title: string): Promise<Partial<ComicMetadata> | null>;
}

interface AniListResponse {
  data?: {
    Media?: {
      title: {
        romaji: string;
        english?: string;
        native?: string;
      };
      coverImage: {
        extraLarge: string;
      };
      description?: string;
    };
  };
}

export class AniListAdapter implements IEnrichmentSource {
  async searchByTitle(title: string): Promise<Partial<ComicMetadata> | null> {
    const cleanTitle = title.replace(/\d+$/, "").trim();

    const query = `
      query ($search: String) {
        Media (search: $search, type: MANGA) {
          title { romaji english native }
          coverImage { extraLarge }
          bannerImage
          description
        }
      }
    `;

    const url = "https://graphql.anilist.co";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables: { search: cleanTitle } }),
    };

    try {
      const res = await fetch(url, options);
      const data = (await res.json()) as AniListResponse;
      const media = data.data?.Media;

      if (!media) return null;

      return {
        title: media.title.english || media.title.romaji,
        coverUrl: media.coverImage.extraLarge,
        synopsis: media.description,
      };
    } catch {
      return null;
    }
  }
}
