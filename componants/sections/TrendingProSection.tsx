"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import serverCallFuction, { formattedAmount } from "@/lib/constantFunction";
import { IndianRupee, Minus, Plus, Star, StarIcon } from "lucide-react";
import { Product } from "@/lib/types/Product";
import { Icon } from "@iconify/react";

const TrendingProSection = ({ titleShow = true, title = "Trending Products", search = "", category = "" }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await serverCallFuction("GET", "api/products/products");
        if (res.success) {
          setProducts(res.data);
        }
      } catch (error: unknown) {
        console.log(
          "Product fetching error - ",
          error instanceof Error ? error.message : String(error),
        );
      }
    };

    void loadProducts();
  }, []);

  // Filter products during render based on search/category props
  const filteredProducts = products.filter((p) => {
    if (category && String(p.cat_id) !== String(category)) {
      return false;
    }
    if (search.trim()) {
      const term = search.trim().toLowerCase();
      const match =
        p.name.toLowerCase().includes(term) ||
        (p.short_desc || "").toLowerCase().includes(term) ||
        (p.description || "").toLowerCase().includes(term);
      if (!match) return false;
    }
    return true;
  });

  // console.log("products - ", products);


  return (
    <>
      <section className="py-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="bootstrap-tabs product-tabs">
                {titleShow && (
                  <div className="tabs-header d-flex justify-content-between border-bottom my-5" data-aos="zoom-in">
                    <h3>{title}</h3>
                  </div>
                )}

                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-all"
                    role="tabpanel"
                    aria-labelledby="nav-all-tab"
                  >
                    <div className="product-grid row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                      {/* Product Item Start */}
                      {filteredProducts.length === 0 && (
                        <div className="col-12 text-center text-muted py-5">
                          No products found.
                        </div>
                      )}
                      {filteredProducts.map((item, index) => {

                        let base_price = item.base_price;

                        const discounted_price = item.discounted_price;

                        let final_price = 0
                        let percentage = 0;

                        if (discounted_price > 0) {
                          final_price = discounted_price
                          percentage = ((base_price - final_price) * 100) / base_price
                        }

                        let tax_amount = 0;
                        if (item.tax_data) {
                          tax_amount = (base_price * item.tax_data.percentage) / 100;
                          base_price = tax_amount + parseFloat(base_price)

                          // base_price += Number(tax_amount)
                        }




                        return (
                          <div className="col" key={index}>
                            <Link
                              href={`/products/${item.slug}`}
                              title={item.name}
                            >
                              <div className="product-item">
                                {percentage > 0 && <span className="badge bg-success position-absolute m-3" style={{ zIndex: 2 }}>
                                  {percentage.toFixed(2)}
                                </span>}

                                {/* FIXED: Added 'overflow-hidden' wrapper to contain the zoom effect */}
                                <figure className="overflow-hidden position-relative rounded">

                                  {/* FIXED: Added 'zoom-effect' class */}
                                  <img
                                    src={item.f_image}
                                    className="tab-image img-fluid zoom-effect"
                                    alt={item.name}
                                  />

                                </figure>

                                <h3>{item.name}</h3>
                                <span className="qty">{item.qty}</span>

                                <div className="d-flex align-items-center">
                                  <span className="price d-flex align-items-center">
                                    <IndianRupee size={16} className="me-1" />
                                    {formattedAmount(item.taxable_price)}
                                  </span>
                                  {percentage > 0 &&
                                    <span className="d-flex align-items-center text-decoration-line-through">
                                      <IndianRupee size={16} className="me-1" />
                                      {formattedAmount(base_price)}
                                    </span>
                                  }
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                  <span className=" d-flex align-items-center badge  gap-2" style={{ background: 'darkgreen' }}>{item.average_rating} <StarIcon size={14} fill="white" /> </span>
                                  <span>{item.total_reviews} reviews</span>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrendingProSection;