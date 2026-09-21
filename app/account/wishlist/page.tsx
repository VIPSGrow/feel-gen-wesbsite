"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useCart } from "@/lib/contexts/CartContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import serverCallFuction from "@/lib/constantFunction";
import { Heart, ShoppingCart, Trash2, Loader2, Eye } from "lucide-react";
import Image from "next/image";

interface WishlistItem {
  id: string;
  product_name: string;
  f_image: string;
  price: number;
  slug: string;
}

export default function WishlistPage() {
  const { user } = useAuth();
  const { addItem: addToCart } = useCart();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState("");

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = (await serverCallFuction("GET", "/api/ecom/wishlist")) as any;
      setWishlist(res.data || []);
    } catch (err) {
      console.error("Failed to fetch wishlist");
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (id: string) => {
    setRemovingId(id);
    try {
      await serverCallFuction("DELETE", `/api/ecom/wishlist/${id}`);
      setWishlist((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to remove from wishlist");
    } finally {
      setRemovingId("");
    }
  };

  const handleAddToCart = async (item: WishlistItem) => {
    // await addToCart(
    //   item.id,
    //   currentVariant ? currentVariant.id.toString() : null,
    //   item.quantity,
    //   item.currentPrice,
    // );
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center py-5 min-vh-50">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      {/* Header Section */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center gap-3">
          <div className="bg-danger bg-opacity-10 p-2 rounded-3">
            <Heart className="text-danger" size={28} fill="currentColor" />
          </div>
          <div>
            <h2 className="fw-bold m-0">My Wishlist</h2>
            <p className="text-muted mb-0 small">
              {wishlist.length} saved products
            </p>
          </div>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="card border-0 rounded-4 shadow-sm text-center py-5">
          <div className="card-body">
            <div className="bg-light rounded-circle d-inline-flex p-4 mb-4">
              <Heart size={48} className="text-muted opacity-25" />
            </div>
            <h4 className="fw-bold">Your wishlist is empty</h4>
            <p
              className="text-muted mx-auto mb-4"
              style={{ maxWidth: "350px" }}
            >
              Looks like you haven't saved anything yet. Explore our products
              and save your favorites!
            </p>
            <Link
              href="/products"
              className="btn btn-primary px-4 py-2 rounded-3 fw-bold shadow-sm"
            >
              Browse Products
            </Link>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {wishlist.map((item) => (
            <div key={item.id} className="col-sm-6 col-lg-4 col-xl-3">
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden product-card transition-hover">
                {/* Image Section */}
                <div className="position-relative" style={{ height: "220px" }}>
                  <Image
                    src={item.f_image}
                    alt={item.product_name}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    disabled={removingId === item.id}
                    className="btn btn-white position-absolute top-0 end-0 m-2 rounded-circle shadow-sm d-flex align-items-center justify-content-center p-2 hover-danger"
                    title="Remove from wishlist"
                  >
                    {removingId === item.id ? (
                      <Loader2 size={16} className="animate-spin text-danger" />
                    ) : (
                      <Trash2 size={16} className="text-danger" />
                    )}
                  </button>
                </div>

                {/* Content Section */}
                <div className="card-body p-3 d-flex flex-column">
                  <h6
                    className="fw-bold text-dark mb-2 text-truncate-2"
                    style={{ minHeight: "3rem" }}
                  >
                    {item.product_name}
                  </h6>
                  <div className="h5 fw-bold text-primary mb-3">
                    ₹{Number(item.price).toLocaleString("en-IN")}
                  </div>

                  <div className="d-flex gap-2 mt-auto">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="btn btn-primary btn-sm flex-grow-1 rounded-3 d-flex align-items-center justify-content-center gap-2"
                    >
                      <ShoppingCart size={16} />{" "}
                      <span className="small fw-bold">Add to Cart</span>
                    </button>
                    <Link
                      href={`/products/${item.slug}`}
                      className="btn btn-light btn-sm rounded-3 border d-flex align-items-center justify-content-center"
                      title="View Product"
                    >
                      <Eye size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .transition-hover {
          transition: all 0.3s ease;
        }
        .transition-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
        }
        .text-truncate-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .btn-white {
          background: white;
          border: none;
        }
        .hover-danger:hover {
          background-color: #fff5f5 !important;
        }
        .min-vh-50 {
          min-height: 50vh;
        }
      `}</style>
    </div>
  );
}
