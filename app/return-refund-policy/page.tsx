import RefundCompo from '@/componants/RefundCompo';
import React from 'react';

export const metadata = {
  title: 'Return & Refund Policy | Feel Safe',
  description:
    'Read Feel Safe Private Limited return and refund policy for orders and product-related returns.',
  alternates: {
    canonical: 'https://feelsafeco.in/return-refund-policy',
  },
  openGraph: {
    title: 'Return & Refund Policy | Feel Safe',
    description:
      'Read Feel Safe Private Limited return and refund policy for orders and product-related returns.',
    url: 'https://feelsafeco.in/return-refund-policy',
    siteName: 'Feel Safe',
    type: 'website',
    images: [
      {
        url: 'https://feelsafeco.in/og-feelsafe-hygiene.jpg',
        width: 1200,
        height: 630,
        alt: 'Feel Safe Return & Refund Policy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Return & Refund Policy | Feel Safe',
    description:
      'Read Feel Safe Private Limited return and refund policy for orders and product-related returns.',
    images: ['https://feelsafeco.in/og-feelsafe-hygiene.jpg'],
  },
};

const ReturnRefundPolicy = () => {
  return <RefundCompo />;
};

export default ReturnRefundPolicy;

