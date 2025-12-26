"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useLoans } from "@/hooks/useLoans";

export default function LoansPage() {
  const { data } = useLoans();

  return (
    <Card className="w-[90%] mx-auto mt-8">
      <CardHeader>
        <CardTitle>Ongoing Loans</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Borrower</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Outstanding</TableHead>
              <TableHead>LTV</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.map(l => (
              <TableRow key={l.id}>
                <TableCell>{l.loanApplication.borrower.fullName}</TableCell>
                <TableCell>{l.loanApplication.loanProduct.name}</TableCell>
                <TableCell>₹{l.outstanding}</TableCell>
                <TableCell>{l.currentLTV?.toFixed(2) ?? "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
