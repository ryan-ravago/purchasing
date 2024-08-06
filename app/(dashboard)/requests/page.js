import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MyTabs } from "@/app/Components/MyTabs";
import FormRequests from "./FormRequests";
import { ServerTime } from "@/app/page";

export default async function Requests() {
  const serverTime = await ServerTime();
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
        <FormRequests serverTime={serverTime} />
      </div>
    </>
  );
}
