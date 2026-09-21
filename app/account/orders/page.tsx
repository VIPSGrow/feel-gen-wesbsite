"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import Link from "next/link";
import serverCallFuction from "@/lib/constantFunction";
import {
  Package,
  Eye,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  File,
  Undo2Icon,
} from "lucide-react";

interface Order {
  order_id: string;
  created_at: string;
  updated_at?: string;
  order_status: string;
  items_count: number;
  total_amount: number;
  payment_status?: string;
  items?: unknown[];
}



interface OrdersResponse {
  success: boolean;
  data: Order[];
  total: number;
  page: number;
  limit: number;
}

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [inFlightReturnRequestOrderIds, setInFlightReturnRequestOrderIds] =
    useState<Set<string>>(() => new Set());

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const handleReturnRequest = async (orderId: string) => {
    if (!orderId) return;
    const reason = window.prompt("Enter return reason:");
    if (!reason || !reason.trim()) {
      window.alert("Return reason is required.");
      return;
    }

    setInFlightReturnRequestOrderIds((prev) => {
      const next = new Set(prev);
      next.add(orderId);
      return next;
    });

    try {
      const res = await serverCallFuction(
        "POST",
        `api/orders/${orderId}/return-request`,
        { reason: reason.trim() },
      );

      const resAny = res as { success?: boolean; message?: string };
      if (resAny?.success) {
        window.alert("Return request submitted successfully.");
        await fetchOrders();
      } else {
        window.alert(
          resAny?.message || "Failed to submit return request.",
        );
      }
    } catch (e) {
      console.error(e);
      window.alert("Failed to submit return request.");
    } finally {
      setInFlightReturnRequestOrderIds((prev) => {
        const next = new Set(prev);
        next.delete(orderId);
        return next;
      });
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");
      const res = (await serverCallFuction(
        "GET",
        `api/orders/my?page=${page}&limit=10`,
      )) as unknown as OrdersResponse;
      if (res.success) {
        setOrders(res.data || []);
        setTotalPages(Math.ceil(res.total / 10) || 1);
      }
    } catch (err) {
      setError("Failed to fetch orders. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isWithinReturnWindow = (updatedAt?: string, createdAt?: string) => {
    const ts = updatedAt || createdAt;
    if (!ts) return false;

    const updatedDate = new Date(ts);
    const now = new Date();

    if (Number.isNaN(updatedDate.getTime())) return false;

    const diffMs = now.getTime() - updatedDate.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    return diffDays <= 3;
  };

  const getStatusBadge = (status: string) => {

    const s = status?.toLowerCase();
    let bgClass = "bg-secondary";
    if (s === "delivered") bgClass = "bg-success";
    if (s === "accepted" || s === "pending") bgClass = "bg-warning text-dark";
    if (s === "dispatched") bgClass = "bg-primary text-white";
    if (s === "cancelled") bgClass = "bg-danger";
    if (s === "return_requested") bgClass = "bg-danger";
    if (s === "unpaid") bgClass = "bg-warning text-dark";

    return (
      <span className={`badge ${bgClass} rounded-pill px-3 py-2 fw-semibold`}>
        {status?.toUpperCase()}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center py-5 min-vh-50">
        <div
          className="spinner-border text-primary mb-3"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted fw-medium">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      {/* Header */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <div className="bg-primary bg-opacity-10 p-2 rounded-3">
          <Package className="text-primary" size={28} />
        </div>
        <div>
          <h2 className="fw-bold m-0">My Orders</h2>
          <p className="text-muted mb-0 small">
            Track and manage your order history
          </p>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger border-0 shadow-sm rounded-4 d-flex align-items-center p-4 mb-4">
          <AlertCircle className="me-3" />
          <div className="flex-grow-1">{error}</div>
          <button
            onClick={fetchOrders}
            className="btn btn-danger btn-sm rounded-pill px-3"
          >
            Retry
          </button>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-4 text-center py-5">
          <div className="card-body">
            <div className="bg-light rounded-circle d-inline-flex p-4 mb-4">
              <Package size={48} className="text-muted opacity-50" />
            </div>
            <h4 className="fw-bold">No orders found</h4>
            <p
              className="text-muted mx-auto mb-4"
              style={{ maxWidth: "350px" }}
            >
              Looks like you have not placed any orders yet. Explore our
              products and start shopping!
            </p>
            <Link
              href="/products"
              className="btn btn-primary px-4 py-2 rounded-3 fw-bold shadow-sm"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light text-muted small uppercase fw-bold">
                  <tr>
                    <th className="px-4 py-3 border-0">Order Details</th>
                    <th className="px-4 py-3 border-0">Items</th>
                    <th className="px-4 py-3 border-0">Status</th>
                    <th className="px-4 py-3 border-0">Payment</th>
                    <th className="px-4 py-3 border-0 text-end">
                      Total Amount
                    </th>
                    <th className="px-4 py-3 border-0 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.order_id}>
                      <td className="px-4 py-3">
                        <div className="d-flex align-items-center">

                          <div>
                            <div className="d-flex flex-column">
                              <small
                                className="badge bg-primary w-fit-content"
                                style={{ width: "fit-content" }}
                              >
                                #{order.order_id}
                              </small>
                              <small className="text-muted">
                                Date -{" "}
                                {new Date(order.created_at).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )}
                              </small>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-dark fw-medium">
                          {order.items?.length ?? order.items_count}{" "}
                          {/* {order.items_count > 1 ? "Items" : "Item"} */}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        {getStatusBadge(order.order_status)}
                      </td>
                      <td className="px-4 py-3">
                        {getStatusBadge(order.payment_status ?? "")}
                      </td>
                      <td className="px-4 py-3 text-end fw-bold text-primary">
                        ₹{Number(order.total_amount).toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3 text-center gap-2">
                        <Link
                          href={`/account/orders/${order.order_id}`}
                          className="btn btn-secondary btn-sm rounded-3 d-inline-flex align-items-center gap-2 border hover-primary me-2"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          href={`#`}
                          onClick={async () => {
                            try {
                              const res = await serverCallFuction(
                                "POST",
                                `api/invoice/invoice-generate`,
                                { orderId: order.order_id },
                              );
                              const resAny = res as { success?: boolean; url?: string; message?: string };
                              if (resAny?.success && resAny.url) {
                                window.open(resAny.url, "_blank");
                              } else {
                                window.alert(resAny?.message || "Failed to fetch invoice.");
                              }
                            } catch (e) {
                              console.error(e);
                              window.alert("Failed to fetch invoice.");
                            }
                          }}
                          className="btn btn-primary btn-sm rounded-3 d-inline-flex align-items-center gap-2 border hover-primary me-2"
                          title="Invoice"
                        >
                          <File size={16} />
                        </Link>

                        {order.order_status === "delivered" &&
                          isWithinReturnWindow(order.updated_at, order.created_at) && (

                            <span
                              role="button"
                              tabIndex={0}
                              onClick={() => handleReturnRequest(order.id)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  handleReturnRequest(order.id ?? "");
                                }
                              }}

                              className={`btn btn-danger btn-sm rounded-3 d-inline-flex align-items-center gap-2 border hover-danger ${inFlightReturnRequestOrderIds.has(order.order_id)
                                ? "disabled"
                                : ""
                                }`}
                              title="Return Order"
                              style={{
                                pointerEvents: inFlightReturnRequestOrderIds.has(
                                  order.order_id,
                                )
                                  ? "none"
                                  : "auto",
                                opacity: inFlightReturnRequestOrderIds.has(
                                  order.order_id,
                                )
                                  ? 0.6
                                  : 1,
                              }}
                            >
                              <Undo2Icon size={16} />
                            </span>
                          )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="d-md-flex align-items-center justify-content-between px-2">
            <p className="text-muted small mb-3 mb-md-0">
              Showing page <strong>{page}</strong> of{" "}
              <strong>{totalPages}</strong>
            </p>
            <nav>
              <ul className="pagination pagination-sm mb-0 gap-2">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link rounded-3 border-0 shadow-sm px-3 py-2"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    <ChevronLeft size={18} />
                  </button>
                </li>
                <li className="page-item active">
                  <span className="page-link rounded-3 border-0 shadow-sm px-3 py-2">
                    {page}
                  </span>
                </li>
                <li
                  className={`page-item ${page === totalPages ? "disabled" : ""
                    }`}
                >
                  <button
                    className="page-link rounded-3 border-0 shadow-sm px-3 py-2"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    <ChevronRight size={18} />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}

      <style jsx>{`
        .hover-primary:hover {
          background-color: #0d6efd !important;
          color: white !important;
          border-color: #0d6efd !important;
        }
        .table thead th {
          letter-spacing: 0.05rem;
        }
        .min-vh-50 {
          min-height: 50vh;
        }
      `}</style>
    </div>
  );
}
