import React from "react";
import { notFound } from "next/navigation";

import ProductDetail from "@/componants/ProductDetail/ProductDetail";
import { Category, Product, ProductApiResponse } from "@/lib/types/Product";
import serverCallFuction from "@/lib/constantFunction";
import { APIResponse } from "@/lib/types/User";
import { cookies } from "next/headers";
import { serverApiFetch } from "@/lib/serverApi";



interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  // NOTE: This route currently fetches product data using cookies (distributor_id).
  // For metadata we keep it resilient: if cookie/API fails, fallback to global defaults.
  try {
    const apiRes = await serverApiFetch(`api/products/product-detail/${slug}`);
    // console.log("pai resp - ", apiRes);

    if (!apiRes?.success || !apiRes?.data) {
      return {
        title: `false | Feel Safe`,
        description:
          'Feel Safe Pvt. Ltd. offers BIS certified sanitary pads, baby diapers, and adult care products. Safe hygiene solutions across India.',
        alternates: { canonical: `https://feelsafeco.in/products/${slug}` },
      };
    }

    const apiProduct = apiRes.data;
    const productName = apiProduct?.product?.name || 'Feel Safe Product';

    const rawDescription = (apiProduct?.product?.short_desc || apiProduct?.product?.description || '')
      .replace(/<[^>]*>?/gm, '') // Remove HTML tags
      .trim();

    const seoDescription = rawDescription.length > 155
      ? rawDescription.substring(0, 152) + "..."
      : rawDescription;

    // console.log("seo desciption - ", rawDescription, seoDescription);


    const fImage = apiProduct?.product?.f_image
      ? String(apiProduct.product.f_image)
      : '/assets/product/sanitory_pad.png';

    const imageUrl = fImage.startsWith('http')
      ? fImage
      : `https://feelsafeco.in${fImage.startsWith('/') ? '' : '/'}${fImage}`;

    return {
      title: `${productName} | Feel Safe`,
      description: seoDescription,
      alternates: { canonical: `https://feelsafeco.in/products/${slug}` },
      openGraph: {
        title: `${productName} | Feel Safe`,
        description: seoDescription,
        url: `https://feelsafeco.in/products/${slug}`,
        siteName: 'Feel Safe',
        type: 'article',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: productName,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${productName} | Feel Safe`,
        description: seoDescription,
        images: [imageUrl],
      },
    };
  } catch (err) {



    return {
      title: 'no | Feel Safe',
      description:
        'Feel Safe Pvt. Ltd. offers BIS certified sanitary pads, baby diapers, and adult care products. Safe hygiene solutions across India.',
      alternates: { canonical: `https://feelsafeco.in/products/${slug}` },
    };
  }
}

// 2. Make the function async






export default async function ProductPage({ params }: Props) {
  // 3. UnWrap the params promise
  const { slug } = await params;

  const cookieStore = await cookies();
  const userData = cookieStore.get("user")?.value;
  const user = userData ? JSON.parse(userData) : null;

  const dId = user?.distributor_info?.id || ""; //

  // Fetch product details by ID
  let detailRes;
  try {
    const url = `api/products/product-detail/${slug}?distributor_id=${dId}`;


    detailRes = (await serverCallFuction(
      "GET",
      url,
    )) as APIResponse;
    console.log("API Response:", url, detailRes);
  } catch (error) {
    console.error("API Fetch failed:", error);
    notFound();
  }
  if (!detailRes?.success || !detailRes.data) {
    console.error("No product data or API failure:", detailRes);
    notFound();
  }

  // Transform API data to match ProductDetail expected shape
  const apiProduct: ProductApiResponse = detailRes.data;

  const product: Product = {
    id: apiProduct.product.id || 0,
    name: apiProduct.product.name || "Unknown Product",
    slug,
    description: apiProduct.product.description || "No description available.",
    short_desc: apiProduct.product.short_desc || "",
    price: apiProduct.product.price || 0,
    base_price: apiProduct.product.base_price || 0,
    discounted_price: apiProduct.product.discounted_price || 0,
    rating: apiProduct.product.rating || 4.5,
    f_image: apiProduct.product.f_image
      ? `${apiProduct.product.f_image}`
      : "/assets/product/sanitory_pad.png",
    g_images: (apiProduct.product.g_images || []).map((img) => `${img}`),
    specs: apiProduct.product.specs || {},
    category: (apiProduct.category as Category) || {
      id: 0,
      name: "Uncategorized",
      slug: "uncategorized",
    },
    qty: apiProduct.product.qty || 1,
    tax_data: apiProduct.tax_data,
    admin_stock: apiProduct.product.admin_stock || 0,
    distributor_stock: apiProduct.product.distributor_stock || 0,
    hsn_code: apiProduct.product.hsn_code || 'N/A',
    weight: apiProduct.product.weight || 'N/A',
    dimension_height: apiProduct.product.dimension_height || 'N/A',
    dimension_length: apiProduct.product.dimension_length || 'N/A',
    dimension_unit: apiProduct.product.dimension_unit || 'N/A',
    dimension_width: apiProduct.product.dimension_width || 'N/A'
  };

  const attributes = apiProduct.product_attributes || [];
  const variants = apiProduct.variants || [];

  const canonical = `https://feelsafeco.in/products/${slug}`;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.short_desc || product.description,
    sku: String(product.id || ''),
    brand: {
      '@type': 'Brand',
      name: 'Feel Safe Pvt. Ltd.',
    },
    category: product.category?.name || 'Hygiene Products',
    image: product.f_image.startsWith('http')
      ? product.f_image
      : `https://feelsafeco.in${product.f_image.startsWith('/') ? '' : '/'}${product.f_image}`,
    url: canonical,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: Number(product.discounted_price || product.base_price || 0),
      availability: 'https://schema.org/InStock',
      url: canonical,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      {product ? (
        <ProductDetail
          product={product}
          attributes={attributes}
          variants={variants}
          dId={dId}
        />
      ) : (
        <h1 className="text-center my-4">Product Not Found</h1>
      )}
    </>
  );
}
