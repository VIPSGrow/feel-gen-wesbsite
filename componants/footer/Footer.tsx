"use client"
import React from "react";
import KeywordSection from "./KeywordSection";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {

  const { getSettingByKey } = useAuth();
  const contact_data = getSettingByKey("contact_us");

  return (
    <>
      <KeywordSection />
      <footer className="py-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="footer-menu  text-center">
                <Link href={"/"} className="navbar-brand d-flex align-items-center justify-content-center mb-3">
                  <img
                    src="/assets/images/logo-footer.png"
                    alt="logo"
                    className="w-50 mx-auto"
                  />
                </Link>
                <p className="p-0 m-0 card-text">
                  Since 2026, Feel Safe Pvt. Ltd.
                  has been empowering women through affordable hygiene products, menstrual health awareness, and women-led direct selling opportunities. Our mission is to promote health, self-reliance, and eco-friendly living across India.
                </p>
                <div className="social-links mt-2 text-center mx-auto" style={{ width: 'fit-content' }}>
                  <ul className="d-flex list-unstyled gap-2 mx-auto">
                    <li>
                      <Link target="_blank" href="https://www.facebook.com/share/1DphQoFWK7/" className="btn btn-outline-light">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M15.12 5.32H17V2.14A26.11 26.11 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.62H6.61v3.56h3.07V22h3.68v-9.12h3.06l.46-3.56h-3.52V7.05c0-1.05.28-1.73 1.76-1.73Z"
                          />
                        </svg>
                      </Link>
                    </li>

                    <li>
                      <Link target="_blank" href="https://www.youtube.com/@FeelSafe-co" className="btn btn-outline-light">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M23 9.71a8.5 8.5 0 0 0-.91-4.13a2.92 2.92 0 0 0-1.72-1A78.36 78.36 0 0 0 12 4.27a78.45 78.45 0 0 0-8.34.3a2.87 2.87 0 0 0-1.46.74c-.9.83-1 2.25-1.1 3.45a48.29 48.29 0 0 0 0 6.48a9.55 9.55 0 0 0 .3 2a3.14 3.14 0 0 0 .71 1.36a2.86 2.86 0 0 0 1.49.78a45.18 45.18 0 0 0 6.5.33c3.5.05 6.57 0 10.2-.28a2.88 2.88 0 0 0 1.53-.78a2.49 2.49 0 0 0 .61-1a10.58 10.58 0 0 0 .52-3.4c.04-.56.04-3.94.04-4.54ZM9.74 14.85V8.66l5.92 3.11c-1.66.92-3.85 1.96-5.92 3.08Z"
                          />
                        </svg>
                      </Link>
                    </li>
                    <li>
                      <Link target="_blank" href="https://www.instagram.com/feelsafe25" className="btn btn-outline-light">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M17.34 5.46a1.2 1.2 0 1 0 1.2 1.2a1.2 1.2 0 0 0-1.2-1.2Zm4.6 2.42a7.59 7.59 0 0 0-.46-2.43a4.94 4.94 0 0 0-1.16-1.77a4.7 4.7 0 0 0-1.77-1.15a7.3 7.3 0 0 0-2.43-.47C15.06 2 14.72 2 12 2s-3.06 0-4.12.06a7.3 7.3 0 0 0-2.43.47a4.78 4.78 0 0 0-1.77 1.15a4.7 4.7 0 0 0-1.15 1.77a7.3 7.3 0 0 0-.47 2.43C2 8.94 2 9.28 2 12s0 3.06.06 4.12a7.3 7.3 0 0 0 .47 2.43a4.7 4.7 0 0 0 1.15 1.77a4.78 4.78 0 0 0 1.77 1.15a7.3 7.3 0 0 0 2.43.47C8.94 22 9.28 22 12 22s3.06 0 4.12-.06a7.3 7.3 0 0 0 2.43-.47a4.7 4.7 0 0 0 1.77-1.15a4.85 4.85 0 0 0 1.16-1.77a7.59 7.59 0 0 0 .46-2.43c0-1.06.06-1.4.06-4.12s0-3.06-.06-4.12ZM20.14 16a5.61 5.61 0 0 1-.34 1.86a3.06 3.06 0 0 1-.75 1.15a3.19 3.19 0 0 1-1.15.75a5.61 5.61 0 0 1-1.86.34c-1 .05-1.37.06-4 .06s-3 0-4-.06a5.73 5.73 0 0 1-1.94-.3a3.27 3.27 0 0 1-1.1-.75a3 3 0 0 1-.74-1.15a5.54 5.54 0 0 1-.4-1.9c0-1-.06-1.37-.06-4s0-3 .06-4a5.54 5.54 0 0 1 .35-1.9A3 3 0 0 1 5 5a3.14 3.14 0 0 1 1.1-.8A5.73 5.73 0 0 1 8 3.86c1 0 1.37-.06 4-.06s3 0 4 .06a5.61 5.61 0 0 1 1.86.34a3.06 3.06 0 0 1 1.19.8a3.06 3.06 0 0 1 .75 1.1a5.61 5.61 0 0 1 .34 1.9c.05 1 .06 1.37.06 4s-.01 3-.06 4ZM12 6.87A5.13 5.13 0 1 0 17.14 12A5.12 5.12 0 0 0 12 6.87Zm0 8.46A3.33 3.33 0 1 1 15.33 12A3.33 3.33 0 0 1 12 15.33Z"
                          />
                        </svg>
                      </Link>
                    </li>
                    {/* <li>
                      <Link href="#" className="btn btn-outline-light">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M1.04 17.52q.1-.16.32-.02a21.308 21.308 0 0 0 10.88 2.9a21.524 21.524 0 0 0 7.74-1.46q.1-.04.29-.12t.27-.12a.356.356 0 0 1 .47.12q.17.24-.11.44q-.36.26-.92.6a14.99 14.99 0 0 1-3.84 1.58A16.175 16.175 0 0 1 12 22a16.017 16.017 0 0 1-5.9-1.09a16.246 16.246 0 0 1-4.98-3.07a.273.273 0 0 1-.12-.2a.215.215 0 0 1 .04-.12Zm6.02-5.7a4.036 4.036 0 0 1 .68-2.36A4.197 4.197 0 0 1 9.6 7.98a10.063 10.063 0 0 1 2.66-.66q.54-.06 1.76-.16v-.34a3.562 3.562 0 0 0-.28-1.72a1.5 1.5 0 0 0-1.32-.6h-.16a2.189 2.189 0 0 0-1.14.42a1.64 1.64 0 0 0-.62 1a.508.508 0 0 1-.4.46L7.8 6.1q-.34-.08-.34-.36a.587.587 0 0 1 .02-.14a3.834 3.834 0 0 1 1.67-2.64A6.268 6.268 0 0 1 12.26 2h.5a5.054 5.054 0 0 1 3.56 1.18a3.81 3.81 0 0 1 .37.43a3.875 3.875 0 0 1 .27.41a2.098 2.098 0 0 1 .18.52q.08.34.12.47a2.856 2.856 0 0 1 .06.56q.02.43.02.51v4.84a2.868 2.868 0 0 0 .15.95a2.475 2.475 0 0 0 .29.62q.14.19.46.61a.599.599 0 0 1 .12.32a.346.346 0 0 1-.16.28q-1.66 1.44-1.8 1.56a.557.557 0 0 1-.58.04q-.28-.24-.49-.46t-.3-.32a4.466 4.466 0 0 1-.29-.39q-.2-.29-.28-.39a4.91 4.91 0 0 1-2.2 1.52a6.038 6.038 0 0 1-1.68.2a3.505 3.505 0 0 1-2.53-.95a3.553 3.553 0 0 1-.99-2.69Zm3.44-.4a1.895 1.895 0 0 0 .39 1.25a1.294 1.294 0 0 0 1.05.47a1.022 1.022 0 0 0 .17-.02a1.022 1.022 0 0 1 .15-.02a2.033 2.033 0 0 0 1.3-1.08a3.13 3.13 0 0 0 .33-.83a3.8 3.8 0 0 0 .12-.73q.01-.28.01-.92v-.5a7.287 7.287 0 0 0-1.76.16a2.144 2.144 0 0 0-1.76 2.22Zm8.4 6.44a.626.626 0 0 1 .12-.16a3.14 3.14 0 0 1 .96-.46a6.52 6.52 0 0 1 1.48-.22a1.195 1.195 0 0 1 .38.02q.9.08 1.08.3a.655.655 0 0 1 .08.36v.14a4.56 4.56 0 0 1-.38 1.65a3.84 3.84 0 0 1-1.06 1.53a.302.302 0 0 1-.18.08a.177.177 0 0 1-.08-.02q-.12-.06-.06-.22a7.632 7.632 0 0 0 .74-2.42a.513.513 0 0 0-.08-.32q-.2-.24-1.12-.24q-.34 0-.8.04q-.5.06-.92.12a.232.232 0 0 1-.16-.04a.065.065 0 0 1-.02-.08a.153.153 0 0 1 .02-.06Z"
                          />
                        </svg>
                      </Link>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-sm-6">
              <div className="footer-menu">
                <h5 className="widget-title">Useful Links</h5>
                <ul className="menu-list list-unstyled">
                  <li className="menu-item">
                    <Link href={"/"} className="nav-link">
                      Home
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link href={"/about-us"} className="nav-link">
                      About us
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link href="https://panel.feelsafeco.in/signup" target="_blank" title="Distributor Signup" className="nav-link">
                      Become a Distributor
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link href="https://panel.feelsafeco.in" target="_blank" title="Distributor Login" className="nav-link">
                      Distributor Login
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link href="careers" className="nav-link">
                      Careers
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link href="documents" className="nav-link">
                      Company Documents
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="footer-menu">
                <h5 className="widget-title">Customer Service</h5>
                <ul className="menu-list list-unstyled">
                  <li className="menu-item">
                    <Link href="/faq" className="nav-link">
                      FAQ
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link href="/contact-us" className="nav-link">
                      Contact
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link href="/privacy-policy" className="nav-link">
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link href="/terms-conditions" className="nav-link">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link href="/legal-disclaimer" className="nav-link">
                      Legal Disclaimer
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link href="/shipping-policy" className="nav-link">
                      Shipping Policy
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link href="/return-refund-policy" className="nav-link">
                      Returns & Refunds
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link href="/return-buyback-policy" className="nav-link">
                      Return & Buyback Policy
                    </Link>
                  </li>



                </ul>
              </div>
            </div>


            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="footer-menu">
                <h5 className="widget-title mb-4 fw-bold">Contact Us</h5>
                <p className="small text-muted mb-4">
                  Get in touch with us for inquiries, support, or feedback.
                </p>
                <ul className="menu-list list-unstyled">

                  {/* Phone */}
                  <li className="menu-item mb-3 d-flex align-items-center">
                    <div className="d-flex align-items-center justify-content-center flex-shrink-0 me-3"
                      style={{ width: "24px", height: "24px" }}>
                      <Phone size={20} style={{ color: "#E6519B" }} />
                    </div>
                    <a href={`tel:${contact_data?.phone}`} className="nav-link p-0 small">
                      +91 {contact_data?.phone || "9013499385"}
                    </a>
                  </li>

                  {/* Email */}
                  <li className="menu-item mb-3 d-flex align-items-center">
                    <div className="d-flex align-items-center justify-content-center flex-shrink-0 me-3"
                      style={{ width: "24px", height: "24px" }}>
                      <Mail size={20} style={{ color: "#E6519B" }} />
                    </div>
                    <a href={`mailto:${contact_data?.email_1}`} className="nav-link p-0 small text-break">
                      {contact_data?.email_1 || "support@feelsafeco.in"}
                    </a>
                  </li>

                  {/* Address */}
                  <li className="menu-item mb-3 d-flex align-items-start">
                    <div className="d-flex align-items-center justify-content-center flex-shrink-0 me-3"
                      style={{ width: "24px", height: "24px" }}>
                      <MapPin size={20} style={{ color: "#8DC63F" }} />
                    </div>
                    <a href="https://maps.app.goo.gl/nvPBzD8zxeGCdP2n7" target="_blank" className="nav-link p-0 small lh-sm">
                      {contact_data?.address || "KharKhari Nahar, Near MCD School, Najafgarh, South West, New Delhi, Delhi – 110043, INDIA"}
                    </a>
                  </li>


                </ul>
              </div>
            </div>

          </div>
        </div>
      </footer>
      <div id="footer-bottom">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 copyright mx-auto text-center d-flex align-items-center justify-content-center">
              <p className="py-md-2 m-0 me-1  ">
                © {new Date().getFullYear()} Feel Safe Pvt. Ltd. All rights reserved
                <br className="d-md-none" />| Developed By : <Link href={"https://gtsol.in"} target="_blank" className="text-light">GTS - Ganesh Tech Solution</Link>
              </p>


            </div>
            {/* <div className="col-md-6 credit-link text-start text-md-end">
              <p>
                Free HTML Template by{" "}
                <Link href="https://templatesjungle.com/">TemplatesJungle</Link>{" "}
                Distributed by <Link href="https://themewagon">ThemeWagon</Link>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
