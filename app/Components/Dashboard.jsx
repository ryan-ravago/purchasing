import SignOutBtn from "../(dashboard)/SignOutBtn";
import Image from "next/image";

export default async function Dashboard({
  id,
  name = null,
  email = null,
  image = "",
  username = null,
}) {
  return (
    <div>
      {username ? (
        <>
          <p>{id}</p>
          <p>{username}</p>
        </>
      ) : (
        <>
          <p>{id}</p>
          <p>{name}</p>
          <Image
            src={image}
            alt="Google account avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        </>
      )}
      <p>Dashboard</p>
      <SignOutBtn />
    </div>
  );
}
