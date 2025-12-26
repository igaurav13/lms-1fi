"use client";

import { PageShell } from "@/components/page-shell";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

import { StatusBadge } from "@/components/status-badge";
import { useLoans } from "@/hooks/useLoans";

export default function LoansPage() {
  const { data } = useLoans();

  return (
    <PageShell>

      <PageHeader
        title="Ongoing Loans"
        subtitle="Active disbursed LAMF accounts currently under servicing"
      />

      <Card className="rounded-(--radius-card)
        border border-[rgba(108,40,217,.12)]
        shadow-[0_16px_36px_rgba(108,40,217,0.08)]">

        <CardContent>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Borrower</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Outstanding</TableHead>
                <TableHead>LTV</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.map(l => (
                <TableRow key={l.id} className="hover:bg-surface/50">
                  <TableCell>{l.loanApplication.borrower.fullName}</TableCell>
                  <TableCell>{l.loanApplication.loanProduct.name}</TableCell>
                  <TableCell>₹{l.outstanding}</TableCell>
                  <TableCell>{l.currentLTV?.toFixed(2) ?? "-"}</TableCell>
                  <TableCell>
                    <StatusBadge value={l.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </CardContent>
      </Card>

    </PageShell>
  );
}
