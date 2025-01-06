import { UserTvsContext } from "@/contexts/user-tvs-context";
import { useContext } from "react";

export function useUserTvs() {
  return useContext(UserTvsContext);
}
