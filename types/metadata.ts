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

export const DEFAULT_GENERAL_FIELDS: MetadataField[] = [
  {
    id: "title",
    label: "Seitentitel",
    type: "text",
    value: "Dermastil Kosmetikstudio Hamburg",
    placeholder: "Titel der Seite",
    helpText: "Wird im Browser-Tab und in Suchergebnissen angezeigt",
  },
  {
    id: "description",
    label: "Meta Beschreibung",
    type: "textarea",
    value: "Kosmetikstudio in Hamburg – Gesichtsbehandlungen, Laser & IPL Haarentfernung, Waxing, Maniküre & Pediküre, Head Spa, Wimpernlifting und Schulungen. Jetzt online Termin buchen.",
    placeholder: "Kurze Beschreibung für Google...",
    helpText: "Maximal 160 Zeichen empfohlen",
  },
  {
    id: "canonical",
    label: "Canonical URL",
    type: "url",
    value: "https://dermastil.de/",
    placeholder: "https://...",
    helpText: "Die offizielle URL dieser Seite (für Duplicate Content)",
  },
  {
    id: "language",
    label: "Sprache",
    type: "select",
    value: "de-DE",
    options: ["de-DE", "de-CH", "de-AT", "en-US", "en-GB"],
    helpText: "Sprache der Website",
  },
];

export const DEFAULT_SOCIAL_FIELDS: MetadataField[] = [
  // OpenGraph - Hauptbild für alle Social Media
  {
    id: "ogImage",
    label: "Social Media Bild",
    type: "image",
    value: "https://dermastil.de/Dermastil20200911.png",
    helpText: "Wird auf Facebook, LinkedIn, WhatsApp, etc. angezeigt. Empfohlen: 1200 x 630 Pixel",
  },
  // Titel und Beschreibung
  {
    id: "ogTitle",
    label: "Titel",
    type: "text",
    value: "Dermastil Kosmetikstudio Hamburg",
    placeholder: "Titel für Social Media",
    helpText: "Wird angezeigt wenn jemand den Link teilt",
  },
  {
    id: "ogDescription",
    label: "Beschreibung",
    type: "textarea",
    value: "Kosmetikstudio in Hamburg – Gesichtsbehandlungen, Laser & IPL Haarentfernung, Waxing, Maniküre & Pediküre, Head Spa, Wimpernlifting und Schulungen. Jetzt online Termin buchen.",
    placeholder: "Kurze Beschreibung...",
  },
  // Website Info
  {
    id: "ogSiteName",
    label: "Website Name",
    type: "text",
    value: "Dermastil",
    helpText: "Name der Website (erscheint unter dem Titel)",
  },
  // Social Profile Links - einfache Liste
  {
    id: "socialLinks",
    label: "Social Media Profile",
    type: "keywords",
    value: ["https://www.facebook.com/dermastil/", "https://www.instagram.com/dermastil_kosmetik/"],
    placeholder: "https://...",
    helpText: "Links zu Facebook, Instagram, TikTok, LinkedIn, etc.",
  },
];

export const DEFAULT_SCHEMA_FIELDS: MetadataField[] = [
  {
    id: "schemaType",
    label: "Schema Type",
    type: "select",
    value: "BeautySalon",
    options: ["BeautySalon", "MedicalBusiness", "LocalBusiness", "HairSalon", "NailSalon"],
  },
  {
    id: "schemaName",
    label: "Business Name",
    type: "text",
    value: "Dermastil Kosmetikstudio Hamburg",
  },
  {
    id: "schemaUrl",
    label: "Website URL",
    type: "url",
    value: "https://dermastil.de/",
  },
  {
    id: "schemaTelephone",
    label: "Telefon",
    type: "text",
    value: "+49-40-89067950",
  },
  {
    id: "schemaEmail",
    label: "E-Mail",
    type: "email",
    value: "",
    placeholder: "info@dermastil.de",
  },
  {
    id: "schemaStreetAddress",
    label: "Straße",
    type: "text",
    value: "Ottenser Hauptstraße 17, Eingang Stangestr. 6 (3. Stock)",
  },
  {
    id: "schemaPostalCode",
    label: "PLZ",
    type: "text",
    value: "22765",
  },
  {
    id: "schemaCity",
    label: "Ort",
    type: "text",
    value: "Hamburg",
  },
  {
    id: "schemaCountry",
    label: "Land",
    type: "select",
    value: "DE",
    options: ["DE", "CH", "AT"],
  },
];

export const AVAILABLE_FIELD_TYPES = [
  { type: "text" as FieldType, label: "Text", icon: "Type" },
  { type: "textarea" as FieldType, label: "Textarea", icon: "AlignLeft" },
  { type: "url" as FieldType, label: "URL", icon: "Link" },
  { type: "image" as FieldType, label: "Bild-URL", icon: "Image" },
  { type: "keywords" as FieldType, label: "Keywords", icon: "Tags" },
  { type: "boolean" as FieldType, label: "Ja/Nein", icon: "ToggleLeft" },
  { type: "json" as FieldType, label: "JSON", icon: "Code" },
  { type: "select" as FieldType, label: "Auswahl", icon: "List" },
  { type: "number" as FieldType, label: "Zahl", icon: "Hash" },
  { type: "email" as FieldType, label: "E-Mail", icon: "Mail" },
];

export function toNextJsMetadata(data: {
  general: MetadataField[];
  social: MetadataField[];
  schema: MetadataField[];
}) {
  const get = (fields: MetadataField[], id: string) =>
    fields.find((f) => f.id === id)?.value;

  return {
    title: get(data.general, "title"),
    description: get(data.general, "description"),
    robots: {
      index: true,
      follow: true,
    },
    alternates: { canonical: get(data.general, "canonical") },
    openGraph: {
      title: get(data.social, "ogTitle"),
      description: get(data.social, "ogDescription"),
      url: get(data.social, "ogUrl"),
      siteName: get(data.social, "ogSiteName"),
      images: get(data.social, "ogImage") ? [{ url: get(data.social, "ogImage") }] : undefined,
      locale: get(data.general, "language") || "de-CH",
    },
    twitter: {
      card: "summary_large_image",
      title: get(data.social, "ogTitle"),
      description: get(data.social, "ogDescription"),
      images: get(data.social, "ogImage") ? [get(data.social, "ogImage")] : undefined,
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": get(data.schema, "schemaType") || "BeautySalon",
      name: get(data.schema, "schemaName"),
      url: get(data.schema, "schemaUrl"),
      telephone: get(data.schema, "schemaTelephone"),
      email: get(data.schema, "schemaEmail"),
      address: {
        "@type": "PostalAddress",
        streetAddress: get(data.schema, "schemaStreetAddress"),
        addressLocality: get(data.schema, "schemaCity"),
        postalCode: get(data.schema, "schemaPostalCode"),
        addressCountry: get(data.schema, "schemaCountry") || "CH",
      },
      sameAs: get(data.social, "socialLinks") || [],
    },
    _raw: data,
  };
}
