import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { BellRingIcon, UserMinus } from "lucide-react";

interface SubscriptionButtonProps {
  onClick: ButtonProps["onClick"];
  disabled: boolean;
  isSubscribed: boolean;
  className?: string;
  size?: ButtonProps["size"];
}

export const SubscriptionButton = ({
  onClick,
  disabled,
  isSubscribed,
  className,
  size,
}: SubscriptionButtonProps) => {
  return (
    <Button
      size={size}
      variant={isSubscribed ? "secondary" : "default"}
      className={cn("rounded-xl", className)}
      onClick={onClick}
      disabled={disabled}
    >
      {isSubscribed ? (
        <div className="flex items-center justify-center gap-x-2">
          <p>Unsubscribe</p>
          <UserMinus className="size-5" />
        </div>
      ) : (
        <div className="flex items-center justify-center gap-x-2">
          <p>Subscribe</p>
          <BellRingIcon className="size-5" />
        </div>
      )}
    </Button>
  );
};
