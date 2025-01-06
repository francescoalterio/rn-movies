import { UserData } from "@/interfaces/userData.interface";
import { useState, createContext } from "react";

const defaultValue: [
  UserData[],
  React.Dispatch<React.SetStateAction<UserData[]>>
] = [[], () => {}];

export const UserMoviesContext = createContext(defaultValue);

export function UserMoviesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userMovies, setUserMovies] = useState<UserData[]>([]);

  return (
    <UserMoviesContext.Provider value={[userMovies, setUserMovies]}>
      {children}
    </UserMoviesContext.Provider>
  );
}
