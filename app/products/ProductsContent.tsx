"use client";
import TrendingProSection from '@/componants/sections/TrendingProSection'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const ProductsContent = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';

    return (
        <>
            <TrendingProSection titleShow={false} search={search} category={category} />
        </>
    )
}

export default ProductsContent
