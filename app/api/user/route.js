import { dbUsers } from "@/app/db/db";
import { NextResponse } from "next/server";
import os from "os";

export async function POST(req) {
  const data = await req.json();

  const users = await dbUsers({
    query: `SELECT app.appName, appusr.priviledgeCode, usr.name, userPassword, email
            FROM appusr 
            INNER JOIN app 
              ON appusr.appId = app.appId
            INNER JOIN usr 
              ON usr.userName = appusr.gUsername
            WHERE BINARY appusr.gUserName = ? 
              AND appusr.isActive = 1 
              and app.appId IN('PURJO');`,
    values: [data.username],
  });

  return NextResponse.json(users[0]);
}
