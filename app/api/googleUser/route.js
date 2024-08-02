import { dbUsers } from "@/app/db/db";

export async function POST(req) {
  const data = await req.json();

  const googleUserData = await dbUsers({
    query: `SELECT app.appName, appusr.priviledgeCode
            FROM appusr
            INNER JOIN app
              ON appusr.appId = app.appId
            WHERE BINARY appusr.gUserName = ?
              and appusr.isactive = 1
              and app.appId IN('PURJO')`,
    values: [data.gmail],
  });

  return Response.json(googleUserData[0]);
}
