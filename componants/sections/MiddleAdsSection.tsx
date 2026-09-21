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
                      Earn Passive Income
                    </div>
                    <h3 className="banner-title">Build Your 7-Level Empire</h3>
                    <p>Big results come from simple, repeatable actions. You do not need to sponsor dozens of people to build a sustainable organization. By starting with just 2 direct partners and helping them duplicate the process, you unlock commission depth across 7 full generations.</p>
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
                      Daily Essentials, Daily Profits
                    </div>
                    <h3 className="banner-title">Feel Safe, Live Free</h3>
                    <p>Share premium hygiene products everyone needs. Turn every diaper and pad purchase in your network into monthly commissions.</p>
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