import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useBorrowers() {
  return useQuery({
    queryKey: ["borrowers"],
    queryFn: async () => {
      const res = await api.get("/borrowers");
      return res.data;
    }
  });
}