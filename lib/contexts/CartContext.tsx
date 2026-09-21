"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import Cookies from "js-cookie";
import serverCallFuction, { BodyData } from "../constantFunction";
import type { Cart, CartItem, VariantDetails } from "@/lib/types/Cart";
import { useAuth } from "./AuthContext";

interface GuestCartItem {
  id: string;
  product_id: number;
  variation_id: string | null;
  quantity: number;
  price: number;
  product_name: string;
  slug: string;
  f_image: string;
  variant_details: VariantDetails | null;
  tax_data: {
    id?: number;
    name?: string;
    percentage?: number;
  } | null;
}

interface GuestCart {
  items: GuestCartItem[];
  total_items: number;
  total: number;
  subtotal: number;
  total_tax: number;
  updated_at: string;
}

const GUEST_CART_KEY = "feel_safe_guest_cart";

const getEmptyGuestCart = (): GuestCart => ({
  items: [],
  total_items: 0,
  total: 0,
  subtotal: 0,
  total_tax: 0,
  updated_at: new Date().toISOString(),
});

const calculateCartTotals = (items: GuestCartItem[]): Omit<GuestCart, "items" | "updated_at"> => {
  let subtotal = 0;
  let total_tax = 0;
  let total_items = 0;

  items.forEach((item) => {
    const itemPrice = Number(item.price);
    const itemSubtotal = itemPrice * item.quantity;
    subtotal += itemSubtotal;
    total_items += item.quantity;

    if (item.tax_data?.percentage) {
      total_tax += (itemSubtotal * item.tax_data.percentage) / 100;
    }
  });

  return {
    total_items,
    subtotal:subtotal.toFixed(2),
    total_tax: total_tax.toFixed(2),
    total: (subtotal + total_tax).toFixed(2),
  };
};

const loadGuestCart = (): GuestCart => {
  if (typeof window === "undefined") return getEmptyGuestCart();
  try {
    const stored = localStorage.getItem(GUEST_CART_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...getEmptyGuestCart(), ...parsed };
    }
  } catch {
  }
  return getEmptyGuestCart();
};

const saveGuestCart = (cart: GuestCart) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
  } catch {
  }
};

const clearGuestCart = () => {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(GUEST_CART_KEY);
  } catch {
  }
};

