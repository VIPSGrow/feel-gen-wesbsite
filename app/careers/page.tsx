"use client";

import React from "react";
import { Icon } from "@iconify/react";
const CareersPage = () => {
  return (
    <div className="container-fluid p-0 bg-white">
      {/* Hero Section */}
      <section
        className="py-5 text-center mt-4"
        style={{ backgroundColor: "#C4DF9B" }}
      >
        <div className="container py-5">
          <h6
            className="text-uppercase fw-bold mb-3"
            style={{ color: "#8DC63F", letterSpacing: "2px" }}
          >
            Join the Movement
          </h6>
          <h1 className="display-3 fw-bold mb-4" style={{ color: "#1C1C1C" }}>
            Build Your Future with{" "}
            <span style={{ color: "#00A9E0" }}>Feel Safe Private Limited</span>
          </h1>
          <p
            className="lead text-muted mx-auto mb-4"
            style={{ maxWidth: "800px" }}
          >
            Whether you are looking for a professional corporate role in Delhi
            or want to start your own business as a distributor, your journey to
            success starts here.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <a
              href="#distributor"
              className="btn btn-lg text-white px-4 shadow"
              style={{ backgroundColor: "#00A9E0" }}
            >
              Become a Partner
            </a>
            <a href="#corporate" className="btn btn-lg btn-outline-dark px-4">
              View Office Jobs
            </a>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="container py-5 my-5">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <img
              src="/assets/images/careers.webp"
              alt="Growth Opportunity"
              className="img-fluid rounded-4 shadow"
            />
          </div>
          <div className="col-lg-6 ps-lg-5 mt-4 mt-md-0">
            <h2 className="fw-bold mb-4">
              Why Work at{" "}
              <span style={{ color: "#E6519B" }}>
                Feel Safe Private Limited ?
              </span>
            </h2>
            <div className="mb-4">
              <h5 className="fw-bold text-brand-blue">Empowerment First</h5>
              <p className="text-muted">
                We don't just sell products; we change lives by providing
                hygiene dignity and financial independence.
              </p>
            </div>
            <div className="mb-4">
              <h5 className="fw-bold text-brand-green">Innovation in Care</h5>
              <p className="text-muted">
                Work with the latest technology in personal hygiene and the most
                advanced MLM software in India.
              </p>
            </div>
            <div className="">
              <h5 className="fw-bold text-brand-pink">Unlimited Growth</h5>
              <p className="text-muted">
                Our compensation plan is designed to reward hard work,
                leadership, and community building.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Opportunity Blocks */}
      <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container">
          <div className="row g-4">
            {/* Distributor Opportunity */}
            <div className="col-md-6" id="distributor">
              <div className="card h-100 border-0 shadow-sm p-4 rounded-4">
                <div
                  className="badge align-self-start mb-3 px-3 py-2"
                  style={{ backgroundColor: "#BDE1F3", color: "#00A9E0" }}
                >
                  Entrepreneurial
                </div>
                <h3 className="fw-bold">Independent Distributor</h3>
                <p className="text-muted">
                  Start your own business from home. Sell Feel Safe Private
                  Limited pads and diapers and build your own team.
                </p>
                <ul className="list-unstyled mb-4">
                  <li>
                    <Icon icon="circle-flags:in" className="me-2" /> Flexible
                    Hours
                  </li>
                  <li>
                    <Icon icon="solar:money-bag-bold" className="me-2" /> High
                    Commission Rates
                  </li>
                  <li>
                    <Icon
                      icon="solar:users-group-rounded-bold"
                      className="me-2"
                    />{" "}
                    Full Marketing Support
                  </li>
                </ul>
                <button
                  className="btn w-100 text-white"
                  style={{ backgroundColor: "#00A9E0" }}
                >
                  Apply as Partner
                </button>
              </div>
            </div>

            {/* Corporate Job */}
            <div className="col-md-6" id="corporate">
              <div className="card h-100 border-0 shadow-sm p-4 rounded-4">
                <div
                  className="badge align-self-start mb-3 px-3 py-2"
                  style={{ backgroundColor: "#C4DF9B", color: "#8DC63F" }}
                >
                  Delhi Office
                </div>
                <h3 className="fw-bold">Marketing & Operations</h3>
                <p className="text-muted">
                  Help us manage the supply chain, digital marketing, and
                  distributor relations from our Delhi hub.
                </p>
                <ul className="list-unstyled mb-4">
                  <li>
                    <Icon icon="solar:city-bold" className="me-2" /> Based in
                    Delhi
                  </li>
                  <li>
                    <Icon icon="solar:calendar-bold" className="me-2" />{" "}
                    Full-time Roles
                  </li>
                  <li>
                    <Icon icon="solar:medal-star-bold" className="me-2" />{" "}
                    Health & Wellness Benefits
                  </li>
                </ul>
                <button className="btn w-100 btn-dark">View Openings</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="container py-5 text-center">
        <h2 className="fw-bold">Don't see a role for you?</h2>
        <p className="text-muted">
          Send your resume to{" "}
          <span className="fw-bold text-dark"> info@feelsafeco.in</span> and we
          will reach out!
        </p>
      </section>
    </div>
  );
};

export default CareersPage;
