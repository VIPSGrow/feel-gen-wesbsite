"use client";

import { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { raiseTicket } from '@/lib/supportApi';
import { CreateTicketData } from '@/lib/types/Ticket';
import { X, Send, Loader2 } from 'lucide-react';

interface RaiseTicketModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function RaiseTicketModal({ isOpen, onClose, onSuccess }: RaiseTicketModalProps) {
    const { user } = useAuth();
    const [formData, setFormData] = useState<CreateTicketData>({
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        subject: '',
        message: '',
        user_id: user?.id,
        user_type: 'ECOM_USER'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("ticket form data - ", formData);

        setLoading(true);
        setError('');

        try {
            const result = await raiseTicket(formData);
            if (result.success) {
                onSuccess();
                onClose();
            } else {
                setError(result.message || 'Failed to raise ticket');
            }
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        >
            <div
                className="card border-0 shadow-lg rounded-4 overflow-hidden w-100"
                style={{ maxWidth: "600px", maxHeight: "90vh" }}
            >
                {/* Header */}
                <div className="card-header bg-white border-bottom p-4 d-flex align-items-center justify-content-between">
                    <h5 className="mb-0 fw-bold d-flex align-items-center gap-2">
                        <Send size={24} style={{ color: "#00A9E0" }} />
                        <span>Raise New Ticket</span>
                    </h5>
                    <button
                        onClick={onClose}
                        className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center"
                        style={{ width: "38px", height: "38px" }}
                    >
                        <X size={20} className="text-muted" />
                    </button>
                </div>

                {/* Form */}
                <div className="card-body p-4 overflow-auto">
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="alert alert-danger border-0 rounded-3 mb-4 small">
                                {error}
                            </div>
                        )}

                        <div className="mb-3">
                            <label className="form-label small fw-bold text-muted text-uppercase">
                                Subject <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="form-control form-control-lg rounded-3 border-light bg-light"
                                placeholder="Short summary of your issue"
                                style={{ fontSize: "0.95rem" }}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label small fw-bold text-muted text-uppercase">
                                Description <span className="text-danger">*</span>
                            </label>
                            <textarea
                                required
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="form-control rounded-3 border-light bg-light"
                                placeholder="Describe your issue in detail..."
                                style={{ fontSize: "0.95rem", resize: "none" }}
                            />
                        </div>

                        <div className="row g-3 mb-4">
                            <div className="col-md-6">
                                <label className="form-label small fw-bold text-muted text-uppercase">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="form-control rounded-3 border-light bg-light"
                                    style={{ fontSize: "0.9rem" }}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label small fw-bold text-muted text-uppercase">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="form-control rounded-3 border-light bg-light"
                                    style={{ fontSize: "0.9rem" }}
                                />
                            </div>
                        </div>

                        <div className="d-flex gap-3 mt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="btn btn-light flex-grow-1 py-3 fw-bold rounded-3"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn flex-grow-1 py-3 fw-bold rounded-3 d-flex align-items-center justify-content-center gap-2 shadow-sm text-white"
                                style={{ backgroundColor: "#00A9E0" }}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={20} className="spinner-border border-0" style={{ width: '1.2rem', height: '1.2rem' }} />
                                        <span>Creating...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        <span>Create Ticket</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style jsx>{`
                .form-control:focus {
                    background-color: #fff !important;
                    border-color: #00A9E0 !important;
                    box-shadow: 0 0 0 0.25rem rgba(0, 169, 224, 0.1);
                }
            `}</style>
        </div>
    );
}