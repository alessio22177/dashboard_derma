# Dermastil Meta Manager

Ein Next.js 14 Dashboard zur Verwaltung von SEO-Metadaten mit n8n-Integration.

## Features

- **Basic Auth**: Einfacher Passwortschutz via Middleware
- **SEO Metadaten-Verwaltung**: Bearbeiten von Title, Description, Keywords
- **OpenGraph**: Social Media Metadaten für Facebook, LinkedIn etc.
- **Twitter Cards**: Spezifische Metadaten für Twitter
- **Schema.org**: JSON-LD strukturierte Daten für Google
- **n8n Integration**: Automatische Synchronisierung mit n8n Webhooks
- **Responsive Design**: Mobile-first, optimiert für Desktop

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui Komponenten
- react-hook-form + zod (Validierung)
- Sonner (Toast Notifications)
- Lucide React (Icons)

## Setup

### 1. Dependencies installieren

```bash
cd my-app
npm install
```

### 2. Environment Variablen

Erstelle eine `.env.local` Datei:

```env
# Authentifizierung
DASHBOARD_PASSWORD=dermastil2024

# n8n Webhooks (für Produktion)
N8N_GET_WEBHOOK=https://n8n.dein-server.de/webhook/get-metadata
N8N_SAVE_WEBHOOK=https://n8n.dein-server.de/webhook/save-metadata

# Für Entwicklung ohne n8n (Mock-Modus)
N8N_GET_WEBHOOK=mock
N8N_SAVE_WEBHOOK=mock
```

### 3. Entwicklungsserver starten

```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000)

### 4. Login

- Username: `admin`
- Password: `dermastil2024` (oder dein `DASHBOARD_PASSWORD` Wert)

## Deployment auf Vercel

### 1. GitHub Repository erstellen

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/dein-username/dermastil-meta-manager.git
git push -u origin main
```

### 2. Vercel Projekt erstellen

1. Gehe zu [vercel.com](https://vercel.com)
2. Importiere dein GitHub Repository
3. Füge die Environment Variables hinzu:
   - `DASHBOARD_PASSWORD`
   - `N8N_GET_WEBHOOK`
   - `N8N_SAVE_WEBHOOK`

### 3. Deploy

Vercel deployed automatisch bei jedem Push zu main.

## Projektstruktur

```
my-app/
├── app/
│   ├── api/
│   │   ├── login/route.ts      # Login API
│   │   ├── logout/route.ts     # Logout API
│   │   ├── metadata/
│   │   │   ├── route.ts        # GET Metadaten
│   │   │   └── save/route.ts   # POST Metadaten
│   ├── login/page.tsx          # Login Seite
│   ├── page.tsx                # Dashboard Hauptseite
│   ├── layout.tsx              # Root Layout
│   └── globals.css             # Global Styles
├── components/
│   ├── ui/                     # shadcn/ui Komponenten
│   ├── dashboard-header.tsx    # Dashboard Header
│   └── metadata-form.tsx       # Metadaten Formular
├── lib/
│   ├── mock-metadata.ts        # Mock Daten für Entwicklung
│   └── utils.ts                # Utility Funktionen
├── types/
│   └── metadata.ts             # TypeScript Interfaces
├── middleware.ts               # Auth Middleware
└── README.md                   # Diese Datei
```

## Metadaten Struktur

Die Metadaten entsprechen dem Next.js Metadata Format:

```typescript
{
  // Allgemein
  title: string;
  description: string;
  keywords: string[];

  // OpenGraph
  ogTitle: string;
  ogDescription: string;
  ogImage: string;

  // Twitter
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;

  // Schema.org
  schemaName: string;
  schemaTelephone: string;
  schemaStreetAddress: string;
  schemaPostalCode: string;
  schemaCity: string;
  schemaFacebook: string;
  schemaInstagram: string;
}
```

## n8n Integration

### GET Webhook

Das Dashboard ruft Metadaten von n8n ab:

```
GET N8N_GET_WEBHOOK
Response: { ...metadata }
```

### SAVE Webhook

Beim Speichern werden die Daten an n8n gesendet:

```
POST N8N_SAVE_WEBHOOK
Body: { ...metadata }
```

Im n8n Workflow kannst du diese Daten z.B.:
- In einer Datenbank speichern
- An ein CMS senden
- In einer Datei speichern
- An einen anderen Service weiterleiten

## Mock-Daten

Für die Entwicklung ohne n8n werden Mock-Daten verwendet (`lib/mock-metadata.ts`). Diese enthalten die aktuellen Werte aus der Dermastil Website.

## Design

- **Primary Color**: Emerald-500 (#10b981)
- **Background**: Slate-50 (#f8fafc)
- **Cards**: White mit subtle Shadow
- **Inputs**: Rounded-lg, focus:ring-emerald-500
- **Typography**: Inter, clean und gut lesbar
- **Icons**: Lucide React

## Lizenz

Proprietär - Dermastil
 
