import { getBlogs } from '@/lib/blogApi';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/types/Blog';

export const metadata = {
  title: 'Blog | Feel Safe',
  description:
    'Menstrual hygiene awareness and safe hygiene products by Feel Safe Pvt. Ltd. Explore ethical direct selling, legal compliance, and BIS certified sanitary pads.',
  alternates: {
    canonical: 'https://feelsafeco.in/blog',
  },
  openGraph: {
    title: 'Blog | Feel Safe',
    description:
      'Menstrual hygiene awareness and safe hygiene products by Feel Safe Pvt. Ltd. Explore ethical direct selling, legal compliance, and BIS certified sanitary pads.',
    url: 'https://feelsafeco.in/blog',
    siteName: 'Feel Safe',
    type: 'website',
    images: [
      {
        url: 'https://feelsafeco.in/og-feelsafe-hygiene.jpg',
        width: 1200,
        height: 630,
        alt: 'Feel Safe Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Feel Safe',
    description:
      'Menstrual hygiene awareness and safe hygiene products by Feel Safe Pvt. Ltd. Explore ethical direct selling, legal compliance, and BIS certified sanitary pads.',
    images: ['https://feelsafeco.in/og-feelsafe-hygiene.jpg'],
  },
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default async function BlogPage() {
  const blogs: BlogPost[] = await getBlogs();

  return (
    <section className="py-5">
      <div className="container-fluid">
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto">
            <div className="section-header text-center mb-5">
              <h1 className="section-title">Our Blog</h1>
              <p className="lead text-muted">Latest articles and insights</p>
            </div>
          </div>
        </div>
        {blogs.length === 0 ? (
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <h3>No blog posts available</h3>
              <p className="text-muted">Check back soon for updates.</p>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {blogs.map((blog) => {
              const excerpt = blog.content.length > 150 ? blog.content.slice(0, 150) + '...' : blog.content;
              return (
                <div key={blog.id} className="col-lg-4 col-md-6">
                  <article className="card border-0 shadow-sm hover-shadow">
                    <div className="image-holder zoom-effect position-relative">
                      <Link href={`/blog/${blog.slug}`}>
                        <Image
                          src={
                            blog.featured_image && !blog.featured_image.startsWith('http')
                              ? `/assets/images/blog/${blog.featured_image}`
                              : blog.featured_image || '/assets/images/post-thumb-1.jpg'
                          }
                          alt={blog.title}
                          fill
                          className="object-cover card-img-top position-relative"
                          sizes="100vw"
                        />
                      </Link>
                    </div>
                    <div className="card-body d-flex flex-column p-4">
                      <div className="post-meta mb-2">
                        <span className="badge bg-primary text-white me-2">{blog.category_name}</span>
                        <small className="text-muted">{formatDate(blog.created_at)}</small>
                      </div>
                      <h3 className="card-title h5 mt-auto">
                        <Link href={`/blog/${blog.slug}`} className="text-decoration-none text-dark">
                          {blog.title}
                        </Link>
                      </h3>
                      <p className="text-muted flex-grow-1 mt-2">{excerpt}</p>
                      <Link href={`/blog/${blog.slug}`} className="btn btn-outline-primary mt-3">
                        Read More
                      </Link>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

