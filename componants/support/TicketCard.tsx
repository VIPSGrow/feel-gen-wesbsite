"use client";

import { Ticket } from '@/lib/types/Ticket';
import Link from 'next/link';
import { Clock, CheckCircle, AlertCircle, ChevronRight, User } from 'lucide-react';

interface TicketCardProps {
    ticket: Ticket;
}

export default function TicketCard({ ticket }: TicketCardProps) {
    const getStatusColor = (status: Ticket['status']) => {
        switch (status) {
            case 'OPEN': return 'bg-warning-subtle text-warning-emphasis border-warning-subtle';
            case 'IN_PROGRESS': return 'bg-primary-subtle text-primary-emphasis border-primary-subtle';
            case 'RESOLVED': return 'bg-success-subtle text-success-emphasis border-success-subtle';
            case 'CLOSED': return 'bg-secondary-subtle text-secondary-emphasis border-secondary-subtle';
            default: return 'bg-light text-dark border-light';
        }
    };

    const getStatusIcon = (status: Ticket['status']) => {
        switch (status) {
            case 'OPEN': return AlertCircle;
            case 'IN_PROGRESS': return Clock;
            case 'RESOLVED': return CheckCircle;
            default: return Clock;
        }
    };

    const Icon = getStatusIcon(ticket.status);

    return (
        <Link href={`/account/support/${ticket.case_id}`} className="text-decoration-none">
            <div className="card border-0 shadow-sm rounded-4 mb-3 transition-hover overflow-hidden">
                <div className="card-body p-4">
                    <div className="row align-items-center g-3">
                        {/* Status Icon Indicator */}
                        {/* <div className="col-auto d-none d-md-block">
                            <div className="rounded-circle d-flex align-items-center justify-content-center"
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    backgroundColor: ticket.status === 'RESOLVED' ? '#f0fdf4' : '#f8f9fa'
                                }}>
                                <Icon size={24} className={
                                    ticket.status === 'OPEN' ? 'text-warning' :
                                        ticket.status === 'IN_PROGRESS' ? 'text-primary' :
                                            ticket.status === 'RESOLVED' ? 'text-success' : 'text-secondary'
                                } />
                            </div>
                        </div> */}

                        {ticket.is_unread && <span className='badge bg-primary' style={{ position: 'absolute', width: 'fit-content', right: "2%", top: "0" }}>Team Replied</span>}

                        {/* Content Area */}
                        <div className="col">
                            <div className="d-flex align-items-center gap-2 mb-1">
                                <h6 className="fw-bold text-dark mb-0">{ticket.case_id}</h6>
                                <span className={`badge rounded-pill border py-1 px-2 fw-semibold ${getStatusColor(ticket.status)}`} style={{ fontSize: '0.7rem' }}>
                                    {ticket.status.replace('_', ' ')}
                                </span>
                            </div>

                            <h5 className="card-title fw-bold text-dark mb-1 text-truncate" style={{ maxWidth: '400px' }}>
                                {ticket.subject}
                            </h5>

                            <div className="d-flex flex-wrap align-items-center gap-3 mt-2">
                                <span className="text-muted small d-flex align-items-center gap-1">
                                    <Clock size={14} />
                                    {new Date(ticket.created_at).toLocaleDateString()}
                                </span>

                                {ticket.name && (
                                    <span className="text-muted small d-flex align-items-center gap-1">
                                        <User size={14} />
                                        {ticket.name}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Ticket Index / Decoration */}
                        <div className="col-auto text-end">
                            <div className="d-flex align-items-center gap-3">
                                <div className="d-none d-sm-flex flex-shrink-0 w-10 h-10 rounded-3 bg-gradient-to-br from-primary to-info flex items-center justify-center text-white shadow-sm"
                                    style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #00A9E0 0%, #E6519B 100%)' }}>
                                    <span className="fw-bold small">#{ticket.id % 10}</span>
                                </div>
                                <ChevronRight className="text-muted opacity-50" size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Optional Footer Detail */}
                {(ticket.email || ticket.phone) && (
                    <div className="card-footer bg-light border-0 py-2 px-4 d-flex justify-content-between align-items-center">
                        <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                            Contact: {ticket.email || ticket.phone}
                        </span>
                        <span className="fw-bold text-primary small" style={{ fontSize: '0.7rem' }}>
                            View Conversation →
                        </span>
                    </div>
                )}
            </div>

            <style jsx>{`
                .transition-hover {
                    transition: all 0.3s ease;
                    border: 1px solid transparent !important;
                }
                .transition-hover:hover {
                    transform: translateX(5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.08) !important;
                    border-color: #00A9E020 !important;
                }
            `}</style>
        </Link>
    );
}