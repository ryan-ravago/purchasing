"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

export default function SignOutBtn() {
  return (
    <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
      Logout
    </DropdownMenuItem>
  );
}
