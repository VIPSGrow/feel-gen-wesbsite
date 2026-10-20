import React from 'react';
import { ShieldCheck, Leaf, Award, Users, Heart } from 'lucide-react';

const MissionSection = () => {
    return (
        <section className="py-5 bg-white" >
            <div className="container">
                {/* --- Header Section --- */}
                <div className="text-center mb-5">
                    <h2 className="display-5 fw-bold text-primary" data-aos="zoom-in">Premium Quality & Ultimate Protection</h2>
                    <p className="lead text-muted mx-auto" style={{ maxWidth: '800px' }} data-aos="zoom-in">
                        Feel Safe Pvt. Ltd. – India’s Trusted Home for Hygiene Solutions
                    </p>
                    <div className="mt-3" data-aos="zoom-in">
                        <p>
                            Welcome to <strong>Feel Safe Pvt. Ltd.</strong>, a premier name dedicated to high-quality hygiene and care.
                            Our flagship brand, <strong>‘Feel’</strong>, is designed to provide every woman with the comfort, health,
                            and confidence she deserves. We bring you products that are safe for you and kind to the environment.
                        </p>
                    </div>
                </div>

                {/* --- Product Excellence Section --- */}
                <div className="row align-items-center mb-5 g-4" data-aos="zoom-in">
                    <div className="col-lg-6">
                        <h3 className="fw-bold mb-4">Experience the ‘Feel’ Difference</h3>
                        <p className="text-muted">
                            Feel by Feel Safe Pvt. Ltd. offers Ultra Thin Anion Sanitary Pads with Wings,
                            crafted with advanced Gel Technology. We ensure that your protection is uncompromising
                            and your comfort is absolute.
                        </p>
                        <ul className="list-unstyled mt-4">
                            <li className="d-flex mb-3">
                                <div className="bg-primary-subtle p-2 rounded-circle me-3 w-2 h-2 d-flex align-items-center justify-content-center">
                                    <ShieldCheck className="text-primary" size={24} />
                                </div>
                                <div>
                                    <strong>Quick Absorption:</strong> High-performance gel core that locks moisture instantly for a dry experience.
                                </div>
                            </li>
                            <li className="d-flex mb-3">
                                <div className="bg-primary-subtle p-2 rounded-circle me-3 w-2 h-2 d-flex align-items-center justify-content-center">
                                    <Heart className="text-primary" size={24} />
                                </div>
                                <div>
                                    <strong>Superior Cotton Feel:</strong> A soft, breathable top layer designed for a rash-free and silky touch.
                                </div>
                            </li>
                            <li className="d-flex mb-3">
                                <div className="bg-primary-subtle p-2 rounded-circle me-3 w-2 h-2 d-flex align-items-center justify-content-center">
                                    <Leaf className="text-primary" size={24} />
                                </div>
                                <div>
                                    <strong>Safety You Can Trust:</strong> Our products are Anti-bacterial, Chemical-free, and Eco-friendly.
                                </div>
                            </li>
                            <li className="d-flex mb-3">
                                <div className="bg-primary-subtle p-2 rounded-circle me-3 w-2 h-2 d-flex align-items-center justify-content-center">
                                    <Award className="text-primary" size={24} />
                                </div>
                                <div>
                                    <strong>Certified Excellence:</strong> BIS, GMP, and ISO Certified, ensuring the highest international standards.
                                </div>
                            </li>
                        </ul>
                        <div className="alert alert-primary text-center fw-bold mt-4">
                            हमारा प्रयास, आपकी सुरक्षा (Our Effort, Your Protection)
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <img
                            src="/assets/banners-ai/pro_image_feel_safe.png"
                            alt="Feel Sanitary Pads"
                            className="img-fluid rounded-4 shadow"
                        />
                    </div>
                </div>

                {/* --- Empowerment Section (Sakhi Yojna) --- */}

            </div>
            <div
                className="py-5 d-flex align-items-center justify-content-center"
                style={{
                    backgroundImage: "url('/assets/images/empower.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    minHeight: "80vh"
                }}
            >
                <div className="container">
                    <div
                        className="px-4 py-4 p-md-5 rounded-5 border border-white border-opacity-25 shadow-lg"
                        data-aos="zoom-in"
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.56)", // Semi-transparent background
                            backdropFilter: "blur(5px)",                 // Glassmorphism blur effect
                            WebkitBackdropFilter: "blur(5px)",           // Safari support
                        }}
                    >
                        <div className="row g-4 align-items-center">
                            <div className="col-md-12 text-center mb-4">
                                <h3 className="display-6 fw-bold text-dark">Empowering Bharat: Feel Safe Sakhi Yojna</h3>
                                <p className="text-secondary mb-0">
                                    At Feel Safe Pvt. Ltd., our vision goes beyond hygiene. We are committed to the national mission of "Vocal for Local" and building an "Atmanirbhar Bharat".
                                </p>
                            </div>

                            <div className="col-md-4 text-center">
                                <div className="mb-3"><Users size={48} className="text-primary" /></div>
                                <h5 className="fw-semibold">Vocal for Local</h5>
                                <p className="small text-secondary mb-0">Proudly made in Bharat, supporting local communities and local growth.</p>
                            </div>

                            <div className="col-md-4 text-center border-start border-end border-secondary border-opacity-25">
                                <div className="mb-3"><Heart size={48} className="text-primary" /></div>
                                <h5 className="fw-semibold">Atmanirbhar Bharat</h5>
                                <p className="small text-secondary mb-0">Fostering independence by empowering women to become self-reliant leaders.</p>
                            </div>

                            <div className="col-md-4 text-center">
                                <div className="mb-3"><Award size={48} className="text-primary" /></div>
                                <h5 className="fw-semibold">A Shared Mission</h5>
                                <p className="small text-secondary mb-0">Every Sakhi is a step towards a stronger, healthier, and more empowered India.</p>
                            </div>

                            <div className="col-12 mt-4 text-center">
                                <p className="fst-italic text-dark mb-0 fw-medium">
                                    "Through our Feel Safe Sakhi Yojna, we are creating a powerful network of women entrepreneurs. We don't just provide a product; we provide a source of income and a path to financial independence."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MissionSection;