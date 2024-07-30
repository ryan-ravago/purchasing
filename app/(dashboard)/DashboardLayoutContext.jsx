"use client";
import { createContext } from "react";
import { useSelectedLayoutSegments } from "next/navigation";

export const UserContext = createContext();
export const SegmentsContext = createContext();

export default function DashboardLayoutContext({ user, children }) {
  const segments = useSelectedLayoutSegments();

  return (
    <UserContext.Provider value={user}>
      <SegmentsContext.Provider value={segments}>
        {children}
      </SegmentsContext.Provider>
    </UserContext.Provider>
  );
}
