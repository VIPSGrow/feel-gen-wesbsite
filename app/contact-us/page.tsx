import ContactCompo from "@/componants/ContactCompo";

import React from "react";

export const metadata = {
  title: 'Contact Us | Feel Safe Private Limited',
  description:
    'Feel Safe Private Limited se sampark karein. Certified sanitary pads kharidne ya Sakhi Yojana se judne ke liye humse seedhe baat karein.',
  openGraph: {
    title: 'Contact Us | Feel Safe Private Limited',
    description:
      'Feel Safe Private Limited se sampark karein. Certified sanitary pads kharidne ya Sakhi Yojana se judne ke liye humse seedhe baat karein.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Feel Safe Private Limited',
    description:
      'Feel Safe Private Limited se sampark karein. Certified sanitary pads kharidne ya Sakhi Yojana se judne ke liye humse seedhe baat karein.',
  },
};

const ContactPage = () => {
  return (
    <ContactCompo />
  );
};

export default ContactPage;
