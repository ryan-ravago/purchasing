import LoginCredentials from "./Components/LoginCredentials";
import Dashboard from "./Components/Dashboard";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(options);

  console.log("login", session?.token);

  if (session?.token.id) {
    return (
      <Dashboard
        id={session.token.id}
        name={session.token.name}
        email={session.token.email}
        username={session.token.username}
        image={session.token.image}
      />
    );
  } else {
    return <LoginCredentials />;
  }
}
