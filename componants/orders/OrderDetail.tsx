"use client";
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import serverCallFuction, { date_formate, formattedAmount, formattedAmountCommas } from '@/lib/constantFunction';
import { useAuth } from "@/lib/contexts/AuthContext";

import { Loader2, ArrowLeft, Printer, Save, CheckCircle2, PackageCheck, Wallet, Download } from 'lucide-react';
import Image from 'next/image';

const ORDER_STATUSES = ['pending', 'accepted', 'packed', 'dispatched', 'delivered', 'cancelled'] as const;
type OrderStatus = typeof ORDER_STATUSES[number];

const OrderDetail = () => {
    const params = useParams();
    const router = useRouter();
    const orderId = params['order-id'] as string;
    const { user } = useAuth();

    const isSuperAdmin = useMemo(() => {
        return user?.role === 'Super Admin' || user?.role === 'super_admin';
    }, [user]);

    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus>('pending');
    const [remarks, setRemarks] = useState('');

    const [actionLoading, setActionLoading] = useState(false);
    const [actionError, setActionError] = useState<string>('');

    const [showReturnModal, setShowReturnModal] = useState(false);
    const [returnAction, setReturnAction] = useState<'approve' | 'reject' | null>(null);
    const [adminRemarks, setAdminRemarks] = useState('');
    const [refundAmount, setRefundAmount] = useState<string>('');

    const [showRequestReturnModal, setShowRequestReturnModal] = useState(false);
    const [returnReason, setReturnReason] = useState('');

    const invoiceLinkRef = useRef<HTMLAnchorElement | null>(null);
    const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);

    const fetchOrder = async () => {
        if (!orderId) return;
        setLoading(true);
        setError('');
        try {
            const res = await serverCallFuction('GET', `api/orders/details/${orderId}`);
            if (res.status !== false && res.data) {
                setOrder(res.data);
                setSelectedStatus(res.data?.order_status as OrderStatus);
            } else {
                setError('Order not found');
            }
        } catch (err) {
            console.error('Error fetching order:', err);
            setError('Failed to load order');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [orderId]);

    const getStatusBadgeClass = (status: string) => {
        switch (status ? String(status).toLowerCase() : "") {
            case 'confirmed':
            case 'shipped':
            case 'delivered':
            case 'paid':
            case 'accepted':
            case 'approved':
            case 'received':
                return 'bg-success-subtle text-success border border-success-subtle';
            case 'pending':
            case 'unpaid':
            case 'requested':
            case 'not_initiated':
                return 'bg-warning-subtle text-warning border border-warning-subtle';
            case 'cancelled':
            case 'rejected':
                return 'bg-danger-subtle text-danger border border-danger-subtle';
            default:
                return 'bg-light text-secondary border';
        }
    };

    const canSetStatus = (from: OrderStatus, to: OrderStatus) => {
        const flow: Record<OrderStatus, OrderStatus[]> = {
            pending: ['accepted', 'cancelled'],
            accepted: ['packed', 'cancelled'],
            packed: ['dispatched', 'cancelled'],
            dispatched: ['delivered'],
            delivered: [],
            cancelled: []
        };
        return (flow[from] || []).includes(to);
    };

    const submitStatusUpdate = async () => {
        if (!orderId || !order) return;
        try {
            setUpdatingStatus(true);
            const payload = {
                order_status: selectedStatus,
                remarks: remarks || ''
            };

            const res = await serverCallFuction('PUT', `api/orders/${orderId}/status`, payload);
            if ((res as { status?: boolean }).status !== false) {
                setRemarks('');
                await fetchOrder();
            } else {
                setError((res as any)?.message || 'Failed to update status');
            }
        } catch (e) {
            console.error(e);
            setError('Failed to update status');
        } finally {
            setUpdatingStatus(false);
        }
    };

    const activeReturn = useMemo(() => {
        const returnData = order?.return_data;
        return Array.isArray(returnData) && returnData.length > 0 ? returnData[0] : null;
    }, [order]);

    const isReturnRequested = activeReturn?.return_status === "requested";
    const isReturnApproved = activeReturn?.return_status === "approved";
    const isReturnReceived = activeReturn?.return_status === "received";
    const isRefundPending = activeReturn?.refund_status === "not_initiated";

    const openReturnModal = (action: 'approve' | 'reject') => {
        if (!order) return;
        setActionError('');
        setReturnAction(action);
        setAdminRemarks('');
        setRefundAmount('');
        setShowReturnModal(true);
    };

    const closeReturnModal = () => {
        if (actionLoading) return;
        setShowReturnModal(false);
        setReturnAction(null);
        setAdminRemarks('');
        setRefundAmount('');
        setActionError('');
    };

    const submitReturnAction = async () => {
        if (!orderId || !order || !activeReturn?.id || !returnAction) return;

        if (!adminRemarks.trim()) {
            setActionError('Admin remarks are required');
            return;
        }

        try {
            setActionLoading(true);
            setActionError('');

            const baseBody: { admin_remarks: string; refund_amount?: number } = {
                admin_remarks: adminRemarks.trim()
            };

            if (returnAction === 'approve') {
                const parsedRefund = refundAmount.trim() ? Number(refundAmount) : undefined;
                baseBody.refund_amount = Number.isFinite(parsedRefund) ? parsedRefund : Number(order.total_amount);
            }

            const res = await serverCallFuction('PUT', `api/orders/returns/${activeReturn.id}/${returnAction}`, baseBody);
            if ((res as any)?.status !== false) {
                setShowReturnModal(false);
                await fetchOrder();
            } else {
                setActionError((res as any)?.message || `Failed to ${returnAction} return request`);
            }
        } catch (e) {
            console.error(e);
            setActionError(`Failed to complete ${returnAction} execution`);
        } finally {
            setActionLoading(false);
        }
    };

    const handleWarehouseReceive = async () => {
        if (!activeReturn?.id) return;
        try {
            setActionLoading(true);
            setActionError('');

            const res = await serverCallFuction('POST', `api/orders/returns/${activeReturn.id}/receive`, {
                received_at: new Date().toISOString()
            });

            if ((res as any)?.status !== false) {
                await fetchOrder();
            } else {
                setActionError((res as any)?.message || 'Failed to update warehouse inventory state');
            }
        } catch (e) {
            console.error(e);
            setActionError('Network processing error on inventory update');
        } finally {
            setActionLoading(false);
        }
    };


    const getStatusColor = (status) => {
        switch (status ? String(status).toLowerCase() : "") {
            case 'confirmed':
            case 'shipped':
            case 'delivered':
            case 'paid':
                return 'success';
            case 'accepted':
            case 'approved':
            case 'received':
                return 'success'; // बूटस्ट्रैप: bg-success-subtle / text-success
            case 'pending':
            case 'unpaid':
            case 'requested':
            case 'not_initiated':
                return 'secondary'; // बूटस्ट्रैप: bg-warning-subtle / text-warning
            case 'cancelled':
            case 'rejected':
                return 'danger';  // बूटस्ट्रैप: bg-danger-subtle / text-danger
            default:
                return 'secondary'; // बूटस्ट्रैप: bg-light / text-secondary
        }
    };

    const handleWalletRefund = async () => {
        if (!activeReturn?.id) return;
        if (order.payment_status !== 'paid') {
            setActionError('Refunds can only be processed for orders marked as Paid');
            return;
        }

        try {
            setActionLoading(true);
            setActionError('');

            const res = await serverCallFuction('POST', `api/orders/returns/${activeReturn.id}/refund`, {
                admin_remarks: 'Wallet calculation credit applied automatically'
            });

            if ((res as any)?.status !== false) {
                await fetchOrder();
            } else {
                setActionError((res as any)?.message || 'Wallet validation settlement rejection');
            }
        } catch (e) {
            console.error(e);
            setActionError('Failed to execute wallet allocation routing');
        } finally {
            setActionLoading(false);
        }
    };

    const current = order?.order_status as OrderStatus;
    const orderItemsList = order?.products || order?.items || [];

    if (loading) {
        return (
            <div className="container py-5 text-center text-muted">
                <Loader2 className="spinner-border spinner-border-sm me-2 text-primary animate-spin" role="status" />
                <span>Loading order details...</span>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="container py-5 text-center max-w-md mx-auto space-y-3">
                <h2 className="h5 fw-bold text-danger">{error || 'Order data reference not found'}</h2>
                <div className="d-flex gap-2 justify-content-center">
                    <button onClick={fetchOrder} className="btn btn-sm btn-outline-secondary">Try Again</button>
                    <button onClick={() => router.push('/orders')} className="btn btn-sm btn-light">Back to Orders</button>
                </div>
            </div>
        );
    }




    return (
        <section className="py-4 bg-light min-vh-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-9 space-y-4">

                        {/* Top Action Header Bar */}
                        <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                            <div className="d-flex align-items-center gap-3">
                                <button onClick={() => router.back()} className="btn btn-white btn-sm border bg-white shadow-sm p-2 text-secondary">
                                    <ArrowLeft size={16} />
                                </button>
                                <div>
                                    <h1 className="fw-bold h4 mb-0 text-dark">Order - #{order.order_id}</h1>
                                    <span className="text-muted small">Placed on {date_formate(order.created_at)}</span>
                                </div>
                            </div>
                            <div className="d-flex gap-2">
                                <span className={`badge text-xs uppercase bg-primary`}>P. Method: {order?.payment_method.toUpperCase()}</span>
                                <span className={`badge variant-solid px-2.5 py-1.5  bg-${getStatusColor(order?.order_status)}`}>
                                    {order?.order_status}
                                </span>
                                <span className={`badge variant-solid px-2.5 py-1 rounded-full text-xs bg-${getStatusColor(order?.payment_status)}`}>
                                    {order?.payment_status}
                                </span>
                            </div>
                        </div>

                        {/* Runtime Alert Tracking Logs */}
                        {actionError && (
                            <div className="alert alert-danger shadow-sm small rounded-3 p-3 mb-4" role="alert">
                                {actionError}
                            </div>
                        )}

                        {/* STAGE 1: Return Controls Trigger */}
                        {activeReturn && isReturnRequested && isSuperAdmin && (
                            <div className="card border-warning bg-warning-subtle shadow-sm mb-4">
                                <div className="card-body py-3 px-4 d-flex flex-col sm:flex-row gap-3 justify-content-between sm:items-center">
                                    <div>
                                        <div className="fw-bold text-warning-900 flex align-items-center gap-2 small text-uppercase tracking-wider">
                                            <CheckCircle2 size={16} /> Return Verification Requested
                                        </div>
                                        <p className="small text-muted mb-0 mt-1">Approve validation allocation or execute hard rejection logs.</p>
                                    </div>
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-sm btn-primary px-3 shadow" disabled={actionLoading} onClick={() => openReturnModal('approve')}>Approve</button>
                                        <button className="btn btn-sm btn-outline-secondary bg-transparent px-3" disabled={actionLoading} onClick={() => openReturnModal('reject')}>Reject</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STAGE 2: Warehouse Verification Layout */}
                        {activeReturn && isReturnApproved && isSuperAdmin && (
                            <div className="card border-info bg-info-subtle shadow-sm mb-4">
                                <div className="card-body py-3 px-4 d-flex flex-col sm:flex-row gap-3 justify-content-between sm:items-center">
                                    <div>
                                        <div className="fw-bold text-info-900 flex align-items-center gap-2 small text-uppercase tracking-wider">
                                            <PackageCheck size={16} /> Step 2: Awaiting Warehouse Stock Return
                                        </div>
                                        <p className="small text-muted mb-0 mt-1">Confirm parcel reception at the logs center to update system stock variables.</p>
                                    </div>
                                    <button className="btn btn-sm btn-info text-white px-3 shadow" disabled={actionLoading} onClick={handleWarehouseReceive}>Confirm Received</button>
                                </div>
                            </div>
                        )}

                        {/* STAGE 3: Wallet Return Settlement Credits */}
                        {activeReturn && isReturnReceived && isRefundPending && isSuperAdmin && (
                            <div className="card border-primary bg-primary-subtle shadow-sm mb-4">
                                <div className="card-body py-3 px-4 d-flex flex-col sm:flex-row gap-3 justify-content-between sm:items-center">
                                    <div>
                                        <div className="fw-bold text-primary-900 flex align-items-center gap-2 small text-uppercase tracking-wider">
                                            <Wallet size={16} /> Step 3: Pending Balance Settlement
                                        </div>
                                        <p className="small text-muted mb-0 mt-1">Inventory restored. Release balance allocation back to profile wallet ledger. (Amount: ₹{activeReturn.refund_amount})</p>
                                    </div>
                                    <button className="btn btn-sm btn-primary px-3 shadow" disabled={actionLoading || order.payment_status !== 'paid'} onClick={handleWalletRefund}>Release Refund</button>
                                </div>
                            </div>
                        )}

                        {/* Distributor Return Requests Boundaries */}
                        {(() => {
                            const updatedAt = order.updated_at ? new Date(order.updated_at) : null;
                            const now = new Date();
                            const isWithin30Days = updatedAt ? now.getTime() - updatedAt.getTime() <= 30 * 24 * 60 * 60 * 1000 : false;

                            if (!activeReturn && order.order_status === 'delivered' && !isSuperAdmin && isWithin30Days) {
                                return (
                                    <div className="card border-warning bg-warning-subtle shadow-sm mb-4">
                                        <div className="card-body py-3 px-4 d-flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                            <div>
                                                <div className="fw-bold text-warning-900 text-sm">Return Window Active</div>
                                                <p className="small text-muted mb-0 mt-0.5">You can submit a standard return request parameters for this delivered order configuration.</p>
                                            </div>
                                            <button className="btn btn-sm btn-primary px-3 shadow" disabled={actionLoading} onClick={() => setShowRequestReturnModal(true)}>Request Return</button>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })()}

                        {/* Historic Workflow Logs */}
                        {activeReturn && !isReturnRequested && !isReturnApproved && !(isReturnReceived && isRefundPending) && (
                            <div className="card border-0 shadow-sm p-3 mb-4 bg-white">
                                <div className="d-flex flex-col md:flex-row justify-content-between gap-3 text-sm">
                                    <div>
                                        <span className="fw-bold text-secondary d-block mb-1 small text-uppercase tracking-wider">Return Workflow Log:</span>
                                        <div className="d-flex gap-1.5 mt-1">
                                            <span className={`badge text-xs uppercase ${getStatusBadgeClass(activeReturn.return_status)}`}>Return: {activeReturn.return_status}</span>
                                            <span className={`badge text-xs uppercase ${getStatusBadgeClass(activeReturn.refund_status)}`}>Refund: {activeReturn.refund_status}</span>

                                        </div>
                                    </div>
                                    {activeReturn.admin_remarks && (
                                        <div className="md:text-end">
                                            <span className="fw-medium text-muted small block">Admin Audit Remark:</span>
                                            <span className="fst-italic text-dark font-medium">"{activeReturn.admin_remarks}"</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeReturn && isReturnRequested && !isSuperAdmin && (
                            <div className="alert alert-warning mb-4 small shadow-none">
                                Return verification request parameters are currently pending processing by a Super Administrator.
                            </div>
                        )}

                        {/* Main Cards Information Structure Grid */}
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-header bg-white py-3 border-0"><h5 className="mb-0 fw-bold text-dark">Customer Information</h5></div>
                            <div className="card-body pt-1">
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <label className="small text-muted text-uppercase fw-bold block tracking-wider" style={{ fontSize: '10px' }}>Name</label>
                                        <p className="fw-bold text-dark mb-0 mt-0.5">{order.user_name || 'N/A'}</p>
                                    </div>
                                    <div className="col-sm-6">
                                        <label className="small text-muted text-uppercase fw-bold block tracking-wider" style={{ fontSize: '10px' }}>Phone</label>
                                        <p className="fw-bold text-dark mb-0 mt-0.5">{order.user_phone || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-header bg-white py-3 border-0"><h5 className="mb-0 fw-bold text-dark">Order Summary</h5></div>
                            <div className="card-body pt-1 small space-y-2.5 text-secondary">
                                <div className="d-flex justify-content-between"><span>Subtotal:</span><span className="fw-medium text-dark">₹{formattedAmountCommas(order.sub_total || 0)}</span></div>
                                <div className="d-flex justify-content-between"><span>Tax:</span><span className="fw-medium text-dark">₹{formattedAmount(order.tax_amount || 0)}</span></div>
                                <div className="d-flex justify-content-between pb-2 border-bottom last-border-0"><span>Shipping Charges:</span><span className="fw-medium text-dark">₹{formattedAmount(order.shipping_charges || 0)}</span></div>
                                <div className="d-flex justify-content-between text-base font-bold pt-2 text-purple-600 h5 mb-0"><span>Total:</span><span>₹{formattedAmountCommas(order.total_amount || 0)}</span></div>
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-header bg-white py-3 border-0"><h5 className="mb-0 fw-bold text-dark">Shipping Address</h5></div>
                            <div className="card-body pt-1 text-sm space-y-3">
                                <div><span className="small text-muted text-uppercase fw-bold block tracking-wider" style={{ fontSize: '10px' }}>Address Line</span><p className="text-dark fw-medium mb-0 mt-0.5">{order.shipping_address?.address_line1} {order.shipping_address?.address_line2 ? `, ${order.shipping_address?.address_line2}` : ""}</p></div>
                                <div><span className="small text-muted text-uppercase fw-bold block tracking-wider" style={{ fontSize: '10px' }}>Location Parameters</span><p className="text-dark fw-medium mb-0 mt-0.5">{order.shipping_address?.city}, {order.shipping_address?.state} - <strong className="text-purple-600">{order.shipping_address?.pincode}</strong></p></div>
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-header bg-white py-3 border-0"><h5 className="mb-0 fw-bold text-dark">Actions Panel</h5></div>
                            <div className="card-body pt-1">
                                {isSuperAdmin ? (
                                    <div className="space-y-3 pb-3">
                                        <div className="d-flex align-items-center justify-content-between small text-muted font-bold text-uppercase tracking-wider"><span>Core Engine Transitions:</span><span className={`badge ${getStatusBadgeClass(current)}`}>{current}</span></div>
                                        <div className="row g-1.5">
                                            {(['accepted', 'packed', 'dispatched', 'delivered', 'cancelled'] as const).map((status) => (
                                                <div key={status} className="col-4 col-sm-2.4">
                                                    <button type="button" disabled={!canSetStatus(current, status) || updatingStatus} onClick={() => setSelectedStatus(status)} className={`btn btn-xs w-100 py-2 font-bold text-uppercase tracking-wide border ${selectedStatus === status ? 'btn-primary text-white border-transparent' : 'btn-outline-light text-secondary border-gray-200'}`} style={{ fontSize: '10px' }}>
                                                        {status}
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        {current !== 'delivered' && current !== 'cancelled' && (
                                            <div className="input-group mt-3 shadow-none">
                                                <input type="text" className="form-control text-sm" placeholder="Add status tracking remarks..." value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                                                <button className="btn btn-primary px-3 text-sm font-semibold d-flex align-items-center" disabled={updatingStatus} onClick={submitStatusUpdate}><Save size={14} className="me-1.5" /> Save</button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-muted small fst-italic mb-3">Management layout workflow parameters are restricted to Super Administrators.</p>
                                )}

                                <button className="btn btn-primary w-100 py-2 fw-bold text-uppercase shadow-sm d-flex align-items-center justify-content-center" disabled={isGeneratingInvoice} onClick={async () => {
                                    if (!isSuperAdmin && order.order_status !== 'delivered') {
                                        return alert("The invoice will be generated once the order is delivered.");
                                    }
                                    try {
                                        setIsGeneratingInvoice(true);
                                        const res = await serverCallFuction('POST', 'api/invoice/generate', { orderId: order.order_id });
                                        if ((res as any).success && (res as any).url) {
                                            if (invoiceLinkRef.current) {
                                                invoiceLinkRef.current.href = (res as any).url;
                                                invoiceLinkRef.current.click();
                                            }
                                        } else { alert((res as any).message || 'Generation failed.'); }
                                    } catch (e) { alert('Connection issue runtime error.'); }
                                    finally { setIsGeneratingInvoice(false); }
                                }}>
                                    <Printer size={15} className="me-2" /> {isGeneratingInvoice ? 'Building Document...' : 'Print / Download Invoice'}
                                </button>
                                <a ref={invoiceLinkRef} target="_blank" rel="noopener noreferrer" className="d-none" />
                            </div>
                        </div>

                        {/* Order Items Checklist Table Container */}
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-header bg-white py-3 border-0"><h5 className="mb-0 fw-bold text-dark">Order Items ({orderItemsList.length})</h5></div>
                            <div className="table-responsive">
                                {orderItemsList.length > 0 ? (
                                    <table className="table align-middle mb-0 text-sm">
                                        <thead className="table-light text-secondary border-bottom" style={{ fontSize: '11px' }}>
                                            <tr>
                                                <th className="px-4 py-2.5 font-bold uppercase tracking-wider">Product Profile</th>
                                                <th className="px-4 py-2.5 font-bold uppercase tracking-wider text-center">Qty</th>
                                                <th className="px-4 py-2.5 font-bold uppercase tracking-wider text-end">Unit Price</th>
                                                <th className="px-4 py-2.5 font-bold uppercase tracking-wider text-end">Line Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderItemsList.map((product: any, idx: number) => (
                                                <tr key={idx}>
                                                    <td className="px-4 py-3">
                                                        <div className="d-flex gap-3 align-items-center">
                                                            <Image src={product.product_image?.startsWith('http') ? product.product_image : '/assets/product/sanitory_pad.png'} alt={product.product_name} width={36} height={38} className="rounded object-fit-cover border" />
                                                            <div>
                                                                <span className="fw-bold text-dark d-block text-truncate small" style={{ maxWidth: '240px' }}>{product.product_name}</span>
                                                                {product.variant_details?.attributes && (
                                                                    <div className="d-flex gap-1 mt-1">
                                                                        {product.variant_details.attributes.map((attr: any, i: number) => (
                                                                            <span key={i} className="badge bg-light text-secondary border px-1.5 py-0.5 rounded text-[9px] font-bold fw-semibold uppercase tracking-wider">
                                                                                {attr.attribute_val || attr.value}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-center fw-bold text-muted small">{product.qty}</td>
                                                    <td className="px-4 py-3 text-end font-medium text-xs text-secondary">₹{formattedAmount(product.unit_price)}</td>
                                                    <td className="px-4 py-3 text-end font-bold text-purple-600 text-xs">₹{formattedAmount(product.unit_price * product.qty)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-muted text-center py-4 mb-0 small">No items tracking mapping found inside data array records.</p>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Native Bootstrap Trigger Modals Layers Container */}
            {showRequestReturnModal && (
                <>
                    <div className="modal-backdrop fade show" style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: 'blur(2px)' }}></div>
                    <div className="modal show d-block fade" tabIndex={-1}>
                        <div className="modal-dialog modal-dialog-centered px-3 max-w-md mx-auto">
                            <div className="modal-content border-0 rounded-4 shadow-lg p-3">
                                <div className="modal-header border-0 pb-1 d-flex justify-content-between align-items-center">
                                    <h5 className="modal-title fw-bold text-dark h6 mb-0">Request Return</h5>
                                    <button type="button" className="btn-close shadow-none p-1 border-0" onClick={() => setShowRequestReturnModal(false)}><X size={16} /></button>
                                </div>
                                <div className="modal-body space-y-4">
                                    <p className="text-muted small mb-3">Enter the reason for requesting this return allocation parameters validation.</p>
                                    <div className="d-flex align-items-center justify-content-between p-2.5 bg-yellow-50 border border-yellow-200 text-yellow-900 rounded-3 text-xs font-medium">
                                        <span>Fill form and email logs to admin@feelsafeco.in.</span>
                                        <button className="badge bg-success border-0 px-2 py-1 cursor-pointer text-white d-flex align-items-center rounded" onClick={() => window.open(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/uploads/docs/RETURN-FORM.pdf`, '_blank')}><Download size={11} /></button>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs text-secondary fw-semibold text-uppercase tracking-wider block">Return Reason *</label>
                                        <textarea className="form-control text-sm" placeholder="E.g., Wrong item received / Product damaged" value={returnReason} rows={3} onChange={(e) => setReturnReason(e.target.value)} />
                                    </div>
                                    <div className="d-flex gap-2 pt-2 border-top border-light mt-3">
                                        <button className="btn btn-primary btn-sm flex-grow-1 font-semibold" disabled={actionLoading} onClick={async () => {
                                            if (!returnReason.trim()) return alert("Reason is required");
                                            try { setActionLoading(true); const res = await serverCallFuction('POST', `api/orders/return/${order.id}/request`, { reason: returnReason.trim() }); if ((res as any)?.status !== false) { setShowRequestReturnModal(false); setReturnReason(''); await fetchOrder(); } } catch (e) { } finally { setActionLoading(false); }
                                        }}>Submit Request</button>
                                        <button className="btn btn-light btn-sm flex-grow-1 text-secondary" onClick={() => setShowRequestReturnModal(false)}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {showReturnModal && (
                <>
                    <div className="modal-backdrop fade show" style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: 'blur(2px)' }}></div>
                    <div className="modal show d-block fade" tabIndex={-1}>
                        <div className="modal-dialog modal-dialog-centered px-3 max-w-md mx-auto">
                            <div className="modal-content border-0 rounded-4 shadow-lg p-3">
                                <div className="modal-header border-0 pb-1 d-flex justify-content-between align-items-center">
                                    <h5 className="modal-title fw-bold text-dark h6 mb-0">{returnAction === 'approve' ? 'Approve Return Request' : 'Reject Return Request'}</h5>
                                    <button type="button" className="btn-close shadow-none p-1 border-0" onClick={closeReturnModal}><X size={16} /></button>
                                </div>
                                <div className="modal-body space-y-3 pt-2">
                                    <div className="space-y-1"><label className="text-xs text-secondary fw-semibold text-uppercase block tracking-wide">Admin Remarks *</label><input type="text" className="form-control text-sm" placeholder="Verification comments..." value={adminRemarks} onChange={(e) => setAdminRemarks(e.target.value)} /></div>
                                    {returnAction === 'approve' && (
                                        <div className="space-y-1 mt-2.5"><label className="text-xs text-secondary fw-semibold text-uppercase block tracking-wide">Refund Target Value (Optional)</label><input type="text" className="form-control text-sm" placeholder={`Order total: ₹${order?.total_amount}`} value={refundAmount} onChange={(e) => setRefundAmount(e.target.value)} /></div>
                                    )}
                                    <div className="d-flex gap-2 pt-3 border-top border-light mt-3">
                                        <button className="btn btn-primary btn-sm flex-grow-1 font-semibold" disabled={actionLoading} onClick={submitReturnAction}>Confirm</button>
                                        <button className="btn btn-light btn-sm flex-grow-1 text-secondary" onClick={closeReturnModal}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default OrderDetail;