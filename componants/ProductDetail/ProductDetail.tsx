"use client";
import React, { useState, useMemo, useEffect, useRef, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IndianRupee } from "lucide-react";

import { Product, ProductAttributes, ProVariant } from "@/lib/types/Product";
import { useCart } from "@/lib/contexts/CartContext";
import TrendingProSection from "../sections/TrendingProSection";
import ReviewsSection from "./ReviewsSection";

// NOTE: ProductDetail already has its own TS typing in this repo.

interface Props {
  product: Product;
  attributes: ProductAttributes[];
  variants: ProVariant[];
  dId: number | null;
}

const ProductDetail: React.FC<Props> = ({ product, attributes, variants, dId }) => {
  const [selectedImage, setSelectedImage] = useState(product.f_image);
  const [quantity, setQuantity] = useState(1);
  const [selectedAttributes, setSelectedAttributes] = useState<
    Record<number, number>
  >({});

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  // ZOOM STATE
  const [zoomState, setZoomState] = useState({
    backgroundPosition: '0% 0%',
    backgroundSize: '100%'
  });
  const zoomRef = useRef<HTMLDivElement>(null);

  const { addItem, loading } = useCart();

  // NOTE: serverCallFuction/CartContext currently types addItem() as Promise<void>.
  // This component uses res.status/res.message; keep runtime behavior but loosen typing.
  const addItemTyped = addItem as unknown as (
    productId: number,
    variantId: string | null,
    quantity: number,
    price: number,
    distributor_id: number | null,
    productName?: string,
    slug?: string,
    fImage?: string,
    variantDetails?: any,
    taxData?: any
  ) => Promise<{ status?: boolean; message?: string }>;
  const router = useRouter();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Default select 0th index attribute values on mount
  useEffect(() => {
    if (attributes && attributes.length > 0) {
      const defaultSelection: Record<number, number> = {};
      attributes.forEach((attr) => {

        if (attr.values && attr.values.length > 0) {
          // Har attribute ki pehli value (0 index) select kar rahe hain
          defaultSelection[attr.id] = attr.values[0].id;
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      queueMicrotask(() => setSelectedAttributes(defaultSelection));
    }
  }, [attributes]);

  const price = product.price;
  const basePrice = product.base_price;
  const discountedPrice = product.discounted_price;


  // originalPrice += taxPrice;


  const originalPrice = discountedPrice > 0 && discountedPrice < basePrice ? discountedPrice : basePrice
  const taxPrice = product.tax_data
    ? (originalPrice * product.tax_data.percentage) / 100
    : 0;
  const currentVariant = useMemo(() => {
    if (variants.length === 0) return null;
    return (
      variants.find((variant) => {
        return (
          variant.attr_combinations.every((comb) => {
            return selectedAttributes[comb.attr_id] === comb.attr_value_id;
          }) &&
          Object.keys(selectedAttributes).length ===
          variant.attr_combinations.length
        );
      }) || null
    );
  }, [selectedAttributes, variants]);

  const currentPrice = useMemo(
    () => (currentVariant ? currentVariant.price : originalPrice),
    [currentVariant, originalPrice],
  );
  // console.log("current variant - ", currentVariant);

  const taxablePrice = useMemo(
    () =>
      currentVariant ? currentVariant.price : originalPrice,
    [currentVariant, originalPrice],
  );

  const isOutOfStock = useMemo(
    () => (currentVariant ? currentVariant.stock <= 0 : false),
    [currentVariant],
  );


  // ZOOM HANDLERS
  const handleMouseEnter = () => {
    setZoomState(prev => ({ ...prev, backgroundSize: '200%' })); // Initial zoom scale
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!zoomRef.current) return;

    const { left, top, width, height } = zoomRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;

    setZoomState(prev => ({
      ...prev,
      backgroundPosition: `${x}% ${y}%`
    }));
  };

  const handleMouseLeave = () => {
    setZoomState({
      backgroundPosition: '0% 0%',
      backgroundSize: '100%'
    });
  };

  const handleAddToCart = async () => {
    if (isOutOfStock) {
      setMessageType("error");
      setMessage("This variant is out of stock!");
      return;
    }

    try {
      const res = await addItemTyped(
        product.id,
        currentVariant ? currentVariant.id.toString() : null,
        quantity,
        price,
        dId,
        product.name,
        product.slug,
        product.f_image,
        currentVariant || undefined,
        product.tax_data
      );
      if (res.status) {
        setMessageType("success");
        setMessage(`Added ${quantity} item(s) to cart!`);
      } else {
        setMessageType("error");
        console.log("error - ", res);

        if (res.message === "No token, authorization denied") {
          setMessage("Please sign in to your account to add items to your cart.");
        }

      }
    } catch (error) {
      console.error("Add to cart failed:", error);
      setMessageType("error");
      setMessage("Failed to add to cart. Please try again.");
    }
  };

  const handleBuyNow = async () => {
    if (isOutOfStock) {
      setMessageType("error");
      setMessage("This variant is out of stock!");
      return;
    }

    try {
      const res = await addItemTyped(
        product.id,
        currentVariant ? currentVariant.id.toString() : null,
        quantity,
        taxablePrice,
        dId,
        product.name,
        product.slug,
        product.f_image,
        currentVariant || undefined,
        product.tax_data
      );
      if (res.status) {
        router.push(`/checkout`);
        // setMessageType("success");
        // setMessage(`Added ${quantity} item(s) to cart!`);
      } else {
        setMessageType("error");
        console.log("error - ", res);

        if (res.message === "No token, authorization denied") {
          setMessage("Please sign in to your account to add items to your cart.");
        }

      }
    } catch (error) {
      console.error("Add to cart failed:", error);
      setMessageType("error");
      setMessage("Failed to add to cart. Please try again.");
    }
  }


  return (
    <section className="pb-5 pt-4">
      <div className="container-fluid">

        <div className="row">
          <div className="col-lg-5">
            {/* Image Gallery with Amazon-style Zoom */}
            <div
              className="position-relative w-100 mb-3 border rounded overflow-hidden"
              style={{ aspectRatio: "1/1", cursor: 'crosshair' }}
              ref={zoomRef}
              onMouseEnter={handleMouseEnter}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Main displayed image */}
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                priority
                className="img-fluid object-fit-contain transition-opacity duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ opacity: zoomState.backgroundSize === '100%' ? 1 : 0 }}
              />

              {/* Zoomed version (background image of this div) */}
              <div
                className="position-absolute top-0 start-0 w-100 h-100 transition-opacity duration-300"
                style={{
                  backgroundImage: `url(${selectedImage})`,
                  backgroundRepeat: 'no-repeat',
                  ...zoomState,
                  opacity: zoomState.backgroundSize === '100%' ? 0 : 1,
                  zIndex: 1
                }}
              />

              {currentPrice < basePrice && (
                <div className="position-absolute top-0 end-0 badge bg-success fs-6 m-2" style={{ zIndex: 2 }}>
                  - {" "}
                  {
                    (((basePrice - currentPrice) / basePrice) * 100).toFixed(2)
                  }
                  %
                </div>
              )}
            </div>
            {/* Thumbnails */}
            {(product.g_images || []).length > 0 && (
              <div className="row mt-3 g-1">
                {[product.f_image, ...product.g_images].map((img, idx) => (
                  <div key={idx} className="col-2">
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      width={100}
                      height={100}
                      className={`img-fluid rounded cursor-pointer border ${selectedImage === img
                        ? "border-success border-3"
                        : "border-secondary"
                        }`}
                      onClick={() => setSelectedImage(img)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-lg-7">
            <h1 className="fw-bold mb-1">{product.name}</h1>
            <span className="fw-bold mb-2 badge bg-primary">
              {product.category?.name}
            </span>
            <div className="lead mb-2" dangerouslySetInnerHTML={{ __html: product?.short_desc ?? '' }} />
            {/* <div>HSN Code - {product.hsn_code ?? 'N/A'}</div> */}

            <div className="">
              <span className="fs-1 fw-bold text-success">
                <IndianRupee className="inline-block" size={24} />
                {taxablePrice.toFixed(2)}
              </span>
              {(discountedPrice > 0 && discountedPrice < basePrice) &&
                <span className="text-muted text-decoration-line-through ms-3 fs-4">
                  <IndianRupee className="inline-block" size={18} />
                  {basePrice.toFixed(2)}
                </span>
              }
            </div>

            {/* Attributes selection */}
            <div className="mb-3">
              {attributes.map((attr) => (
                <div
                  key={attr.id}
                  className="d-flex gap-2 my-2 align-items-center"
                >
                  <strong>{attr.name}:</strong>
                  <div className="d-flex gap-2">
                    {attr.values.map((v) => {
                      const isSelected = selectedAttributes[attr.id] === v.id;
                      return (
                        <span
                          key={v.id}
                          className={`badge cursor-pointer p-2 ${isSelected
                            ? "bg-primary text-white"
                            : "bg-light text-dark border"
                            }`}
                          onClick={() => {
                            setSelectedAttributes((prev) => {
                              const newSelected = { ...prev };
                              if (isSelected) {
                                delete newSelected[attr.id];
                              } else {
                                newSelected[attr.id] = v.id;
                              }
                              return newSelected;
                            });
                          }}
                        >
                          {v.value}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Quantity & Actions */}
            <div className="row align-items-end mb-3">
              <div className="col-md-4">
                <label className="form-label fw-bold">Quantity:</label>
                <div className="input-group">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="form-control text-center"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min="1"
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="col-md-12 mt-4">
                {isOutOfStock ? (
                  <div className="alert alert-warning">Out of Stock</div>
                ) : (
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-outline-success btn-lg flex-grow-1"
                      onClick={handleAddToCart}
                      disabled={loading}
                    >
                      {loading ? "Adding..." : "Add to Cart"}
                    </button>
                    <button
                      className="btn btn-primary btn-lg flex-grow-1"
                      onClick={handleBuyNow}
                      disabled={loading}
                    >
                      Buy Now
                    </button>
                  </div>
                )}
                {message && (
                  <div
                    className={`alert alert-${messageType === "success" ? "success" : "danger"
                      } mt-3`}
                  >
                    {message}
                  </div>
                )}
              </div>
            </div>
            {/* Inventory info (optional) */}
            {(product?.distributor_stock === 0 && product?.admin_stock === 0) && <span className="badge bg-secondary">Out Of Stock</span>}
            <div className="badge bg-secondary">Stock - {product.admin_stock + product.distributor_stock}</div>
            {/* <div>admin - {product.admin_stock}</div>
            <div>Distributor - {product.distributor_stock}</div> */}
          </div>
        </div>

        {/* Full Tabs Section */}
        <div className="row mt-5">
          <div className="col-12">
            <ul className="nav nav-tabs" id="productTabs">
              <li className="nav-item">
                <button
                  className="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#description"
                >
                  Description
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#spec"
                >
                  Specification
                </button>
              </li>

              <li className="nav-item">
                <button
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#reviews"
                >
                  Reviews
                </button>
              </li>
            </ul>

            <div className="tab-content border border-top-0 p-4">
              <div className="tab-pane fade show active" id="description" dangerouslySetInnerHTML={{ __html: product?.description ?? '' }} >
                
              </div>

              <div className="tab-pane fade" id="spec">
                <table>
                  <tr>
                    <th>Weight : </th>
                    <td>{product.weight}</td>
                  </tr>
                  <tr>
                    <th>Dimension Length : </th>
                    <td>{product.dimension_length} {product.dimension_unit}</td>
                  </tr>
                  <tr>
                    <th>Dimension Width : </th>
                    <td>{product.dimension_width} {product.dimension_unit}</td>
                  </tr>
                  <tr>
                    <th>Dimension Height : </th>
                    <td>{product.dimension_height} {product.dimension_unit}</td>
                  </tr>
                </table>
              </div>

              <div className="tab-pane fade" id="reviews">
                <h5 className="fw-bold">Customer Reviews</h5>
                <div className="text-muted mb-3">
                  Share your experience with this product.
                </div>
                {/** Summary + list + form handled in-state below */}
                <ReviewsSection productId={product.id} />
              </div>

              <div className="tab-pane fade" id="specs">
                {/* Same specs list or table */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <TrendingProSection title="Recent Products" />
    </section>
  );
};

export default ProductDetail;