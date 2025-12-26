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
    <Badge variant={variant} className="px-4 py-2 rounded-lg border-[#6c28d9] bg-white">
      {value}
    </Badge>
  );
}
