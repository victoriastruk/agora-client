import { Badge } from "../ui/badge";
import { cn } from "../lib";

interface FlairBadgeProps {
  flair: Flair;
  size?: "sm" | "md";
}

const mockFlairs: Flair[] = [
  { label: "New", color: "#10b981" },        // зелений
  { label: "Hot", color: "#ef4444" },        // червоний
  { label: "Trending", color: "#f59e0b" },   // жовтий
  { label: "Beta", color: "#3b82f6" },       // синій
];

export const FlairBadge = ({ flair, size = "md" }: FlairBadgeProps) => (
  <Badge
    variant="secondary"
    className={cn(
      "text-xs font-medium",
      size === "sm" && "px-1.5 py-0.5 text-xs",
      flair.color && `bg-[${flair.color}] text-white border-0`
    )}
    style={flair.color ? { backgroundColor: flair.color } : undefined}
  >
    {flair.label}
  </Badge>
);
