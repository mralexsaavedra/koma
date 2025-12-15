import { ComicMetadata } from "@koma/core";

import { IMetadataSource } from "./google-books";

export interface IEnrichmentSource {
  searchByTitle(title: string): Promise<Partial<ComicMetadata> | null>;
}

interface AniListResponse {
  data?: {
    Page?: {
      media?: Array<{
        id: number;
        title: {
          romaji: string;
          english?: string;
          native?: string;
        };
        coverImage: {
          extraLarge: string;
        };
        description?: string;
        staff?: {
          edges?: Array<{
            role: string;
            node: {
              name: {
                full: string;
              };
            };
          }>;
        };
      }>;
    };
    Media?: {
      id: number;
      title: {
        romaji: string;
        english?: string;
        native?: string;
      };
      coverImage: {
        extraLarge: string;
      };
      description?: string;
      staff?: {
        edges?: Array<{
          role: string;
          node: {
            name: {
              full: string;
            };
          };
        }>;
      };
    };
  };
}

export class AniListAdapter implements IMetadataSource, IEnrichmentSource {
  async getByIsbn(isbn: string): Promise<ComicMetadata | null> {
    // Check if it's our custom AniList ID format
    if (isbn.startsWith("AL-")) {
      const id = parseInt(isbn.replace("AL-", ""), 10);
      return this.getById(id);
    }
    return null;
  }

  private async getById(id: number): Promise<ComicMetadata | null> {
    const query = `
      query ($id: Int) {
        Media(id: $id, type: MANGA) {
          id
          title { romaji english native }
          coverImage { extraLarge }
          description
          staff(perPage: 3) {
            edges {
              role
              node {
                name { full }
              }
            }
          }
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
      body: JSON.stringify({ query, variables: { id } }),
    };

    try {
      const res = await fetch(url, options);
      const data: AniListResponse = await res.json();
      const media = data.data?.Media;

      if (!media) return null;

      return {
        isbn: `AL-${media.id}`,
        title: media.title.english || media.title.romaji,
        coverUrl: media.coverImage.extraLarge,
        synopsis: media.description || "",
        authors: media.staff?.edges?.map((e) => e.node.name.full) || [],
        publisher: "",
        pageCount: 0,
        publishedDate: undefined,
      };
    } catch {
      return null;
    }
  }

  async search(query: string): Promise<ComicMetadata[]> {
    const q = `
      query ($search: String) {
        Page(page: 1, perPage: 10) {
          media(search: $search, type: MANGA) {
            id
            title { romaji english native }
            coverImage { extraLarge }
            description
            staff(perPage: 3) {
              edges {
                role
                node {
                  name { full }
                }
              }
            }
          }
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
      body: JSON.stringify({ query: q, variables: { search: query } }),
    };

    try {
      const res = await fetch(url, options);
      const data = (await res.json()) as AniListResponse;
      const mediaList = data.data?.Page?.media || [];

      return mediaList.map((media) => ({
        // AniList doesn't provide ISBNs in the search list usually, we use a placeholder or empty.
        // We use "AL-{id}" as a pseudo-ISBN to provide a unique identifier.
        isbn: `AL-${media.id}`,
        title: media.title.english || media.title.romaji,
        coverUrl: media.coverImage.extraLarge,
        synopsis: media.description || "",
        authors: media.staff?.edges?.map((e) => e.node.name.full) || [],
        publisher: "", // AniList doesn't typically provide publisher in this view
        pageCount: 0,
        publishedDate: undefined,
      }));
    } catch {
      return [];
    }
  }

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
