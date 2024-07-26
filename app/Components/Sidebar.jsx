import { Home, NotepadText, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const linkStyles = (pathName) => {
    if (pathname === pathName) {
      return "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary bg-muted text-primary";
    }
    return "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";
  };

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <Link href="/dashboard" className={linkStyles("/dashboard")}>
        <Home className="h-4 w-4" />
        Dashboard
      </Link>
      <Link href="/requests" className={linkStyles("/requests")}>
        <NotepadText className="h-4 w-4" />
        Requests
        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          6
        </Badge>
      </Link>
      <Link href="/settings" className={linkStyles("/settings")}>
        <Settings className="h-4 w-4" />
        Settings
      </Link>
    </nav>
  );
}
