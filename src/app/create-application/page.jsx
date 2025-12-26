"use client";

import { PageShell } from "@/components/page-shell";
import { PageHeader } from "@/components/page-header";

import {
  Card,
  CardContent
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

import { useBorrowers } from "@/hooks/useBorrowers";
import { useLoanProducts } from "@/hooks/useLoanProducts";

import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

        <CardContent className="space-y-8 mt-2">

          {/* ---- FORM GRID ---- */}
          <div className="grid grid-cols-2 gap-6">

            {/* BORROWER FIELD */}
            <div className="space-y-2">
              <p className="text-sm text-muted">Borrower</p>

              <Select onValueChange={setBorrowerId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Borrower" />
                </SelectTrigger>

                <SelectContent>
                  {borrowers?.map(b => (
                    <SelectItem key={b.id} value={b.id}>
                      {b.fullName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* PRODUCT FIELD */}
            <div className="space-y-2">
              <p className="text-sm text-muted">Loan Product</p>

              <Select onValueChange={setLoanProductId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Loan Product" />
                </SelectTrigger>

                <SelectContent>
                  {products?.map(p => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

          </div>

          {/* ---- AMOUNT FIELD ---- */}
          <div className="space-y-2">
            <p className="text-sm text-muted">Requested Loan Amount</p>

            <Input
              type="number"
              placeholder="Enter Amount"
              onChange={e => setAmount(e.target.value)}
            />
          </div>

          {/* ---- ACTION BAR ---- */}
          <div className="flex justify-end pt-2 border-t">
            <Button onClick={() => mutation.mutate()}>
              Create Application
            </Button>
          </div>

        </CardContent>
      </Card>

    </PageShell>
  );
}
