import db, { dbConnectionPurchasing } from "@/app/db/db";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

export async function GET() {
  const session = await getServerSession(options);
  const connection = await dbConnectionPurchasing();

  const requests = await db({
    query: `SELECT * FROM request WHERE req_requestor = ?`,
    values: [session.token.email],
    connection,
  });

  await connection.end();

  return Response.json(requests);
}
