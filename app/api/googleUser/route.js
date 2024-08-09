import db from "@/app/db/db";
import { dbConnectionUsers } from "@/app/db/db";

export async function POST(req) {
  const connection = await dbConnectionUsers();
  const data = await req.json();

  const googleUserData = await db({
    query: `SELECT app.appName, appusr.priviledgeCode
            FROM appusr
            INNER JOIN app
              ON appusr.appId = app.appId
            WHERE BINARY appusr.gUserName = ?
              and appusr.isactive = 1
              and app.appId IN('PURJO')`,
    values: [data.gmail],
    connection,
  });

  await connection.end();

  return Response.json(googleUserData[0]);
}
