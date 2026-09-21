import ShippingCompo from '@/componants/ShippingCompo';
import React from 'react';

export const metadata = {
  title: 'Shipping Policy | Feel Safe',
  description:
    'View Feel Safe Private Limited shipping policy including delivery timelines, dispatch details, and order handling.',
  alternates: {
    canonical: 'https://feelsafeco.in/shipping-policy',
  },
  openGraph: {
    title: 'Shipping Policy | Feel Safe',
    description:
      'View Feel Safe Private Limited shipping policy including delivery timelines, dispatch details, and order handling.',
    url: 'https://feelsafeco.in/shipping-policy',
    siteName: 'Feel Safe',
    type: 'website',
    images: [
      {
        url: 'https://feelsafeco.in/og-feelsafe-hygiene.jpg',
        width: 1200,
        height: 630,
        alt: 'Feel Safe Shipping Policy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shipping Policy | Feel Safe',
    description:
      'View Feel Safe Private Limited shipping policy including delivery timelines, dispatch details, and order handling.',
    images: ['https://feelsafeco.in/og-feelsafe-hygiene.jpg'],
  },
};

const ShippingPolicy = () => {
  return <ShippingCompo />;
};

export default ShippingPolicy;

