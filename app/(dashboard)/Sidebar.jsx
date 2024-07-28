"use client";

import { Home, NotepadText, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "./DashboardLayoutContext";

export default function Sidebar() {
  const pathname = usePathname();
  const user = useContext(UserContext);

  const linkStyles = (pathName) => {
    if (pathname === pathName) {
      return "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary bg-muted text-primary";
    }
    return "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";
  };

  return (
    <nav className="grid items-start px-2 text-md font-medium lg:px-4">
      {user.role === "staff" ? (
        <>
          <Link
            href="/dashboard"
            className={`${linkStyles("/dashboard")} py-4 hover:bg-white`}
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/requests"
            className={`${linkStyles("/requests")} py-4 hover:bg-white`}
          >
            <NotepadText className="h-4 w-4" />
            Requests
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              6
            </Badge>
          </Link>
          <Link
            href="/settings"
            className={`${linkStyles("/settings")} py-4 hover:bg-white`}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </>
      ) : (
        <>
          <Link
            href="/staff-requests"
            className={`${linkStyles("/staff-requests")} py-4 hover:bg-white`}
          >
            <Settings className="h-4 w-4" />
            Staff Requests
          </Link>
          <Link
            href="/my-requests"
            className={`${linkStyles("/my-requests")} py-4 hover:bg-white`}
          >
            <Settings className="h-4 w-4" />
            My Requests
          </Link>
          <Link
            href="/items"
            className={`${linkStyles("/items")} py-4 hover:bg-white`}
          >
            <Settings className="h-4 w-4" />
            Items
          </Link>
        </>
      )}
    </nav>
  );
}
