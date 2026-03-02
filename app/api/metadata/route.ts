import { NextResponse } from "next/server";

const DEFAULT_GENERAL_FIELDS = [
  {
    id: "title",
    label: "Seitentitel",
    type: "text",
    value: "Kosmetikstudio Hamburg | Dermastil - Ihr Experte für Hautpflege",
    placeholder: "z.B. Kosmetikstudio Hamburg | Ihr Studio Name",
    helpText: "Titel der Seite (erscheint im Browser-Tab und in Suchergebnissen)",
    required: true,
  },
  {
    id: "description",
    label: "Meta-Beschreibung",
    type: "textarea",
    value: "Erleben Sie erstklassige Hautpflege im Dermastil Kosmetikstudio Hamburg. Professionelle Behandlungen, moderne Technik und ein erfahrenes Team erwarten Sie. Jetzt Termin vereinbaren!",
    placeholder: "Beschreibung für Suchmaschinen...",
    helpText: "Kurze Beschreibung für Google Suchergebnisse (max. 160 Zeichen empfohlen)",
    maxLength: 160,
    required: true,
  },
  {
    id: "robots",
    label: "Robots Meta Tag",
    type: "text",
    value: "index, follow",
    placeholder: "z.B. index, follow",
    helpText: "Anweisungen für Suchmaschinen-Crawler",
  },
];

const DEFAULT_SOCIAL_FIELDS = [
  {
    id: "ogTitle",
    label: "OpenGraph Titel",
    type: "text",
    value: "Kosmetikstudio Hamburg | Dermastil",
    placeholder: "Titel für Facebook/LinkedIn...",
    helpText: "Titel der bei Facebook, LinkedIn etc. angezeigt wird",
  },
  {
    id: "ogDescription",
    label: "OpenGraph Beschreibung",
    type: "textarea",
    value: "Professionelle Kosmetik-Behandlungen in Hamburg. Jetzt Termin vereinbaren!",
    placeholder: "Beschreibung für Social Media...",
    helpText: "Beschreibung die bei Facebook, LinkedIn etc. angezeigt wird",
  },
  {
    id: "ogImage",
    label: "OpenGraph Bild URL",
    type: "url",
    value: "https://dermastil.de/og-image.jpg",
    placeholder: "https://...",
    helpText: "Bild URL für Social Media Vorschau (empfohlen: 1200x630px)",
  },
  {
    id: "ogSiteName",
    label: "OpenGraph Site Name",
    type: "text",
    value: "Dermastil Kosmetikstudio Hamburg",
    placeholder: "Name Ihrer Website...",
    helpText: "Name der Website für Social Media",
  },
  {
    id: "ogUrl",
    label: "OpenGraph URL",
    type: "url",
    value: "https://dermastil.de",
    placeholder: "https://...",
    helpText: "Kanonische URL der Seite",
  },
  {
    id: "twitterCard",
    label: "Twitter Card Type",
    type: "select",
    value: "summary_large_image",
    options: ["summary", "summary_large_image", "app", "player"],
    helpText: "Typ der Twitter Card",
  },
  {
    id: "twitterTitle",
    label: "Twitter Titel",
    type: "text",
    value: "Kosmetikstudio Hamburg | Dermastil",
    placeholder: "Titel für Twitter...",
    helpText: "Titel für Twitter Vorschau",
  },
  {
    id: "twitterDescription",
    label: "Twitter Beschreibung",
    type: "textarea",
    value: "Professionelle Kosmetik-Behandlungen in Hamburg. Jetzt Termin vereinbaren!",
    placeholder: "Beschreibung für Twitter...",
    helpText: "Beschreibung für Twitter Vorschau",
  },
  {
    id: "twitterImage",
    label: "Twitter Bild URL",
    type: "url",
    value: "https://dermastil.de/twitter-image.jpg",
    placeholder: "https://...",
    helpText: "Bild URL für Twitter Vorschau (empfohlen: 1200x600px)",
  },
  {
    id: "socialLinks",
    label: "Social Media Links",
    type: "keywords",
    value: ["https://facebook.com/dermastil", "https://instagram.com/dermastil"],
    placeholder: "https://...",
    helpText: "Links zu Ihren Social Media Profilen",
  },
];

const DEFAULT_SCHEMA_FIELDS = [
  {
    id: "schemaName",
    label: "Name des Studios",
    type: "text",
    value: "Dermastil Kosmetikstudio Hamburg",
    placeholder: "Name Ihres Studios...",
    helpText: "Name für Schema.org Structured Data",
    required: true,
  },
  {
    id: "schemaTelephone",
    label: "Telefonnummer",
    type: "text",
    value: "+49 40 123456789",
    placeholder: "+49 40 123456789",
    helpText: "Telefonnummer für Schema.org (internationales Format mit +)",
  },
  {
    id: "schemaStreetAddress",
    label: "Straße und Hausnummer",
    type: "text",
    value: "Musterstraße 123",
    placeholder: "z.B. Musterstraße 123",
    helpText: "Adresse für Schema.org",
  },
  {
    id: "schemaPostalCode",
    label: "Postleitzahl",
    type: "text",
    value: "20095",
    placeholder: "z.B. 20095",
    helpText: "PLZ für Schema.org",
  },
  {
    id: "schemaCity",
    label: "Stadt",
    type: "text",
    value: "Hamburg",
    placeholder: "z.B. Hamburg",
    helpText: "Stadt für Schema.org",
  },
  {
    id: "schemaFacebook",
    label: "Facebook URL",
    type: "url",
    value: "https://facebook.com/dermastil",
    placeholder: "https://facebook.com/...",
    helpText: "Facebook Seite für Schema.org",
  },
  {
    id: "schemaInstagram",
    label: "Instagram URL",
    type: "url",
    value: "https://instagram.com/dermastil",
    placeholder: "https://instagram.com/...",
    helpText: "Instagram Profil für Schema.org",
  },
];

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

    return NextResponse.json({
      general: DEFAULT_GENERAL_FIELDS,
      social: DEFAULT_SOCIAL_FIELDS,
      schema: DEFAULT_SCHEMA_FIELDS,
    });
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return NextResponse.json({
      general: DEFAULT_GENERAL_FIELDS,
      social: DEFAULT_SOCIAL_FIELDS,
      schema: DEFAULT_SCHEMA_FIELDS,
    });
  }
}
