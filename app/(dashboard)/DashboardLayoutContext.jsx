"use client";
import { createContext } from "react";
import { useSelectedLayoutSegments } from "next/navigation";

export const UserContext = createContext();
export const SegmentsContext = createContext();
export const ServerTimeContext = createContext();

export default function DashboardLayoutContext({ user, children, serverTime }) {
  const segments = useSelectedLayoutSegments();

  return (
    <ServerTimeContext.Provider value={serverTime}>
      <UserContext.Provider value={user}>
        <SegmentsContext.Provider value={segments}>
          {children}
        </SegmentsContext.Provider>
      </UserContext.Provider>
    </ServerTimeContext.Provider>
  );
}
