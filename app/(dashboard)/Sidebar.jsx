"use client";

import { Home, Settings } from "lucide-react";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "./DashboardLayoutContext";

export default function Sidebar({ userWApprover }) {
  const pathname = usePathname();
  const user = useContext(UserContext);

  const linkStyles = (pathName) => {
    if (pathname === pathName) {
      return "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary bg-muted text-primary";
    }
    return "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";
  };

  const sidebar = (
    <nav className="grid items-start px-2 text-md font-medium lg:px-4">
      <Link
        href="/dashboard"
        className={`${linkStyles("/dashboard")} py-4 hover:bg-white`}
      >
        <Home className="h-4 w-4" />
        Dashboard
      </Link>
      {user.role === "STAFF" ? (
        <>
          <Link
            href="/my-requests"
            className={`${linkStyles("/my-requests")} py-4 hover:bg-white`}
          >
            <Settings className="h-4 w-4" />
            My Requests
          </Link>
          <Link
            href="/settings"
            className={`${linkStyles("/settings")} py-4 hover:bg-white`}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </>
      ) : user.role === "EXECO" ? (
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
      ) : user.role === "HEAD" ? (
        <>
          <Link
            href="/staff-requests"
            className={`${linkStyles("/staff-requests")} py-4 hover:bg-white`}
          >
            <Settings className="h-4 w-4" />
            Staff Requests
          </Link>
        </>
      ) : user.role === "PURAD" ? (
        <>
          <Link
            href="/items"
            className={`${linkStyles("/items")} py-4 hover:bg-white`}
          >
            <Settings className="h-4 w-4" />
            Items
          </Link>
          <Link
            href="/staff-requests"
            className={`${linkStyles("/staff-requests")} py-4 hover:bg-white`}
          >
            <Settings className="h-4 w-4" />
            Staff Requests
          </Link>
        </>
      ) : user.role === "PURCH" ? (
        <>
          <Link
            href="/items"
            className={`${linkStyles("/items")} py-4 hover:bg-white`}
          >
            <Settings className="h-4 w-4" />
            Items
          </Link>
        </>
      ) : (
        <div></div>
      )}
    </nav>
  );

  // check if user has already set approver
  if (!userWApprover.appr_email) {
    if (pathname === "/settings") {
      return sidebar;
    }
    redirect("/settings");
  } else {
    return sidebar;
  }
}
