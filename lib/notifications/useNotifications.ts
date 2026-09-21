"use client";

import { useEffect, useMemo, useState } from "react";
import serverCallFuction from "@/lib/constantFunction";
import type { NotificationType, NotificationsResponse } from "./types";

const SAFE_STORAGE_KEY = "feelSafe_notifications_popup_shown_v1";

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [popupShown, setPopupShown] = useState<boolean>(true); // Default to true during SSR to prevent flashes

  // Check sessionStorage safely after mounting on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const isShown = window.sessionStorage.getItem(SAFE_STORAGE_KEY) === "1";
        setPopupShown(isShown);
      } catch {
        setPopupShown(false);
      }
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = (await serverCallFuction(
          "GET",
          "api/notifications",
        )) as unknown as Partial<NotificationsResponse> & {
          status?: boolean;
          notifications?: NotificationType[];
          data?: any;
        };

        console.debug("[notifications] res:", res);

        const list =
          (Array.isArray(
            (res as NotificationsResponse | undefined)?.notifications,
          ) &&
            (res as NotificationsResponse).notifications) ||
          (Array.isArray((res as { data?: unknown }).data)
            ? ((res as { data: unknown[] }).data as unknown[])
            : null) ||
          (Array.isArray((res as any)?.notifications?.data)
            ? ((res as any).notifications.data as unknown[])
            : null) ||
          null;

        const typedList = (list || []).filter(
          (
            n: unknown,
          ): n is {
            id: string | number;
            title: string;
            display_type?: unknown;
            category?: unknown;
            message?: unknown;
            image_url?: unknown;
            created_at?: unknown;
            createdAt?: unknown;
            target_role?: unknown;
          } => {
            if (!n) return false;
            const obj = n as { [k: string]: unknown };
            if (typeof obj.title !== "string") return false;
            if (!(typeof obj.id === "string" || typeof obj.id === "number")) {
              return false;
            }
            const displayType = obj.display_type;
            return !!displayType || !!obj.title;
          },
        );

        if (!cancelled) {
          const mappedList: NotificationType[] = typedList
            .filter((n) => {
              const targetRole = (n as { target_role?: unknown }).target_role;
              if (targetRole == null || targetRole === "") return true;
              const tr = String(targetRole).toLowerCase();
              return tr === "all" || tr === "website";
            })
            .flatMap(
              (
                n: { id: string | number; title: string } & Record<
                  string,
                  unknown
                >,
              ): NotificationType[] => {
                const raw = String(n.display_type ?? n.category ?? "");
                const normalized = raw.trim().toUpperCase();

                const isBar =
                  normalized === "BAR" || normalized === "BAR_NOTIFICATION";
                const isPopup =
                  normalized === "POPUP" ||
                  normalized === "SHOW_POPUP" ||
                  normalized === "DISPLAY_POPUP" ||
                  normalized === "SHOW_POPUP_BANNER";

                const category: "bar" | "popup" | null = isBar
                  ? "bar"
                  : isPopup
                  ? "popup"
                  : null;

                if (!category) return [];

                const message = n.message ? String(n.message) : undefined;
                const url = n.image_url ? String(n.image_url) : undefined;

                return [
                  {
                    id:
                      typeof n.id === "number"
                        ? String(n.id)
                        : (n.id as string),
                    category,
                    title: String(n.title || ""),
                    message,
                    image_url: url,
                    created_at: n.created_at
                      ? String(n.created_at)
                      : n.createdAt
                      ? String(n.createdAt)
                      : undefined,
                  } satisfies NotificationType,
                ];
              },
            )
            .filter(
              (n) =>
                n.title.length > 0 &&
                (n.category === "bar" || n.category === "popup"),
            );

          setNotifications(
            mappedList && mappedList.length > 0 ? mappedList : [],
          );
        }
      } catch {
        if (!cancelled) setNotifications([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const barNotifications = useMemo(
    () => notifications.filter((n) => n.category === "bar"),
    [notifications],
  );

  const popupNotifications = useMemo(
    () => notifications.filter((n) => n.category === "popup"),
    [notifications],
  );

  // Updates both Session Storage AND component local state Reactively
  const setPopupDismissed = () => {
    try {
      window.sessionStorage.setItem(SAFE_STORAGE_KEY, "1");
      setPopupShown(true);
    } catch {
      // ignore
    }
  };

  return {
    loading,
    notifications,
    barNotifications,
    popupNotifications,
    popupShown,
    setPopupDismissed,
    SAFE_STORAGE_KEY,
  };
}
