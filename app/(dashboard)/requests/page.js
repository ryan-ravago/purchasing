import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Requests() {
  return (
    <>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no item request(s)
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling as soon as you add a product.
          </p>
          <Link href="/requests/request-items" className="mt-4">
            <Button>Request item(s)</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
