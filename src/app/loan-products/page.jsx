"use client";

import { PageShell } from "@/components/page-shell";
import { PageHeader } from "@/components/page-header";

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

import { useLoanProducts } from "@/hooks/useLoanProducts";

export default function LoanProductsPage() {
  const { data } = useLoanProducts();

  return (
    <PageShell>

      <PageHeader
        title="Loan Products"
        subtitle="Configured LAMF lending products & risk parameters"
      />

      <Card className="rounded-[1.25rem]
        border border-[rgba(108,40,217,.12)]
        shadow-[0_16px_36px_rgba(108,40,217,0.08)]">

        <CardContent>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Interest</TableHead>
                <TableHead>Max LTV</TableHead>
                <TableHead>Loan Range</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.map(p => (
                <TableRow key={p.id} className="hover:bg-surface/50">
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.interestRate}%</TableCell>
                  <TableCell>{p.maxLTV}</TableCell>
                  <TableCell>
                    ₹{p.minLoanAmount} — ₹{p.maxLoanAmount}
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
