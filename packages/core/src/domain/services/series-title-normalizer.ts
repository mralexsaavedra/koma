export class SeriesTitleNormalizer {
  static normalize(title: string): string {
    return title
      .replace(/\b(vol|no|volume|part|v)\.?\s*\d+(\s*\/\s*\d+)?/gi, "") // Remove "Vol 1", "No. 19/72"
      .replace(/#\d+/g, "") // Remove "#19"
      .replace(/\s\d+\/\d+/g, "")
      .replace(/[^\w\s]/g, "") // Remove special chars but keep spaces
      .replace(/\s+/g, " ") // Normalize spaces
      .trim();
  }
}
