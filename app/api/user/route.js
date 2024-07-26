import db from "@/app/db/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();

  const voters = await db({
    query: "SELECT * FROM user WHERE username = ?",
    values: [data.username],
  });

  return NextResponse.json(voters[0]);
}
