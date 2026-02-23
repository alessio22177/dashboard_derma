"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { MetadataField, FieldType } from "@/types/metadata";
import { AVAILABLE_FIELD_TYPES } from "@/types/metadata";

interface AddFieldDialogProps {
  onAdd: (field: MetadataField) => void;
}

export function AddFieldDialog({ onAdd }: AddFieldDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<FieldType>("text");
  const [customLabel, setCustomLabel] = useState("");
  const [customId, setCustomId] = useState("");

  const handleAdd = () => {
    const label = customLabel || AVAILABLE_FIELD_TYPES.find(t => t.type === selectedType)?.label || "Neues Feld";
    const id = customId || `custom_${Date.now()}`;
    
    const newField: MetadataField = {
      id,
      label,
      type: selectedType,
      value: selectedType === "boolean" ? false : selectedType === "keywords" ? [] : "",
      isCustom: true,
    };

    onAdd(newField);
    setOpen(false);
    setCustomLabel("");
    setCustomId("");
    setSelectedType("text");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          Feld hinzufügen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Neues Feld hinzufügen</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Feld-Typ</Label>
            <Select value={selectedType} onValueChange={(v) => setSelectedType(v as FieldType)}>
              <SelectTrigger className="focus:ring-emerald-500">
                <SelectValue placeholder="Typ wählen..." />
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_FIELD_TYPES.map((type) => (
                  <SelectItem key={type.type} value={type.type}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fieldLabel">Feld-Name (optional)</Label>
            <Input
              id="fieldLabel"
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
              placeholder={AVAILABLE_FIELD_TYPES.find(t => t.type === selectedType)?.label}
              className="focus-visible:ring-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fieldId">Technischer ID (optional)</Label>
            <Input
              id="fieldId"
              value={customId}
              onChange={(e) => setCustomId(e.target.value.replace(/\s+/g, "_").toLowerCase())}
              placeholder={`custom_${Date.now()}`}
              className="focus-visible:ring-emerald-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Abbrechen
          </Button>
          <Button onClick={handleAdd} className="bg-emerald-600 hover:bg-emerald-700">
            Hinzufügen
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
