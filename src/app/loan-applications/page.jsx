"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useLoanApplications } from "@/hooks/useLoanApplications";

const statusMap = {
  DRAFT: "secondary",
  ELIGIBLE: "outline",
  APPROVED: "success",
  DISBURSED: "default",
};

export default function LoanApplicationsPage() {
  const { data } = useLoanApplications();

  return (
    <Card className="w-[90%] mx-auto mt-8">
      <CardHeader>
        <CardTitle>Loan Applications</CardTitle>
      </CardHeader>

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
              <TableRow key={a.id}>
                <TableCell>{a.borrower.fullName}</TableCell>
                <TableCell>{a.loanProduct.name}</TableCell>
                <TableCell>₹{a.requestedAmount}</TableCell>
                <TableCell>
                  <Badge variant={statusMap[a.status] || "outline"}>
                    {a.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
