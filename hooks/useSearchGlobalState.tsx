import { SearchContext } from "@/contexts/search-context";
import { useContext } from "react";

export function useSearchGlobalState() {
  return useContext(SearchContext);
}
