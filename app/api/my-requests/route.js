// app/api/data/route.js
import db from "@/app/db/db";

async function getDataFromDatabase(page, limit, sortOptions) {
  const offset = page * limit;

  let orderByClause = "ORDER BY req_dt";
  if (sortOptions.length > 0) {
    orderByClause += `${
      sortOptions[0] === "freq_date" ? "" : `, ${sortOptions[0]}`
    } ${sortOptions[1]}`;
  }

  // Query to get the total count of records
  const countResults = await db({
    query: "SELECT COUNT(*) AS total FROM request",
    values: [],
  }); // replace with your table name
  const total = countResults[0].total;

  // Query to get the paginated data
  const data = await db({
    query: `SELECT DATE_FORMAT(req_dt, '%M %d, %Y') AS freq_date, req_num
            FROM request
            ${orderByClause} LIMIT ? OFFSET ?`, // replace with your table name
    values: [limit, offset],
  });

  return { data, total };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10) - 1; // 0-based index for pagination
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const sort = searchParams.get("sort");

  let sortOptions = [];
  if (sort) {
    sortOptions = sort.split(":");
  }

  // Fetch data from the database
  const { data, total } = await getDataFromDatabase(page, limit, sortOptions);

  const totalPages = Math.ceil(total / limit);

  return Response.json({
    items: data,
    totalPages,
  });
}
