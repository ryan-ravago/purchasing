"use client";
import { createContext } from "react";

export const UserContext = createContext();

export default function DashboardLayoutContext({ user, children }) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
