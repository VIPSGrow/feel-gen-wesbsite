"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { getTicketDetails } from '@/lib/supportApi';
import { Reply } from '@/lib/types/Ticket';
import ReplyForm from '@/componants/support/ReplyForm';
import { Loader2, ArrowLeft, AlertTriangle, AlertCircle, Paperclip, User, ShieldCheck } from 'lucide-react';

interface TicketReply extends Reply {
    isMe: boolean;
}

export default function TicketDetailsPage() {
    const params = useParams();
    const caseId = params.caseId as string;
    const { user } = useAuth();
    const [ticket, setTicket] = useState<any>(null);
    const [replies, setReplies] = useState<TicketReply[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTicket();
    }, [caseId]);

    const fetchTicket = async () => {
        setLoading(true);
        try {
            const result = await getTicketDetails(caseId);
            if (result.success) {
                setTicket(result.ticket);
                setReplies(
                    result.replies.map((reply: Reply) => ({
                        ...reply,
                        isMe: reply.replied_by_type === 'USER'
                    }))
                );
            }
        } catch (err) {
            console.error('Failed to load ticket', err);
        } finally {
            setLoading(false);
        }
    };

    const handleReplySent = () => {
        fetchTicket();
    };

    if (loading) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '400px' }}>
                <Loader2 className="spinner-border text-primary border-0" style={{ width: '3.5rem', height: '3.5rem' }} />
                <p className="mt-3 text-muted fw-bold">Loading Case Details...</p>
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="container py-5">
                <div className="card border-0 shadow-sm rounded-4 bg-danger-subtle text-center p-5">
                    <AlertTriangle className="text-danger mb-4 mx-auto" size={80} />
                    <h2 className="fw-bold text-danger">Ticket Not Found</h2>
                    <p className="text-danger-emphasis mb-4">The support ticket you're looking for doesn't exist or has been removed.</p>
                    <button onClick={() => window.history.back()} className="btn btn-danger rounded-pill px-4">
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-4" style={{ maxWidth: '900px' }}>
            {/* Navigation Header */}
            <div className="mb-4 d-flex align-items-center justify-content-between">
                <button
                    onClick={() => window.history.back()}
                    className="btn btn-link text-decoration-none text-muted fw-bold d-flex align-items-center gap-2 p-0"
                >
                    <ArrowLeft size={20} />
                    Back to Tickets
                </button>
                <span className="small text-muted fw-semibold">Case: {ticket.case_id}</span>
            </div>

            {/* Ticket Information Header */}
            <div className="card border-0 shadow-sm rounded-4 mb-5 overflow-hidden">
                <div className="card-header border-0 p-4" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
                    <div className="row align-items-start g-3">
                        <div className="col-auto">
                            <div className="rounded-4 bg-primary text-white d-flex align-items-center justify-content-center fw-bold fs-4 shadow" style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, #00A9E0 0%, #E6519B 100%)' }}>
                                FS
                            </div>
                        </div>
                        <div className="col">
                            <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                                <h1 className="h3 fw-bold mb-0 text-dark">{ticket.subject}</h1>
                                <span className={`badge rounded-pill px-3 py-2 ${ticket.status === 'OPEN' ? 'bg-warning text-dark' :
                                        ticket.status === 'RESOLVED' ? 'bg-success text-white' :
                                            ticket.status === 'IN_PROGRESS' ? 'bg-primary text-white' :
                                                'bg-secondary text-white'
                                    }`}>
                                    {ticket.status.replace('_', ' ')}
                                </span>
                            </div>
                            <div className="d-flex flex-wrap gap-3 text-muted small fw-medium">
                                <span className="d-flex align-items-center gap-1"><User size={14} /> {ticket.name}</span>
                                <span className="d-flex align-items-center gap-1">Created: {new Date(ticket.created_at).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Conversation Timeline */}
            <div className="mb-5">
                <h4 className="fw-bold mb-4 d-flex align-items-center gap-2 text-dark">
                    Conversation History
                    <span className="badge bg-light text-dark rounded-pill border">{replies.length}</span>
                </h4>

                {replies.length === 0 ? (
                    <div className="card border-2 border-dashed rounded-4 bg-light p-5 text-center">
                        <AlertCircle className="text-muted mb-3 mx-auto" size={48} />
                        <p className="text-muted mb-0 fw-bold">No conversation history yet.</p>
                        <p className="small text-muted">Awaiting internal review or your first message.</p>
                    </div>
                ) : (
                    <div className="d-flex flex-column gap-4">
                        {replies.map((reply) => (
                            <div key={reply.id} className={`d-flex gap-3 ${reply.is_admin ? 'flex-row-reverse' : ''}`}>
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    <div className={`rounded-circle d-flex align-items-center justify-content-center shadow-sm fw-bold text-white`}
                                        style={{
                                            width: '45px',
                                            height: '45px',
                                            background: reply.is_admin ? 'linear-gradient(45deg, #6610f2, #6f42c1)' : 'linear-gradient(45deg, #00A9E0, #007bb0)'
                                        }}>
                                        {reply.is_admin ? <ShieldCheck size={20} /> : 'You'}
                                    </div>
                                </div>

                                {/* Message Bubble */}
                                <div className={`flex-grow-1 ${reply.is_admin ? 'text-end' : 'text-start'}`} style={{ maxWidth: '85%' }}>
                                    <div className={`d-inline-block p-4 rounded-4 shadow-sm text-start ${reply.is_admin
                                            ? 'bg-white border-start border-4 border-primary rounded-tr-0'
                                            : 'bg-primary text-white rounded-tl-0'
                                        }`}>
                                        <p className={`mb-0 whitespace-pre-wrap ${reply.is_admin ? 'text-dark' : 'text-white'}`}>
                                            {reply.message}
                                        </p>

                                        {reply.attachment && (
                                            <a href={reply.attachment} target="_blank" rel="noopener noreferrer"
                                                className={`d-block mt-3 p-2 rounded-3 text-decoration-none small transition-all border ${reply.is_admin ? 'bg-light text-primary' : 'bg-white text-primary'
                                                    }`}>
                                                <Paperclip size={14} className="me-1" /> View Attachment
                                            </a>
                                        )}

                                        <div className={`mt-3 pt-2 border-top x-small d-flex justify-content-between gap-4 ${reply.is_admin ? 'text-muted border-light' : 'text-white-50 border-white-50'
                                            }`}>
                                            <span>{new Date(reply.created_at).toLocaleString()}</span>
                                            {reply.is_admin && <span className="fw-bold text-primary">Support Agent</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Reply Input Section */}
            <div className="card border-0 shadow rounded-4 p-4 mb-5">
                <h5 className="fw-bold mb-3">Add a Reply</h5>
                <ReplyForm
                    caseId={caseId}
                    onReply={handleReplySent}
                />
            </div>

            <style jsx>{`
                .x-small {
                    font-size: 0.7rem;
                }
                .transition-all:hover {
                    opacity: 0.8;
                }
                .whitespace-pre-wrap {
                    white-space: pre-wrap;
                    word-break: break-word;
                }
            `}</style>
        </div>
    );
}