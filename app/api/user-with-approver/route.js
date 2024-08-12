import db, { dbConnectionUsers } from "@/app/db/db";

export async function POST(req) {
  const connection = await dbConnectionUsers();
  const { email } = await req.json();

  const userWApprover = await db({
    query: `SELECT *
            FROM user_approver
            WHERE user_email = ?`,
    values: [email],
    connection,
  });

  return Response.json(userWApprover[0]);
}
