export const APP_ROUTES = {
  HOME: "/",
  LIBRARY: "/library",
  COMIC_DETAIL: (id: string) => `/comics/${id}`,
} as const;
