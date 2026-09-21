"use client"
import React, { useState, useEffect } from 'react'
import { Mail, MapPin, PhoneCall, Clock, ShieldAlert, CheckCircle2, Send, Loader2, CheckCircle } from "lucide-react";
import { useAuth } from '@/lib/contexts/AuthContext';
import { raiseTicket } from '@/lib/supportApi';
import type { CreateTicketData } from '@/lib/types/Ticket';
import Link from 'next/link';
import LogoCompo from './logo/LogoCompo';

const ContactCompo = () => {
    const { getSettingByKey, user } = useAuth()

    const contact_data = getSettingByKey("contact_us")

    const supportCategories = [
        "Product inquiries",
        "Order & delivery support",
        "Payment & commission queries",
        "Sakhi Yojna joining support",
        "Complaint & grievance handling"
    ];

    // Form state for ticket submission
    const [formData, setFormData] = useState<CreateTicketData>({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry via Contact Form',
        message: '',
        user_id: '',
        user_type: 'ECOM_USER'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Validation states
    const [phoneValid, setPhoneValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);

    const validatePhone = (phone: string): boolean => {
        return phone.length === 10 && /^[6-9]\d{9}$/.test(phone);
    };

    const validateEmail = (email: string): boolean => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };


    // Pre-fill form with user data if logged in
    useEffect(() => {
        if (user) {
            const newFormData = {
                ...formData,
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                user_id: user.id?.toString() || ''
            };
            setFormData(newFormData);
            setPhoneValid(validatePhone(newFormData.phone));
            setEmailValid(validateEmail(newFormData.email));
        }
    }, [user]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate before submit
        if (!phoneValid || !emailValid) {
            setError('Please fix phone and email validation errors.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const result = await raiseTicket(formData) as { success: boolean; message?: string };
            if (result.success) {


                setSuccess('Thank you! Your ticket has been created successfully. You can view it in your account support section.');
                setFormData({
                    name: user?.name || '',
                    email: user?.email || '',
                    phone: user?.phone || '',
                    subject: 'General Inquiry via Contact Form',
                    message: '',
                    user_id: user?.id?.toString() || '',
                    user_type: 'ECOM_USER'
                });
            } else {
                setError(result.message || 'Failed to create ticket. Please try again.');
            }
        } catch (err: any) {
            console.error('Ticket submission error:', err);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <section className="w-100 py-5 text-center section-contactus  " >
                <div className="col-8 mx-auto py-4" style={{ zIndex: 1 }}>
                    <h1 className="display-4 fw-bold" style={{ color: "#fff" }} data-aos="zoom-in-up">
                        Contact <span style={{ color: "#00A9E0" }}>Us</span>
                    </h1>


                    {/* <LogoCompo /> */}
                    <p className="lead text-light mx-auto mb-0" style={{ maxWidth: "700px" }} data-aos="zoom-in-up">
                        We’re here to help you! If you have any questions about our products,
                        services, or Feel Safe Sakhi Yojna, feel free to reach out.
                    </p>
                </div>
            </section>
            <div className="container-fluid  bg-white">

                {/* Header Section */}


                <section className="container py-5">
                    <div className="row g-5">
                        {/* Left Column: Contact Details & Support */}
                        <div className="col-lg-5" data-aos="zoom-in-up">
                            <div className="mb-5">
                                <h3 className="fw-bold mb-4">Get in Touch</h3>

                                {/* Helpline */}
                                <div className="d-flex align-items-center mb-4" >
                                    <div className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0 shadow-sm"
                                        style={{ backgroundColor: "#e0f2fe", width: "50px", height: "50px" }}>
                                        <PhoneCall size={20} color="#00A9E0" />
                                    </div>
                                    <div>
                                        <p className="small fw-bold mb-0">Helpline</p>
                                        <Link href={`tel:${contact_data?.phone}`}>
                                            <p className="text-muted mb-0">+91 {contact_data?.phone || "N/A"}</p>
                                        </Link>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="d-flex align-items-center mb-4">
                                    <div className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0 shadow-sm"
                                        style={{ backgroundColor: "#fdf2f8", width: "50px", height: "50px" }}>
                                        <Mail size={20} color="#E6519B" />
                                    </div>
                                    <div>
                                        <p className="small fw-bold mb-0">Email</p>
                                        <Link href={`mailto:${contact_data?.email_1}`}>
                                            <p className="text-muted mb-0">{contact_data?.email_1 || "N/A"}</p>
                                        </Link>
                                    </div>
                                </div>

                                {/* Office */}
                                <div className="d-flex align-items-start mb-4">
                                    <div className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0 shadow-sm"
                                        style={{ backgroundColor: "#f0fdf4", width: "50px", height: "50px" }}>
                                        <MapPin size={20} color="#8DC63F" />
                                    </div>
                                    <div>
                                        <p className="small fw-bold mb-0">Registered Office</p>
                                        <p className="text-muted small mb-0">
                                            Feel Safe Private Limited<br />
                                            {contact_data?.address || "Khar Khadi Nahar, Najafgarh, New Delhi – 110043"}
                                        </p>
                                    </div>
                                </div>

                                {/* Hours */}
                                <div className="d-flex align-items-center">
                                    <div className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0 shadow-sm"
                                        style={{ backgroundColor: "#fffbeb", width: "50px", height: "50px" }}>
                                        <Clock size={20} color="#d97706" />
                                    </div>
                                    <div>
                                        <p className="small fw-bold mb-0">Business Hours</p>
                                        <p className="text-muted small mb-0">Mon – Sun: 10:00 AM – 6:00 PM</p>
                                    </div>
                                </div>
                            </div>

                            {/* Support Categories */}
                            <div className="p-4 rounded-4 bg-light">
                                <h5 className="fw-bold mb-3">Support & Assistance</h5>
                                <div className="row g-2">
                                    {supportCategories.map((item, i) => (
                                        <div key={i} className="col-12 d-flex align-items-center">
                                            <CheckCircle2 size={16} className="me-2 text-success" />
                                            <span className="small text-muted">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Form & Grievance */}
                        <div className="col-lg-7" data-aos="zoom-in-down">
                            <div className="card border-0 shadow-lg p-4 p-md-5 rounded-4 mb-4">
                                <h3 className="fw-bold mb-4">Send us a Message</h3>
                                <form onSubmit={handleSubmit}>
                                    {error && (
                                        <div className="alert alert-danger border-0 rounded-3 mb-4 small">
                                            <ShieldAlert size={16} className="me-2" /> {error}
                                        </div>
                                    )}
                                    {success && (
                                        <div className="alert alert-success border-0 rounded-3 mb-4 small">
                                            <CheckCircle size={16} className="me-2" /> {success}
                                        </div>
                                    )}
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                className="form-control bg-light border-0 py-3"
                                                placeholder="Full Name *"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <input
                                                type="tel"
                                                className={`form-control bg-light border-0 py-3 ${!phoneValid ? 'is-invalid border-danger' : ''}`}
                                                placeholder="Phone Number * (10 digits, starts with 6-9)"
                                                value={formData.phone}
                                                onChange={(e) => {
                                                    const newPhone = e.target.value;
                                                    setFormData({ ...formData, phone: newPhone });
                                                    setPhoneValid(validatePhone(newPhone));
                                                }}
                                                required
                                            />
                                        </div>

                                        <div className="col-12">
                                            <input
                                                type="email"
                                                className={`form-control bg-light border-0 py-3 ${!emailValid ? 'is-invalid border-danger' : ''}`}
                                                placeholder="Email Address *"
                                                value={formData.email}
                                                onChange={(e) => {
                                                    const newEmail = e.target.value;
                                                    setFormData({ ...formData, email: newEmail });
                                                    setEmailValid(validateEmail(newEmail));
                                                }}
                                                required
                                            />
                                        </div>

                                        <div className="col-12">
                                            <textarea
                                                className="form-control bg-light border-0 py-3"
                                                rows={4}
                                                placeholder="How can we help you? *"
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="col-12">
                                            <button
                                                type="submit"
                                                className="btn w-100 text-white fw-bold py-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
                                                style={{ backgroundColor: "#00A9E0" }}
                                                disabled={loading}
                                            >
                                                {loading ? (
                                                    <>
                                                        <Loader2 className="animate-spin" size={20} />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send size={20} />
                                                        Send Message
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </form>

                            </div>

                            {/* Grievance Redressal Card */}
                            <div className="card border-0 shadow-sm p-4 rounded-4" style={{ backgroundColor: "#fff5f5", borderLeft: "5px solid #f87171" }}>
                                <div className="d-flex align-items-center mb-3">
                                    <ShieldAlert className="me-2 text-primary" size={24} />
                                    <h5 className="fw-bold mb-0 text-primary">Grievance Redressal</h5>
                                </div>
                                <p className="small text-muted mb-3">
                                    For any complaints or issues, we aim to respond within 24–48 working hours.
                                </p>
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <p className="small mb-0 fw-bold">Email</p>
                                        <p className="small text-muted"><Link href="mailto:grievance@feelsafeco.in">grievance@feelsafeco.in</Link></p>
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="small mb-0 fw-bold">Mobile</p>
                                        <p className="small text-muted"><Link href="tel:+918796262996">+91 8796262996</Link></p>
                                    </div>
                                    <div className="col-12 border-top pt-2 mt-2">
                                        <p className="small text-muted mb-0">
                                            <strong>Availability:</strong> Mon – Sat: 10:00 AM – 6:00 PM (Sunday Closed)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA: Become a Sakhi */}
                <section className="container mb-5">
                    <div className="p-4 p-md-5 rounded-4 text-center text-white shadow" style={{ backgroundColor: "#8DC63F" }}>
                        <h3 className="fw-bold mb-3" data-aos="zoom-in-up">Become a Sakhi (Join Us)</h3>
                        <p className="mb-4" data-aos="zoom-in-up">Interested in earning and becoming financially independent? Join our Feel Safe Sakhi Yojna today!</p>
                        <div className="d-flex justify-content-center gap-3" data-aos="zoom-in">
                            <button className="btn btn-light fw-bold px-4 py-2 text-success" onClick={() => {
                                navigation.navigate('/become-distributor')
                            }}>Register Now</button>
                            {/* <div className="d-flex gap-2 align-items-center d-none d-md-flex ms-3">
                            <Facebook size={20} className="cursor-pointer" />
                            <Instagram size={20} className="cursor-pointer" />
                            <Youtube size={20} className="cursor-pointer" />
                        </div> */}
                        </div>
                    </div>
                </section>

                {/* Google Maps Placeholder */}
                <section className="container-fluid p-0">
                    <iframe
                        title="Office Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.4994864012!2d76.95625707613596!3d28.58478878624607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d11e61984d5f9%3A0x4ae2e472ac31c46b!2sFeel%20Safe%20Co.!5e0!3m2!1sen!2sin!4v1777981572791!5m2!1sen!2sin"
                        width="100%"
                        height="400"
                        style={{ border: 0, filter: "grayscale(0.2)" }}
                        allowFullScreen=""
                        loading="lazy">
                    </iframe>
                </section>
            </div>
        </>
    )
}

export default ContactCompo;