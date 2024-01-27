import { Currency } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCurrencies() {
  return useQuery({
    queryKey: ["currencies"],
    queryFn: (): Promise<Currency[]> =>
      axios.get("/api/currency").then((response) => response.data.data),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}
