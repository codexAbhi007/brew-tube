import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  TooltipContent,
  Tooltip,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const userInfoVariants = cva("flex items-center gap-1", {
  variants: {
    size: {
      default: "[&_p]:text-sm [&_svg]:size-4",
      lg: "[&_p]:text-base [&_svg]:size-5 [&_p]:font-medium [&_p]:text-black [&_p]:dark:text-white",
      sm: "[&_p]:text-xs [&_svg]:size-3.5",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface UserInfoProps extends VariantProps<typeof userInfoVariants> {
  name: string;
  className?: string;
}

export const UserInfo = ({ name, className, size }: UserInfoProps) => {
  return (
    <div className={cn(userInfoVariants({ size, className }))}>
      <Tooltip>
        <TooltipTrigger>
          <p className="text-muted-foreground hover:text-gray-800 dark:hover:text-white   line-clamp-1">
            {name}
          </p>
        </TooltipTrigger>
        <TooltipContent align="center" className="">
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
