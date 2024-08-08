import db from "@/app/db/db";
import { dbConnection } from "@/app/db/db";

export async function POST(req) {
  const conn = await dbConnection();

  const form = await req.json();
  const { reqId, items, reqNote, requestor, approver } = form;

  try {
    await conn.beginTransaction();

    await db({
      query: `INSERT INTO request (req_num, req_requestor, req_dt, req_statcode, req_note, req_to_be_appr_by)
            VALUES (?, ?, ?, ?, ?, ?)`, // replace with your table name
      values: [
        reqId,
        requestor,
        'DATE_FORMAT(NOW(), "%Y-%m-%d %H:%i:%s")',
        "PNDH",
        reqNote,
        approver,
      ],
      conn,
    });

    items.forEach(async (item) => {
      await db({
        query: `INSERT INTO`,
        values: [],
        conn,
      });
    });

    await conn.commit();
  } catch (err) {
    if (conn) {
      await conn.rollback();
    }
  } finally {
    if (conn) {
      await conn.end();
    }
  }

  return Response.json();
}
