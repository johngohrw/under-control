import { PaymentMethod } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function usePaymentMethods() {
  return useQuery({
    queryKey: ["paymentMethods"],
    queryFn: (): Promise<PaymentMethod[]> =>
      axios.get("/api/paymentMethod").then((response) => response.data.data),
  });
}
