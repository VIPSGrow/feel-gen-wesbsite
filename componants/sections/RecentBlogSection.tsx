"use client";
import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { getBlogs } from '@/lib/blogApi';
import { BlogPost } from '@/lib/types/Blog';
import { Calendar } from "lucide-react";

const RecentBlogSection = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const recentBlogs = await getBlogs();
        setBlogs(recentBlogs.slice(0, 3)); // Top 3 recent blogs
      } catch (error) {
        console.error('Failed to fetch recent blogs:', error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  if (loading) {
    return (
      <section id="latest-blog" className="py-5">
        <div className="container-fluid">
          <div className="row">
            <div className="section-header d-flex align-items-center justify-content-between my-md-5 mb-5 mb-md-0" data-aos="zoom-in">
              <h2 className="section-title">Our Recent Blog</h2>
            </div>
          </div>
          <div className="blog-slider-wrapper" data-aos="zoom-in-up">
            <div className="d-flex flex-nowrap gap-3 blog-slider overflow-auto pb-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex-shrink-0 blog-card" style={{ minWidth: '100%', maxWidth: '100%' }}>
                  <article className="post-item card border-0 shadow-sm h-100">
                    <div className="bg-gray-200 animate-pulse h-48 rounded"></div>
                    <div className="card-body p-3">
                      <div className="bg-gray-200 h-4 w-24 mb-3 rounded"></div>
                      <div className="bg-gray-200 h-6 w-3/4 mb-3 rounded"></div>
                      <div className="bg-gray-200 h-4 w-full rounded"></div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="latest-blog" className="py-5">
        <div className="container-fluid">
          <div className="row">
            <div className="section-header d-flex align-items-center justify-content-between my-md-5 mb-5 mb-md-0">
              <h2 className="section-title">Our Recent Blog</h2>
              <div className="btn-wrap align-right">
                <Link href="/blog" className="d-flex align-items-center nav-link text-decoration-none">
                  Read More
                  <Icon icon="material-symbols:arrow-right-alt" width="24" height="24" />
                </Link>
              </div>
            </div>
          </div>
          <div className="blog-slider-wrapper">
            <div
              className="d-flex flex-nowrap gap-3 blog-slider overflow-auto pb-3"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {blogs.map((blog, index) => (
                <div
                  className="flex-shrink-0 blog-card"
                  style={{
                    minWidth: "100%",
                    maxWidth: "100%",
                    scrollSnapAlign: "start",
                  }}
                  key={blog.id}
                >
                  <article className="post-item card border-0 shadow-sm h-100">
                    <div className="image-holder position-relative overflow-hidden" style={{ height: '250px' }}>
                      <Link href={`/blog/${blog.slug}`}>
                        <Image
                          src={blog.featured_image && !blog.featured_image.startsWith('http')
                            ? `/assets/images/blog/${blog.featured_image}`
                            : (blog.featured_image || '/assets/images/post-thumb-1.jpg')}
                          alt={blog.title}
                          fill // This replaces fixed width/height to fill the parent container
                          className="object-cover transition-transform duration-300 zoom-effect"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </Link>
                    </div>
                    <div className="card-body d-flex flex-column p-3">
                      <div className="post-meta d-flex text-uppercase gap-3 my-2 align-items-center flex-shrink-0">
                        <div className="meta-date">
                          <Calendar size={16} />
                          {/* <svg width="16" height="16">
                            <use xlinkHref="#calendar"></use>
                          </svg> */}
                          {formatDate(blog.created_at)}
                        </div>
                        <div className="meta-categories">

                          {/* <svg width="16" height="16">
                            <use xlinkHref="#category"></use>
                          </svg> */}
                          {blog.category_name}
                        </div>
                      </div>
                      <div className="post-header flex-grow-1 d-flex flex-column">
                        <h3 className="post-title flex-grow-1">
                          <Link href={`/blog/${blog.slug}`} className="text-decoration-none text-dark">
                            {blog.title}
                          </Link>
                        </h3>
                        <p className="text-muted small mt-0 mb-0">
                          {blog.content.length > 120 ? blog.content.slice(0, 120) + '...' : blog.content}
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
          <style jsx>{`
            .blog-slider {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .blog-slider::-webkit-scrollbar {
              display: none;
            }
            @media (min-width: 768px) {
              .blog-slider {
                overflow: visible !important;
              }
              .blog-slider {
                flex-wrap: wrap !important;
                justify-content: flex-start !important;
                gap: 1.5rem !important;
              }
              .blog-card {
                min-width: calc(33.333% - 1rem) !important;
                max-width: calc(33.333% - 1rem) !important;
                scrollSnapAlign: none !important;
              }
            }
            @media (min-width: 1200px) {
              .blog-card {
                min-width: calc(33.333% - 1rem) !important;
                max-width: calc(33.333% - 1rem) !important;
              }
            }
            .image-holder {
              height: 200px;
              overflow: hidden;
            }
            .image-holder:hover img {
              transform: scale(1.05);
              transition: transform 0.3s ease;
            }
          `}</style>
        </div>
      </section>
    </>
  );
};
export default RecentBlogSection;
