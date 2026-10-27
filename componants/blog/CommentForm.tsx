"use client";

import { useState, type FormEvent } from "react";
import serverCallFuction from "@/lib/constantFunction";

export default function CommentForm({ postId }: { postId: string | number }) {
  const [form, setForm] = useState({
    user_full_name: "",
    user_phone: "",
    user_email: "",
    comment_text: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(
    null,
  );

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setResult(null);

    if (!/^\d{10}$/.test(form.user_phone.trim())) {
      setResult({ ok: false, message: "Please enter a valid 10-digit phone number." });
      return;
    }

    setSubmitting(true);
    const numericId = Number(postId);
    const response = await serverCallFuction("POST", "api/blog/comment", {
      post_id: Number.isNaN(numericId) ? String(postId) : numericId,
      user_full_name: form.user_full_name.trim(),
      user_phone: form.user_phone.trim(),
      user_email: form.user_email.trim(),
      comment_text: form.comment_text.trim(),
    });
    setSubmitting(false);

    if ("status" in response && response.status === false) {
      setResult({
        ok: false,
        message: String(response.message || "Could not post comment."),
      });
      return;
    }

    setForm({ user_full_name: "", user_phone: "", user_email: "", comment_text: "" });
    setResult({ ok: true, message: "Thank you! Your comment has been submitted." });
  };

  return (
    <form onSubmit={onSubmit} className="mt-4 p-3 p-md-4 bg-white rounded shadow-sm">
      <h5 className="mb-3">Leave a comment</h5>
      <div className="row g-3">
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Full name"
            required
            value={form.user_full_name}
            onChange={(e) => update("user_full_name", e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Phone (10 digits)"
            required
            inputMode="numeric"
            maxLength={10}
            value={form.user_phone}
            onChange={(e) => update("user_phone", e.target.value.replace(/\D/g, ""))}
          />
        </div>
        <div className="col-md-4">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            required
            value={form.user_email}
            onChange={(e) => update("user_email", e.target.value)}
          />
        </div>
        <div className="col-12">
          <textarea
            className="form-control"
            rows={4}
            placeholder="Write your comment..."
            required
            value={form.comment_text}
            onChange={(e) => update("comment_text", e.target.value)}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </div>
      {result && (
        <div
          className={`alert mt-3 mb-0 ${result.ok ? "alert-success" : "alert-danger"}`}
          role="alert"
        >
          {result.message}
        </div>
      )}
    </form>
  );
}
