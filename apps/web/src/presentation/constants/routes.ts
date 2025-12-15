export const APP_ROUTES = {
  HOME: "/",
  LIBRARY: "/library",
  COMIC_DETAIL: (id: string) => `/comics/${id}`,
  SERIES_DETAIL: (id: string) => `/series/${id}`,
} as const;
