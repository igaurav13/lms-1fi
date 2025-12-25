"use client";

import { useEffect, useState } from "react";

export default function LoanApplicationsPage() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch("/api/loan-applications")
      .then(res => res.json())
      .then(setApps);
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Loan Applications</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Borrower</th>
            <th>Product</th>
            <th>Requested</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {apps.map(a => (
            <tr key={a.id}>
              <td>{a.borrower.fullName}</td>
              <td>{a.loanProduct.name}</td>
              <td>{a.requestedAmount}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
