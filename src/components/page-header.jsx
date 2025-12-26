import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function PageHeader({ title, subtitle, action }) {
  return (
    <Card className="rounded-[1.25rem]
      bg-linear-to-b from-[#f7f3ff] to-white
      border border-[rgba(108,40,217,.14)]
      shadow-sm">

      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl text-primary">{title}</CardTitle>

          {subtitle && (
            <CardDescription className="mt-1 text-muted">
              {subtitle}
            </CardDescription>
          )}
        </div>

        {action}
      </CardHeader>
    </Card>
  );
}
