"use client";
import { createContext } from "react";
import { useSelectedLayoutSegments } from "next/navigation";

export const UserContext = createContext();
export const SegmentsContext = createContext();
export const ServerTimeContext = createContext();
export const UserWApproverContext = createContext();

export default function DashboardLayoutContext({
  user,
  children,
  serverTime,
  userWApprover,
}) {
  const segments = useSelectedLayoutSegments();

  return (
    <ServerTimeContext.Provider value={serverTime}>
      <UserContext.Provider value={user}>
        <SegmentsContext.Provider value={segments}>
          <UserWApproverContext.Provider value={userWApprover}>
            {children}
          </UserWApproverContext.Provider>
        </SegmentsContext.Provider>
      </UserContext.Provider>
    </ServerTimeContext.Provider>
  );
}
