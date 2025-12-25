"use client";

import { useEffect, useState } from "react";

export default function LoansPage() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetch("/api/loans")
      .then(res => res.json())
      .then(setLoans);
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Ongoing Loans</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Borrower</th>
            <th>Product</th>
            <th>Outstanding</th>
            <th>LTV</th>
          </tr>
        </thead>

        <tbody>
          {loans.map(l => (
            <tr key={l.id}>
              <td>{l.loanApplication.borrower.fullName}</td>
              <td>{l.loanApplication.loanProduct.name}</td>
              <td>{l.outstanding}</td>
              <td>{l.currentLTV?.toFixed?.(2) ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
