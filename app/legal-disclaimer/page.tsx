import LegalDisclaimer from '@/componants/LegalCompo';
import React from 'react';

export const metadata = {
    title: 'Legal Disclaimer | Feel Safe',
    description:
        'Read Feel Safe Private Limited legal disclaimer and understand the terms and limitations of the information provided on this website.',
    alternates: {
        canonical: 'https://feelsafeco.in/legal-disclaimer',
    },
    openGraph: {
        title: 'Legal Disclaimer | Feel Safe',
        description:
            'Read Feel Safe Private Limited legal disclaimer and understand the terms and limitations of the information provided on this website.',
        url: 'https://feelsafeco.in/legal-disclaimer',
        siteName: 'Feel Safe',
        type: 'website',
        images: [
            {
                url: 'https://feelsafeco.in/og-feelsafe-hygiene.jpg',
                width: 1200,
                height: 630,
                alt: 'Feel Safe Legal Disclaimer',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Legal Disclaimer | Feel Safe',
        description:
            'Read Feel Safe Private Limited legal disclaimer and understand the terms and limitations of the information provided on this website.',
        images: ['https://feelsafeco.in/og-feelsafe-hygiene.jpg'],
    },
};

const Page = () => {
    return <LegalDisclaimer />;
};

export default Page;

