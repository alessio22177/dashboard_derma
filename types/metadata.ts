// Next.js Metadata kompatible Datenstruktur

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  schemaName: string;
  schemaTelephone: string;
  schemaStreetAddress: string;
  schemaPostalCode: string;
  schemaCity: string;
  schemaFacebook: string;
  schemaInstagram: string;
}

export interface MetadataFormData {
  general: MetadataField[];
  social: MetadataField[];
  schema: MetadataField[];
}

export interface MetadataField {
  id: string;
  label: string;
  type: FieldType;
  value: any;
  placeholder?: string;
  helpText?: string;
  maxLength?: number;
  required?: boolean;
  options?: string[];
  isCustom?: boolean;
}

export type FieldType =
  | "text"
  | "textarea"
  | "url"
  | "image"
  | "keywords"
  | "boolean"
  | "json"
  | "select"
  | "number"
  | "email";

// Default Felder für den Allgemein-Tab
export const DEFAULT_GENERAL_FIELDS: MetadataField[] = [
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

// Default Felder für den Social Media Tab
export const DEFAULT_SOCIAL_FIELDS: MetadataField[] = [
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
    value: [
      "https://facebook.com/dermastil",
      "https://instagram.com/dermastil"
    ],
    placeholder: "https://...",
    helpText: "Links zu Ihren Social Media Profilen",
  },
];

// Default Felder für den Schema.org Tab
export const DEFAULT_SCHEMA_FIELDS: MetadataField[] = [
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

// Konvertiert Dashboard-Daten zu Next.js Metadata Format
export function toNextJsMetadata(formData: MetadataFormData) {
  const getValue = (id: string, fields: MetadataField[]) => 
    fields.find((f) => f.id === id)?.value || "";

  const general = formData.general;
  const social = formData.social;
  const schema = formData.schema;

  return {
    title: getValue("title", general),
    description: getValue("description", general),
    keywords: getValue("keywords", general),
    robots: getValue("robots", general),
    openGraph: {
      title: getValue("ogTitle", social),
      description: getValue("ogDescription", social),
      url: getValue("ogUrl", social),
      siteName: getValue("ogSiteName", social),
      images: getValue("ogImage", social)
        ? [{ url: getValue("ogImage", social) }]
        : undefined,
    },
    twitter: {
      card: getValue("twitterCard", social) as any,
      title: getValue("twitterTitle", social),
      description: getValue("twitterDescription", social),
      images: getValue("twitterImage", social)
        ? [getValue("twitterImage", social)]
        : undefined,
    },
    alternates: {
      canonical: getValue("ogUrl", social),
    },
    other: {
      "json:ld": {
        "@context": "https://schema.org",
        "@type": "BeautySalon",
        name: getValue("schemaName", schema),
        telephone: getValue("schemaTelephone", schema),
        address: {
          "@type": "PostalAddress",
          streetAddress: getValue("schemaStreetAddress", schema),
          postalCode: getValue("schemaPostalCode", schema),
          addressLocality: getValue("schemaCity", schema),
          addressCountry: "DE",
        },
        sameAs: [
          getValue("schemaFacebook", schema),
          getValue("schemaInstagram", schema),
        ].filter(Boolean),
      },
    },
  };
}
