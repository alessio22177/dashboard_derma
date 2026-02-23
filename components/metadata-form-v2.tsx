"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Loader2, Save, RotateCcw, Globe, Share2, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { DynamicField } from "@/components/dynamic-field";
import { SimpleSocialPreview } from "@/components/simple-social-preview";
import type { MetadataField } from "@/types/metadata";
import {
  DEFAULT_GENERAL_FIELDS,
  DEFAULT_SOCIAL_FIELDS,
  DEFAULT_SCHEMA_FIELDS,
  toNextJsMetadata,
} from "@/types/metadata";

interface TabSectionProps {
  title: string;
  description: string;
  fields: MetadataField[];
  onFieldsChange: (fields: MetadataField[]) => void;
  children?: React.ReactNode;
}

function TabSection({
  title,
  description,
  fields,
  onFieldsChange,
  children,
}: TabSectionProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over?.id);
      onFieldsChange(arrayMove(fields, oldIndex, newIndex));
    }
  };

  const updateField = (id: string, value: any) => {
    onFieldsChange(
      fields.map((f) => (f.id === id ? { ...f, value } : f))
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {children}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={fields.map((f) => f.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {fields.map((field) => (
                <DynamicField
                  key={field.id}
                  field={field}
                  onChange={(value) => updateField(field.id, value)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );
}

export function MetadataFormV2() {
  const [generalFields, setGeneralFields] = useState<MetadataField[]>(DEFAULT_GENERAL_FIELDS);
  const [socialFields, setSocialFields] = useState<MetadataField[]>(DEFAULT_SOCIAL_FIELDS);
  const [schemaFields, setSchemaFields] = useState<MetadataField[]>(DEFAULT_SCHEMA_FIELDS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  // Load data from API
  useEffect(() => {
    fetchMetadata();
  }, []);

  // Track changes
  useEffect(() => {
    setHasChanges(true);
  }, [generalFields, socialFields, schemaFields]);

  const fetchMetadata = async () => {
    try {
      const response = await fetch("/api/metadata");
      if (response.ok) {
        const data = await response.json();
        if (data._raw) {
          setGeneralFields(data._raw.general || DEFAULT_GENERAL_FIELDS);
          setSocialFields(data._raw.social || DEFAULT_SOCIAL_FIELDS);
          setSchemaFields(data._raw.schema || DEFAULT_SCHEMA_FIELDS);
        }
      }
    } catch (error) {
      toast.error("Fehler beim Laden der Metadaten");
    } finally {
      setLoading(false);
      setHasChanges(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = toNextJsMetadata({
        general: generalFields,
        social: socialFields,
        schema: schemaFields,
      });

      const response = await fetch("/api/metadata/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Änderungen wurden veröffentlicht");
        setHasChanges(false);
      } else {
        throw new Error("Speichern fehlgeschlagen");
      }
    } catch (error) {
      toast.error("Speichern fehlgeschlagen", {
        action: {
          label: "Erneut versuchen",
          onClick: handleSave,
        },
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm("Alle Änderungen verwerfen?")) {
      fetchMetadata();
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sticky Header with Actions */}
      <div className="sticky top-16 z-40 -mx-4 bg-slate-50/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-slate-50/80 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">SEO Metadaten</h2>
            <p className="text-sm text-slate-500">
              {hasChanges ? "Ungespeicherte Änderungen" : "Alle Änderungen gespeichert"}
            </p>
          </div>
          <div className="flex gap-2">
            {hasChanges && (
              <Button
                variant="outline"
                onClick={handleReset}
                disabled={saving}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Verwerfen
              </Button>
            )}
            <Button
              onClick={handleSave}
              disabled={saving || !hasChanges}
              className="gap-2 bg-emerald-600 hover:bg-emerald-700"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Speichern...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Speichern
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full justify-start bg-white p-1">
          <TabsTrigger
            value="general"
            className="gap-2 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700"
          >
            <Globe className="h-4 w-4" />
            Allgemein
          </TabsTrigger>
          <TabsTrigger
            value="social"
            className="gap-2 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700"
          >
            <Share2 className="h-4 w-4" />
            Social Media
          </TabsTrigger>
          <TabsTrigger
            value="schema"
            className="gap-2 data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700"
          >
            <Code className="h-4 w-4" />
            Schema.org
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <TabSection
            title="Allgemeine Metadaten"
            description="Basis SEO-Informationen für Ihre Website"
            fields={generalFields}
            onFieldsChange={setGeneralFields}
          />
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <TabSection
                title="Social Media"
                description="Bild, Titel und Links für alle Plattformen"
                fields={socialFields}
                onFieldsChange={setSocialFields}
              />
            </div>
            <div className="lg:col-span-2">
              <Card className="sticky top-40">
                <CardHeader>
                  <CardTitle>Vorschau</CardTitle>
                  <CardDescription>
                    So sieht dein Link aus wenn er geteilt wird
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SimpleSocialPreview fields={socialFields} />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="schema">
          <TabSection
            title="Schema.org (JSON-LD)"
            description="Strukturierte Daten für Suchmaschinen"
            fields={schemaFields}
            onFieldsChange={setSchemaFields}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
