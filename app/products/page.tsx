import { Suspense } from "react";
import TrendingProSection from '@/componants/sections/TrendingProSection'
import ProductsContent from "./ProductsContent";

const Page = () => {
    return (
        <Suspense fallback={<div className="text-center text-muted py-5">Loading products...</div>}>
            <ProductsContent />
        </Suspense>
    )
}

export default Page
