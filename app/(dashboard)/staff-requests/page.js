"use client";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { UserContext } from "../DashboardLayoutContext";

export default function StaffRequests() {
  const user = useContext(UserContext);

  return (
    <>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">Staff requests</h3>
          <div className="text-sm text-muted-foreground flex">
            <code>{JSON.stringify(user, null, 2)}</code>
          </div>
          <Button className="mt-4">Add Product</Button>
        </div>
      </div>
    </>
  );
}
