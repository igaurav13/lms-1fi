"use client";

import { useEffect, useState } from "react";

export default function CreateApplicationPage() {
  const [borrowers, setBorrowers] = useState([]);
  const [products, setProducts] = useState([]);

  const [borrowerId, setBorrowerId] = useState("");
  const [loanProductId, setLoanProductId] = useState("");
  const [requestedAmount, setRequestedAmount] = useState("");

  useEffect(() => {
    fetch("/api/borrowers").then(r => r.json()).then(setBorrowers);
    fetch("/api/loan-products").then(r => r.json()).then(setProducts);
  }, []);

  const submit = async () => {
    await fetch("/api/loan-applications", {
      method: "POST",
      body: JSON.stringify({
        borrowerId,
        loanProductId,
        requestedAmount: Number(requestedAmount)
      })
    });

    alert("Application created");
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Create Loan Application</h1>

      <div className="space-y-3">
        <select onChange={e => setBorrowerId(e.target.value)}>
          <option>Select Borrower</option>
          {borrowers.map(b => (
            <option key={b.id} value={b.id}>{b.fullName}</option>
          ))}
        </select>

        <select onChange={e => setLoanProductId(e.target.value)}>
          <option>Select Product</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Requested Amount"
          onChange={e => setRequestedAmount(e.target.value)}
        />

        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
}
