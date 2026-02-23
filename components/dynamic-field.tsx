"use client";

import { useState } from "react";
import { GripVertical, Plus, X } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SocialLinksInput } from "./social-links-input";
import type { MetadataField, FieldType } from "@/types/metadata";

interface DynamicFieldProps {
  field: MetadataField;
  onChange: (value: any) => void;
}

export function DynamicField({ field, onChange }: DynamicFieldProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const renderField = () => {
    switch (field.type) {
      case "text":
      case "url":
      case "email":
        return (
          <Input
            type={field.type === "email" ? "email" : "text"}
            value={field.value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className="focus-visible:ring-emerald-500"
          />
        );

      case "textarea":
        return (
          <Textarea
            value={field.value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            rows={3}
            className="focus-visible:ring-emerald-500"
          />
        );

      case "image":
        return (
          <div className="space-y-2">
            <Input
              type="url"
              value={field.value || ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder={field.placeholder || "https://..."}
              className="focus-visible:ring-emerald-500"
            />
            {field.value && (
              <img
                src={field.value}
                alt="Preview"
                className="max-w-xs max-h-32 rounded-lg border border-slate-200 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            )}
          </div>
        );

      case "keywords":
        const keywords = Array.isArray(field.value) ? field.value : [];
        // Use SocialLinksInput for socialLinks field
        if (field.id === "socialLinks") {
          return (
            <SocialLinksInput
              links={keywords}
              onChange={onChange}
              placeholder={field.placeholder}
            />
          );
        }
        return (
          <KeywordsInput
            keywords={keywords}
            onChange={onChange}
            placeholder={field.placeholder}
          />
        );

      case "boolean":
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={!!field.value}
              onCheckedChange={onChange}
              className="data-[state=checked]:bg-emerald-600"
            />
            <span className="text-sm text-slate-600">
              {field.value ? "Ja" : "Nein"}
            </span>
          </div>
        );

      case "select":
        return (
          <Select value={field.value || ""} onValueChange={onChange}>
            <SelectTrigger className="focus:ring-emerald-500">
              <SelectValue placeholder="Auswählen..." />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "number":
        return (
          <Input
            type="number"
            value={field.value || ""}
            onChange={(e) => onChange(Number(e.target.value))}
            className="focus-visible:ring-emerald-500"
          />
        );

      case "json":
        return (
          <Textarea
            value={
              typeof field.value === "object"
                ? JSON.stringify(field.value, null, 2)
                : field.value || ""
            }
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                onChange(parsed);
              } catch {
                onChange(e.target.value);
              }
            }}
            placeholder={'{"key": "value"}'}
            rows={6}
            className="font-mono text-sm focus-visible:ring-emerald-500"
          />
        );

      default:
        return (
          <Input
            value={field.value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="focus-visible:ring-emerald-500"
          />
        );
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <div
          {...attributes}
          {...listeners}
          className="mt-1 cursor-grab text-slate-400 hover:text-slate-600 active:cursor-grabbing"
        >
          <GripVertical className="h-5 w-5" />
        </div>

        <div className="flex-1 space-y-2">
          <Label className="font-medium text-slate-900">
            {field.label}
            {field.required && <span className="ml-1 text-red-500">*</span>}
          </Label>

          {renderField()}

          {field.helpText && (
            <p className="text-xs text-slate-500">{field.helpText}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Keywords Input Component
function KeywordsInput({
  keywords,
  onChange,
  placeholder,
}: {
  keywords: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}) {
  const [inputValue, setInputValue] = useState("");

  const addKeyword = () => {
    if (inputValue.trim() && !keywords.includes(inputValue.trim())) {
      onChange([...keywords, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeKeyword = (keyword: string) => {
    onChange(keywords.filter((k) => k !== keyword));
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder || "Keyword eingeben..."}
          className="focus-visible:ring-emerald-500"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addKeyword();
            }
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={addKeyword}
          className="shrink-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <span
            key={keyword}
            className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700"
          >
            {keyword}
            <button
              type="button"
              onClick={() => removeKeyword(keyword)}
              className="ml-1 rounded-full p-0.5 hover:bg-emerald-100"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
