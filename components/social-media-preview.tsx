"use client";

import { Facebook, Linkedin, MessageCircle, Twitter, Globe } from "lucide-react";
import type { MetadataField } from "@/types/metadata";

interface SocialMediaPreviewProps {
  fields: MetadataField[];
  activeTab?: "whatsapp" | "facebook" | "twitter" | "linkedin";
}

export function SocialMediaPreview({ fields, activeTab = "facebook" }: SocialMediaPreviewProps) {
  const getValue = (id: string) =>
    fields.find((f) => f.id === id)?.value || "";

  const title = getValue("ogTitle") || getValue("twitterTitle") || "Titel";
  const description =
    getValue("ogDescription") ||
    getValue("twitterDescription") ||
    "Beschreibung der Seite...";
  const image =
    getValue("ogImage") ||
    getValue("twitterImage") ||
    "https://via.placeholder.com/1200x630?text=Kein+Bild";
  const siteName = getValue("ogSiteName") || "Website";
  const url = getValue("ogUrl") || "https://example.com";

  const renderWhatsAppPreview = () => (
    <div className="max-w-sm rounded-lg bg-[#e1ffd7] p-3">
      <div className="overflow-hidden rounded-lg border border-[#dcf8c6] bg-white">
        <img
          src={image}
          alt=""
          className="h-40 w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/400x200?text=Kein+Bild";
          }}
        />
        <div className="p-2">
          <p className="truncate text-xs text-slate-500">{url}</p>
          <p className="truncate text-sm font-medium text-slate-900">{title}</p>
          <p className="line-clamp-2 text-xs text-slate-600">{description}</p>
        </div>
      </div>
    </div>
  );

  const renderFacebookPreview = () => (
    <div className="max-w-md overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <img
        src={image}
        alt=""
        className="h-52 w-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://via.placeholder.com/1200x630?text=Kein+Bild";
        }}
      />
      <div className="border-t border-slate-100 bg-slate-50 p-3">
        <p className="truncate text-xs uppercase tracking-wide text-slate-500">
          {url}
        </p>
        <p className="truncate text-base font-semibold text-[#1d2129]">{title}</p>
        <p className="line-clamp-2 text-sm text-[#606770]">{description}</p>
      </div>
    </div>
  );

  const renderTwitterPreview = () => {
    const cardType = getValue("twitterCard") || "summary_large_image";
    const isLarge = cardType === "summary_large_image";

    return (
      <div className="max-w-md overflow-hidden rounded-xl border border-slate-200 bg-white">
        {isLarge && (
          <img
            src={image}
            alt=""
            className="h-52 w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/600x300?text=Kein+Bild";
            }}
          />
        )}
        <div className="p-3">
          <p className="truncate text-sm text-slate-900">{title}</p>
          <p className="line-clamp-2 text-sm text-slate-500">{description}</p>
          <p className="mt-1 flex items-center gap-1 text-sm text-slate-400">
            <Globe className="h-3 w-3" />
            {url}
          </p>
        </div>
        {!isLarge && (
          <div className="flex">
            <img
              src={image}
              alt=""
              className="h-24 w-24 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/100?text=Kein+Bild";
              }}
            />
          </div>
        )}
      </div>
    );
  };

  const renderLinkedInPreview = () => (
    <div className="max-w-lg overflow-hidden rounded-lg border border-slate-200 bg-white">
      <img
        src={image}
        alt=""
        className="h-56 w-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://via.placeholder.com/1200x627?text=Kein+Bild";
        }}
      />
      <div className="p-4">
        <p className="text-lg font-semibold text-slate-900">{title}</p>
        <p className="mt-1 line-clamp-2 text-sm text-slate-600">{description}</p>
        <p className="mt-2 text-xs text-slate-500">{siteName} • {url}</p>
      </div>
    </div>
  );

  const previews = {
    whatsapp: { component: renderWhatsAppPreview(), icon: MessageCircle, label: "WhatsApp" },
    facebook: { component: renderFacebookPreview(), icon: Facebook, label: "Facebook" },
    twitter: { component: renderTwitterPreview(), icon: Twitter, label: "Twitter/X" },
    linkedin: { component: renderLinkedInPreview(), icon: Linkedin, label: "LinkedIn" },
  };

  const current = previews[activeTab];
  const Icon = current.icon;

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-700">
        <Icon className="h-4 w-4" />
        {current.label} Vorschau
      </div>
      <div className="flex justify-center">{current.component}</div>
      <p className="mt-3 text-center text-xs text-slate-400">
        So wird dein Link bei {current.label} angezeigt
      </p>
    </div>
  );
}

export function SocialMediaPreviewTabs({
  fields,
}: {
  fields: MetadataField[];
}) {
  const tabs = [
    { id: "whatsapp" as const, icon: MessageCircle, label: "WhatsApp" },
    { id: "facebook" as const, icon: Facebook, label: "Facebook" },
    { id: "twitter" as const, icon: Twitter, label: "Twitter" },
    { id: "linkedin" as const, icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <SocialMediaPreview
          key={tab.id}
          fields={fields}
          activeTab={tab.id}
        />
      ))}
    </div>
  );
}
