"use client"
import React from 'react'
import { Mail, MapPin, PhoneCall, ShieldCheck, Heart, Leaf, Users, Award, TrendingUp, CheckCircle } from "lucide-react";
import { Icon } from "@iconify/react";
import { useAuth } from '@/lib/contexts/AuthContext';
import { ContactData } from '@/lib/types/Setting';
import LogoCompo from './logo/LogoCompo';
import TrustQuality from './TrustQuality';
import Link from 'next/link';
const AboutCompo = () => {

    const { setting, getSettingByKey } = useAuth();

    const [contactData, setContactData] = React.useState<ContactData | null>(null);



    React.useEffect(() => {
        let active = true;

        const loadContactData = async () => {
            try {
                const data = await getSettingByKey("contact_us") as ContactData;
                console.log("data - contact data = ", data);

                if (active) {
                    setContactData(data);
                }
            } catch (error) {
                console.error("Failed to load contact data", error);
            }
        };

        loadContactData();

        return () => {
            active = false;
        };
    }, [setting]);




    return (
        <div className="container-fluid p-0 bg-white overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

            {/* Hero Section */}
            <section className="py-5" style={{ background: "linear-gradient(135deg, #fdf2f8 0%, #e0f2fe 100%)" }}>
                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-lg-12 mx-auto">
                            {/* Branding Badge */}
                            <span className="badge px-3 py-2 mb-3 rounded-pill" style={{ backgroundColor: "#8DC63F", color: "#fff" }} data-aos="zoom-in-up">
                                CIN: U13996DL2026PTC465812
                            </span>

                            <div className="mb-4" data-aos="zoom-in-down">
                                <LogoCompo notCenter={true} />
                                <h2 className="fw-bold mt-3" style={{ color: "#1C1C1C" }}>
                                    India’s Trusted Women Hygiene & Empowerment Brand
                                </h2>
                            </div>

                            {/* Introduction Text */}
                            <div className="col-lg-12 ps-0 mb-5">
                                <p className="lead text-dark fw-bold mb-3" data-aos="zoom-in-down">
                                    Welcome to Feel Safe Pvt. Ltd. — a women-focused health and hygiene company dedicated to providing affordable sanitary pads, hygiene products, and women empowerment opportunities across India.
                                </p>
                                <p className="text-muted mb-3" data-aos="zoom-in-down">
                                    Since 2026, Feel Safe has been working to spread menstrual hygiene awareness and help women become financially independent through our “Feel Safe Sakhi Yojna” direct selling network. Our mission is to improve women’s health, confidence, and self-reliance while promoting eco-friendly and safe hygiene solutions.
                                </p>
                                <p className="text-muted" data-aos="zoom-in-down">
                                    We believe every woman deserves access to quality sanitary napkins, hygiene education, and income opportunities. That’s why our products are designed for comfort, safety, and affordability — trusted by families, distributors, and customers nationwide.
                                </p>
                            </div>

                            {/* Why Choose Us Grid */}
                            <div className="mb-5" data-aos="zoom-in-up">
                                <h4 className="fw-bold mb-4" style={{ color: "#E6519B" }}>Why Choose Feel Safe?</h4>
                                <div className="row g-3">
                                    {[
                                        "Premium Quality Sanitary Pads",
                                        "Affordable & Eco-Friendly Hygiene Products",
                                        "Women Empowerment & Self-Employment Opportunities",
                                        "Direct Selling & Sakhi Network Across India",
                                        "Menstrual Health & Hygiene Awareness Campaigns",
                                        "Made in India Hygiene Brand"
                                    ].map((item, index) => (
                                        <div key={index} className="col-md-6 col-lg-4">
                                            <div className="d-flex align-items-center p-2 rounded bg-white shadow-sm border-start border-4" style={{ borderColor: "#8DC63F" }}>
                                                <span className="me-2 text-success">✔️</span>
                                                <span className="small fw-bold text-secondary">{item}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer Tagline */}
                            <p className="fw-bold mb-4" style={{ color: "#1C1C1C" }} data-aos="zoom-in-up">
                                Feel Safe Pvt. Ltd. — Your Health, Your Confidence, Our Responsibility.
                            </p>

                            {/* Action Buttons */}
                            <div className="d-flex gap-3 flex-column flex-md-row" data-aos="zoom-in-up">
                                <button className="btn btn-lg shadow-sm px-4 text-white border-0"
                                    style={{ backgroundColor: "#00A9E0" }}
                                    onClick={() => navigation.navigate("/become-distributor")}
                                >
                                    Join Sakhi Mission
                                </button>
                                <button className="btn btn-lg btn-outline-dark px-4"
                                    onClick={() => navigation.navigate('/products')}
                                >
                                    Our Products
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Identity & Core Values */}
            <section className="py-5 container text-center">
                <div className="row mb-5" data-aos="zoom-in-up">
                    <div className="col-md-8 mx-auto">
                        <h2 className="fw-bold mb-3">Our Identity</h2>
                        <p>Feel Safe Pvt Ltd, founded by <strong>Smt. Sharbati & Shri Ram Niwas,</strong> is a premier corporate organization dedicated to the pillars of quality, integrity, and social impact. As a leader in feminine hygiene, we operate with a dual-purpose mission: to deliver world-class healthcare products and to catalyze economic independence for women. Our identity is defined by our commitment to excellence and our drive to create a safer, more self-reliant future for every woman</p>

                    </div>
                </div>
                <div className="row g-4">
                    {[
                        { icon: <ShieldCheck size={40} />, title: "Mission", text: "Providing safe, affordable, high-quality sanitary products.", color: "#00A9E0", bg: "#e0f2fe" },
                        { icon: <Heart size={40} />, title: "Vision", text: "An India where menstrual health awareness is normalized.", color: "#E6519B", bg: "#fdf2f8" },
                        { icon: <Leaf size={40} />, title: "Sustainability", text: "Safe hygiene solutions for a healthier tomorrow.", color: "#8DC63F", bg: "#f0fdf4" }
                    ].map((item, index) => (
                        <div className="col-md-4" key={index} data-aos="zoom-in">
                            <div className="p-5 rounded-4 h-100 border-0 shadow-sm transition-hover" style={{ backgroundColor: item.bg }}>
                                <div className="mb-3" style={{ color: item.color }}>{item.icon}</div>
                                <h4 className="fw-bold">{item.title}</h4>
                                <p className="text-muted mb-0">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Product Highlight */}
            <section className="py-5 bg-light rounded">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6" data-aos="zoom-in-up">
                            <h6 className="text-uppercase fw-bold" style={{ color: "#8DC63F" }}>Flagship Brand</h6>
                            <h2 className="display-5 fw-bold mb-4">FEEL <span style={{ color: "#E6519B" }}>Sanitary Pads</span></h2>
                            <ul className="list-unstyled">
                                {[
                                    "100% Hygiene Protection",
                                    "Skin-friendly Material",
                                    "High Absorbency for long-lasting protection",
                                    "ISO 9001:2015 & ISO 13485 Certified"
                                ].map((text, i) => (
                                    <li key={i} className="mb-3 d-flex align-items-center">
                                        <CheckCircle className="me-2" size={20} color="#8DC63F" />
                                        <span className="text-muted fs-5">{text}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="alert bg-white border-start border-4 border-info shadow-sm mt-4">
                                We strictly adhere to <strong>Bureau of Indian Standards (BIS)</strong> guidelines.
                            </div>
                        </div>
                        <div className="col-lg-6 text-center" data-aos="zoom-in-down">
                            <div className="p-5 d-inline-block shadow-lg bg-white overflow-hidden">
                                {/* <Icon icon="solar:shield-user-bold" style={{ fontSize: "180px", color: "#00A9E0" }} /> */}
                                <img src="/assets/images/certificate_logs.jpg" alt="Feel Sanitary Pad" className='img-fluid' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sakhi Yojna Section */}
            <section className="py-5 bg-gray mt-4 rounded" style={{ backgroundColor: "#ffb9dc" }}>
                <div className="container py-4">
                    <div className="row">
                        <div className=" col-12 text-center mb-2" data-aos="zoom-in-up">
                            <h2 className="display-6 fw-bold">Vision 2030: <span style={{ color: "#E6519B" }}>1 Lakh Sakhi Mission</span></h2>
                            <p className="lead opacity-75 text-dark">Empowering women as Entrepreneurs, Leaders, and Health Ambassadors.</p>
                        </div>

                        <div className=" col-12 text-center mb-5" data-aos="zoom-in">
                            <p className="lead opacity-75 text-dark"><strong>Our Core Objective:</strong> At Feel Safe Pvt Ltd, our vision extends beyond business. Under the leadership of our founders, Smt. Sharbati & Shri Ram Niwas, we are committed to building a nation where every woman is healthy, safe, and financially independent. Our goal is to create a robust network of 100,000 Sakhis by 2030, transforming the landscape of menstrual hygiene in India.</p>
                        </div>
                    </div>
                    <div className="row g-4 text-center justify-content-center" data-aos="zoom-in">
                        {[
                            {
                                step: "1",
                                title: "Economic Empowerment",
                                desc: "To provide a sustainable and scalable income platform for women with Zero Registration Fees, fostering true financial autonomy."
                            },
                            {
                                step: "2",
                                title: "Menstrual Health Revolution",
                                desc: "To ensure that every household has access to premium, BIS and ISO-certified hygiene products featuring advanced 7-layer protection."
                            },
                            {
                                step: "3",
                                title: "Skill & Leadership Development",
                                desc: "To equip our Sakhis with professional training in sales, digital marketing, and health advocacy, turning them into community leaders."
                            },
                            {
                                step: "4",
                                title: "Eradicating Social Stigma",
                                desc: "To dismantle the age-old taboos surrounding menstruation through continuous education and grassroots awareness campaigns."
                            },
                            {
                                step: "5",
                                title: "Quality & Trust",
                                desc: "To maintain uncompromising manufacturing standards as a GMP-certified entity, ensuring the highest medical-grade safety for our users."
                            },
                            {
                                step: "6",
                                title: "Atmanirbhar Bharat Initiative",
                                desc: "To contribute to the national mission of self-reliance by promoting local entrepreneurship and a women-led direct-selling model."
                            },
                            {
                                step: "7",
                                title: "Legal & Ethical Excellence",
                                desc: "To operate with 100% transparency as a registered Private Limited organization, upholding the interests of our partners and customers (CIN: U13996DL2026PTC465812)."
                            },
                            {
                                step: "8",
                                title: "Community Wellness & Health",
                                desc: "Bringing health awareness to every home and empowering women as pillars of wellness for their entire family."
                            }
                        ].map((item, i) => (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" key={i}>
                                {/* The styling is moved to this inner wrapper div to allow proper spacing */}
                                <div className="border rounded-4 p-3 h-100  align-items-center">
                                    <div className="h1 fw-bold text-dark mb-0" style={{ fontSize: '4rem' }}>{item.step}</div>
                                    <h5 className="fw-bold" style={{ color: "#E6519B" }}>{item.title}</h5>
                                    <p className="small opacity-75 text-dark mb-0">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Compliance & Contact */}
            <section className="py-5"   >
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-4" data-aos="zoom-in-up">
                            <div className="card border-0 shadow-sm p-4 h-100">
                                <h4 className="fw-bold mb-4">Contact Info</h4>
                                <div className="d-flex mb-4">
                                    <PhoneCall className="me-3" color="#00A9E0" />
                                    <div>
                                        <p className="mb-0 fw-bold">24x7 Support</p>
                                        <Link href={`tel:+91${contactData?.phone}`}><p className="text-muted">+91 {contactData?.phone}</p></Link>
                                    </div>
                                </div>
                                <div className="d-flex mb-4">
                                    <Mail className="me-3" color="#E6519B" />
                                    <div>
                                        <p className="mb-0 fw-bold">Email Us</p>
                                        <Link href={`mailto:${contactData?.email_1}`}><p className="text-muted">+91 {contactData?.email_1}</p></Link>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <MapPin className="me-3" color="#8DC63F" />
                                    <div>
                                        <p className="mb-0 fw-bold">Location</p>
                                        <p className="text-muted small">{contactData?.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8" data-aos="zoom-in-down">
                            <div className="card border-0 shadow-sm p-4 h-100 bg-light">
                                <h4 className="fw-bold mb-3 text-center">Legal Compliance & Ethical Standards</h4>
                                <p className="text-center text-muted px-lg-5 mb-4">
                                    At Feel Safe Pvt. Ltd.
                                    , we are committed to transparency, ethical business practices, and women empowerment through a legally compliant direct selling model in India. Our operations strictly follow the Consumer Protection (Direct Selling) Rules, 2021 and Government of India guidelines.
                                </p>
                                <div className="row text-center g-3">
                                    <div className="col-6 col-md-3">
                                        <div className="p-3 bg-white rounded shadow-sm">
                                            <TrendingUp size={24} color="#8DC63F" className="mb-2" />
                                            <p className="small fw-bold mb-0">Direct Selling</p>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <div className="p-3 bg-white rounded shadow-sm">
                                            <Award size={24} color="#00A9E0" className="mb-2" />
                                            <p className="small fw-bold mb-0">ISO Certified</p>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <div className="p-3 bg-white rounded shadow-sm">
                                            <Users size={24} color="#E6519B" className="mb-2" />
                                            <p className="small fw-bold mb-0">1 Lakh Sakhis</p>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <div className="p-3 bg-white rounded shadow-sm">
                                            <ShieldCheck size={24} color="#00A9E0" className="mb-2" />
                                            <p className="small fw-bold mb-0">BIS Standards</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <TrustQuality />


            {/* Grievance Footer Section */}
            <section className="py-4 border-top" data-aos="zoom-in-up">
                <div className="container text-center">
                    <p className="text-muted small mb-0">
                        For legal concerns, contact our <strong>Grievance Cell</strong>: <Link href="mailto:grievance@feelsafeco.in">grievance@feelsafeco.in</Link> | <Link href={"+918796262996"}>+91 8796262996</Link>
                    </p>
                </div>
            </section>

        </div>
    )
}

export default AboutCompo
