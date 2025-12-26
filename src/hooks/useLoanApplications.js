import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useLoanApplications() {
  return useQuery({
    queryKey: ["loan-applications"],
    queryFn: async () => {
      const res = await api.get("/loan-applications");
      return res.data;
    }
  });
}
