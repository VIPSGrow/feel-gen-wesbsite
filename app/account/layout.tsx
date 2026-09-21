"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import ProtectedRoute from "@/componants/ProtectedRoute/ProtectedRoute";
import {
  Heart,
  Package,
  User,
  MapPin,
  LayoutDashboard,
  LogOut,
  HelpCircle,
  Trash2,
} from "lucide-react";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: "/account", label: "Dashboard", icon: LayoutDashboard },
    { href: "/account/profile", label: "Profile", icon: User },
    { href: "/account/addresses", label: "Saved Addresses", icon: MapPin },
    { href: "/account/orders", label: "My Orders", icon: Package },
    { href: "/account/support", label: "Support Tickets", icon: HelpCircle },
    // { href: "/account/wishlist", label: "Wishlist", icon: Heart },
  ];

  return (
    <ProtectedRoute>
      <div className="bg-light py-5 min-vh-100">
        <div className="container-fluid">
          <div className="row g-4">
            {/* Sidebar */}
            <div className="col-lg-3">
              <div
                className="card border-0 shadow-sm rounded-4 p-3 sticky-top"
                style={{ top: "20px" }}
              >
                <div className="text-center mb-4 pt-3">
                  <div
                    className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "80px",
                      height: "80px",
                      background:
                        "linear-gradient(135deg, #fc74fc 0%, #ff8af9 100%)",
                    }}
                  >
                    <User size={40} color="white" />
                  </div>
                  <h5 className="fw-bold mb-0 text-dark">
                    {user?.name || "User"}
                  </h5>
                  <p className="text-muted small">
                    {user?.email || user?.phone}
                  </p>
                </div>

                <div className="nav flex-column nav-pills gap-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all ${isActive
                          ? "active shadow-sm text-white"
                          : "text-secondary hover-bg-light"
                          }`}
                        style={
                          isActive
                            ? {
                              background:
                                "linear-gradient(90deg, #fc74fc, #E6519B)",
                            }
                            : {}
                        }
                      >
                        <Icon size={18} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}


                  <Link
                    href="/account/delete"
                    className={`nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all ${pathname === "/account/delete"
                      ? "active shadow-sm text-white"
                      : "text-error hover-bg-light"
                      }`}
                    style={
                      pathname === "/account/delete"
                        ? {
                          background:
                            "linear-gradient(90deg, #dc3545, #b02a37)",
                        }
                        : {}
                    }
                  >
                    <Trash2 size={18} />
                    <span>Delete Account</span>
                  </Link>
                </div>



                {/* Delete Account Link */}


                <hr className="my-4 text-muted" />
                <button
                  onClick={logout}
                  className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 border-0 rounded-3 py-2"
                  style={{ backgroundColor: "#fff5f5" }}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-lg-9">
              <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .nav-link:not(.active):hover {
          background-color: #f8f9fa;
          color: #0d6efd !important;
        }
        .rounded-4 {
          border-radius: 1.5rem !important;
        }
      `}</style>
    </ProtectedRoute>
  );
}
