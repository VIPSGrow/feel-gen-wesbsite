"use client";

import React, { useEffect, useState } from 'react';


import { useCart } from '@/lib/contexts/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { IndianRupee, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';

const CartCompo = () => {
    const { cart, loading, fetchCart, updateQuantity, removeItem } = useCart();
    const [localLoading, setLocalLoading] = useState(false);

    useEffect(() => {
        fetchCart();
    }, []);

    const handleQuantityChange = async (itemId: string, newQty: number) => {
        if (newQty < 1) return;
        setLocalLoading(true);
        const res = await updateQuantity(itemId, newQty);
        if (!res.status) {
            alert((res as { message?: string } | undefined)?.message || "Failed to update quantity. Please try again.");
        }
        setLocalLoading(false);
    };

    const handleRemove = async (itemId: string) => {
        if (confirm('Remove this item from cart?')) {
            setLocalLoading(true);
            await removeItem(itemId);
            setLocalLoading(false);
        }
    };


    // 1. Get an array of all distributor_ids (numbers or null)
    const distributorIds = cart?.items.map(item => item.distributor_id);

    // 2. Check if every ID is the same as the first one
    const isConsistentFormat = distributorIds?.every(id => id === distributorIds[0]);

    // 3. Optional: Determine the error message
    const formatError = !isConsistentFormat
        ? "Mixed shipments detected. Please ensure all items are from the same distributor or all from Admin."
        : null;



    if (loading || localLoading) {
        return (
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3">Loading your cart...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body text-center py-5">
                                <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" className="text-muted mb-4 mx-auto">
                                    <use xlinkHref="#cart"></use>
                                </svg>
                                <h2 className="fw-bold mb-3">Your cart is empty</h2>
                                <p className="text-muted mb-4">Looks like you haven&apos;t added anything to your cart yet.</p>
                                <Link href="/" className="btn btn-primary btn-lg">
                                    <ArrowLeft className="me-2" size={20} />
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const subtotal = cart.subtotal;

    return (
        <div className="container-fluid py-5 my-5">
            <div className="row justify-content-center g-4">
                <div className="col-lg-8">
                    <div className="d-flex align-items-center mb-4">
                        <h1 className="fw-bold mb-0">Your Cart</h1>
                        <span className="badge bg-primary ms-3">{cart.total_items} items</span>
                    </div>

                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-header bg-white border-0 py-3">
                            <h5 className="mb-0 fw-bold">Shopping Cart</h5>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.items.map((item) => {
                                        const subtotalItem = Number(item.price) * item.quantity;
                                        const imgSrc = item.f_image?.startsWith('http') || item.f_image?.startsWith('/')
                                            ? item.f_image
                                            : `/assets/product/${item.f_image}`;
                                        return (
                                            <tr key={item.id}>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <Image
                                                            src={imgSrc}
                                                            alt={item.product_name}
                                                            width={80}
                                                            height={80}
                                                            className="rounded me-3"
                                                            onError={(e) => {
                                                                e.currentTarget.src = '/assets/product/sanitory_pad.png';
                                                            }}
                                                        />
                                                        <div>
                                                            <Link href={`/products/${item.slug}`} className="text-decoration-none">
                                                                <h6 className="mb-1">{item.product_name}</h6>
                                                            </Link>
                                                            {item.variant_details && item.variant_details.attributes.map((attr, idx) => (
                                                                <small
                                                                    key={idx}
                                                                    className="badge bg-primary text-white d-block"
                                                                >
                                                                    {attr.attribute_name}: {attr.attribute_val}
                                                                </small>

                                                            ))}
                                                            {/* <small className="text-muted">ID: {item.id.slice(-8)}</small> */}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="fw-bold">
                                                        <IndianRupee size={18} />
                                                        {Number(item.price).toFixed(2)}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <button
                                                            className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                                                            style={{ width: '32px', height: '32px' }}
                                                            onClick={() => {
                                                                if (item.quantity === 1) {
                                                                    handleRemove(item.id);
                                                                } else {
                                                                    handleQuantityChange(item.id, item.quantity - 1);
                                                                }
                                                                // handleQuantityChange(item.id, item.quantity - 1)
                                                            }}
                                                            disabled={localLoading}
                                                        >
                                                            {
                                                                item.quantity === 1 ? (
                                                                    <Trash2 size={16} color="red" />
                                                                ) : (
                                                                    <Minus size={16} />
                                                                )
                                                            }
                                                            {/* <Minus size={16} /> */}
                                                        </button>
                                                        <span className="mx-3 fw-bold fs-6 px-3 py-1 bg-light rounded">{item.quantity}</span>
                                                        <button
                                                            className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                                                            style={{ width: '32px', height: '32px' }}
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                            disabled={localLoading}
                                                        >
                                                            <Plus size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="fw-bold">
                                                        <IndianRupee size={18} />
                                                        {subtotalItem.toFixed(2)}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() => handleRemove(item.id)}
                                                        disabled={localLoading}
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm sticky-top" style={{ top: '20px' }}>
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-3">Order Summary</h5>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Subtotal:</span>
                                <span>
                                    <IndianRupee className='currency_icon' />
                                    {subtotal}
                                </span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-3">
                                <span>Tax:</span>
                                <span>
                                    <IndianRupee className='currency_icon' />
                                    {cart?.total_tax}
                                </span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-4">
                                <span className="fw-bold fs-4">Total:</span>
                                <span className="fw-bold fs-4">
                                    <IndianRupee />
                                    {cart.total}
                                </span>
                            </div>

                            {!isConsistentFormat && (
                                <div className="alert alert-warning py-2 mb-3" style={{ fontSize: '13px' }}>
                                    <strong>Format Mismatch:</strong> {formatError}
                                </div>
                            )}
                            {isConsistentFormat ? (
                                <Link href="/checkout" className="btn btn-primary w-100 mb-3 btn-lg">
                                    Proceed to Checkout
                                </Link>
                            ) : (
                                <button className="btn btn-secondary w-100 mb-3 btn-lg" disabled title={formatError}>
                                    Invalid Cart Format
                                </button>
                            )}
                            <Link href="/" className="btn btn-outline-secondary w-100">
                                <ArrowLeft className="me-2" size={18} />
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartCompo;

