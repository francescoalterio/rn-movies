import { UserData } from "@/interfaces/userData.interface";
import { useState, createContext } from "react";

const defaultValue: [
  UserData[],
  React.Dispatch<React.SetStateAction<UserData[]>>
] = [[], () => {}];

export const UserTvsContext = createContext(defaultValue);

export function UserTvsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userTvs, setUserTvs] = useState<UserData[]>([]);

  return (
    <UserTvsContext.Provider value={[userTvs, setUserTvs]}>
      {children}
    </UserTvsContext.Provider>
  );
}
