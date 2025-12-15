export class SeriesTitleNormalizer {
  static normalize(title: string): string {
    return title
      .replace(/\b(vol|no|volume|part|v)\.?\s*\d+(\s*\/\s*\d+)?/gi, "")
      .replace(/#\d+/g, "")
      .replace(/\s\d+\/\d+/g, "")
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }
}
