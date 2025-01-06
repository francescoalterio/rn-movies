import { LoadingContext } from "@/contexts/loading-context";
import { useContext } from "react";

export function useIsUserDataLoading() {
  return useContext(LoadingContext);
}
