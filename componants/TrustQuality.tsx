import React from "react";
import { ShieldCheck, Award, Factory, Heart, Lock } from "lucide-react";

const TrustQuality = () => {
    const commitments = [
        {
            title: "100% Direct Selling Compliant",
            desc: "Feel Safe Pvt. Ltd. is a legally registered direct selling company under the Companies Act, 2013. We strictly prohibit pyramid schemes and unethical business practices.",
            icon: <ShieldCheck size={32} color="#00A9E0" />,
            bg: "#f0f9ff"
        },
        {
            title: "BIS & ISI Certified Hygiene Products",
            desc: "Our products comply with BIS standards including IS 5405 and IS 17514:2021, ensuring high absorbency, skin safety, and trusted quality.",
            icon: <Award size={32} color="#8DC63F" />,
            bg: "#f7fee7"
        },
        {
            title: "ISO & GMP Certified Manufacturing",
            desc: "We follow ISO-certified quality management systems and GMP-certified manufacturing practices to deliver safe, reliable, and premium hygiene products.",
            icon: <Factory size={32} color="#1C1C1C" />,
            bg: "#f8fafc"
        },
        {
            title: "Women Empowerment Through Sakhi Yojana",
            desc: "Through the Feel Safe Sakhi Yojana, we aim to empower 1 lakh women by 2030 with self-employment and financial independence opportunities across India.",
            icon: <Heart size={32} color="#E6519B" />,
            bg: "#fdf2f8"
        },
        {
            title: "Safe & Secure Online Payments",
            desc: "All payments are protected through secure systems like Razorpay, ensuring encrypted, transparent, and reliable transactions.",
            icon: <Lock size={32} color="#00A9E0" />,
            bg: "#f0f9ff"
        }
    ];

    return (
        <section className="py-5 bg-white">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="fw-bold display-6">Our Commitment to <span style={{ color: "#8DC63F" }}>Trust & Quality</span></h2>
                    <hr className="w-25 mx-auto" style={{ borderTop: "3px solid #E6519B", opacity: 1 }} />
                </div>

                <div className="row g-4 justify-content-center">
                    {commitments.map((item, index) => (
                        <div className={`${index < 3 ? "col-lg-4" : "col-lg-5"} col-md-6`} key={index}>
                            <div className="card h-100 border-0 shadow-sm p-4 transition-hover" style={{ borderRadius: "20px" }}>
                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center mb-4"
                                    style={{ width: "70px", height: "70px", backgroundColor: item.bg }}
                                >
                                    {item.icon}
                                </div>
                                <h5 className="fw-bold mb-3">{item.title}</h5>
                                <p className="text-muted small mb-0 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .transition-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .transition-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,0.08) !important;
        }
        .leading-relaxed {
          line-height: 1.6;
        }
      `}</style>
        </section>
    );
};

export default TrustQuality;