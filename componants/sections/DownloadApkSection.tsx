import Link from "next/link";
import React from "react";

const DownloadApkSection = () => {
  return (
    <>
      <section className="py-md-5 py-3 my-md-5 my-3 d-flex align-items-end bg-overay playStoreSection"
      >
        <div className="container-fluid">
          <div
            className="row "
          >
            <div className="col-md-6 mx-auto  py-4 px-5 rounded-5 downloadCardApk" data-aos="fade-in-up" style={{ border: "1px solid white" }}>
              <h2 className="mb-2 text-light" data-aos="zoom-in" data-aos-duration="1000">Shop & Earn with the Feel Safe App</h2>
              <p data-aos="zoom-in-up" className="text-light">
                Carry your business in your pocket. Use the Feel Safe App to
                order your monthly essentials in seconds and track your
                10-level matrix earnings in real-time. Whether you’re a busy
                parent or a growing entrepreneur, staying protected and
                profitable has never been easier.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start align-items-center mt-3" data-aos="zoom-in-up">
                {/* App Store Button */}
                <Link
                  href="#"
                  className="d-inline-block hover-lift transition"
                  aria-label="Download Feel Safe App on the App Store"
                >
                  <img
                    src="assets/images/app-store.jpg"
                    alt="Download on App Store"
                    width={140}
                    height={42}
                    className="img-fluid rounded-2 shadow-sm"
                    style={{ objectFit: "contain" }}
                  />
                </Link>

                {/* Google Play Button */}
                <Link
                  href="#"
                  className="d-inline-block hover-lift transition"
                  aria-label="Get Feel Safe App on Google Play"
                >
                  <img
                    src="assets/images/google-play.jpg"
                    alt="Get it on Google Play"
                    width={140}
                    height={42}
                    className="img-fluid rounded-2 shadow-sm"
                    style={{ objectFit: "contain" }}
                  />
                </Link>

                <style >{`
    .hover-lift:hover {
      transform: translateY(-3px);
      filter: brightness(1.1);
    }
    .transition {
      transition: all 0.2s ease-in-out;
    }
  `}</style>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DownloadApkSection;
