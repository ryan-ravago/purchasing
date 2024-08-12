import db, { dbConnectionUsers } from "@/app/db/db";

export async function GET() {
  const connection = await dbConnectionUsers();

  const heads = await db({
    query: `SELECT app.appName, appusr.gUserName, appusr.priviledgeCode
            FROM appusr
            INNER JOIN app
              ON appusr.appId = app.appId
            WHERE appusr.isactive = 1
              and priviledgeCode = 'HEAD'
              or priviledgeCode = 'EXECO'
              and app.appId IN('PURJO')`,
    values: [],
    connection,
  });

  return Response.json(heads);
}
