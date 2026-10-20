import Link from "next/link";
import React from "react";

const MiddleAdsSection = () => {
  return (
    <section className="py-5 section21" >
      <div className="container-fluid py-5">
        <div className="row">
          <div className="col-md-12 col-lg-6 col-12 mr-auto">
            <div className="row">
              <div className="col-lg-12 col-md-6 col-12 text-right" data-aos="slide-up">
                {/* Added custom-hover-banner class */}
                <div
                  className="banner-ad mb-3 me-auto blue e-banner custom-hover-banner"
                  style={{
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right bottom",
                  }}
                >
                  <div className="banner-content p-md-5 p-4">
                    <div className="categories fs-5 fw-bold">
                      Feel Safe 
                    </div>
                    <h3 className="banner-title">Empower Sakhis. Build Leaders. Grow Together.</h3>
                    <p>Sakhis play a vital role in expanding the Feel Safe community by promoting products, supporting team members, and developing new leaders.</p>
                    <p> Benefits: Eligible generation-based overrides, performance-linked bonuses, leadership development, and long-term growth opportunities as per the plan rules.</p>
                    <p>Feel Safe – Empowering Every Sakhi Towards Self-Reliance!</p>
                    <Link href="/become-distributor" className="btn btn-dark text-uppercase">
                      Start Earning
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 col-md-6 col-12" data-aos="slide-up">
                {/* Added custom-hover-banner class and removed explicit text-light/text-primary overrides */}
                <div
                  className="banner-ad blue e-banner custom-hover-banner"
                  style={{
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right bottom",
                  }}
                >
                  <div className="banner-content p-md-5 p-4">
                    <div className="categories fs-5 fw-bold">
                      Daily Essentials, Growing Income
                    </div>
                    <h3 className="banner-title">Feel Safe, Live Free</h3>
                    <p>Promote everyday hygiene products and earn eligible commissions through sales.</p>
                    <p>
                      Join Feel Safe Sakhi Yojna Today! Register Now and Take Your First Step Towards Financial Independence.
                    </p>
                    <Link href="https://panel.feelsafeco.in/signup" target="_blank" className="btn btn-dark text-uppercase me-2">
                      Join Now
                    </Link>
                    <Link href="https://panel.feelsafeco.in/signin" target="_blank" title="if already registered? Please login" className="btn btn-dark text-uppercase">
                      Login Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MiddleAdsSection;