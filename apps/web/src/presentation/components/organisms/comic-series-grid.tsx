import { IssueCard } from "@/presentation/components/molecules/issue-card";
import { ComicViewModel } from "@/presentation/view-models/comic-view-model";

interface ComicSeriesGridProps {
  comics: ComicViewModel[];
}

export const ComicSeriesGrid = ({ comics }: ComicSeriesGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
      {comics.map((issue) => (
        <IssueCard key={issue.isbn} comic={issue} />
      ))}
    </div>
  );
};
