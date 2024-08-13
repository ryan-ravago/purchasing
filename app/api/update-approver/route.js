import db, { dbConnectionPurchasing } from "@/app/db/db";

export async function POST(req) {
  const connection = await dbConnectionPurchasing();
  const { userEmail, apprEmail } = await req.json();

  try {
    await db({
      query: `UPDATE user_approver
      SET appr_email = ?,
      last_update = NOW()
      WHERE user_email = ?`,
      values: [apprEmail, userEmail],
      connection,
    });
    return Response.json({
      msg: "Approver successfully updated!",
      variant: "success",
    });
  } catch (err) {
    console.error(err);
    return Response.json({
      msg: "Oops! Something went wrong.",
      variant: "destructive",
    });
  }
}
