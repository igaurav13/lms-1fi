"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

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
    mutationFn: async () =>
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
    <Card className="w-[90%] mx-auto mt-8">
      <CardHeader>
        <CardTitle>Create Loan Application</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        <Select onValueChange={setBorrowerId}>
          <SelectTrigger>
            <SelectValue placeholder="Select Borrower" />
          </SelectTrigger>
          <SelectContent>
            {borrowers?.map(b => (
              <SelectItem key={b.id} value={b.id}>{b.fullName}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setLoanProductId}>
          <SelectTrigger>
            <SelectValue placeholder="Select Product" />
          </SelectTrigger>
          <SelectContent>
            {products?.map(p => (
              <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
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
  );
}
