"use client";

import React, { useMemo, useState } from 'react';
import { Bell, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { NotificationType } from '@/lib/notifications/types';

export default function NotificationsBell({
    items,
}: {
    items: NotificationType[];
}) {
    const [open, setOpen] = useState(false);

    const unreadCount = useMemo(() => items.length, [items]);

    if (items.length === 0) {
        return null;
    }

    return (
        <div className="position-relative">
            <button
                type="button"
                className="border-0 bg-transparent p-2 rounded-circle d-flex align-items-center justify-content-center"
                aria-label="Notifications"
                onClick={() => setOpen((v) => !v)}
            >
                <Bell size={22} className="text-muted" />
                {unreadCount > 0 && (
                    <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                        style={{ fontSize: '0.6rem' }}
                    >
                        {unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <div
                    className="dropdown-menu show shadow border-0 mt-2"
                    style={{ position: 'absolute', top: 0, right: 0, zIndex: 10050, width: 320 }}
                    role="menu"
                >
                    <div className="px-3 py-2 fw-bold">Notifications</div>
                    <div className="dropdown-divider" />
                    <div style={{ maxHeight: 320, overflow: 'auto' }}>
                        {items.map((n) => (
                            <Link
                                key={n.id}
                                href={n.url || '#'}
                                className="dropdown-item"
                                onClick={() => setOpen(false)}
                            >
                                <div className="d-flex justify-content-between align-items-start gap-2">
                                    <div>
                                        <div className="fw-bold">{n.title}</div>
                                        {n.message && <div className="small text-muted mt-1">{n.message}</div>}
                                    </div>
                                    <ChevronRight size={16} className="text-muted" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

