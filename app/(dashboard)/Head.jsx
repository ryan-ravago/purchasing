"use client";
import { usePathname } from "next/navigation";

export default function Head() {
  const pathname = usePathname();

  const mainLink = () => {
    if (pathname === "/dashboard") {
      return "Dashboard";
    } else if (pathname === "/requests") {
      return "Requests";
    } else if (pathname === "/settings") {
      return "Settings";
    } else if (pathname === "/items") {
      return "Items";
    } else if (pathname === "/staff-requests") {
      return "Staff Requests";
    } else if (pathname === "/my-requests") {
      return "My Requests";
    } else if (pathname === "/my-requests/request-items") {
      return "Request Items";
    }
  };

  return (
    <div className="w-full flex-1">
      {/* <form>
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search products..."
        className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
      />
    </div>
  </form> */}
      <div className="flex items-center justify-center md:justify-start">
        <h1 className="text-xl font-semibold ">{mainLink()}</h1>
      </div>
    </div>
  );
}
