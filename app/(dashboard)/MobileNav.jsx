"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { UserContext } from "./DashboardLayoutContext";

export default function MobileNav() {
  const pathname = usePathname();
  const user = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const linkStyles = (pathName) => {
    if (pathname === pathName) {
      return "mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 hover:text-foreground";
    }
    return "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground";
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" open={open} />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-xl font-extrabold">RAVAGO</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <nav className="grid gap-2 text-lg font-medium">
          {user.role === "staff" ? (
            <>
              <Link
                href="/dashboard"
                className={linkStyles("/dashboard")}
                onClick={() => setOpen((prev) => !prev)}
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/requests"
                className={linkStyles("/requests")}
                onClick={() => setOpen((prev) => !prev)}
              >
                <ShoppingCart className="h-5 w-5" />
                Requsts
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge>
              </Link>
              <Link
                href="/settings"
                className={linkStyles("/settings")}
                onClick={() => setOpen((prev) => !prev)}
              >
                <Package className="h-5 w-5" />
                Settings
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/staff-requests"
                className={linkStyles("/staff-requests")}
                onClick={() => setOpen((prev) => !prev)}
              >
                <Users className="h-5 w-5" />
                Staff Requests
              </Link>
              <Link
                href="/my-requests"
                className={linkStyles("/my-requests")}
                onClick={() => setOpen((prev) => !prev)}
              >
                <LineChart className="h-5 w-5" />
                My Requests
              </Link>
              <Link
                href="/items"
                className={linkStyles("/items")}
                onClick={() => setOpen((prev) => !prev)}
              >
                <LineChart className="h-5 w-5" />
                Items
              </Link>
            </>
          )}
        </nav>
        <div className="mt-auto">
          <Card>
            <CardHeader>
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}
