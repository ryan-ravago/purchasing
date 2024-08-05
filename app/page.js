import Dashboard from "./Components/Dashboard";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import LoginCredentials from "./Components/LoginCredentials";

export async function ServerTime() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/server-time`,
    { cache: "no-store" }
  );
  const serverTime = await res.json();
  return serverTime;
}

export default async function Home() {
  const session = await getServerSession(options);
  console.log(session);
  if (session?.token.id) {
    redirect("/dashboard");
  } else {
    return <LoginCredentials />;
  }
}

{
  /* <Dashboard
  id={session.token.id}
  name={session.token.name}
  email={session.token.email}
  username={session.token.username}
  image={session.token.image}
/> */
}
