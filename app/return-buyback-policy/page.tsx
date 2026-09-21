import ReturnBuybackCompo from '@/componants/ReturnBuybackCompo';
import React from 'react';

export const metadata = {
    title: 'Return & Buyback Policy | Feel Safe',
    description:
        'Read Feel Safe Private Limited return and buyback policy for eligible products and distributor/partner related processes.',
    alternates: {
        canonical: 'https://feelsafeco.in/return-buyback-policy',
    },
    openGraph: {
        title: 'Return & Buyback Policy | Feel Safe',
        description:
            'Read Feel Safe Private Limited return and buyback policy for eligible products and distributor/partner related processes.',
        url: 'https://feelsafeco.in/return-buyback-policy',
        siteName: 'Feel Safe',
        type: 'website',
        images: [
            {
                url: 'https://feelsafeco.in/og-feelsafe-hygiene.jpg',
                width: 1200,
                height: 630,
                alt: 'Feel Safe Return & Buyback Policy',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Return & Buyback Policy | Feel Safe',
        description:
            'Read Feel Safe Private Limited return and buyback policy for eligible products and distributor/partner related processes.',
        images: ['https://feelsafeco.in/og-feelsafe-hygiene.jpg'],
    },
};

const Page = () => {
    return <ReturnBuybackCompo />;
};

export default Page;

