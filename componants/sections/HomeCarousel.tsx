"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  image: string;
  // Optional portrait image used below 768px; falls back to `image` if omitted
  mobileImage?: string;
  alt: string;
  href?: string;
}

// Add or replace slides here (images live in /public/assets/banner)
// For mobile, add e.g. mobileImage: "/assets/banner/slide1-mobile.webp" (recommended 1080x1350, 4:5)
const SLIDES: Slide[] = [
  { image: "/assets/banner/slide1.webp", mobileImage: "/assets/banner/slide1_old.webp", alt: "Feel Safe", href: "/products" },  
  { image: "/assets/banner/slide2.webp", mobileImage: "/assets/banner/slide2_old.webp", alt: "Sanitary pads", href: "/products" },
  // { image: "/assets/banner/night-pads.png", alt: "Night pads", href: "/products" },
  // { image: "/assets/banner/adult-diaper.png", alt: "Adult diaper", href: "/products" },
];

const AUTOPLAY_MS = 4000;

const HomeCarousel = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section
      className="position-relative w-100 overflow-hidden"
      id="home-carousel"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="d-flex"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: "transform 0.6s ease",
        }}
      >
        {SLIDES.map((slide, i) => {
          const img = (
            <picture>
              {slide.mobileImage && (
                <source media="(max-width: 767px)" srcSet={slide.mobileImage} />
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-100 d-block"
                style={{ height: "auto", maxHeight: "100vh", objectFit: "cover" }}
                loading={i === 0 ? "eager" : "lazy"}
              />
            </picture>
          );
          return (
            <div
              key={slide.image}
              className="flex-shrink-0 w-100"
              aria-hidden={i !== index}
            >
              {slide.href ? (
                <Link href={slide.href} tabIndex={i === index ? 0 : -1}>
                  {img}
                </Link>
              ) : (
                img
              )}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={prev}
        className="btn btn-light rounded-circle position-absolute top-50 start-0 translate-middle-y ms-2 p-1 d-flex shadow"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={next}
        className="btn btn-light rounded-circle position-absolute top-50 end-0 translate-middle-y me-2 p-1 d-flex shadow"
      >
        <ChevronRight size={22} />
      </button>

      <div className="position-absolute bottom-0 start-50 translate-middle-x mb-2 d-flex gap-2">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.image}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className="border-0 rounded-circle p-0"
            style={{
              width: 10,
              height: 10,
              background: i === index ? "#fff" : "rgba(255,255,255,0.5)",
              boxShadow: "0 0 2px rgba(0,0,0,0.5)",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeCarousel;
