import Dashboard from "./Components/Dashboard";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(options);

  if (session?.token.id) {
    redirect("/dashboard");
  } else {
    return <></>;
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
