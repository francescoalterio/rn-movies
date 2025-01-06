import { useState, useContext, createContext } from "react";

const defaultValue: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = [
  true,
  () => {},
];

export const LoadingContext = createContext(defaultValue);

export function LoadingContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <LoadingContext.Provider value={[isLoading, setIsLoading]}>
      {children}
    </LoadingContext.Provider>
  );
}
