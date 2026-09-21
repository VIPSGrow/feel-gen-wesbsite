"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import { getMyTickets } from '@/lib/supportApi';
import { Ticket } from '@/lib/types/Ticket';
import TicketCard from '@/componants/support/TicketCard';
import RaiseTicketModal from '@/componants/support/RaiseTicketModal';
import { Search, Plus, Loader2, AlertCircle, RefreshCcw } from 'lucide-react';

export default function SupportTicketsPage() {
    const { user } = useAuth();
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');

    const fetchTickets = async (pageNum = 1, searchQuery = '') => {
        setLoading(true);
        setError('');
        try {
            const result = await getMyTickets(pageNum, 10);
            if (result.success) {
                setTickets(result.tickets || []);
                setTotalPages(result.pagination?.totalPages || 1);
            } else {
                setError('Failed to load tickets');
            }
        } catch (err) {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets(1, search);
    }, []);

    const handlePageChange = (newPage: number) => {
        fetchTickets(newPage, search);
        setPage(newPage);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchTickets(1, search);
    };

    const handleTicketCreated = () => {
        fetchTickets(page, search);
    };

    if (loading) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '400px' }}>
                <Loader2 className="spinner-border text-primary border-0" style={{ width: '3rem', height: '3rem' }} />
                <p className="mt-3 text-muted fw-medium">Loading your tickets...</p>
            </div>
        );
    }

    return (
        <div className="container-fluid p-0">
            {/* Header Section */}
            <div className="row align-items-center mb-4 g-3">
                <div className="col-md">
                    <h1 className="fw-bold text-dark mb-1">Support Tickets</h1>
                    <p className="text-muted mb-0">Manage your support requests with our team</p>
                </div>
                <div className="col-md-auto">
                    <button
                        onClick={() => setShowModal(true)}
                        className="btn btn-primary btn-lg rounded-pill px-4 shadow-sm d-flex align-items-center gap-2"
                        style={{ backgroundColor: "#00A9E0", border: "none" }}
                    >
                        <Plus size={20} />
                        <span>Raise New Ticket</span>
                    </button>
                </div>
            </div>

            {/* Search & Stats Bar */}
            <div className="row mb-4 g-3 align-items-center">
                <div className="col-lg-8">
                    <form onSubmit={handleSearch} className="position-relative">
                        <Search
                            className="position-absolute translate-middle-y top-50 start-0 ms-3 text-muted"
                            size={18}
                        />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search tickets by ID, subject..."
                            className="form-control form-control-lg ps-5 rounded-4 border-0 shadow-sm"
                            style={{ backgroundColor: "#f8f9fa" }}
                        />
                    </form>
                </div>
                <div className="col-lg-4 text-lg-end">
                    <div className="bg-white p-2 px-3 d-inline-block rounded-pill shadow-sm border">
                        <span className="fw-bold fs-5 text-primary">{tickets.length}</span>
                        <span className="text-muted ms-2 small text-uppercase fw-semibold">Total Tickets</span>
                    </div>
                </div>
            </div>

            {/* Error State */}
            {error && (
                <div className="card border-0 shadow-sm rounded-4 mb-4" style={{ backgroundColor: "#fff5f5" }}>
                    <div className="card-body text-center py-5">
                        <AlertCircle className="text-danger mb-3" size={48} />
                        <h5 className="text-danger fw-bold">{error}</h5>
                        <button
                            onClick={() => fetchTickets(page, search)}
                            className="btn btn-outline-danger rounded-pill mt-3 px-4 d-inline-flex align-items-center gap-2"
                        >
                            <RefreshCcw size={16} /> Retry Now
                        </button>
                    </div>
                </div>
            )}

            {/* Tickets Display Grid */}
            {!error && (
                <>
                    {tickets.length === 0 ? (
                        <div className="card border-2 border-dashed rounded-4 bg-light py-5 text-center">
                            <div className="card-body py-5">
                                <div className="mb-4 d-inline-block p-4 rounded-circle bg-white shadow-sm">
                                    <AlertCircle className="text-primary" size={60} style={{ color: "#00A9E0" }} />
                                </div>
                                <h3 className="fw-bold text-dark">No tickets yet</h3>
                                <p className="text-muted mx-auto mb-4" style={{ maxWidth: '400px' }}>
                                    You haven't raised any support tickets. Click "Raise New Ticket" to get help from our expert team.
                                </p>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="btn btn-primary rounded-pill px-5 py-3 shadow"
                                    style={{ backgroundColor: "#00A9E0", border: "none" }}
                                >
                                    Create Your First Ticket
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="row row-cols-1 g-3">
                            {tickets.map((ticket) => (
                                <div className="col" key={ticket.id}>
                                    <TicketCard ticket={ticket} />
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Pagination Controls */}
            {tickets.length > 0 && totalPages > 1 && (
                <nav className="mt-5 d-flex justify-content-center">
                    <ul className="pagination shadow-sm rounded-pill overflow-hidden border-0">
                        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                            <button
                                className="page-link border-0 px-4 py-2"
                                onClick={() => handlePageChange(Math.max(1, page - 1))}
                            >
                                Previous
                            </button>
                        </li>
                        <li className="page-item d-flex align-items-center bg-white px-4 text-muted small fw-bold">
                            Page {page} of {totalPages}
                        </li>
                        <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                            <button
                                className="page-link border-0 px-4 py-2"
                                onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            )}

            {/* Modal for Creating New Tickets */}
            <RaiseTicketModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSuccess={handleTicketCreated}
            />

            <style jsx>{`
                .transition-all {
                    transition: all 0.3s ease;
                }
                .form-control:focus {
                    box-shadow: 0 0 0 0.25rem rgba(0, 169, 224, 0.15);
                }
                .page-link {
                    color: #00A9E0;
                    background: white;
                }
                .page-item.disabled .page-link {
                    background: #f8f9fa;
                    color: #adb5bd;
                }
                .transition-hover:hover {
                    transform: translateY(-2px);
                }
            `}</style>
        </div>
    );
}