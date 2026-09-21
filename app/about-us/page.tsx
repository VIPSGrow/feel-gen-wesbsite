import React from "react";
import { Mail, MapPin, PhoneCall, ShieldCheck, Heart, Leaf, Users, Award, TrendingUp, CheckCircle } from "lucide-react";
import { Icon } from "@iconify/react";
import AboutCompo from "@/componants/AboutCompo";
import PageHeader from "@/componants/sections/PageHeader";

export const metadata = {


  title: "About Feel Safe ",
  description: "Feel Safe Private Limited is dedicated to dignity and hygiene. We provide high-quality sanitary pads, baby diapers, and adult care products designed for comfort and security.",
  keywords: [
    "Feel Safe Private Limited",
    "Feel Safe Hygiene",
    "Feel Sanitary Pads",
    "Feel Baby Diapers",
    "Feel Adult Diapers",
    "Premium Hygiene Products India",
    "Safe Personal Care",
    "Leak-proof Baby Diapers"
  ],
  openGraph: {
    title: "Feel Safe Private Limited: Your Trusted Partner in Hygiene",
    description: "Discover the Feel Safe range of personal care products. From infants to adults, we ensure safety, comfort, and premium quality in every product.",
    url: "https://feelsafeco.in/about",
    siteName: "Feel Safe",
    images: [
      {
        url: "/og-feelsafe-hygiene.jpg",
        width: 1200,
        height: 630,
        alt: "Feel Safe Private Limited - Hygiene and Care Solutions",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

const AboutPage = () => {
  return (
    <main>
      <PageHeader />
      <AboutCompo />
    </main>
  );
};

export default AboutPage;

