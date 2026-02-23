"use client";

import type { MetadataField } from "@/types/metadata";

interface SimpleSocialPreviewProps {
  fields: MetadataField[];
}

export function SimpleSocialPreview({ fields }: SimpleSocialPreviewProps) {
  const getValue = (id: string) =>
    fields.find((f) => f.id === id)?.value || "";

  const title = getValue("ogTitle") || "Titel";
  const description = getValue("ogDescription") || "Beschreibung...";
  const image = getValue("ogImage") || "";
  const siteName = getValue("ogSiteName") || "Website";

  return (
    <div className="space-y-4">
      {/* Facebook/LinkedIn Style */}
      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        {image ? (
          <img
            src={image}
            alt=""
            className="h-40 w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-40 items-center justify-center bg-slate-100 text-slate-400">
            Kein Bild
          </div>
        )}
        <div className="border-t border-slate-100 bg-slate-50 p-3">
          <p className="truncate text-xs uppercase tracking-wide text-slate-500">
            {siteName}
          </p>
          <p className="truncate text-base font-semibold text-[#1d2129]">{title}</p>
          <p className="line-clamp-2 text-sm text-[#606770]">{description}</p>
        </div>
      </div>

      {/* WhatsApp Style */}
      <div className="max-w-sm rounded-lg bg-[#e1ffd7] p-2">
        <div className="overflow-hidden rounded-lg border border-[#dcf8c6] bg-white">
          {image && (
            <img
              src={image}
              alt=""
              className="h-32 w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          )}
          <div className="p-2">
            <p className="truncate text-sm font-medium text-slate-900">{title}</p>
            <p className="line-clamp-2 text-xs text-slate-600">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
