"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/lib/contexts/AuthContext";
import serverCallFuction from "@/lib/constantFunction";

type ChatRole = "user" | "assistant";

type ChatMessage = {
    role: ChatRole;
    text: string;
    timestamp: number;
};

const Chatbot = () => {
    const { isAuthenticated } = useAuth();

    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [kycLocked, setKycLocked] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (open) {
            setError(null);
        }
    }, [open]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length, open]);

    const canSend = useMemo(() => {
        return !loading && !kycLocked && input.trim().length > 0;
    }, [loading, kycLocked, input]);

    const handleSend = async () => {
        const message = input.trim();
        if (!message) return;

        setError(null);
        setLoading(true);
        setInput("");

        setMessages((prev) => [
            ...prev,
            { role: "user", text: message, timestamp: Date.now() },
        ]);

        try {
            const res = await serverCallFuction('POST', "api/chatbot/message", { message });
            console.log("chatbot - ", res);
            if (res.status) {

                const payload = res;

                if (payload?.reply) {
                    setMessages((prev) => [
                        ...prev,
                        { role: "assistant", text: payload.reply, timestamp: Date.now() },
                    ]);
                } else {
                    setMessages((prev) => [
                        ...prev,
                        {
                            role: "assistant",
                            text: "Sorry, I couldn't process that request.",
                            timestamp: Date.now(),
                        },
                    ]);
                }

            } else {
                if (res.message === "No token, authorization denied") {
                    setMessages((prev) => [
                        ...prev,
                        { role: "assistant", text: "Please login first", timestamp: Date.now() },
                    ]);
                } else {
                    setMessages((prev) => [
                        ...prev,
                        { role: "assistant", text: res.message, timestamp: Date.now() },
                    ]);
                }

            }

        } catch (err: any) {
            const res = err?.response;
            const status = res?.status;
            const data = res?.data;

            if (status === 202) {
                setKycLocked(true);
                const msg = data?.message || "KYC not completed";
                setMessages((prev: ChatMessage[]) => [
                    ...prev,
                    { role: "assistant", text: msg, timestamp: Date.now() },
                ]);
                setError(msg);
                return;
            }

            const msg = data?.message || "Chatbot request failed";
            setError(msg);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", text: msg, timestamp: Date.now() },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const quickHelp = () => {
        if (!isAuthenticated) {
            return "Please login to use chatbot.";
        }
        if (kycLocked) {
            return "KYC is required to continue. Please complete KYC.";
        }
        return "Try: Track order ORD-2024-1001, My address, etc.";
    };

    return (
        <>
            <style jsx>{`
        .chatbot-fab {
          position: fixed;
          right: 40px;
          bottom: 110px;
          z-index: 9999;
          width: 56px;
          height: 56px;
          border-radius: 9999px;
          background: #0ea5e9;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          border: none;
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        .chatbot-fab:active {
          transform: scale(0.98);
        }
        .chatbot-panel {
          position: fixed;
          right: 40px;
          bottom: 110px;
          width: 340px;
          max-width: calc(100vw - 36px);
          height: 460px;
          max-height: calc(100vh - 120px);
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
          z-index: 9999;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(0,0,0,0.06);
        }
        .chatbot-header {
          padding: 12px 14px;
          background: #0ea5e9;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
        .chatbot-header strong {
          font-size: 14px;
        }
        .chatbot-close {
          background: rgba(255,255,255,0.18);
          border: none;
          color: #fff;
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 8px;
        }
        .chatbot-body {
          padding: 12px 12px 0;
          overflow: auto;
          flex: 1;
          background: linear-gradient(180deg, #f8fafc 0%, #ffffff 60%);
        }
        .chatbot-msg {
          margin: 10px 0;
          display: flex;
        }
        .chatbot-msg.user { justify-content: flex-end; }
        .chatbot-bubble {
          max-width: 85%;
          padding: 10px 12px;
          border-radius: 14px;
          font-size: 13px;
          line-height: 1.35;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .chatbot-msg.user .chatbot-bubble {
          background: #0ea5e9;
          color: #fff;
          border-bottom-right-radius: 6px;
        }
        .chatbot-msg.assistant .chatbot-bubble {
          background: #ffffff;
          color: #0f172a;
          border: 1px solid rgba(0,0,0,0.06);
          border-bottom-left-radius: 6px;
        }
        .chatbot-hint {
          padding: 0 12px 10px;
          color: #64748b;
          font-size: 12px;
        }
        .chatbot-footer {
          padding: 10px;
          border-top: 1px solid rgba(0,0,0,0.06);
          background: #ffffff;
        }
        .chatbot-input-row {
          display: flex;
          gap: 8px;
        }
        .chatbot-input {
          flex: 1;
          border: 1px solid rgba(0,0,0,0.12);
          border-radius: 12px;
          padding: 10px 12px;
          font-size: 13px;
          outline: none;
          background: #fff;
        }
        .chatbot-send {
          background: #0ea5e9;
          border: none;
          color: #fff;
          font-weight: 600;
          border-radius: 12px;
          padding: 10px 12px;
          width: 86px;
          cursor: pointer;
        }
        .chatbot-send:disabled {
          background: #7dd3fc;
          cursor: not-allowed;
        }
        .chatbot-error {
          margin-top: 8px;
          font-size: 12px;
          color: #dc2626;
        }
      `}</style>

            {!open && (
                <button
                    type="button"
                    className="chatbot-fab"
                    aria-label="Open chatbot"
                    onClick={() => setOpen(true)}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 3C7.03 3 3 6.58 3 11c0 2.33 1.06 4.43 2.75 5.9L5 21l4.47-2.34c.83.19 1.7.34 2.53.34 4.97 0 9-3.58 9-8 0-4.42-4.03-8-9-8Z"
                            stroke="white"
                            strokeWidth="1.6"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8 11h.01M12 11h.01M16 11h.01"
                            stroke="white"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>
            )}

            {open && (
                <div className="chatbot-panel" role="dialog" aria-label="Chatbot">
                    <div className="chatbot-header">
                        <strong>Chat with Feel Safe</strong>
                        <button
                            type="button"
                            className="chatbot-close"
                            aria-label="Close chatbot"
                            onClick={() => setOpen(false)}
                        >
                            ✕
                        </button>
                    </div>

                    <div className="chatbot-hint">{quickHelp()}</div>

                    <div className="chatbot-body">
                        {messages.length === 0 ? (
                            <div className="chatbot-msg assistant">
                                <div className="chatbot-bubble">
                                    Hi! I can help with order tracking, addresses, etc.
                                </div>
                            </div>
                        ) : (
                            messages.map((m, idx) => (
                                <div key={idx} className={`chatbot-msg ${m.role}`}>
                                    <div className="chatbot-bubble">{m.text}</div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chatbot-footer">
                        <div className="chatbot-input-row">
                            <input
                                className="chatbot-input"
                                value={input}
                                placeholder={kycLocked ? "KYC required" : "Type your message..."}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && canSend) {
                                        void handleSend();
                                    }
                                }}
                                disabled={loading || kycLocked}
                            />
                            <button
                                type="button"
                                className="chatbot-send"
                                disabled={!canSend}
                                onClick={() => void handleSend()}
                            >
                                {loading ? "Sending..." : "Send"}
                            </button>
                        </div>
                        {error && <div className="chatbot-error">{error}</div>}
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;

