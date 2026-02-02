import { LucideIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "./tooltip";

import { Button } from "./button"; // Assuming you have a Shadcn button

interface TooltipButtonProps {
  icon: LucideIcon;
  title: string;
  onClick?: () => void;
  description?: string;
  side?: "top" | "right" | "bottom" | "left" | undefined;
  align?: "end" | "center" | "start" | undefined;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  disabled?: any;
  size?: "icon-sm" | "icon" | "icon-lg" | null | undefined;
}

export function TooltipButton({
  icon: Icon, // Rename to uppercase so it can be used as a component
  title,
  onClick,
  description,
  side = "bottom",
  align,
  variant = "ghost",
  disabled,
  size = "icon-lg",
}: TooltipButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* We use asChild to prevent nesting a button inside a button */}
          <Button
            size={size}
            variant={variant}
            className="rounded-full"
            onClick={onClick}
            disabled={disabled}
          >
            <Icon className="h-4 w-4" />
            <span className="sr-only">{title}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <div className="flex flex-col gap-1">
            <p className="font-medium">{title}</p>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}