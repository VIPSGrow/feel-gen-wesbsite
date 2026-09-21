
import React from "react";
import PrivacyCompo from "@/componants/PrivacyCompo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Feel Safe",
  description:
    "Read Feel Safe Private Limited privacy policy to understand how we collect, use, and protect your personal information.",
  alternates: {
    canonical: "https://feelsafeco.in/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Feel Safe",
    description:
      "Read Feel Safe Private Limited privacy policy to understand how we collect, use, and protect your personal information.",
    url: "https://feelsafeco.in/privacy-policy",
    siteName: "Feel Safe",
    type: "website",
    images: [
      {
        url: "https://feelsafeco.in/og-feelsafe-hygiene.jpg",
        width: 1200,
        height: 630,
        alt: "Feel Safe Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Feel Safe",
    description:
      "Read Feel Safe Private Limited privacy policy to understand how we collect, use, and protect your personal information.",
    images: ["https://feelsafeco.in/og-feelsafe-hygiene.jpg"],
  },
};

const PrivacyPolicy = () => {


  return (
    <PrivacyCompo />
  );
};



export default PrivacyPolicy;

