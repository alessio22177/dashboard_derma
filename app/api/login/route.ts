import { NextRequest, NextResponse } from "next/server";
import { verifyCredentials, generateAuthToken } from "@/middleware";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (verifyCredentials(username, password)) {
      const token = generateAuthToken();
      
      // Set cookie
      const response = NextResponse.json({ success: true });
      response.cookies.set("dashboard_auth", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
      
      return response;
    }

    return NextResponse.json(
      { success: false, error: "Ungültige Anmeldedaten" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Serverfehler" },
      { status: 500 }
    );
  }
}
