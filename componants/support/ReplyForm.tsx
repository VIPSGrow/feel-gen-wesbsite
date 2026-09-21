"use client";

import { useState } from 'react';
import { replyToTicket } from '@/lib/supportApi';
import { ReplyData } from '@/lib/types/Ticket';
import { Send, Loader2, Paperclip, X } from 'lucide-react';

interface ReplyFormProps {
    caseId: string;
    onReply: () => void;
}

export default function ReplyForm({ caseId, onReply }: ReplyFormProps) {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setLoading(true);
        try {
            const data: ReplyData = { message: message.trim() };
            const result = await replyToTicket(caseId, data);

            if (result.success) {
                setMessage('');
                setExpanded(false); // Optional: collapse after sending
                onReply();
            } else {
                alert(result.message)
            }
        } catch (err) {
            console.error('Reply failed', err);
        } finally {
            setLoading(false);
        }
    };

    if (!expanded) {
        return (
            <div
                className="p-4 border border-2 border-dashed rounded-4 text-center bg-light transition-hover cursor-pointer"
                style={{ borderColor: "#dee2e6" }}
                onClick={() => setExpanded(true)}
            >
                <div className="d-flex align-items-center justify-content-center gap-2 text-muted">
                    <Paperclip size={18} />
                    <span className="fw-bold small text-uppercase">Click here to add a reply to this case...</span>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="card border-0 shadow-sm rounded-4 p-4 bg-white border">
            <div className="d-flex gap-3 mb-3">
                <div className="flex-shrink-0 d-none d-sm-block">
                    <div
                        className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-sm"
                        style={{ width: '45px', height: '45px', background: 'linear-gradient(45deg, #00A9E0, #007bb0)' }}
                    >
                        You
                    </div>
                </div>
                <div className="flex-grow-1">
                    <textarea
                        value={message}
                        autoFocus
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your message to the support team..."
                        rows={4}
                        className="form-control rounded-3 border-light bg-light"
                        style={{ fontSize: "0.95rem", resize: "none" }}
                    />
                </div>
            </div>

            <div className="d-flex align-items-center justify-content-between">
                <button
                    type="button"
                    onClick={() => {
                        setExpanded(false);
                        setMessage('');
                    }}
                    className="btn btn-light rounded-pill px-3 d-flex align-items-center gap-1 text-muted fw-bold small"
                    disabled={loading}
                >
                    <X size={16} /> Discard
                </button>

                <button
                    type="submit"
                    disabled={loading || !message.trim()}
                    className="btn rounded-pill px-4 py-2 d-flex align-items-center gap-2 shadow-sm text-white fw-bold"
                    style={{ backgroundColor: "#00A9E0", border: "none" }}
                >
                    {loading ? (
                        <Loader2 className="spinner-border border-0" style={{ width: '1.2rem', height: '1.2rem' }} />
                    ) : (
                        <Send size={16} />
                    )}
                    {loading ? 'Sending...' : 'Post Reply'}
                </button>
            </div>

            <style jsx>{`
                .transition-hover {
                    transition: all 0.2s ease-in-out;
                }
                .transition-hover:hover {
                    background-color: #f8f9fa !important;
                    border-color: #00A9E0 !important;
                    transform: translateY(-2px);
                }
                .form-control:focus {
                    background-color: #fff !important;
                    border-color: #00A9E0 !important;
                    box-shadow: 0 0 0 0.25rem rgba(0, 169, 224, 0.1);
                }
            `}</style>
        </form>
    );
}