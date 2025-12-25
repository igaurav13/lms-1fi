import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useLoans() {
  return useQuery({
    queryKey: ["loans"],
    queryFn: async () => {
      const res = await api.get("/loans");
      return res.data;
    }
  });
}
