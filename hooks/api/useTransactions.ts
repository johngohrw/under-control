import { Transaction } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: (): Promise<Transaction[]> =>
      axios.get("/api/transactions").then((response) => response.data.data),
  });
}
