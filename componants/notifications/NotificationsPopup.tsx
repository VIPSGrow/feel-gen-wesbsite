"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useNotifications } from '@/lib/notifications/useNotifications';

export default function NotificationsPopup() {
    const {
        loading,
        popupNotifications,
        popupShown,
        setPopupDismissed,
    } = useNotifications();

    const [visible, setVisible] = useState(false);

    const current = useMemo(() => {
        if (!popupNotifications || popupNotifications.length === 0) return null;
        return [...popupNotifications].sort((a, b) => {
            const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
            const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
            return tb - ta;
        })[0];
    }, [popupNotifications]);

    useEffect(() => {
        if (loading || !current || popupShown) {
            setVisible(false);
            return;
        }
        setVisible(true);
    }, [loading, current, popupShown]);

    const handleClose = () => {
        setVisible(false);
        setPopupDismissed();
    };

    if (!current || !visible) return null;

    return (
        <div
            className="fixed inset-0 z-[10060] flex items-center justify-center notification-popup"
            aria-modal="true"
            role="dialog"
        >
            <div className="popup-backdrop" onClick={handleClose} />

            <div className="dynamic-popup-container" style={{ zIndex: 10061 }}>

                {/* Fixed Image Container Layout */}
                {current.image_url && (
                    <div className="mb-4 overflow-hidden rounded-2xl relative w-full h-48 bg-white border d-flex align-items-center justify-content-center">
                        <Image
                            src={current.image_url}
                            alt={current.title || "Notification image"}
                            width={400}  // Provide the native intrinsic width of your graphic base
                            height={200} // Provide the native intrinsic height of your graphic base
                            style={{ width: '100%', height: 'auto', maxHeight: '192px', objectFit: 'contain' }}
                            className="p-2"
                            priority
                            unoptimized
                        />
                    </div>
                )}

                {/* Typography Wrapper (Keeps layout aligned clean under the image) */}
                <div className="d-flex justify-content-between align-items-start gap-3">
                    <div className="flex-grow-1">
                        <div className="fw-bold fs-5 text-dark lh-sm">{current.title}</div>
                        {current.message && (
                            <div className="text-muted mt-2 small lh-base" style={{ wordBreak: 'break-word' }}>
                                {current.message}
                            </div>
                        )}
                    </div>
                    {/* <button type="button" className="border-0 bg-transparent p-0 flex-shrink-0" onClick={handleClose}>
                        <X size={18} className="text-muted" />
                    </button> */}
                </div>

                {/* Actions */}
                <div className="mt-4 d-flex gap-2">
                    <Link href={current.url || '#'} className="btn btn-primary flex-grow-1" onClick={handleClose}>
                        View
                    </Link>
                    <button type="button" className="btn btn-outline-secondary" onClick={handleClose}>
                        Later
                    </button>
                </div>
            </div>
        </div>
    );
}