import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useUser(): User | null {
  const { isFetched, data } = useQuery({
    queryFn: () => axios.get(`/api/user`),
    queryKey: ["user"],
    staleTime: 6 * 60 * 60 * 1000, // 6 hours
  });

  return isFetched ? data?.data?.data : null;
}
