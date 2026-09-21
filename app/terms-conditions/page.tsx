import TermsCompo from '@/componants/TermsCompo';
import React from 'react';

export const metadata = {
  title: 'Terms & Conditions | Feel Safe',
  description:
    'Read Feel Safe Private Limited terms and conditions for using this website and purchasing hygiene products.',
  alternates: {
    canonical: 'https://feelsafeco.in/terms-conditions',
  },
  openGraph: {
    title: 'Terms & Conditions | Feel Safe',
    description:
      'Read Feel Safe Private Limited terms and conditions for using this website and purchasing hygiene products.',
    url: 'https://feelsafeco.in/terms-conditions',
    siteName: 'Feel Safe',
    type: 'website',
    images: [
      {
        url: 'https://feelsafeco.in/og-feelsafe-hygiene.jpg',
        width: 1200,
        height: 630,
        alt: 'Feel Safe Terms & Conditions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Conditions | Feel Safe',
    description:
      'Read Feel Safe Private Limited terms and conditions for using this website and purchasing hygiene products.',
    images: ['https://feelsafeco.in/og-feelsafe-hygiene.jpg'],
  },
};

const TermsAndConditions = () => {
  return <TermsCompo />;
};

export default TermsAndConditions;