const convertGuestToBackendItems = (guestItems: GuestCartItem[]) => {
  return guestItems.map((item) => ({
    product_id: item.product_id,
    variation_id: item.variation_id,
    quantity: item.quantity,
    price: item.price,
    distributor_id: null,
  }));
};

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  isGuestMode: boolean;
  guestCart: GuestCart | null;
  fetchCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  addItem: (
    productId: number,
    variantId: string | null,
    quantity: number,
    price: number,
    distributor_id: number | null,
    productName?: string,
    slug?: string,
    fImage?: string,
    variantDetails?: VariantDetails | null,
    taxData?: { id?: number; name?: string; percentage?: number } | null,
  ) => Promise<{ status?: boolean; message?: string }>;
  mergeGuestCartToBackend: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [guestCart, setGuestCart] = useState<GuestCart>(getEmptyGuestCart());
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  const isGuestMode = !isAuthenticated;

  const fetchCart = useCallback(async () => {
    if (isGuestMode) {
      const gCart = loadGuestCart();
      setGuestCart(gCart);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await serverCallFuction("GET", "api/ecom/cart/");
      if (res.status && res.cart) {
        setCart(res.cart);
      } else {
        setCart(null);
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, [isGuestMode]);

  const refreshCart = useCallback(async () => {
    await fetchCart();
  }, [fetchCart]);

  const mergeGuestCartToBackend = useCallback(async () => {
    if (isGuestMode) return;

    const gCart = loadGuestCart();
    if (gCart.items.length === 0) return;

    try {
      setLoading(true);
      const backendItems = convertGuestToBackendItems(gCart.items);

      for (const item of backendItems) {
        await serverCallFuction("POST", "api/ecom/cart/items/", item as BodyData);
      }

      clearGuestCart();
      setGuestCart(getEmptyGuestCart());
      await fetchCart();
    } catch (error) {
      console.error("Failed to merge guest cart:", error);
    } finally {
      setLoading(false);
    }
  }, [isGuestMode, fetchCart]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = Cookies.get("token");
      if (token) {
        fetchCart();
      } else {
        const gCart = loadGuestCart();
        setGuestCart(gCart);
        setLoading(false);
      }
    }
  }, [fetchCart]);

  useEffect(() => {
    if (!isGuestMode && !loading) {
      mergeGuestCartToBackend();
    }
  }, [isGuestMode, loading, mergeGuestCartToBackend]);

  const addItem = useCallback(async (
    productId: number,
    variantId: string | null,
    quantity: number,
    price: number,
    distributor_id: number | null,
    productName?: string,
    slug?: string,
    fImage?: string,
    variantDetails?: VariantDetails | null,
    taxData?: { id?: number; name?: string; percentage?: number } | null,
  ) => {
    if (isGuestMode) {
      const currentGuestCart = loadGuestCart();
      const existingItemIndex = currentGuestCart.items.findIndex(
        (item) => item.product_id === productId && item.variation_id === variantId,
      );

      let updatedItems: GuestCartItem[];

      if (existingItemIndex >= 0) {
        updatedItems = [...currentGuestCart.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
      } else {
        const newItem: GuestCartItem = {
          id: `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          product_id: productId,
          variation_id: variantId,
          quantity,
          price,
          product_name: productName || "",
          slug: slug || "",
          f_image: fImage || "",
          variant_details: variantDetails,
          tax_data: taxData,
        };
        updatedItems = [...currentGuestCart.items, newItem];
      }

      const totals = calculateCartTotals(updatedItems);
      const updatedCart: GuestCart = {
        items: updatedItems,
        ...totals,
        updated_at: new Date().toISOString(),
      };

      saveGuestCart(updatedCart);
      setGuestCart(updatedCart);
      return { status: true, message: "Added to cart" };
    }

    if (!cart) {
      return { status: false, message: "Cart not loaded" };
    }

    try {
      setLoading(true);
      const res = await serverCallFuction("POST", "api/ecom/cart/items/", {
        product_id: productId,
        variation_id: variantId,
        quantity,
        price,
        distributor_id,
      } as BodyData);
      if (res.status) {
        await refreshCart();
      }
      return res as { status?: boolean; message?: string };
    } catch (error) {
      console.error("Failed to add item:", error);
      return { status: false, message: "Failed to add to cart" };
    } finally {
      setLoading(false);
    }
  }, [isGuestMode, cart, refreshCart]);

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      return removeItem(itemId);
    }

    if (isGuestMode) {
      const currentGuestCart = loadGuestCart();
      const updatedItems = currentGuestCart.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item,
      );
      const totals = calculateCartTotals(updatedItems);
      const updatedCart: GuestCart = {
        items: updatedItems,
        ...totals,
        updated_at: new Date().toISOString(),
      };
      saveGuestCart(updatedCart);
      setGuestCart(updatedCart);
      return { status: true };
    }

    if (!cart) return { status: false };
    try {
      setLoading(true);
      const res = await serverCallFuction(
        "PUT",
        `api/ecom/cart/items/${itemId}/updateQuantity`,
        { quantity },
      );
      if (res.status) {
        await refreshCart();
      }
      return res as { status?: boolean };
    } catch (error) {
      console.error("Failed to update quantity:", error);
      return { status: false };
    } finally {
      setLoading(false);
    }
  }, [isGuestMode, cart, refreshCart]);

  const removeItem = useCallback(async (itemId: string) => {
    if (isGuestMode) {
      const currentGuestCart = loadGuestCart();
      const updatedItems = currentGuestCart.items.filter((item) => item.id !== itemId);
      const totals = calculateCartTotals(updatedItems);
      const updatedCart: GuestCart = {
        items: updatedItems,
        ...totals,
        updated_at: new Date().toISOString(),
      };
      saveGuestCart(updatedCart);
      setGuestCart(updatedCart);
      return { status: true };
    }

    try {
      setLoading(true);
      const res = await serverCallFuction(
        "DELETE",
        `api/ecom/cart/items/${itemId}/`,
      );
      if (res.status) {
        await refreshCart();
      }
      return res as { status?: boolean };
    } catch (error) {
      console.error("Failed to remove item:", error);
      return { status: false };
    } finally {
      setLoading(false);
    }
  }, [isGuestMode, refreshCart]);

  const displayCart = isGuestMode
    ? ({
        id: "guest",
        items: guestCart.items.map((item) => ({
          ...item,
          cart_id: "guest",
          price: String(item.price),
          created_at: guestCart.updated_at,
          updated_at: guestCart.updated_at,
        })),
        total_items: guestCart.total_items,
        total: guestCart.total,
        subtotal: guestCart.subtotal,
        total_tax: guestCart.total_tax,
      } as Cart)
    : cart;

  return (
    <CartContext.Provider
      value={{
        cart: displayCart,
        loading,
        isGuestMode,
        guestCart,
        fetchCart,
        refreshCart,
        updateQuantity,
        removeItem,
        addItem,
        mergeGuestCartToBackend,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};