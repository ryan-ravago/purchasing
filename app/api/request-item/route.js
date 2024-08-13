import db, { dbConnectionPurchasing } from "@/app/db/db";

export async function GET(request) {
  const connection = await dbConnectionPurchasing();
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get("date");

  const generateShortUidWithDate = async () => {
    // Get the current date components
    const now = new Date();
    const yearSuffix = now.getFullYear().toString().slice(-2); // Last 2 digits of the year
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Month (01 to 12)
    const day = String(now.getDate()).padStart(2, "0"); // Day (01 to 31)

    const result = await db({
      query: `SELECT DATE_FORMAT(MAX(req_dt), "%Y-%m-%d %H:%i:%s") AS latestReqForm
              FROM request
              WHERE DATE_FORMAT(req_dt, "%Y-%m-%d") = ?`,
      values: [date],
      connection,
    });

    // Combine the date components and random part
    // Ensure the total length is 12 characters
    // return `${yearSuffix}${month}${day}${randomPart}`;
    return result;
  };

  const result = await generateShortUidWithDate();
  await connection.end();
  return Response.json(result);
}

export async function POST(req) {
  const connection = await dbConnectionPurchasing();

  const form = await req.json();
  const { reqId, items, reqNote, requestor, approver } = form;

  try {
    await connection.beginTransaction();

    await db({
      query: `INSERT INTO request (req_num, req_requestor, req_dt, req_statcode, req_note, req_to_be_appr_by)
            VALUES (?, ?, NOW(), ?, ?, ?)`,
      values: [
        reqId,
        requestor,
        // 'DATE_FORMAT(NOW(), "%Y-%m-%d %H:%i:%s")',
        "PNDH",
        reqNote,
        approver,
      ],
      connection,
    });

    // Prepare to insert items
    const itemQueries = items.map((item, i) => {
      const { dateNeeded, itemName, itemNote, qty, unit } = item;
      return db({
        query: `INSERT INTO req_item(reqtem_item_name, reqtem_qty, reqtem_req_num, reqtem_unit_id, reqtem_dt_needed, reqtem_note, reqtem_statcode)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        values: [itemName, qty, reqId, unit, dateNeeded, itemNote, "PNDH"],
        connection,
      });
    });

    // Execute all item insertions concurrently
    await Promise.all(itemQueries);

    // Commit transaction
    await connection.commit();

    const response = {
      success: true,
      message: "All items successfully inserted.",
    };

    return Response.json(response);
  } catch (err) {
    console.error(err);
    if (connection) {
      await connection.rollback();
    }

    const response = {
      success: false,
      message: "Something went wrong.",
      error: err.message,
    };

    return Response.json(response);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
