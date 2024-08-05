import { MyTabs } from "@/app/Components/MyTabs";
import ServerSideTable from "@/app/Components/ServerSideTable";
import { columns } from "@/app/Components/TableColumns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MyRequests() {
  return (
    <div>
      <Button className="mb-4 ms-auto block">
        <Link href="/requests/request-items">Request item(s)</Link>
      </Button>
      <MyTabs />
      <div className="h-96 mb-10">
        <ServerSideTable columns={columns} />
      </div>
    </div>
  );
}
