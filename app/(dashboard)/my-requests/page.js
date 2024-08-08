import { MyTabs } from "@/app/Components/MyTabs";
import ServerSideTable from "@/app/Components/ServerSideTable";
import { columns } from "@/app/Components/TableColumns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MyRequests() {
  return (
    <div>
      <MyTabs />
    </div>
  );
}
