"use client";

import { useEffect, useState } from "react";

export default function LoanProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/loan-products")
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Loan Products</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Interest</th>
            <th>Max LTV</th>
            <th>Range</th>
          </tr>
        </thead>

        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.interestRate}%</td>
              <td>{p.maxLTV}</td>
              <td>{p.minLoanAmount} – {p.maxLoanAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
