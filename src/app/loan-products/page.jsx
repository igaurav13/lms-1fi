"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useLoanProducts } from "@/hooks/useLoanProducts";

export default function LoanProductsPage() {
  const { data, isLoading } = useLoanProducts();

  return (
    <Card className="w-[90%] mx-auto mt-8">
      <CardHeader>
        <CardTitle>Loan Products</CardTitle>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <Skeleton className="h-40 w-full" />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Interest</TableHead>
                <TableHead>Max LTV</TableHead>
                <TableHead>Range</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.map(p => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.interestRate}%</TableCell>
                  <TableCell>{p.maxLTV}</TableCell>
                  <TableCell>
                    {p.minLoanAmount} — {p.maxLoanAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
