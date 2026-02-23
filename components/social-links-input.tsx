"use client";

import { useState } from "react";
import { X, Facebook, Instagram, Linkedin, Youtube, Globe, Music2, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SocialLinksInputProps {
  links: string[];
  onChange: (links: string[]) => void;
  placeholder?: string;
}

// Automatische Plattform-Erkennung
function detectPlatform(url: string): { name: string; icon: React.ReactNode; color: string } {
  const lower = url.toLowerCase();
  
  if (lower.includes("facebook.com") || lower.includes("fb.com")) {
    return { name: "Facebook", icon: <Facebook className="h-4 w-4" />, color: "bg-blue-50 text-blue-600 border-blue-200" };
  }
  if (lower.includes("instagram.com") || lower.includes("instagr.am")) {
    return { name: "Instagram", icon: <Instagram className="h-4 w-4" />, color: "bg-pink-50 text-pink-600 border-pink-200" };
  }
  if (lower.includes("tiktok.com")) {
    return { name: "TikTok", icon: <Music2 className="h-4 w-4" />, color: "bg-black/5 text-black border-black/20" };
  }
  if (lower.includes("linkedin.com")) {
    return { name: "LinkedIn", icon: <Linkedin className="h-4 w-4" />, color: "bg-blue-50 text-blue-700 border-blue-200" };
  }
  if (lower.includes("youtube.com") || lower.includes("youtu.be")) {
    return { name: "YouTube", icon: <Youtube className="h-4 w-4" />, color: "bg-red-50 text-red-600 border-red-200" };
  }
  if (lower.includes("twitter.com") || lower.includes("x.com")) {
    return { name: "X / Twitter", icon: <MessageCircle className="h-4 w-4" />, color: "bg-gray-50 text-gray-600 border-gray-200" };
  }
  if (lower.includes("pinterest.com")) {
    return { name: "Pinterest", icon: <Globe className="h-4 w-4" />, color: "bg-red-50 text-red-700 border-red-200" };
  }
  
  return { name: "Website", icon: <Globe className="h-4 w-4" />, color: "bg-slate-50 text-slate-600 border-slate-200" };
}

export function SocialLinksInput({ links, onChange, placeholder }: SocialLinksInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const addLink = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    // Einfache URL-Validierung
    if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
      setError("URL muss mit http:// oder https:// beginnen");
      return;
    }

    if (!links.includes(trimmed)) {
      onChange([...links, trimmed]);
      setInputValue("");
      setError("");
    } else {
      setError("Diese URL wurde bereits hinzugefügt");
    }
  };

  const removeLink = (link: string) => {
    onChange(links.filter((l) => l !== link));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addLink();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            type="url"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setError("");
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || "https://tiktok.com/@deinprofil"}
            className="focus-visible:ring-emerald-500"
          />
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={addLink}
          className="shrink-0"
        >
          Hinzufügen
        </Button>
      </div>

      {links.length === 0 && (
        <p className="text-sm text-slate-400">
          Noch keine Links hinzugefügt. TikTok, LinkedIn, etc. einfach oben eintragen.
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        {links.map((link) => {
          const platform = detectPlatform(link);
          return (
            <a
              key={link}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors hover:opacity-80 ${platform.color}`}
            >
              {platform.icon}
              <span className="max-w-[150px] truncate">{platform.name}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  removeLink(link);
                }}
                className="ml-1 rounded-full p-0.5 hover:bg-black/10"
              >
                <X className="h-3 w-3" />
              </button>
            </a>
          );
        })}
      </div>
    </div>
  );
}
