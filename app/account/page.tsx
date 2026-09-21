"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import serverCallFuction from "@/lib/constantFunction";
import { getMyTickets } from '@/lib/supportApi';
import { Package, ShoppingBag, Heart, MapPin, HelpCircle, ArrowRight } from "lucide-react";

export default function AccountDashboard() {
  const { user } = useAuth();
  const [recentOrders, setRecentOrders] = useState([]);
  const [openTickets, setOpenTickets] = useState(0);
  const [stats, setStats] = useState({
    totalOrders: 12,
    totalSpent: 4589,
    wishlistCount: 3,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statsLoading, setStatsLoading] = useState(true);

  const [dashStats, setDashStats] = useState({
    total_orders: 0,
    open_tickets: 0,
    total_order_value: 0,
  });

  const fetchDash = useCallback(async () => {
    try {

      const dashRes = await serverCallFuction("GET", "api/dashboard/ecom/me");

      if (dashRes.success) {
        setDashStats(dashRes.data)
      }

      // if (ordersRes?.success) {
      //   setRecentOrders(ordersRes.data || []);
      // }

    } catch (err) {
      setError("Failed to load dashboard data");
      console.error(err);
    }
  }, []);


  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setStatsLoading(true);
      setError("");

      // Fetch recent orders
      const ordersRes = await serverCallFuction("GET", "api/orders/my?limit=5");
      if (ordersRes?.success) {
        setRecentOrders(ordersRes.data || []);
      }

      // Fetch open tickets count
      const ticketsRes = await getMyTickets(1, 100);
      const openTicketsCount = ticketsRes.tickets?.filter((t) => t.status === 'OPEN').length || 0;
      setOpenTickets(openTicketsCount);

    } catch (err) {
      setError("Failed to load dashboard data");
      console.error(err);
    } finally {
      setLoading(false);
      setStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
    fetchDash()
  }, [fetchDashboardData]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      {/* Welcome Header */}
      <div className="mb-5">
        <h1 className="fw-bold text-dark">Welcome back, {user?.name}!</h1>
        <p className="text-muted">Here's a summary of your activity at Feel Safe.</p>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        <div className="col-md-6 col-xl-4">
          <div className="card border-0 shadow-sm rounded-4 text-white h-100" style={{ background: "linear-gradient(135deg, #00A9E0 0%, #007bb0 100%)" }}>
            <div className="card-body p-4 d-flex align-items-center">
              <Package size={48} className="opacity-50 me-3" />
              <div>
                <p className="small mb-0 opacity-75">Total Orders</p>
                <h3 className="fw-bold mb-0 text-white">{dashStats.total_orders}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-4">
          <div className="card border-0 shadow-sm rounded-4 text-white h-100" style={{ background: "linear-gradient(135deg, #8DC63F 0%, #6f9d31 100%)" }}>
            <div className="card-body p-4 d-flex align-items-center">
              <ShoppingBag size={48} className="opacity-50 me-3" />
              <div>
                <p className="small mb-0 opacity-75">Total Spent</p>
                <h3 className="fw-bold mb-0 text-white">₹{dashStats.total_order_value.toLocaleString()}</h3>
              </div>
            </div>
          </div>
        </div>



        <div className="col-md-6 col-xl-4">
          <div className="card border-0 shadow-sm rounded-4 text-white h-100" style={{ background: "linear-gradient(135deg, #fd7e14 0%, #e8590c 100%)" }}>
            <div className="card-body p-4 d-flex align-items-center">
              <HelpCircle size={48} className="opacity-50 me-3" />
              <div>
                <p className="small mb-0 opacity-75">Open Tickets</p>
                <h3 className="fw-bold mb-0 text-white">{openTickets}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h4 className="fw-bold mb-4">Quick Actions</h4>
      <div className="row g-4 mb-5">
        {[
          { href: "/products", icon: ShoppingBag, label: "Shop Now", sub: "Browse products", color: "#00A9E0" },
          { href: "/account/orders", icon: Package, label: "Orders", sub: "Track purchases", color: "#8DC63F" },
          { href: "/account/support", icon: HelpCircle, label: "Support", sub: "Get assistance", color: "#E6519B" },
          { href: "/account/addresses", icon: MapPin, label: "Addresses", sub: "Delivery info", color: "#fd7e14" },
        ].map((action, idx) => (
          <div key={idx} className="col-6 col-lg-3">
            <Link href={action.href} className="text-decoration-none">
              <div className="card h-100 border-2 border-dashed border-light shadow-sm rounded-4 text-center p-4 transition-hover bg-white">
                <div className="mb-3 mx-auto rounded-circle d-flex align-items-center justify-content-center" style={{ width: "60px", height: "60px", backgroundColor: `${action.color}15` }}>
                  <action.icon size={28} style={{ color: action.color }} />
                </div>
                <h6 className="fw-bold text-dark mb-1">{action.label}</h6>
                <p className="small text-muted mb-0">{action.sub}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div className="card-header bg-white py-3 border-0 d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Recent Orders</h5>
          <Link href="/account/orders" className="small text-primary text-decoration-none fw-bold">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="px-4 py-3 border-0 small text-uppercase fw-bold text-muted">ID</th>
                <th className="px-4 py-3 border-0 small text-uppercase fw-bold text-muted">Date</th>
                <th className="px-4 py-3 border-0 small text-uppercase fw-bold text-muted">Status</th>
                <th className="px-4 py-3 border-0 small text-uppercase fw-bold text-muted">Total</th>
                <th className="px-4 py-3 border-0"></th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr key={order.order_id}>
                    <td className="px-4 fw-bold">#{order.order_id}</td>
                    <td className="px-4 text-muted">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="px-4">
                      <span className={`badge rounded-pill px-3 py-2 ${order.order_status === "completed" ? "bg-success-subtle text-success" :
                        order.order_status === "pending" ? "bg-warning-subtle text-dark" : "bg-secondary-subtle text-secondary"
                        }`}>
                        {order.order_status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 fw-bold">₹{Number(order.total_amount).toLocaleString()}</td>
                    <td className="px-4 text-end">
                      <Link href={`/orders/success/${order.order_id}`} className="btn btn-sm btn-outline-primary rounded-pill px-3">
                        Details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    No orders found. <Link href="/products">Start shopping!</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        .transition-hover {
          transition: all 0.3s ease;
        }
        .transition-hover:hover {
          transform: translateY(-5px);
          border-color: #00A9E0 !important;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        .bg-success-subtle { background-color: #d1e7dd; }
        .bg-warning-subtle { background-color: #fff3cd; }
        .bg-secondary-subtle { background-color: #e2e3e5; }
      `}</style>
    </div>
  );
}