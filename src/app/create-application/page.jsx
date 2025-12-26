"use client";

import { PageShell } from "@/components/page-shell";
import { PageHeader } from "@/components/page-header";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

import { useBorrowers } from "@/hooks/useBorrowers";
import { useLoanProducts } from "@/hooks/useLoanProducts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

import { useState } from "react";

export default function CreateApplicationPage() {
  const { data: borrowers } = useBorrowers();
  const { data: products } = useLoanProducts();
  const client = useQueryClient();

  const [borrowerId, setBorrowerId] = useState("");
  const [loanProductId, setLoanProductId] = useState("");
  const [amount, setAmount] = useState("");

  const mutation = useMutation({
    mutationFn: () =>
      api.post("/loan-applications", {
        borrowerId,
        loanProductId,
        requestedAmount: Number(amount)
      }),
    onSuccess: () => {
      client.invalidateQueries(["loan-applications"]);
      alert("Application Created");
    }
  });

  return (
    <PageShell>

      <PageHeader
        title="Create Loan Application"
        subtitle="NBFC onboarding — API-first application creation"
      />

      <Card className="rounded-[1.25rem]
        border border-[rgba(108,40,217,.12)]
        shadow-[0_16px_36px_rgba(108,40,217,0.08)]">

        <CardContent className="space-y-4">

          <Select onValueChange={setBorrowerId}>
            <SelectTrigger>
              <SelectValue placeholder="Select Borrower" />
            </SelectTrigger>
            <SelectContent>
              {borrowers?.map(b => (
                <SelectItem value={b.id} key={b.id}>
                  {b.fullName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setLoanProductId}>
            <SelectTrigger>
              <SelectValue placeholder="Select Loan Product" />
            </SelectTrigger>
            <SelectContent>
              {products?.map(p => (
                <SelectItem value={p.id} key={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            type="number"
            placeholder="Requested Amount"
            onChange={e => setAmount(e.target.value)}
          />

          <Button onClick={() => mutation.mutate()}>
            Create Application
          </Button>

        </CardContent>
      </Card>

    </PageShell>
  );
}
