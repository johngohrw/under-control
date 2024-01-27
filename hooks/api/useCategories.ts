import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: (): Promise<Category[]> =>
      axios.get("/api/category").then((response) => response.data.data),
  });
}
