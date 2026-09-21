"use client";

import React, { useEffect, useMemo, useState } from "react";
import serverCallFuction from "@/lib/constantFunction";

type Review = {
    id?: number;
    product_id?: number;
    user_id?: number;
    rating?: number;
    review?: string;
    created_at?: string;
    user_name?: string;
};

type Props = {
    productId: number;
};

const clampRating = (n: number) => {
    if (Number.isNaN(n)) return 0;
    return Math.max(1, Math.min(5, n));
};

const ReviewsSection: React.FC<Props> = ({ productId }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState("");
    const [submitMsg, setSubmitMsg] = useState<string | null>(null);

    const averageRating = useMemo(() => {
        if (!reviews.length) return 0;
        const sum = reviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0);
        return sum / reviews.length;
    }, [reviews]);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await serverCallFuction(
                "GET",
                `api/ecom/reviews/${productId}`,
            );

            // Be resilient to different API shapes
            const data = Array.isArray((res as { reviews?: unknown })?.reviews)
                ? ((res as { reviews: Review[] }).reviews)
                : Array.isArray(res)
                    ? (res as Review[])
                    : [];

            setReviews(data);
        } catch (e) {
            const msg = e instanceof Error ? e.message : "Failed to load reviews";
            setError(msg);
            setReviews([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId]);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitMsg(null);

        const trimmed = reviewText.trim();
        if (!trimmed) {
            setSubmitMsg("Please write a review.");
            return;
        }

        const payload = {
            product_id: productId,
            rating: clampRating(Number(rating)),
            review: trimmed,
        };

        try {
            setSubmitting(true);
            setError(null);

            const res = await serverCallFuction(
                "POST",
                `api/ecom/reviews`,
                payload,
            );

            if (typeof (res as { status?: unknown })?.status === "boolean" && (res as { status?: boolean }).status === false) {
                if (res.message === "No token, authorization denied") {
                    setSubmitMsg("You must be logged in to submit a review.");
                } else {
                    setSubmitMsg(((res as { message?: unknown }).message as string) || "Failed to submit review.");
                }
                return;
            }



            setSubmitMsg("Review submitted successfully.");
            setReviewText("");
            setRating(5);
            await fetchReviews();
        } catch (e) {
            const msg = e instanceof Error ? e.message : "Failed to submit review.";
            setSubmitMsg(msg);
        } finally {
            setSubmitting(false);
        }
    };




    return (
        <div>
            <div className="mb-3">
                <div className="d-flex align-items-center gap-3 flex-wrap">
                    <div>
                        <div className="fw-bold fs-4">
                            {averageRating ? averageRating.toFixed(1) : "0.0"} / 5
                        </div>
                        <div className="text-muted">
                            {reviews.length ? `${reviews.length} review(s)` : "No reviews yet"}
                        </div>
                    </div>
                    <div className="text-warning">
                        {Array.from({ length: 5 }).map((_, i) => {
                            const star = i + 1;
                            const active = averageRating >= star;
                            return (
                                <span key={star} style={{ fontSize: 18, marginRight: 2 }}>
                                    {active ? "★" : "☆"}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-4">
                {loading ? (
                    <div className="text-muted">Loading reviews...</div>
                ) : reviews.length ? (
                    <div className="d-flex flex-column gap-3">
                        {reviews.map((r, idx) => {
                            const rRating = Number(r.rating) || 0;
                            return (
                                <div key={r.id ?? idx} className="border border-primary rounded-3  card">

                                    <div className="card-header">
                                        <div className="fw-bold text-dark">
                                            {r.user_name || "Anonymous"}
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="" style={{ whiteSpace: "pre-wrap" }}>
                                            {r.review || ""}
                                        </div>
                                        <div className="d-flex justify-content-between align-items-start gap-3">
                                            <div>
                                                <div className="text-primary">
                                                    {Array.from({ length: 5 }).map((_, i) => {
                                                        const star = i + 1;
                                                        const active = rRating >= star;
                                                        return (
                                                            <span key={star} style={{ fontSize: 16, marginRight: 2 }}>
                                                                {active ? "★" : "☆"}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                            {r.created_at && (
                                                <div className="text-muted small">
                                                    {new Date(r.created_at).toLocaleDateString("en-IN")}
                                                </div>
                                            )}
                                        </div>

                                    </div>



                                </div>
                            );
                        })}
                    </div>
                ) : null}
            </div>

            <div className="border border-primary rounded-3 p-3">
                <h6 className="fw-bold">Add a review</h6>
                <form onSubmit={onSubmit} className="mt-3">
                    <div className="mb-3">
                        <label className="form-label fw-bold">Rating</label>
                        <select
                            className="form-select"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            disabled={submitting}
                        >
                            {[1, 2, 3, 4, 5].map((n) => (
                                <option key={n} value={n}>
                                    {n} - {n === 1 ? "Poor" : n === 5 ? "Excellent" : ""}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Review</label>
                        <textarea
                            className="form-control"
                            rows={4}
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Write your review..."
                            disabled={submitting}
                        />
                    </div>

                    {submitMsg && (
                        <div className={`alert ${submitMsg.toLowerCase().includes("success") ? "alert-success" : "alert-danger"}`}>
                            {submitMsg}
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                        {submitting ? "Submitting..." : "Submit Review"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReviewsSection;

