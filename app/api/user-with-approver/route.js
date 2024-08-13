import db, { dbConnectionPurchasing } from "@/app/db/db";

export async function POST(req) {
  const connection = await dbConnectionPurchasing();
  const user = await req.json();

  const userWApprover = await db({
    query: `SELECT *
            FROM user_approver
            WHERE user_email = ?`,
    values: [user.gmail],
    connection,
  });
  await connection.end();

  return Response.json(userWApprover[0]);
}
