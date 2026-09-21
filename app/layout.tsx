import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./RouteLoaderStyles.css";
import Navbar from "@/componants/navbar/Navbar";
import Footer from "@/componants/footer/Footer";
import Script from "next/script";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { CartProvider } from "@/lib/contexts/CartContext";
import { ToastProvider } from "@/lib/contexts/ToastContext";
import WhatsappButton from "@/componants/whatsappFloating/WhatsappButton";
import React from "react";
import ClientRouteLoadingBoundary from "@/componants/loaders/ClientRouteLoadingBoundary";
import AOSInit from "@/componants/animations/AOSInit";
import Chatbot from "@/componants/chatbot/Chatbot";
import NotificationsPopup from "@/componants/notifications/NotificationsPopup";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://feelsafeco.in/"),
  title: {
    // Optimized for the 20-70 character SEO requirement
    default: "Best Sanitary Napkin Manufacturer in India | Feel Safe Private Limited",
    template: "%s | Feel Safe Private Limited",
  },
  description:
    "Feel Safe Pvt Ltd lata hai BIS aur ISO certified, rash-free sanitary pads. 'Feel Safe Sakhi Yojana' se judkar mahilaein 'Atmanirbhar Bharat' ka hissa banein. Hamara prayas, aapki suraksha.",
  keywords: [
    "Feel Safe Private Limited",
    "Sanitary Napkin India",
    "Feel Baby Diapers",
    "Adult Diapers India",
    "Wholesale Sanitary Pads",
    "BIS Certified Pads",
    "NGO Hygiene Supplier",
    "Rash-free Sanitary Napkins",
  ],
  // SEO Tip: Ensure these icons are actually available at these paths
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Feel Safe Private Limited | Premium Hygiene & Empowerment Brand",
    description: "Shop BIS certified Sanitary Pads, Baby Diapers, and Adult Care products. Join our Sakhi Mission for women's financial independence.",
    url: "https://feelsafeco.in/",
    siteName: "Feel Safe",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-feelsafe-hygiene.jpg",
        width: 1200,
        height: 630,
        alt: "Feel Safe Private Limited - Hygiene and Care Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Feel Safe Private Limited | Premium Personal Care",
    description: "Quality BIS certified hygiene products and empowerment opportunities across India.",
    images: ["/og-feelsafe-hygiene.jpg"],
  },
  alternates: {
    canonical: "https://feelsafeco.in/",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Enhanced Schema for Sitelinks Searchbox and Organization
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://feelsafeco.in/#organization",
        "name": "Feel Safe Private Limited",
        "url": "https://feelsafeco.in/",
        "logo": "https://feelsafeco.in/assets/images/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-9013499385",
          "contactType": "customer service",
          "email": "support@feelsafeco.in",
          "areaServed": "IN",
          "availableLanguage": "en"
        },
        "sameAs": [
          "https://www.facebook.com/feelsafe/",
          "https://www.youtube.com/@FeelSafe-co",
          "https://www.instagram.com/feelsafe25/"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://feelsafeco.in/#website",
        "url": "https://feelsafeco.in/",
        "name": "Feel Safe",
        "publisher": { "@id": "https://feelsafeco.in/#organization" },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://feelsafeco.in/products?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Next.js manages viewport automatically via Metadata, but manual tags here are fine for clarity */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css" /> */}
        <link rel="stylesheet" href="/assets/css/swiper-bundle.css" />

        {/* Avoid initial layout/viewport white gap on some mobile browsers */}
        <style>{`
          html { width: 100%; }
          body { margin: 0; padding: 0; }
        `}</style>

        {/* https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css */}
        <link
          // href="/assets/css/bootstrap.min.css"
          href="/assets/css/bootstrap.css"
          rel="stylesheet"
        // integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ"
        // crossOrigin="anonymous"
        />
        <link rel="stylesheet" type="text/css" href="/assets/css/vendor.css" />
        <link rel="stylesheet" type="text/css" href="/style.css" />
        <link rel="stylesheet" type="text/css" href="/mobile.css" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Unified Schema Script */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <AuthProvider>
          <CartProvider>
            <ToastProvider>
              <Navbar />
              <main className="flex-grow">
                <ClientRouteLoadingBoundary>
                  <AOSInit />
                  {children}
                </ClientRouteLoadingBoundary>

              </main>
              <Footer />
              <NotificationsPopup />
              <Chatbot />
              <WhatsappButton />

            </ToastProvider>
          </CartProvider>
        </AuthProvider>

        {/* Script Management: Use strategy="lazyOnload" for non-critical scripts */}
        <Script src="https://accounts.google.com/gsi/client" strategy="beforeInteractive" />
        <Script src="./assets/js/jquery-1.11.0.min.js" strategy="lazyOnload" />
        <Script src="./assets/js/swiper.js" strategy="beforeInteractive" />
        {/* <Script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js" strategy="lazyOnload" /> */}
        {/* https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js */}
        <Script
          src="/assets/js/bootstrap.bundle.js"
          // integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
          // crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <Script src="./assets/js/plugins.js" strategy="lazyOnload" />
        <Script src="./assets/js/script.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}