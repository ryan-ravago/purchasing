import Link from "next/link";
import { Bell, CircleUser, HardHat } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MobileNav from "./MobileNav";
import Head from "./Head";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import SignOutBtn from "./SignOutBtn";
import DashboardLayoutContext from "./DashboardLayoutContext";
import Image from "next/image";
import Sidebar from "./Sidebar";
import { ServerTime } from "../page";

async function fetchUserWithApprover(gmail) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/user-with-approver`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gmail }),
    }
  );
  const userWApprover = await res.json();
  return userWApprover;
}

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(options);
  const serverTime = await ServerTime();

  if (session?.token.id) {
    // logging in using google
    if (!session.token?.privCode) {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/googleUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gmail: session.token.email }),
      });

      const data = await res.json();
      session.token.role = data.priviledgeCode;
    } else {
      // logging in using credentials
      if (session.token?.privCode) {
        // user is authorized to this app because privCode has a valid value
        session.token.role = session.token.privCode;
      } else {
        redirect("/");
      }
    }

    const userWApprover = await fetchUserWithApprover(session.token?.email);

    if (!userWApprover.appr_email) {
      redirect("/");
    }

    return (
      <DashboardLayoutContext user={session.token} serverTime={serverTime}>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-semibold"
                >
                  <HardHat className="h-6 w-6" />
                  <span className="text-lg">RAVAGO</span>
                </Link>
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-auto h-8 w-8"
                >
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Toggle notifications</span>
                </Button>
              </div>
              <div className="flex-1">
                <Sidebar />
              </div>
            </div>
          </div>
          <div className="flex flex-col overflow-x-auto">
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
              <MobileNav />
              <Head />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {!session.token?.privCode ? (
                    <Image
                      src={session.token?.image}
                      width={37}
                      height={37}
                      alt="Google Avatar"
                      className="rounded-full hover:cursor-pointer"
                    />
                  ) : (
                    <Button
                      variant="secondary"
                      size="icon"
                      className="rounded-full"
                    >
                      <CircleUser className="h-5 w-5" />
                      <span className="sr-only">Toggle user menu</span>
                    </Button>
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {!session.token?.privCode ? (
                    <>
                      <DropdownMenuLabel>
                        {session.token.name}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>{session.token.email}</DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuLabel>
                        {session.token.name}
                      </DropdownMenuLabel>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <SignOutBtn />
                </DropdownMenuContent>
              </DropdownMenu>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-3 lg:gap-6 lg:p-6">
              {children}
            </main>
          </div>
        </div>
      </DashboardLayoutContext>
    );
  } else {
    redirect("/");
  }
}
