import { useState, useContext, createContext } from "react";

export type SearchContextType = "movie" | "tv";

const defaultValue: [
  SearchContextType,
  React.Dispatch<React.SetStateAction<SearchContextType>>
] = ["movie", () => {}];

export const SearchContext = createContext(defaultValue);

export function SearchContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [search, setSearch] = useState<SearchContextType>("movie");

  return (
    <SearchContext.Provider value={[search, setSearch]}>
      {children}
    </SearchContext.Provider>
  );
}
