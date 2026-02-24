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
