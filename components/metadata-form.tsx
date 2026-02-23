"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Loader2, Save, Globe, Image as ImageIcon, Twitter, Code } from "lucide-react";
import type { SEOMetadata, MetadataFormData } from "@/types/metadata";

const formSchema = z.object({
  // Allgemein
  title: z.string(),
  description: z.string().max(160, "Maximal 160 Zeichen"),
  keywords: z.string(),

  // OpenGraph
  ogTitle: z.string(),
  ogDescription: z.string(),
  ogImage: z.string().url("Ungültige URL").or(z.literal("")),

  // Twitter
  twitterTitle: z.string(),
  twitterDescription: z.string(),
  twitterImage: z.string().url("Ungültige URL").or(z.literal("")),

  // Schema.org
  schemaName: z.string(),
  schemaTelephone: z.string(),
  schemaStreetAddress: z.string(),
  schemaPostalCode: z.string(),
  schemaCity: z.string(),
  schemaFacebook: z.string().url("Ungültige URL").or(z.literal("")),
  schemaInstagram: z.string().url("Ungültige URL").or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

interface CharacterCounterProps {
  current: number;
  max: number;
}

function CharacterCounter({ current, max }: CharacterCounterProps) {
  const isOverLimit = current > max;
  return (
    <span className={`text-xs ${isOverLimit ? "text-red-500" : "text-slate-400"}`}>
      {current}/{max}
    </span>
  );
}

export function MetadataForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [initialData, setInitialData] = useState<SEOMetadata | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      keywords: "",
      ogTitle: "",
      ogDescription: "",
      ogImage: "",
      twitterTitle: "",
      twitterDescription: "",
      twitterImage: "",
      schemaName: "",
      schemaTelephone: "",
      schemaStreetAddress: "",
      schemaPostalCode: "",
      schemaCity: "",
      schemaFacebook: "",
      schemaInstagram: "",
    },
  });

  // Watch values for character counters
  const titleValue = watch("title");
  const descriptionValue = watch("description");

  useEffect(() => {
    fetchMetadata();
  }, []);

  const fetchMetadata = async () => {
    try {
      const response = await fetch("/api/metadata");
      const data: SEOMetadata = await response.json();
      setInitialData(data);

      // Convert keywords array to comma-separated string
      const keywordsString = Array.isArray(data.keywords)
        ? data.keywords.join(", ")
        : data.keywords;

      reset({
        title: data.title || "",
        description: data.description || "",
        keywords: keywordsString || "",
        ogTitle: data.ogTitle || "",
        ogDescription: data.ogDescription || "",
        ogImage: data.ogImage || "",
        twitterTitle: data.twitterTitle || "",
        twitterDescription: data.twitterDescription || "",
        twitterImage: data.twitterImage || "",
        schemaName: data.schemaName || "",
        schemaTelephone: data.schemaTelephone || "",
        schemaStreetAddress: data.schemaStreetAddress || "",
        schemaPostalCode: data.schemaPostalCode || "",
        schemaCity: data.schemaCity || "",
        schemaFacebook: data.schemaFacebook || "",
        schemaInstagram: data.schemaInstagram || "",
      });
    } catch (error) {
      toast.error("Fehler beim Laden der Metadaten");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    setSaving(true);
    try {
      // Convert keywords string to array
      const keywordsArray = data.keywords
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k.length > 0);

      const payload: SEOMetadata = {
        ...data,
        keywords: keywordsArray,
      };

      const response = await fetch("/api/metadata/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Änderungen wurden veröffentlicht");
        reset(data); // Reset dirty state
      } else {
        toast.error(result.error || "Speichern fehlgeschlagen");
      }
    } catch (error) {
      toast.error("Verbindung zu n8n fehlgeschlagen", {
        action: {
          label: "Erneut versuchen",
          onClick: () => handleSubmit(onSubmit)(),
        },
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">SEO Metadaten</h2>
          <p className="text-sm text-slate-500">
            Verwalten Sie die Metadaten Ihrer Website
          </p>
        </div>
        <Button
          type="submit"
          disabled={saving || !isDirty}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Speichern...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Speichern
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-white border border-slate-200 p-1">
          <TabsTrigger value="general" className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700">
            <Globe className="w-4 h-4 mr-2" />
            Allgemein
          </TabsTrigger>
          <TabsTrigger value="opengraph" className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700">
            <ImageIcon className="w-4 h-4 mr-2" />
            OpenGraph
          </TabsTrigger>
          <TabsTrigger value="twitter" className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700">
            <Twitter className="w-4 h-4 mr-2" />
            Twitter
          </TabsTrigger>
          <TabsTrigger value="schema" className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700">
            <Code className="w-4 h-4 mr-2" />
            Schema.org
          </TabsTrigger>
        </TabsList>

        {/* Allgemein Tab */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Allgemeine Metadaten</CardTitle>
              <CardDescription>
                Basis SEO-Informationen für Ihre Website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  {...register("title")}
                  className="focus-visible:ring-emerald-500"
                  placeholder="Dermastil - Dermatologie Pratteln"
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="description">Description</Label>
                  <CharacterCounter current={descriptionValue.length} max={160} />
                </div>
                <Textarea
                  id="description"
                  {...register("description")}
                  rows={4}
                  className={`focus-visible:ring-emerald-500 ${
                    descriptionValue.length > 160 ? "border-red-500" : ""
                  }`}
                  placeholder="Kurze Beschreibung Ihrer Website..."
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  {...register("keywords")}
                  className="focus-visible:ring-emerald-500"
                  placeholder="Hautarzt, Dermatologie, Pratteln, ..."
                />
                <p className="text-xs text-slate-500">
                  Mit Kommas getrennt eingeben
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* OpenGraph Tab */}
        <TabsContent value="opengraph">
          <Card>
            <CardHeader>
              <CardTitle>OpenGraph Metadaten</CardTitle>
              <CardDescription>
                Für Social Media Sharing (Facebook, LinkedIn, etc.)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="ogTitle">OG Title</Label>
                <Input
                  id="ogTitle"
                  {...register("ogTitle")}
                  className="focus-visible:ring-emerald-500"
                  placeholder="Titel für Social Media..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ogDescription">OG Description</Label>
                <Textarea
                  id="ogDescription"
                  {...register("ogDescription")}
                  rows={3}
                  className="focus-visible:ring-emerald-500"
                  placeholder="Beschreibung für Social Media..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ogImage">OG Image URL</Label>
                <Input
                  id="ogImage"
                  {...register("ogImage")}
                  className="focus-visible:ring-emerald-500"
                  placeholder="https://www.dermastil.ch/og-image.jpg"
                />
                {errors.ogImage && (
                  <p className="text-sm text-red-500">{errors.ogImage.message}</p>
                )}
                {watch("ogImage") && !errors.ogImage && (
                  <div className="mt-2">
                    <p className="text-xs text-slate-500 mb-2">Vorschau:</p>
                    <img
                      src={watch("ogImage")}
                      alt="OG Image Preview"
                      className="max-w-xs rounded-lg border border-slate-200"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Twitter Tab */}
        <TabsContent value="twitter">
          <Card>
            <CardHeader>
              <CardTitle>Twitter Metadaten</CardTitle>
              <CardDescription>
                Spezifische Metadaten für Twitter Cards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="twitterTitle">Twitter Title</Label>
                <Input
                  id="twitterTitle"
                  {...register("twitterTitle")}
                  className="focus-visible:ring-emerald-500"
                  placeholder="Titel für Twitter..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitterDescription">Twitter Description</Label>
                <Textarea
                  id="twitterDescription"
                  {...register("twitterDescription")}
                  rows={3}
                  className="focus-visible:ring-emerald-500"
                  placeholder="Beschreibung für Twitter..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitterImage">Twitter Image URL</Label>
                <Input
                  id="twitterImage"
                  {...register("twitterImage")}
                  className="focus-visible:ring-emerald-500"
                  placeholder="https://www.dermastil.ch/twitter-image.jpg"
                />
                {errors.twitterImage && (
                  <p className="text-sm text-red-500">{errors.twitterImage.message}</p>
                )}
                {watch("twitterImage") && !errors.twitterImage && (
                  <div className="mt-2">
                    <p className="text-xs text-slate-500 mb-2">Vorschau:</p>
                    <img
                      src={watch("twitterImage")}
                      alt="Twitter Image Preview"
                      className="max-w-xs rounded-lg border border-slate-200"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Schema.org Tab */}
        <TabsContent value="schema">
          <Card>
            <CardHeader>
              <CardTitle>Schema.org (JSON-LD)</CardTitle>
              <CardDescription>
                Strukturierte Daten für Suchmaschinen
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="schemaName">Business Name</Label>
                <Input
                  id="schemaName"
                  {...register("schemaName")}
                  className="focus-visible:ring-emerald-500"
                  placeholder="Dermastil - Dermatologie Pratteln"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="schemaTelephone">Telefon</Label>
                <Input
                  id="schemaTelephone"
                  {...register("schemaTelephone")}
                  className="focus-visible:ring-emerald-500"
                  placeholder="+41 61 826 91 11"
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-slate-900">Adresse</h4>
                
                <div className="space-y-2">
                  <Label htmlFor="schemaStreetAddress">Straße</Label>
                  <Input
                    id="schemaStreetAddress"
                    {...register("schemaStreetAddress")}
                    className="focus-visible:ring-emerald-500"
                    placeholder="Münchensteinerstrasse 91"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="schemaPostalCode">PLZ</Label>
                    <Input
                      id="schemaPostalCode"
                      {...register("schemaPostalCode")}
                      className="focus-visible:ring-emerald-500"
                      placeholder="4133"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schemaCity">Ort</Label>
                    <Input
                      id="schemaCity"
                      {...register("schemaCity")}
                      className="focus-visible:ring-emerald-500"
                      placeholder="Pratteln"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-slate-900">Social Media</h4>
                
                <div className="space-y-2">
                  <Label htmlFor="schemaFacebook">Facebook URL</Label>
                  <Input
                    id="schemaFacebook"
                    {...register("schemaFacebook")}
                    className="focus-visible:ring-emerald-500"
                    placeholder="https://www.facebook.com/dermastil"
                  />
                  {errors.schemaFacebook && (
                    <p className="text-sm text-red-500">{errors.schemaFacebook.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schemaInstagram">Instagram URL</Label>
                  <Input
                    id="schemaInstagram"
                    {...register("schemaInstagram")}
                    className="focus-visible:ring-emerald-500"
                    placeholder="https://www.instagram.com/dermastil"
                  />
                  {errors.schemaInstagram && (
                    <p className="text-sm text-red-500">{errors.schemaInstagram.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
}
