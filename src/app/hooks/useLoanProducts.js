import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useLoanProducts() {
  return useQuery({
    queryKey: ["loan-products"],
    queryFn: async () => {
      const res = await api.get("/loan-products");
      return res.data;
    }
  });
}
