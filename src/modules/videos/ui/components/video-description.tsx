import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

interface VideoDescriptionProps {
  compactViews: string;
  expandedViews: string;
  compactDate: string;
  expandedDate: string;
  description?: string | null;
}

export const VideoDescription = ({
  compactViews,
  expandedViews,
  compactDate,
  expandedDate,
  description,
}: VideoDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-secondary/50 rounded-xl p-3 hover:bg-secondary/70 transition">
      <div className="flex gap-2 text-sm mb-2">
        <span className="font-medium">
          {isExpanded ? expandedViews : compactViews} views
        </span>
        <span className="font-medium">
          {isExpanded ? expandedDate : compactDate}
        </span>
      </div>

      <p className={cn("text-sm whitespace-pre-wrap", !isExpanded && "line-clamp-2")}>
        {description || "No description"}
      </p>

      <div className="flex items-center gap-1 mt-4 text-sm font-medium">
        <Button
          onClick={() => setIsExpanded(c => !c)}
          className="!p-0 bg-secondary/50 border-none shadow-none hover:cursor-pointer active:scale-95 transition duration-200"
          variant="secondary"
        >
          {isExpanded ? "Show Less" : "Show More"}
          <ChevronDownIcon
            className={cn(
              "size-4 transform transition-transform duration-200 ease-in-out",
              isExpanded && "rotate-180"
            )}
          />
        </Button>
      </div>
    </div>
  );
};
