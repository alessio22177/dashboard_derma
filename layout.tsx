
import 'lenis/dist/lenis.css';
import type { Metadata, Viewport } from 'next';
import { DM_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import Script from 'next/script';

/**
 * Animation Providers
 *
 * Import all animation-related providers from the centralized module.
 * See @/components/animation/transition/index.ts for documentation.
 */
import { GsapProvider, LenisProvider, TransitionProvider } from '@/components/animation/transition';

import { CookieConsentBanner } from '@/components/cookie-consent';
import './globals.css';

// DM Sans
const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
});

// Local Tobias Fonts (no longer in use, kept for reference)
/*
const tobias = localFont({
  src: [
    {
      path: './fonts/tobias-regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/tobias-medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/tobias-bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-tobias',
});
*/

// Local Blacker Sans Font
const blackerSans = localFont({
  src: './fonts/blacker-sans.woff2',
  weight: '400',
  style: 'normal',
  variable: '--font-blacker-sans',
});

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
const verificationMeta = {
  ...(googleVerification ? { google: googleVerification } : {}),
  other: {
    ...(bingVerification ? { 'msvalidate.01': bingVerification } : {}),
  },
} as const;

export const metadata: Metadata = {
  metadataBase: new URL('https://dermastil.de'),
  title: {
    default: 'Dermastil Kosmetikstudio Hamburg',
    template: '%s | Dermastil',
  },
  description:
    'Kosmetikstudio in Hamburg – Gesichtsbehandlungen, Laser & IPL Haarentfernung, Waxing, Maniküre & Pediküre, Head Spa, Wimpernlifting und Schulungen. Jetzt online Termin buchen.',
  verification: verificationMeta,
  keywords: [
    'Kosmetikstudio Hamburg',
    'Gesichtsbehandlungen',
    'Laser Haarentfernung',
    'IPL Haarentfernung',
    'Waxing',
    'Maniküre',
    'Pediküre',
    'Head Spa',
    'Wimpernlifting',
    'Schulungen',
    'Dermastil',
  ],
  authors: [{ name: 'Dermastil' }],
  creator: 'Dermastil',
  publisher: 'Dermastil',
  applicationName: 'Dermastil',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://dermastil.de',
    siteName: 'Dermastil',
    title: 'Dermastil Kosmetikstudio Hamburg',
    description:
      'Kosmetikstudio in Hamburg – Gesichtsbehandlungen, Laser & IPL Haarentfernung, Waxing, Maniküre & Pediküre, Head Spa, Wimpernlifting und Schulungen. Jetzt online Termin buchen.',
    images: [
      {
        url: '/Dermastil20200911.png',
        width: 1200,
        height: 630,
        alt: 'Dermastil Kosmetikstudio Hamburg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dermastil Kosmetikstudio Hamburg',
    description:
      'Kosmetikstudio in Hamburg – Gesichtsbehandlungen, Laser & IPL Haarentfernung, Waxing, Maniküre & Pediküre, Head Spa, Wimpernlifting und Schulungen. Jetzt online Termin buchen.',
    images: ['/Dermastil20200911.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://dermastil.de/',
    languages: {
      'de-DE': 'https://dermastil.de/',
    },
  },
  icons: {
    icon: '/favicon.ico',
  },

  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: 'Dermastil Kosmetikstudio Hamburg',
    url: 'https://dermastil.de/',
    telephone: '+49-40-89067950',
    priceRange: '€€',
    image: 'https://dermastil.de/Dermastil20200911.png',
    sameAs: [
      'https://www.facebook.com/dermastil/',
      'https://www.instagram.com/dermastil_kosmetik/?hl=de',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ottenser Hauptstraße 17, Eingang Stangestr. 6 (3. Stock)',
      addressLocality: 'Hamburg',
      postalCode: '22765',
      addressCountry: 'DE',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:30',
        closes: '20:00',
      },
    ],
  };
  return (
    <html lang="de">
      <body className={`${dmSans.variable} ${blackerSans.variable} antialiased overflow-x-hidden`}>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Dermastil Kosmetikstudio Hamburg',
              url: 'https://dermastil.de/',
              inLanguage: 'de-DE',
            }),
          }}
        />
        {process.env.NEXT_PUBLIC_GA4_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        ) : null}
        {/*
         * Animation Provider Hierarchy
         *
         * The providers are nested in this specific order:
         * 1. LandingRevealProvider - Handles initial page reveal, gates other animations
         * 2. TransitionProvider - Handles page-to-page transitions
         * 3. LenisProvider - Provides smooth scrolling
         * 4. GsapProvider - Initializes GSAP with ScrollTrigger
         *
         * The LandingRevealProvider renders its preloader via portal to document.body,
         * ensuring it appears above the TransitionProvider's layer.
         */}

        <TransitionProvider>
          <LenisProvider>
            {children}
            <CookieConsentBanner />
          </LenisProvider>
        </TransitionProvider>
        <GsapProvider scrollTrigger />
      </body>
    </html>
  );
}
