import { dbUsers } from "@/app/db/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  const data = await req.json();

  const user = await dbUsers({
    query: `SELECT appusrId AS id, app.appName, appusr.priviledgeCode AS "privCode", usr.name, userPassword, email
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

  return NextResponse.json(user);
}

export async function GET() {
  const hpass = await bcrypt.hash("1", 10);
  const match = await bcrypt.compare("1", hpass);

  return NextResponse.json({ hpass, match });
}
