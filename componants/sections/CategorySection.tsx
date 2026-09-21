import React from 'react'

const CategorySection = () => {
  return (
    <>
    <section className="py-5 overflow-hidden">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">

            <div className="section-header d-flex flex-wrap justify-content-between mb-5">
              <h2 className="section-title">Category</h2>

              <div className="d-flex align-items-center">
                <a href="#" className="btn-link text-decoration-none">View All Categories →</a>
                <div className="swiper-buttons">
                  <button className="swiper-prev category-carousel-prev btn btn-yellow">❮</button>
                  <button className="swiper-next category-carousel-next btn btn-yellow">❯</button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">

            <div className="category-carousel swiper">
              <div className="swiper-wrapper">
                <a href="index.html" className="nav-link category-item swiper-slide">
                  <img src="./assets/images/icon-vegetables-broccoli.png" alt="Category Thumbnail" />
                  <h3 className="category-title">Fruits & Veges</h3>
                </a>
                <a href="index.html" className="nav-link category-item swiper-slide">
                  <img src="./assets/images/icon-bread-baguette.png" alt="Category Thumbnail" />
                  <h3 className="category-title">Breads & Sweets</h3>
                </a>
                <a href="index.html" className="nav-link category-item swiper-slide">
                  <img src="./assets/images/icon-soft-drinks-bottle.png" alt="Category Thumbnail" />
                  <h3 className="category-title">Fruits & Veges</h3>
                </a>
                <a href="index.html" className="nav-link category-item swiper-slide">
                  <img src="./assets/images/icon-wine-glass-bottle.png" alt="Category Thumbnail" />
                  <h3 className="category-title">Fruits & Veges</h3>
                </a>
                <a href="index.html" className="nav-link category-item swiper-slide">
                  <img src="./assets/images/icon-animal-products-drumsticks.png" alt="Category Thumbnail" />
                  <h3 className="category-title">Fruits & Veges</h3>
                </a>
                <a href="index.html" className="nav-link category-item swiper-slide">
                  <img src="./assets/images/icon-bread-herb-flour.png" alt="Category Thumbnail" />
                  <h3 className="category-title">Fruits & Veges</h3>
                </a>
                <a href="index.html" className="nav-link category-item swiper-slide">
                  <img src="./assets/images/icon-vegetables-broccoli.png" alt="Category Thumbnail" />
                  <h3 className="category-title">Fruits & Veges</h3>
                </a>
                <a href="index.html" className="nav-link category-item swiper-slide">
                  <img src="./assets/images/icon-vegetables-broccoli.png" alt="Category Thumbnail" />
                  <h3 className="category-title">Fruits & Veges</h3>
                </a>
                <a href="index.html" className="nav-link category-item swiper-slide">
                  <img src="./assets/images/icon-vegetables-broccoli.png" alt="Category Thumbnail" />
                  <h3 className="category-title">Fruits & Veges</h3>
                </a>
                <a href="index.html" className="nav-link category-item swiper-slide">
                  <img src="./assets/images/icon-vegetables-broccoli.png" alt="Category Thumbnail" />
                  <h3 className="category-title">Fruits & Veges</h3>
                </a>
                <a href="index.html" className="nav-link category-item swiper-slide">
                  <img src="./assets/images/icon-vegetables-broccoli.png" alt="Category Thumbnail" />
                  <h3 className="category-title">Fruits & Veges</h3>
                </a>
                <a href="index.html" className="nav-link category-item swiper-slide">
                  <img src="./assets/images/icon-vegetables-broccoli.png" alt="Category Thumbnail" />
                  <h3 className="category-title">Fruits & Veges</h3>
                </a>
                
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default CategorySection
