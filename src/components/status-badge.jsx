import { Badge } from "@/components/ui/badge";

export function StatusBadge({ value }) {
  const variant = {
    DRAFT: "secondary",
    ELIGIBLE: "outline",
    APPROVED: "success",
    DISBURSED: "default",
    CLOSED: "destructive"
  }[value] || "outline";

  return (
    <Badge variant={variant} className="px-3 py-1 rounded-full">
      {value}
    </Badge>
  );
}
