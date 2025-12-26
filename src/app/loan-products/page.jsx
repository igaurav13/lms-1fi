"use client";

import { useState } from "react";

import { PageShell } from "@/components/page-shell";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter
} from "@/components/ui/sheet";

import { useLoanProducts } from "@/hooks/useLoanProducts";
import { useCreateLoanProduct } from "@/hooks/useCreateLoanProduct";
import { PageHeader } from "@/components/page-header";


export default function LoanProductsPage() {

  const { data } = useLoanProducts();
  const createProduct = useCreateLoanProduct();

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    interestRate: "",
    maxLTV: "",
    marginCallLTV: "",
    liquidationLTV: "",
    minLoanAmount: "",
    maxLoanAmount: ""
  });

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const numericFields = [
      "interestRate",
      "maxLTV",
      "marginCallLTV",
      "liquidationLTV",
      "minLoanAmount",
      "maxLoanAmount"
    ];

    // convert numeric fields
    const n = Object.fromEntries(
      Object.entries(form).map(([k, v]) => 
        numericFields.includes(k)
        ? [k, Number(v)] :
          [k, v]
        )
    );

    // LTV threshold rule
    if (!(n.maxLTV < n.marginCallLTV && n.marginCallLTV < n.liquidationLTV)) {
      alert("LTV thresholds must satisfy maxLTV < marginCallLTV < liquidationLTV");
      return;
    }
    createProduct.mutate(
      { ...form, ...n },
      {
        onSuccess: () => {
          setOpen(false);
          setForm({
            name: "",
            interestRate: "",
            maxLTV: "",
            marginCallLTV: "",
            liquidationLTV: "",
            minLoanAmount: "",
            maxLoanAmount: ""
          });
        }
      }
    );
  }

  return (
    <PageShell>

      {/* Header */}
      <div className="flex flex-col mb-6 gap-4">

        <PageHeader
          title="Loan Products"
          subtitle="Configured LAMF lending products & risk parameters"
        />
        <Button onClick={() => setOpen(true)} className="text-white cursor-pointer">
          New Loan Product
        </Button>
      </div>

      {/* Table */}
      <Card className="rounded-[1.25rem]
        border border-[rgba(108,40,217,.12)]
        shadow-[0_16px_36px_rgba(108,40,217,0.08)]">

        <CardContent className="pt-6">

          <Table>
            <TableHeader className>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Interest</TableHead>
                <TableHead>Max LTV</TableHead>
                <TableHead>Loan Range</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.map(p => (
                <TableRow key={p.id}>
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


      {/* Create Product Drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="space-y-6 z-50 w-105">

          <SheetHeader>
            <SheetTitle>Create Loan Product</SheetTitle>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-4">

            {[
              ["name", "Product Name"],
              ["interestRate", "Interest Rate (%)"],
              ["maxLTV", "Max LTV"],
              ["marginCallLTV", "Margin Call LTV"],
              ["liquidationLTV", "Liquidation LTV"],
              ["minLoanAmount", "Min Loan Amount"],
              ["maxLoanAmount", "Max Loan Amount"]
            ].map(([key, label]) => (
              <div key={key} className="space-y-1">
                <Label>{label}</Label>
                <Input
                  value={form[key]}
                  onChange={e => update(key, e.target.value)}
                  required
                />
              </div>
            ))}

            <SheetFooter>
              <Button type="submit" disabled={createProduct.isPending} className="text-white cursor-pointer">
                {createProduct.isPending ? "Saving..." : "Create Product"}
              </Button>
            </SheetFooter>
          </form>

        </SheetContent>
      </Sheet>

    </PageShell>
  );
}
