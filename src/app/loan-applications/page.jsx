"use client";

import { PageShell } from "@/components/page-shell";
import { PageHeader } from "@/components/page-header";

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

import { StatusBadge } from "@/components/status-badge";
import { useLoanApplications } from "@/hooks/useLoanApplications";

export default function LoanApplicationsPage() {
  const { data } = useLoanApplications();

  return (
    <PageShell>

      <PageHeader
        title="Loan Applications"
        subtitle="All submitted & in-progress loan applications"
      />

      <Card className="rounded-[1.25rem]
        border border-[rgba(108,40,217,.12)]
        shadow-[0_16px_36px_rgba(108,40,217,0.08)]">

        <CardContent>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Borrower</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Requested</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.map(a => (
                <TableRow key={a.id} className="hover:bg-surface/50">
                  <TableCell>{a.borrower.fullName}</TableCell>
                  <TableCell>{a.loanProduct.name}</TableCell>
                  <TableCell>₹{a.requestedAmount}</TableCell>
                  <TableCell>
                    <StatusBadge value={a.status} />
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
