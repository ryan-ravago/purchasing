import db, { dbConnectionPurchasing } from "@/app/db/db";

export const dynamic = "force-dynamic";

async function getDataFromDatabase(
  page,
  limit,
  sortOptions,
  globalFilter,
  columnFilters
) {
  const offset = page * limit;
  const connection = await dbConnectionPurchasing();

  let orderByClause = "ORDER BY req_dt DESC";
  if (sortOptions.length > 0) {
    orderByClause = `ORDER BY ${
      sortOptions[0] === "freq_date" ? "req_dt" : sortOptions[0]
    } ${sortOptions[1]}`;
  }

  // Construct the WHERE clause for global and column filtering
  let whereClause = "";
  const values = [];

  if (globalFilter) {
    whereClause = `WHERE req_num LIKE ? OR DATE_FORMAT(req_dt, '%M %d, %Y') LIKE ?`;
    values.push(`%${globalFilter}%`, `%${globalFilter}%`);
  }

  if (columnFilters && columnFilters.length > 0) {
    columnFilters.forEach(({ id, value }) => {
      if (id === "freq_date") {
        id = "req_dt";

        if (whereClause) {
          whereClause += ` AND DATE_FORMAT(${id}, '%M %d, %Y') LIKE ?`;
        } else {
          whereClause = `WHERE DATE_FORMAT(${id}, '%M %d, %Y') LIKE ?`;
        }
      } else {
        if (whereClause) {
          whereClause += ` AND ${id} LIKE ?`;
        } else {
          whereClause = `WHERE ${id} LIKE ?`;
        }
      }
      values.push(`%${value}%`);
    });
  }

  // Query to get the total count of records
  const countResults = await db({
    query: `SELECT COUNT(*) AS total FROM request ${whereClause}`,
    values,
    connection,
  });

  const total = countResults[0].total;

  // Query to get the paginated data
  const data = await db({
    query: `SELECT DATE_FORMAT(req_dt, '%M %d, %Y') AS freq_date, req_num
            FROM request
            ${whereClause}
            ${orderByClause} LIMIT ? OFFSET ?`, // replace with your table name
    values: [...values, limit, offset],
    connection,
  });

  // console.log(whereClause ? whereClause : "");
  // console.log(orderByClause);
  // console.log(values);
  await connection.end();

  return { data, total };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10) - 1; // 0-based index for pagination
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const sort = searchParams.get("sort");
  const globalFilter = searchParams.get("globalFilter");
  const reqStatCode = searchParams.get("reqStatCode");

  let sortOptions = [];
  if (sort) {
    sortOptions = sort.split(":");
  }

  // Parse column filters from query parameters
  const columnFilters = [];
  searchParams.forEach((value, key) => {
    if (key.startsWith("columnFilter_")) {
      const columnId = key.replace("columnFilter_", "");
      columnFilters.push({ id: columnId, value: decodeURI(value) });
    }
  });

  // Fetch data from the database
  const { data, total } = await getDataFromDatabase(
    page,
    limit,
    sortOptions,
    globalFilter,
    columnFilters
  );

  const totalPages = Math.ceil(total / limit);

  return Response.json({
    items: data,
    totalPages,
  });
}
