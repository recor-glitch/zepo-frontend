// app/api/waitlist/route.ts
import { NextRequest, NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || email.length === 0) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }

  try {
    const result = await pool.query(
      "INSERT INTO waitlist (email) VALUES ($1) RETURNING *",
      [email]
    );

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error("Error inserting email into waitlist:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
