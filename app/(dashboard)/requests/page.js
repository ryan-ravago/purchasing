import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MyTabs } from "@/app/Components/MyTabs";

export default async function Requests() {
  return (
    <>
      <div
        className="p-3 md:p-5 rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <Button className="mb-4 ms-auto block">
          <Link href="/requests/request-items">Request item(s)</Link>
        </Button>
        <MyTabs />
      </div>
    </>
  );
}
