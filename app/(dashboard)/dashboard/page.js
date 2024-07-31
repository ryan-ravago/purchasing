"use client";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">Dashboard</h3>
          <Button className="mt-4">Add Product</Button>
        </div>
      </div>
    </>
  );
}
