import { Button } from "@/components/ui/button";
import Link from "next/link";
import FormRequests from "./FormRequests";
import { ServerTime } from "@/app/page";
import { MyTabs } from "@/app/Components/MyTabs";

export default async function Requests() {
  // const serverTime = await ServerTime();

  return (
    <>
      <div
        className="p-3 md:p-5 rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <MyTabs />
        <Button className="mt-4 mx-auto block">
          <Link href="/requests/request-items">Request item(s)</Link>
        </Button>
        {/* <FormRequests serverTime={serverTime} /> */}
      </div>
    </>
  );
}
