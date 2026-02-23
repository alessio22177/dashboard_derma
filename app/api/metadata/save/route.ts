import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const n8nWebhook = process.env.N8N_SAVE_WEBHOOK;

    if (n8nWebhook && n8nWebhook !== "mock") {
      const response = await fetch(n8nWebhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("n8n webhook failed");
      }

      const data = await response.json();
      return NextResponse.json({ success: true, data });
    }

    // Mock success response for development
    console.log("Mock save:", body);
    return NextResponse.json({ success: true, mock: true });
  } catch (error) {
    console.error("Error saving metadata:", error);
    return NextResponse.json(
      { success: false, error: "Speichern fehlgeschlagen" },
      { status: 500 }
    );
  }
}
