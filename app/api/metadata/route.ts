import { NextResponse } from "next/server";
import {
  DEFAULT_GENERAL_FIELDS,
  DEFAULT_SOCIAL_FIELDS,
  DEFAULT_SCHEMA_FIELDS,
  toNextJsMetadata,
} from "@/types/metadata";

export async function GET() {
  try {
    const n8nWebhook = process.env.N8N_GET_WEBHOOK;

    if (n8nWebhook && n8nWebhook !== "mock") {
      const response = await fetch(n8nWebhook, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("n8n webhook failed");

      const data = await response.json();
      return NextResponse.json(data);
    }

    // Return default structure for development
    const defaultData = {
      general: DEFAULT_GENERAL_FIELDS,
      social: DEFAULT_SOCIAL_FIELDS,
      schema: DEFAULT_SCHEMA_FIELDS,
    };

    return NextResponse.json(toNextJsMetadata(defaultData));
  } catch (error) {
    console.error("Error fetching metadata:", error);
    // Fallback to defaults
    const defaultData = {
      general: DEFAULT_GENERAL_FIELDS,
      social: DEFAULT_SOCIAL_FIELDS,
      schema: DEFAULT_SCHEMA_FIELDS,
    };
    return NextResponse.json(toNextJsMetadata(defaultData));
  }
}
