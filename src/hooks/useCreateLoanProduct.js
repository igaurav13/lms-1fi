"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useCreateLoanProduct() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      console.log("EROR")
      console.log(payload)
      const res = await api.post("/loan-products", payload);
      return res.data;
    },
    onSuccess() {
      qc.invalidateQueries(["loan-products"]);
    }
  });
}