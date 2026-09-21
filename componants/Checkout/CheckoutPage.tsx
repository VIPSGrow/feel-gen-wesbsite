"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/lib/contexts/CartContext";
import serverCallFuction, { formattedAmountCommas } from "@/lib/constantFunction";
import { IndianRupee, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Address } from "@/lib/types/Address";
import type { VariantDetails } from "@/lib/types/Cart";
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "@/lib/addressApi";
import Script from "next/script";
import { useAuth } from "@/lib/contexts/AuthContext";

interface CheckoutItem {
  product_id: number;
  variation_id: string | null;
  quantity: number;
  price: number;
  product_name?: string;
  variant_sku?: string;
  variant_details: VariantDetails | null;
  tax_data?: { percentage: string } | null;
  f_image?: string;
}

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { cart, fetchCart, refreshCart } = useCart();
  const { user, isAuthenticated, setting, getSettingByKey } = useAuth() as any;

  const dId = user?.distributor_info?.id || "";

  const productId = searchParams.get("productId");
  const variantIdParam = searchParams.get("variantId");
  const qtyParam = searchParams.get("qty") || "1";
  const slug = searchParams.get("slug") || "";

  const variantId = variantIdParam ? parseInt(variantIdParam) : null;
  const qty = parseInt(qtyParam) || 1;

  // Build return path so auth redirects can bring the user back to checkout
  const checkoutReturnPath = `/checkout${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

  const [singleItem, setSingleItem] = useState<CheckoutItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartError, setCartError] = useState("");

  const [formData] = useState({
    address_line1: "",
    address_line2: "",
    fullAddress: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });
  const [couponCode, setCouponCode] = useState("");
  const [couponApplying, setCouponApplying] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [couponDiscountAmount, setCouponDiscountAmount] = useState(0);
  const [couponAppliedCode, setCouponAppliedCode] = useState<string>("");

  const [paymentMethod, setPaymentMethod] = useState<string>("razorpay");
  const [orderLoading, setOrderLoading] = useState(false);
  const [error, setError] = useState("");

  // Address logic
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  // Mobile layout state toggles
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);

  // State/City validation loaders & array states
  const [statesLoading, setStatesLoading] = useState(false);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [states, setStates] = useState<Array<{ id: number | string; name: string }>>([]);
  const [cities, setCities] = useState<Array<{ id: number | string; name: string }>>([]);
  const [, setSelectedStateId] = useState<number | string | null>(null);
  const [pincodeError, setPincodeError] = useState("");

  const [addressFormData, setAddressFormData] = useState({
    full_name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    landmark: "",
    is_default: false,
  });
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressesLoading, setAddressesLoading] = useState(true);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const isCartMode = !!(cart && cart.items.length > 0);
  const displayItems = isCartMode
    ? cart!.items
    : singleItem
      ? [singleItem]
      : [];

  const subTotal = isCartMode
    ? Number(cart!.subtotal)
    : singleItem
      ? singleItem.price * singleItem.quantity
      : 0;
  const totalAmount = isCartMode
    ? Number(cart!.total)
    : singleItem
      ? singleItem.price * singleItem.quantity
      : 0;

  const tax_amount = isCartMode
    ? Number(cart!.total_tax)
    : singleItem
      ? singleItem.tax_data
        ? (singleItem.price * parseFloat(singleItem.tax_data.percentage)) / 100
        : 0
      : 0;

  const [shippingChargeFromSetting, setShippingChargeFromSetting] = useState<number>(0);

  useEffect(() => {
    const loadShipping = async () => {
      try {
        if (typeof getSettingByKey === "function") {
          const res = await getSettingByKey("shipping_charge");
          const charge = parseFloat(res?.charge);
          setShippingChargeFromSetting(Number.isFinite(charge) ? charge : 0);
        }
      } catch (e) {
        console.error("Failed to load shipping_charge setting:", e);
        setShippingChargeFromSetting(0);
      }
    };

    loadShipping();
  }, [setting, getSettingByKey]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        await fetchCart();
      } catch (err) {
        console.error("Cart load error:", err);
        setCartError("Cart unavailable - proceeding with empty cart");
      } finally {
        setLoading(false);
      }
    };
    loadCart();
    fetchStates();
  }, []);

  useEffect(() => {
    if (!isCartMode && productId && slug) {
      const fetchItem = async () => {
        try {
          const res = await serverCallFuction(
            "GET",
            `api/products/product-detail/${slug}${dId ? `?distributor_id=${dId}` : ""}`
          );
          const data = res as any;
          if (data?.success && data.data) {
            const apiProduct = data.data;
            let unitPrice =
              (apiProduct.product as any)?.discounted_price ||
              (apiProduct.product as any)?.base_price ||
              0;
            if (variantId) {
              const v = apiProduct.variants?.find(
                (vv: any) => vv.id === variantId
              );
              if (v) unitPrice = v.price;
            }
            setSingleItem({
              product_id: parseInt(productId),
              variation_id: variantId ? variantId.toString() : null,
              quantity: qty,
              price: unitPrice,
              product_name:
                (apiProduct.product as any)?.name || `Product #${productId}`,
              variant_sku: variantId ? "Variant" : "Standard",
              variant_details: null,
            });
          }
        } catch (err) {
          setError("Could not load product details");
        }
      };
      fetchItem();
    }
  }, [isCartMode, productId, variantId, qty, slug, dId]);

  // Fetch addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setAddressesLoading(true);
        const res = await getAddresses();
        if (res.status && res.data) {
          setAddresses(res.data);
          const defaultAddr = res.data.find((addr) => addr.is_default);
          if (defaultAddr) {
            setSelectedAddressId(defaultAddr.id);
          }
        }
      } catch (err) {
        console.error("Failed to fetch addresses:", err);
      } finally {
        setAddressesLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  const fetchStates = async () => {
    try {
      setStatesLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/static/states`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      if (json?.status && Array.isArray(json?.data)) {
        setStates(json.data);
      } else if (Array.isArray(json)) {
        setStates(json);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setStatesLoading(false);
    }
  };

  const fetchCities = async (stateId: number | string) => {
    try {
      setCitiesLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/static/cities/${stateId}`;
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await res.json();
      if (json?.status && Array.isArray(json?.data)) {
        setCities(json.data);
      } else if (Array.isArray(json)) {
        setCities(json);
      } else {
        setCities([]);
      }
    } catch (e) {
      setCities([]);
    } finally {
      setCitiesLoading(false);
    }
  };

  const selectedAddress =
    addresses.find((addr) => addr.id === selectedAddressId) || null;

  const openAddModal = () => {
    setAddressFormData({
      full_name: "",
      phone: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      country: "India",
      pincode: "",
      landmark: "",
      is_default: false,
    });
    setEditingAddress(null);
    setCities([]);
    setSelectedStateId(null);
    setPincodeError("");
    setError("");
    setShowAddModal(true);
    setShowEditModal(false);
  };

  const openEditModal = async (addr: Address) => {
    setAddressFormData({
      full_name: addr.full_name,
      phone: addr.phone,
      address_line1: addr.address_line1,
      address_line2: addr.address_line2 || "",
      city: addr.city,
      state: addr.state,
      country: "India",
      pincode: addr.pincode,
      landmark: addr.landmark || "",
      is_default: addr.is_default || false,
    });
    setEditingAddress(addr);
    setPincodeError("");
    setError("");
    setShowEditModal(true);
    setShowAddModal(false);

    const matchedState = states.find((s) => String(s.name) === String(addr.state));
    if (matchedState) {
      setSelectedStateId(matchedState.id);
      await fetchCities(matchedState.id);
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setEditingAddress(null);
    setSelectedStateId(null);
    setCities([]);
    setPincodeError("");
    setError("");
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const pincode = addressFormData.pincode?.trim() || "";
    if (!/^\d{6}$/.test(pincode)) {
      setPincodeError("Pincode must be exactly 6 digits.");
      return;
    }
    setPincodeError("");

    const phone = (addressFormData.phone || "").trim();
    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    if (!addressFormData.state || !addressFormData.city) {
      setError("Please select state and city.");
      return;
    }

    setAddressLoading(true);
    try {
      let res: any;
      const payload = { ...addressFormData };

      if (editingAddress) {
        res = await updateAddress(editingAddress.id, payload as any);
      } else {
        res = await addAddress(payload as any);
      }

      if (res && res.status) {
        const freshRes = await getAddresses();
        if (freshRes.status && freshRes.data) {
          setAddresses(freshRes.data);
          if (!selectedAddressId && freshRes.data.length > 0) {
            setSelectedAddressId(freshRes.data[0].id);
          }
        }
        closeModal();
      } else {
        setError(res?.message || "Address save failed");
      }
    } catch (err: any) {
      setError(err?.message || "Address save failed");
    } finally {
      setAddressLoading(false);
    }
  };

  const handleDeleteAddress = async (id: number) => {
    if (!confirm("Delete this address?")) return;
    setAddressLoading(true);
    try {
      const res = await deleteAddress(id);
      if (res.status) {
        const freshRes = await getAddresses();
        if (freshRes.status && freshRes.data) {
          setAddresses(freshRes.data);
          if (selectedAddressId === id) {
            setSelectedAddressId(null);
          }
        }
      } else {
        setError("Delete failed");
      }
    } catch (err) {
      setError("Delete failed");
    } finally {
      setAddressLoading(false);
    }
  };

  const handleSetDefault = async (id: number) => {
    setAddressLoading(true);
    try {
      const res = await setDefaultAddress(id);
      if (res.status) {
        const freshRes = await getAddresses();
        if (freshRes.status && freshRes.data) {
          setAddresses(freshRes.data);
          setSelectedAddressId(id);
        }
      } else {
        setError("Set default failed");
      }
    } catch (err) {
      setError("Set default failed");
    } finally {
      setAddressLoading(false);
    }
  };

  const isConsistentFormat = isCartMode
    ? cart!.items.every(item => item.distributor_id === cart!.items[0].distributor_id)
    : true;

  const formatError = !isConsistentFormat
    ? "Mixed Fulfillment Error: Your cart contains items from different sources. Please ensure all items are from the same distributor or all from Main Store in your cart."
    : null;

  useEffect(() => {
    if (dId === "") {
      setPaymentMethod("razorpay");
    } else {
      if (cart && cart.items && cart.items.length > 0) {
        if (cart.items[0].distributor_id === null) {
          setPaymentMethod("razorpay");
        } else {
          setPaymentMethod("cod");
        }
      } else {
        setPaymentMethod("razorpay");
      }
    }
  }, [cart, dId]);

  const handlePlaceOrder = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setOrderLoading(true);
    setError("");

    const useAddress = selectedAddress;
    if (
      !useAddress &&
      (!formData.fullAddress ||
        !formData.city ||
        !formData.pincode ||
        !formData.phone)
    ) {
      setError("Please select an address or fill manual shipping address.");
      setOrderLoading(false);
      return;
    }

    if (displayItems.length === 0) {
      setError("No items to checkout.");
      setOrderLoading(false);
      return;
    }

    const orderItems = displayItems.map((item: any) => ({
      product_id: item.product_id,
      variation_id: item.variation_id || null,
      quantity: Number(item.quantity || item.qty || 1),
      price: Number(item.price || item.unit_price || 0),
      product_name: item.product_name || "Product",
      variant_sku: item.variant_sku || (item.variation_id ? "Variant" : "Standard"),
      ...(item.variant_details && {
        variant_details:
          typeof item.variant_details === "string"
            ? item.variant_details
            : JSON.stringify(item.variant_details),
      }),
    }));

    const shippingData = useAddress
      ? {
        address_line1: useAddress.address_line1,
        address_line2: useAddress.address_line2,
        city: useAddress.city,
        state: useAddress.state,
        pincode: useAddress.pincode,
        phone: useAddress.phone,
        full_name: useAddress.full_name,
      }
      : {
        address_line1: formData.address_line1 || formData.fullAddress,
        address_line2: formData.address_line2,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        phone: formData.phone,
      };

    const orderPayload = {
      items: orderItems,
      shipping_address: shippingData,
      coupon_code: couponAppliedCode || undefined,
      payment_method: paymentMethod,
      order_for: dId === "" ? "admin" : `distributor_${dId}`,
      distributor_id: dId
    };

    try {
      const res = (await serverCallFuction(
        "POST",
        "api/orders",
        orderPayload,
      )) as any;

      if (res.success) {
        if (paymentMethod === "razorpay") {
          await handlepayment(res);
        } else {
          await refreshCart();
          const orderId = res.data?.order_id || res.order_id;
          router.push(`/orders/success/${orderId}`);
        }
      } else {
        setError(res?.message || "Order failed");
      }
    } catch (err: any) {
      setError(err.message || "Order placement failed");
    } finally {
      setOrderLoading(false);
    }
  };

  const computedShipping = subTotal <= 260 ? shippingChargeFromSetting : 0;

  const finalTotal = useMemo(() => {
    const base = totalAmount + computedShipping;
    const discounted = base - couponDiscountAmount;
    return discounted > 0 ? discounted : 0;
  }, [totalAmount, computedShipping, couponDiscountAmount]);

  const handlepayment = async (orderRes: any) => {
    const orderId = orderRes.data?.order_id || orderRes.order_id;

    if (finalTotal <= 0) {
      router.push(`/orders/success/${orderId}`);
      return;
    }

    if (!(window as any).Razorpay || !razorpayLoaded) {
      alert("Razorpay loading... Please wait");
      return;
    }

    try {
      const order = await createRazorpayOrder(finalTotal, {
        receipt: `receipt_${orderId}_${Date.now()}`,
        order_id: orderId
      });
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_Sfdk41BOifNjN9",
        amount: order.amount,
        currency: order.currency,
        name: "Feel Safe Shop",
        description: `Order Total ₹${totalAmount.toLocaleString()}`,
        order_id: order.id,
        prefill: {
          name: selectedAddress?.full_name || "",
          email: user?.email || "",
          contact: selectedAddress?.phone || formData.phone,
        },
        theme: { color: "#3399cc" },
        handler: async (response: any) => {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            router.push(`/orders/success/${orderId}`);
          } catch (err) {
            alert(`Payment failed: ${(err as Error).message}`);
            router.push("/");
          }
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
    }
  };

  const createRazorpayOrder = async (amt: number, cartItems: { receipt: string; order_id: string }) => {
    try {
      if (!selectedAddress && !formData.pincode) {
        alert("Please select or enter Shipping Address");
        return;
      }
      const res = await serverCallFuction("POST", "api/payment/create-order", {
        amount: Math.round(amt),
        currency: "INR",
        receipt: cartItems.receipt,
        order_id: cartItems.order_id
      }) as any;

      if (!res.status) throw new Error(res.message || "Order creation failed");
      return res.order;
    } catch (error) {
      throw new Error("Failed to create order");
    }
  };

  const verifyPayment = async (paymentData: any) => {
    try {
      const res = await serverCallFuction(
        "POST",
        "api/payment/verify",
        paymentData,
      ) as any;
      if (!res.success)
        throw new Error(res.message || "Payment verification failed");
      return res.data;
    } catch (error) {
      throw new Error("Payment verification failed");
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onReady={() => setRazorpayLoaded(true)}
      />
      {!isAuthenticated ? (
        <section className="py-4 py-lg-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-4 p-lg-5">
                    <div className="text-center mb-4">
                      <h2 className="fw-bold h3">Sign in to Continue</h2>
                      <p className="text-muted">Please register or sign in to complete your purchase</p>
                    </div>

                    <div className="d-grid gap-3">
                      <Link
                        href={`/register?return=${encodeURIComponent(checkoutReturnPath)}`}
                        className="btn btn-primary w-100 py-2 fw-bold"
                      >
                        Register
                      </Link>
                      <Link
                        href={`/login?return=${encodeURIComponent(checkoutReturnPath)}`}
                        className="btn btn-outline-secondary w-100 py-2 fw-bold"
                      >
                        Login
                      </Link>
                    </div>

                    <div className="text-center mt-4 text-muted small">
                      <p>Your cart ({displayItems.length} items) will be saved and restored after sign in.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          <div className="d-block d-lg-none bg-light border-bottom sticky-top shadow-sm" style={{ top: "0", zIndex: 1020 }}>
            <div
              className="container-fluid py-3 d-flex justify-content-between align-items-center cursor-pointer"
              onClick={() => setIsMobileSummaryOpen(!isMobileSummaryOpen)}
            >
              <div className="d-flex align-items-center gap-2">
                <ShoppingBag size={18} className="text-primary" />
                <span className="fw-medium small text-dark">
                  {isMobileSummaryOpen ? "Hide Order Summary" : "Show Order Summary"}
                </span>
              </div>
              <div className="text-end">
                <span className="fw-bold text-primary h6 mb-0">
                  <IndianRupee size={14} className="inline-block" />
                  {formattedAmountCommas(totalAmount + computedShipping)}
                </span>
              </div>
            </div>
          </div>

          <section className="py-4 py-lg-5">
            <div className="container-fluid">
              <div className="row justify-content-center">
                <div className="col-lg-12">
                  <div className="d-flex align-items-center mb-4">
                    <h1 className="fw-bold h2 mb-0">Checkout</h1>
                    {isCartMode && (
                      <span className="badge bg-primary ms-3 d-none d-lg-inline-block">
                        {displayItems.length} items
                      </span>
                    )}
                    {cartError && (
                      <span className="badge bg-warning ms-3">{cartError}</span>
                    )}
                  </div>

                  <div className="row g-4">
                    {/* Left Main Column: Address configuration & Item Checklist */}
                    <div className="col-lg-8">
                      {/* Desktop Review Card View Summary Panel */}
                      <div className="card border-0 shadow-sm mb-4 d-none d-lg-block">
                        <div className="card-header bg-white border-0 py-3">
                          <h5 className="mb-0 fw-bold">Review Items</h5>
                        </div>
                        <div className="table-responsive">
                          <table className="table mb-0">
                            <thead className="table-light">
                              <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Subtotal</th>
                              </tr>
                            </thead>
                            <tbody>
                              {displayItems.map((item: any, idx) => {
                                const price = parseFloat(item.price || 0);
                                const u_price = parseFloat(item.unit_price || 0);
                                const unit_price = price < u_price ? price : u_price;
                                const total_price = parseFloat(item.taxable_price || 0);
                                let taxable_amount = 0;

                                if (item.tax_data != null) {
                                  taxable_amount = (unit_price * parseFloat(item.tax_data.percentage)) / 100;
                                }

                                return (
                                  <tr key={idx}>
                                    <td>
                                      <div className="d-flex align-items-center">
                                        <Image
                                          src={item.f_image || "/assets/product/sanitory_pad.png"}
                                          alt={item.product_name || "Product"}
                                          width={60}
                                          height={60}
                                          className="rounded me-3"
                                        />
                                        <div>
                                          <div className="fw-bold">{item.product_name}</div>
                                          {item.variant_details?.attributes?.length ? (
                                            item.variant_details.attributes.map((attr: any, i: number) => (
                                              <small key={i} className="badge bg-primary text-white d-block mt-1">
                                                {attr.attribute_name}: {attr.attribute_val}
                                              </small>
                                            ))
                                          ) : null}
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        <li>Price : <IndianRupee size={15} />{unit_price}</li>
                                        <li>GST : <IndianRupee size={15} />{taxable_amount}</li>
                                        <li><b>Amt. : <IndianRupee size={15} />{total_price}</b></li>
                                      </ul>
                                    </td>
                                    <td>{item.quantity || item.qty || 1}</td>
                                    <td>
                                      <IndianRupee size={15} />
                                      {Number(total_price * (item.quantity || item.qty || 1)).toFixed(2)}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="bg-white px-3 py-2 border-top max-vh-50 d-lg-none">
                        {/* Simplified Mobile Card List Element view */}
                        <div className="mb-3">
                          <p className="fw-bold small text-muted mb-2 text-uppercase">Items</p>
                          {displayItems.map((item: any, idx) => {
                            const price = parseFloat(item.price || 0);
                            const u_price = parseFloat(item.unit_price || 0);
                            const unit_price = price < u_price ? price : u_price;
                            return (
                              <div key={idx} className="d-flex align-items-center justify-content-between py-2 border-bottom last-border-0">
                                <div className="d-flex align-items-center flex-grow-1 me-2">
                                  <Image
                                    src={item.f_image || "/assets/product/sanitory_pad.png"}
                                    alt={item.product_name || "Product"}
                                    width={45}
                                    height={45}
                                    className="rounded me-2 object-fit-cover"
                                  />
                                  <div style={{ maxWidth: "calc(100% - 55px)" }}>
                                    <span className="d-block text-truncate small fw-bold text-dark">{item.product_name}</span>
                                    <span className="text-muted small">Qty: {item.quantity || item.qty || 1} × ₹{unit_price}</span>
                                  </div>
                                </div>
                                <div className="text-end flex-shrink-0">
                                  <span className="small fw-medium">
                                    ₹{Number(parseFloat(item.price || 0) * (item.quantity || item.qty || 1)).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Order Calculations breakdown segment */}
                        <div className="small text-dark">
                          <div className="d-flex justify-content-between mb-1">
                            <span className="text-muted">Subtotal:</span>
                            <span>₹{formattedAmountCommas(subTotal)}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-1">
                            <span className="text-muted">Tax:</span>
                            <span>₹{formattedAmountCommas(tax_amount)}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Shipping Charge:</span>
                            <span>₹{computedShipping}</span>
                          </div>
                        </div>
                      </div>

                      {/* Address Selection Container */}
                      <div className="card border-0 shadow-sm mb-4">
                        <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                          <h5 className="mb-0 fw-bold text-dark">Shipping Address</h5>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm px-3"
                            onClick={openAddModal}
                            disabled={addressLoading}
                          >
                            + Add New
                          </button>
                        </div>
                        <div className="card-body pt-0">
                          {addressesLoading ? (
                            <div className="text-center py-4">
                              <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading addresses...</span>
                              </div>
                            </div>
                          ) : addresses.length === 0 ? (
                            <div className="text-center py-4 text-muted">
                              No saved addresses.{" "}
                              <button className="btn btn-link p-0" onClick={openAddModal}>
                                Add your first address
                              </button>
                            </div>
                          ) : (
                            <div className="row g-3">
                              {addresses.map((addr) => (
                                <div key={addr.id} className="col-md-6">
                                  <div
                                    className={`card h-100 transition-all ${selectedAddressId === addr.id ? 'border-primary bg-light-subtle' : 'border-light-size'}`}
                                    style={{
                                      border:
                                        selectedAddressId === addr.id
                                          ? "1.5px solid var(--bs-primary)"
                                          : "1px solid #dee2e6",
                                    }}
                                  >
                                    <div className="card-body p-3 d-flex flex-column">
                                      <div className="form-check flex-grow-1 align-items-start d-flex mb-0">
                                        <input
                                          className="form-check-input flex-shrink-0 mt-1"
                                          type="radio"
                                          name="address"
                                          id={`addr-${addr.id}`}
                                          checked={selectedAddressId === addr.id}
                                          onChange={() => setSelectedAddressId(addr.id)}
                                          disabled={addressLoading}
                                        />
                                        <label
                                          className="form-check-label ps-2 w-100 cursor-pointer text-dark small"
                                          htmlFor={`addr-${addr.id}`}
                                        >
                                          <strong className="d-block text-dark h6 mb-1">{addr.full_name}</strong>
                                          <span className="d-block text-secondary mb-1">{addr.address_line1}{addr.address_line2 ? `, ${addr.address_line2}` : ""}</span>
                                          <span className="d-block text-secondary mb-1">{addr.city}, {addr.state} - <strong>{addr.pincode}</strong></span>
                                          <span className="d-block text-muted mt-2 fw-medium">Phone: {addr.phone}</span>
                                        </label>
                                      </div>
                                      <div className="d-flex align-items-center justify-content-between mt-3 pt-2 border-top">
                                        {addr.is_default ? (
                                          <span className="badge bg-success-subtle text-success small">Default</span>
                                        ) : (
                                          <button
                                            type="button"
                                            className="btn btn-link text-decoration-none text-primary p-0 small shadow-none border-0"
                                            onClick={(e) => { e.stopPropagation(); handleSetDefault(addr.id); }}
                                            disabled={addressLoading}
                                          >
                                            Set Default
                                          </button>
                                        )}
                                        <div className="d-flex gap-2">
                                          <button
                                            type="button"
                                            className="btn btn-outline-secondary btn-sm border-0 bg-transparent p-0 text-primary small fw-medium"
                                            onClick={(e) => { e.stopPropagation(); openEditModal(addr); }}
                                            disabled={addressLoading}
                                          >
                                            Edit
                                          </button>
                                          <span className="text-muted">|</span>
                                          <button
                                            type="button"
                                            className="btn btn-outline-primary btn-sm border-0 bg-transparent p-0 text-primary small fw-medium"
                                            onClick={(e) => { e.stopPropagation(); handleDeleteAddress(addr.id); }}
                                            disabled={addressLoading}
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Column Layout Panel: Total Calculation block */}
                    <div className="col-lg-4">
                      <div className="card border-0 shadow-sm sticky-top" style={{ top: "90px" }}>
                        <div className="card-body p-4">
                          <h5 className="fw-bold mb-3 d-none d-lg-block">Order Summary</h5>
                          <div className="d-flex justify-content-between mb-2 small text-secondary">
                            <span>Subtotal ({displayItems.length} items):</span>
                            <span className="text-dark fw-medium">₹{formattedAmountCommas(subTotal)}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2 small text-secondary">
                            <span>Tax:</span>
                            <span className="text-dark fw-medium">₹{formattedAmountCommas(tax_amount)}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-3 small text-secondary">
                            <span>Shipping Charge:</span>
                            <span className="text-dark fw-medium">₹{computedShipping}</span>
                          </div>
                          <hr className="my-2 text-muted" />

                          {couponDiscountAmount > 0 && !couponError && (
                            <div className="d-flex justify-content-between mb-2 small text-secondary">
                              <span>Discount:</span>
                              <span className="text-success fw-bold">−₹{formattedAmountCommas(couponDiscountAmount.toFixed(2))}</span>
                            </div>
                          )}

                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <span className="fw-bold h5 mb-0 text-dark">Total:</span>
                            <span className="fw-bold h4 mb-0 text-primary">₹{formattedAmountCommas(finalTotal.toFixed(2))}</span>
                          </div>

                          <div className="mb-4">
                            <label className="form-label small fw-bold text-muted text-uppercase">Coupon Code</label>
                            <div className="input-group shadow-sm rounded">
                              <input
                                type="text"
                                className="form-control"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                placeholder="Enter promo code"
                                disabled={couponApplying}
                              />
                              <button
                                className="btn btn-primary px-3"
                                type="button"
                                onClick={async () => {
                                  const trimmed = (couponCode || "").trim();
                                  if (!trimmed) {
                                    setCouponError("Enter a coupon code");
                                    setCouponDiscountAmount(0);
                                    setCouponAppliedCode("");
                                    return;
                                  }
                                  if (!displayItems.length) return;

                                  setCouponApplying(true);
                                  setCouponError("");
                                  try {
                                    const products = displayItems
                                      .map((it: any) => it.product_id)
                                      .filter(Boolean);

                                    const total_amount = totalAmount + computedShipping;

                                    const payload: any = {
                                      code: trimmed,
                                      total_amount,
                                      user_id: (user as any)?.id,
                                      username: (user as any)?.username,
                                      phone: selectedAddress?.phone || (user as any)?.phone,
                                      ip_address: undefined,
                                      user_agent:
                                        typeof window !== "undefined" ? window.navigator.userAgent : undefined,
                                      products,
                                    };

                                    Object.keys(payload).forEach(
                                      (k) => payload[k] === undefined && delete payload[k]
                                    );

                                    const url = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/coupons/validate`;

                                    const res = await fetch(url, {
                                      method: "POST",
                                      headers: { "Content-Type": "application/json" },
                                      body: JSON.stringify(payload),
                                    });

                                    const json = await res.json();

                                    if (!res.ok || !json?.success) {
                                      throw new Error(json?.message || "Coupon validation failed");
                                    }

                                    const discountAmount = Number(json?.data?.discount_amount || 0);

                                    setCouponAppliedCode(json?.data?.code || trimmed);
                                    setCouponDiscountAmount(Number.isFinite(discountAmount) ? discountAmount : 0);
                                    setCouponError("");
                                  } catch (err: any) {
                                    setCouponDiscountAmount(0);
                                    setCouponAppliedCode("");
                                    setCouponError(err?.message || "Coupon validation failed");
                                  } finally {
                                    setCouponApplying(false);
                                  }
                                }}
                              >
                                {couponApplying ? "Applying..." : "Apply"}
                              </button>
                            </div>

                            {couponAppliedCode && couponDiscountAmount > 0 && !couponError && (
                              <div className="d-flex align-items-center justify-content-between gap-2 mt-3">
                                <div className="alert alert-success mb-0 flex-grow-1 small rounded-3 p-2" role="alert">
                                  Coupon applied: <strong>{couponAppliedCode}</strong> (−₹{couponDiscountAmount})
                                </div>
                                <button
                                  type="button"
                                  className="btn btn-outline-danger btn-sm px-3"
                                  onClick={() => {
                                    setCouponCode("");
                                    setCouponError("");
                                    setCouponDiscountAmount(0);
                                    setCouponAppliedCode("");
                                  }}
                                  disabled={couponApplying}
                                  title="Remove Coupon"
                                >
                                  <X />
                                </button>
                              </div>
                            )}

                            {couponError && (
                              <div className="alert alert-warning mt-3 mb-0 small rounded-3" role="alert">{couponError}</div>
                            )}
                          </div>

                          <div className="mb-4">
                            <label className="form-label small fw-bold text-muted text-uppercase">Payment Method</label>
                            <select className="form-select bg-light fw-medium" value={paymentMethod} disabled>
                              <option value="razorpay">Online (Razorpay)</option>
                              <option value="cod">Cash on Delivery</option>
                            </select>
                          </div>

                          {formatError && (
                            <div className="alert alert-warning mb-4 shadow-sm border-warning small rounded-3">
                              <span className="fw-bold d-block mb-2">{formatError}</span>
                              <Link href="/cart" className="btn btn-sm btn-outline-warning w-100 fw-bold">
                                Go to Cart to Fix
                              </Link>
                            </div>
                          )}

                          {error && <div className="alert alert-danger mb-4 small rounded-3">{error}</div>}

                          <div className="row g-2 mt-2">
                            <div className="col-6">
                              <Link
                                href="/cart"
                                className="btn btn-outline-secondary w-100 py-2 fw-medium text-uppercase btn-sm d-flex align-items-center justify-content-center"
                              >
                                ← Cart
                              </Link>
                            </div>
                            <div className="col-6">
                              {isConsistentFormat && (
                                <button
                                  type="button"
                                  className="btn btn-primary w-100 py-2 fw-bold text-uppercase btn-sm shadow"
                                  onClick={handlePlaceOrder}
                                  disabled={orderLoading || displayItems.length === 0 || (!selectedAddress && !formData.pincode)}
                                >
                                  {orderLoading ? "Processing..." : `Place Order`}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {(showAddModal || showEditModal) && (
        <>
          <div className="modal-backdrop fade show" style={{ zIndex: 1040, backgroundColor: "rgba(0,0,0,0.5)" }}></div>
          <div className="modal show d-block fade show" style={{ zIndex: 1050 }} tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered px-3">
              <div className="modal-content border-0 rounded-4 shadow-lg">
                <div className="modal-header border-bottom-0 pb-0">
                  <h5 className="modal-title fw-bold text-dark">{editingAddress ? "Edit Address" : "Add New Address"}</h5>
                  <button type="button" className="btn-close shadow-none" onClick={closeModal}></button>
                </div>
                <form onSubmit={handleAddressSubmit}>
                  <div className="modal-body p-4">
                    {error && <div className="alert alert-danger rounded-3 p-2 small">{error}</div>}

                    <div className="mb-3">
                      <label className="form-label small fw-bold text-muted text-uppercase">Full Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={addressFormData.full_name}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "" || /^[a-zA-Z\s]+$/.test(value)) {
                            setAddressFormData({ ...addressFormData, full_name: value });
                          }
                        }}
                        placeholder="Full Name"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-bold text-muted text-uppercase">Address Line 1 *</label>
                      <textarea
                        className="form-control"
                        rows={2}
                        value={addressFormData.address_line1}
                        onChange={(e) => setAddressFormData({ ...addressFormData, address_line1: e.target.value })}
                        placeholder="House no, Street, etc."
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label small fw-bold text-muted text-uppercase">Address Line 2 (Landmark)</label>
                      <input
                        type="text"
                        className="form-control"
                        value={addressFormData.address_line2}
                        onChange={(e) => setAddressFormData({ ...addressFormData, address_line2: e.target.value })}
                        placeholder="Landmark / Sector"
                      />
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-6">
                        <label className="form-label small fw-bold text-muted text-uppercase">State *</label>
                        <select
                          value={addressFormData.state}
                          onChange={async (e) => {
                            const nextStateName = e.target.value;
                            const nextState = states.find((s) => String(s.name) === String(nextStateName));
                            const nextStateId = nextState?.id ?? null;

                            setSelectedStateId(nextStateId);
                            setAddressFormData({ ...addressFormData, state: nextStateName, city: "" });

                            if (nextStateId !== null) {
                              await fetchCities(nextStateId);
                            } else {
                              setCities([]);
                            }
                          }}
                          className="form-select"
                          required
                          disabled={statesLoading}
                        >
                          <option value="">{statesLoading ? "Loading..." : "Select State"}</option>
                          {states.map((s) => (
                            <option key={String(s.id)} value={s.name}>{s.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="col-6">
                        <label className="form-label small fw-bold text-muted text-uppercase">City *</label>
                        <select
                          value={addressFormData.city}
                          onChange={(e) => setAddressFormData({ ...addressFormData, city: e.target.value })}
                          className="form-select"
                          required
                          disabled={!addressFormData.state || citiesLoading}
                        >
                          <option value="">{citiesLoading ? "Loading..." : "Select City"}</option>
                          {cities.map((c) => (
                            <option key={String(c.id)} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="row g-3 mb-3">
                      <div className="col-6">
                        <label className="form-label small fw-bold text-muted text-uppercase">Pincode *</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          placeholder="6 Digits"
                          value={addressFormData.pincode}
                          onChange={(e) => {
                            const next = e.target.value.replace(/\D/g, "");
                            setAddressFormData({ ...addressFormData, pincode: next });
                            if (pincodeError) setPincodeError("");
                          }}
                          className={`form-control ${pincodeError ? "is-invalid" : ""}`}
                          required
                        />
                        {pincodeError && <div className="invalid-feedback d-block small">{pincodeError}</div>}
                      </div>

                      <div className="col-6">
                        <label className="form-label small fw-bold text-muted text-uppercase">Phone *</label>
                        <input
                          type="text"
                          inputMode="tel"
                          maxLength={10}
                          placeholder="10 Digits"
                          value={addressFormData.phone}
                          onChange={(e) => {
                            const next = e.target.value.replace(/\D/g, "");
                            setAddressFormData({ ...addressFormData, phone: next });
                          }}
                          className="form-control"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="is_default"
                        checked={addressFormData.is_default}
                        onChange={(e) => setAddressFormData({ ...addressFormData, is_default: e.target.checked })}
                      />
                      <label className="form-check-label fw-medium text-dark small" htmlFor="is_default">
                        Set as default address
                      </label>
                    </div>
                  </div>

                  <div className="modal-footer border-top-0 pt-0">
                    <button type="button" className="btn btn-light small" onClick={closeModal} disabled={addressLoading}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary small px-4" disabled={addressLoading}>
                      {addressLoading ? "Saving..." : editingAddress ? "Update" : "Save Address"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CheckoutPage;