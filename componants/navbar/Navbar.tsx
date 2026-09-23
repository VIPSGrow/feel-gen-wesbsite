"use client";
import serverCallFuction from "@/lib/constantFunction";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useCart } from "@/lib/contexts/CartContext";
import { Trash, Search, User, ShoppingCart, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import NotificationsBell from "@/componants/notifications/NotificationsBell";
import { useNotifications } from "@/lib/notifications/useNotifications";






const Navbar = () => {
  const { isAuthenticated, user, logout, getSettingByKey } = useAuth();
  const { barNotifications } = useNotifications();
  const router = useRouter();

  const contact_setting = getSettingByKey("contact_us");
  const { cart, removeItem } = useCart();

  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");

  const [category, setCategory] = React.useState<Array<{ id: number | string; name: string }>>([]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (searchTerm.trim()) params.set("search", searchTerm.trim());
    const query = params.toString();
    router.push(query ? `/products?${query}` : "/products");
  };

  const fetchCategories = async () => {
    try {

      const res = await serverCallFuction('GET', 'api/products/categories')
      if (res.status) {
        setCategory(res.data as any);
      }

    } catch (error) {
      console.log("error - ", error);

    }
  }

  useEffect(() => {
    fetchCategories()

  }, [user]);

  // console.log("categor 0- ", category);

  return (
    <>
      {/* --- 1. COMMON DRAWERS --- */}

      {/* Navigation Drawer */}
      <div
        className="offcanvas offcanvas-start"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header border-bottom">
          {/* SEO FIX: Changed h5 to div with fw-bold to remove from header outline */}
          <div className="offcanvas-title fw-bold fs-5" id="offcanvasNavbarLabel">Menu</div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <nav aria-label="Mobile Navigation">


            {/* Inside your Mobile Offcanvas Body */}
            <ul className="navbar-nav gap-2">
              <li data-bs-dismiss="offcanvas">
                <Link href="/" className="nav-link">Home</Link>
              </li>

              {/* MOBILE SHOP ACCORDION */}
              <li className="nav-item">
                <a
                  className="nav-link d-flex justify-content-between align-items-center"
                  data-bs-toggle="collapse"
                  href="#mobileShopCollapse"
                  role="button"
                  aria-expanded="false"
                >
                  Shop
                  <span className="small">▼</span> {/* or a Lucide Chevron icon */}
                </a>

                {/* This div is CLOSED by default because it doesn't have the "show" class */}
                <div className="collapse" id="mobileShopCollapse">
                  <ul className="list-unstyled ps-3 border-start ms-2">
                    <li data-bs-dismiss="offcanvas">
                      <Link href="/products" className="nav-link py-1 text-primary fw-bold">
                        All Products
                      </Link>
                    </li>
                    {category?.map((cat: any, index: number) => (
                      <li key={index} data-bs-dismiss="offcanvas">
                        <Link href={`/products?category=${cat.id}`} className="nav-link py-1">
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              <li data-bs-dismiss="offcanvas">
                <Link href="/blog" className="nav-link">Blog</Link>
              </li>

              <li data-bs-dismiss="offcanvas"><Link href="/about-us" className="nav-link">About Us</Link></li>
              <li data-bs-dismiss="offcanvas"><Link href="/contact-us" className="nav-link">Contact Us</Link></li>

            </ul>
            <button
              className="btn btn-primary w-100 mt-3"
              data-bs-dismiss="offcanvas"
              onClick={() => {
                if (isAuthenticated) {
                  logout()
                } else {
                  navigation.navigate('/login')
                }
              }}
            >
              {isAuthenticated ? "Logout" : "Login"}
            </button>

            <button
              className="btn btn-primary w-100 mt-3"
              data-bs-dismiss="offcanvas"
              onClick={async () => {
                window.open('https://panel.feelsafeco.in', '_blank', 'noopener,noreferrer');
              }}
            >
              Distributor Login
            </button>
          </nav>
        </div>
      </div>

      {/* Cart Drawer */}
      <div
        className="offcanvas offcanvas-end"
        id="offcanvasCart"
        aria-labelledby="offcanvasCartLabel"
      >
        <div className="offcanvas-header border-bottom justify-content-between">
          {/* SEO FIX: Changed h5 to div */}
          <div id="offcanvasCartLabel" className="mb-0 fw-bold fs-5">Your Cart</div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {/* SEO FIX: Changed h4 to div */}
          <div className="d-flex justify-content-between align-items-center mb-3 fw-bold fs-4">
            <span className="text-primary">Items</span>
            <span className="badge bg-primary rounded-pill">
              {cart?.total_items || 0}
            </span>
          </div>
          <ul className="list-group mb-3">
            {cart?.items.map((item, index) => (
              <li
                className="list-group-item d-flex justify-content-between lh-sm"
                key={index}
              >
                <div className="d-flex align-items-center">
                  <img
                    src={item.f_image}
                    alt={item.product_name}
                    width={50}
                    height={50}
                    className="img-thumbnail me-2"
                    style={{ objectFit: "cover" }}
                  />
                  <div>
                    <h6 className="my-0 small">{item.product_name}</h6>
                    <small className="text-muted">
                      {item.quantity} x ₹{item.price}
                    </small>
                  </div>
                </div>
                <button
                  className="btn btn-sm"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.product_name}`}
                >
                  <Trash size={16} color="red" />
                </button>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (INR)</span>
              <strong>₹{cart?.total}</strong>
            </li>
          </ul>
          <Link
            href="/cart"
            className="btn btn-secondary w-100 mb-2"
            onClick={() => {
              const el = document.getElementById("offcanvasCart");
              if (!el) return;

              // Try Bootstrap offcanvas hide (if available)
              const bootstrapOffcanvas = (window as unknown as {
                bootstrap?: {
                  Offcanvas?: { getInstance?: (el: Element) => { hide?: () => void } | null };
                };
              }).bootstrap?.Offcanvas;

              bootstrapOffcanvas?.getInstance?.(el)?.hide?.();

              // Fallback visual cleanup
              el.classList.remove("show");
              document.body.classList.remove("offcanvas-backdrop");
              document.querySelector(".offcanvas-backdrop")?.remove();
            }}
          >
            View Cart
          </Link>
          <Link
            href="/checkout"
            className="btn btn-primary w-100"
            onClick={() => {
              const el = document.getElementById("offcanvasCart");
              if (!el) return;
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const bootstrapObj: any = (window as any).bootstrap;
              if (bootstrapObj?.Offcanvas) {
                const instance = bootstrapObj.Offcanvas.getInstance(el) ?? new bootstrapObj.Offcanvas(el);
                instance?.hide?.();
              } else {
                el.classList.remove("show");
                document.body.classList.remove("offcanvas-backdrop");
                const backdrop = document.querySelector(".offcanvas-backdrop");
                backdrop?.remove();
              }
            }}
          >
            Continue to checkout
          </Link>
        </div>
      </div>

      {/* --- 2. DESKTOP HEADER (Same as before) --- */}
      <header className="d-none d-xl-block">
        <div className="container-fluid">
          <div className="row py-3 border-bottom align-items-center">
            <div className="col-lg-3">
              <Link href="/" aria-label="Feel Safe Home">
                <img
                  src="/assets/images/logo.png"
                  alt="Feel Safe Logo"

                  className="img-fluid"
                />
              </Link>
            </div>
            <div className="col-lg-5">
              <form className="search-bar row bg-light p-2 rounded-4 mx-0" role="search" onSubmit={handleSearchSubmit}>
                {/* <div className="col-md-4">
                  <select
                    className="form-select border-0 bg-transparent shadow-none"
                    aria-label="Select Category"
                    value={selectedCategory}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSelectedCategory(val);
                      router.push(val ? `/products?category=${val}` : "/products");
                    }}
                  >
                    <option value="">All Categories</option>
                    {category && category.length > 0 && category.map((cat: any, index: number) => (
                      <option key={index} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div> */}
                <div className="col-md-11">
                  <input
                    type="search"
                    className="form-control border-0 bg-transparent shadow-none"
                    placeholder="Search products..."
                    aria-label="Search products"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="col-1 d-flex align-items-center">
                  <button type="submit" className="border-0 bg-transparent p-0 shadow-none" aria-label="Search">
                    <Search size={24} className="text-muted" />
                  </button>
                </div>
              </form>
            </div>
            <div className="col-lg-4 d-flex justify-content-end gap-4 align-items-center">
              {!isAuthenticated ? (
                <div className="support-box text-end">
                  <span className="fs-6 text-muted">For Support?</span>
                  {/* SEO FIX: Changed h5 to div */}
                  <div className="mb-0 fw-bold fs-5">+91 {contact_setting?.phone}</div>
                </div>
              ) : (
                <div className="support-box text-dark">Welcome! {user?.name}</div>
              )}
              <ul className="d-flex list-unstyled m-0 gap-3 align-items-center">
                <li className="dropdown">
                  <button
                    className="rounded-circle bg-light p-2 border-0"
                    data-bs-toggle="dropdown"
                    aria-label="Account menu"
                  >
                    <User size={24} />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    {isAuthenticated ? (
                      <>
                        <li><Link href="/account" className="dropdown-item">My Account</Link></li>
                        <li><Link href="/account/orders" className="dropdown-item">Orders</Link></li>
                        <li><button onClick={logout} className="dropdown-item">Logout</button></li>
                      </>
                    ) : (
                      <>
                        <li><Link href="/login" className="dropdown-item">User Login</Link></li>
                        <li><Link href="https://panel.feelsafeco.in/signin" target="_blank" className="dropdown-item">Distributor Login</Link></li>
                      </>
                    )}
                  </ul>
                </li>
                <li>
                  <NotificationsBell items={barNotifications} />
                </li>
                <li>
                  <button
                    className="border-0 bg-transparent d-flex flex-column gap-1 lh-1"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasCart"
                    aria-label="Open cart"
                  >

                    <span className="fs-6 text-muted">Your Cart</span>
                    <span className="cart-total fs-5 fw-bold">
                      ₹{cart?.total || 0}
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <nav className="row py-2 border-bottom" aria-label="Desktop Navigation">
            <div className="col-12">
              <ul className="nav gap-4">
                <li><Link href="/" className="nav-link text-dark">Home</Link></li>
                <li className="nav-link dropdown">
                  <Link
                    href="/products"
                    className="nav-link text-dark p-0 dropdown-toggle"
                    id="shopDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Shop
                  </Link>
                  <ul className="dropdown-menu shadow border-0 mt-2 " aria-labelledby="shopDropdown" style={{ zIndex: 9999 }}>
                    <li>
                      <Link href="/products" className="dropdown-item fw-bold text-primary">
                        All Products
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>

                    {category && category.length > 0 ? (
                      category.map((cat: any, index: number) => (
                        <li key={index}>
                          <Link href={`/products?category=${cat.id}`} className="dropdown-item">
                            {cat.name}
                          </Link>
                        </li>
                      ))
                    ) : (
                      <li><span className="dropdown-item text-muted">No categories found</span></li>
                    )}
                  </ul>
                </li>
                {/* SHOP DROPDOWN END */}
                <li><Link href="/blog" className="nav-link text-dark">Blog</Link></li>
                <li><Link href="/about-us" className="nav-link text-dark">About Us</Link></li>
                <li><Link href="/contact-us" className="nav-link text-dark">Contact Us</Link></li>

              </ul>
            </div>
          </nav>
        </div>
      </header>

      {/* --- 3. MOBILE HEADER (Same as before) --- */}
      <header className="sticky-top bg-white border-bottom d-block d-xl-none py-2">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-3">
              <button
                className="border-0 bg-transparent p-0 shadow-none"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
                aria-label="Toggle navigation"
              >
                <Menu size={30} />
              </button>
            </div>
            <div className="col-6 text-center">
              <Link href="/">
                <img
                  src="/assets/images/logo.png"
                  alt="Feel Safe Logo"

                  style={{ maxHeight: "35px" }}
                />
              </Link>
            </div>
            <div className="col-3 text-end">
              <button
                className="border-0 bg-transparent p-0 position-relative shadow-none"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasCart"
                aria-label="Open cart"
              >
                <ShoppingCart size={28} />
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                  style={{ fontSize: "0.6rem" }}
                >
                  {cart?.total_items || 0}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;