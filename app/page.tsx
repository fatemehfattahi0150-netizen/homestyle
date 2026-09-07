"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: string;
  category: string;
  description: string;
  images: string[];
  sizes: string[];
  colors: string[];
  isFeatured: boolean;
  collections: string[];
  stock: number;
};

type CartProduct = Product & {
  quantity: number;
};

const reviews = [
  {
    name: "سارا",
    text: "تجربه خرید عالی بود و کیفیت محصولات واقعاً خوب بود.",
  },
  {
    name: "مریم",
    text: "طراحی سایت خیلی قشنگه و خرید ازش راحت و جذابه.",
  },
  {
    name: "نگار",
    text: "کیفیت و بسته‌بندی محصولات خیلی خوب بود.",
  },
];

export default function Home() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [notification, setNotification] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  /* ================= LOAD NOTIFICATION ================= */

  useEffect(() => {
    const savedNotification = localStorage.getItem(
      "homestyle-notification"
    );

    if (savedNotification) {
      setNotification(savedNotification);
    }
  }, []);

  /* ================= LOAD PRODUCTS ================= */

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error("خطا در دریافت محصولات");
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    loadProducts();
  }, []);

  /* ================= FEATURED PRODUCTS ================= */

  const featuredProducts = products.filter(
    (product) => product.isFeatured
  );

  /* ================= ADD TO CART ================= */

  const addToCart = (product: Product) => {
    const savedCart = localStorage.getItem("homestyle-cart");

    const cart: CartProduct[] = savedCart
      ? JSON.parse(savedCart)
      : [];

    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem(
      "homestyle-cart",
      JSON.stringify(cart)
    );

    window.location.href = "/sabad";
  };

  return (
    <main dir="rtl">

      {/* ================= HEADER ================= */}

      <header className="site-header">

        <div className="header-container">

          <div className="logo">

            <Link href="/">

              <img
                src="media/hom.jpg"
                alt="لوگوی فروشگاه"
                className="logo-img"
              />

            </Link>

          </div>

          <nav className="main-nav">

            <Link
              href="/"
              className="nav-link active"
            >
              خانه
            </Link>

            <Link
              href="/products?category=tshirt"
              className="nav-link"
            >
              تیشرت
            </Link>

            <Link
              href="/products?category=pants"
              className="nav-link"
            >
              شلوار
            </Link>

            <Link
              href="/products?category=hat"
              className="nav-link"
            >
              کلاه
            </Link>

            <Link
              href="#about"
              className="nav-link"
            >
              درباره ما
            </Link>

          </nav>

          <div className="header-icons">

            {/* SEARCH */}

            <button
              type="button"
              className="icon-btn"
              aria-label="جستجو"
              onClick={() =>
                setShowSearch(true)
              }
            >

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >

                <circle
                  cx="11"
                  cy="11"
                  r="8"
                />

                <line
                  x1="21"
                  y1="21"
                  x2="16.65"
                  y2="16.65"
                />

              </svg>

            </button>


            {/* USER */}

            <Link
              href="/longin"
              className="icon-btn"
              aria-label="حساب کاربری"
            >

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >

                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />

                <circle
                  cx="12"
                  cy="7"
                  r="4"
                />

              </svg>

            </Link>


            {/* CART */}

            <Link
              href="/sabad"
              className="icon-btn cart-btn"
              aria-label="سبد خرید"
            >

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >

                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />

                <path d="M3 6h18" />

                <path d="M16 10a4 4 0 0 1-8 0" />

              </svg>

              <span className="cart-count">
                0
              </span>

            </Link>

          </div>

        </div>

      </header>


      {/* ================= NOTIFICATION ================= */}

      {notification && (

        <section className="home-notification">

          <div className="home-notification-content">

            <strong>
              اطلاعیه
            </strong>

            <p>
              {notification}
            </p>

          </div>

        </section>

      )}


      {/* ================= SEARCH MODAL ================= */}

      {showSearch && (

        <div
          className="search-overlay"
          onClick={() =>
            setShowSearch(false)
          }
        >

          <div
            className="search-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              className="search-close"
              onClick={() => {
                setShowSearch(false);
                setSearchText("");
              }}
              aria-label="بستن جستجو"
            >
              ×
            </button>


            <div className="search-modal-icon">

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >

                <circle
                  cx="11"
                  cy="11"
                  r="8"
                />

                <line
                  x1="21"
                  y1="21"
                  x2="16.65"
                  y2="16.65"
                />

              </svg>

            </div>


            <h2>
              جستجوی محصول
            </h2>

            <p>
              نام یا کد محصول مورد نظرت رو وارد کن
            </p>


            <div className="search-input-wrapper">

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >

                <circle
                  cx="11"
                  cy="11"
                  r="8"
                />

                <line
                  x1="21"
                  y1="21"
                  x2="16.65"
                  y2="16.65"
                />

              </svg>


              <input
                type="text"
                value={searchText}
                onChange={(event) =>
                  setSearchText(
                    event.target.value
                  )
                }
                placeholder="نام یا کد محصول"
                autoFocus
              />

            </div>


            {searchText.trim() !== "" && (

              <div className="search-results">

                <span className="search-results-title">
                  نتایج جستجو
                </span>

                <div className="no-search-result">

                  <span>
                    🔍
                  </span>

                  <p>
                    هنوز محصولی برای نمایش وجود ندارد
                  </p>

                  <small>
                    محصولات بعداً از پنل مدیریت اضافه می‌شوند.
                  </small>

                </div>

              </div>

            )}

          </div>

        </div>

      )}


      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-content">

          <span className="hero-badge">
            کالکشن جدید
          </span>

          <h1 className="hero-title">
            استایل خودت رو
            <br />
            پیدا کن
          </h1>

          <p className="hero-subtitle">
            لباس‌هایی که راحتی و شیکی رو با هم داره.
            کیفیت تضمینی، ارسال سریع به سراسر کشور.
          </p>

          <Link
            href="/collections"
            className="btn-primary"
          >
            مشاهده کالکشن
          </Link>

        </div>


        <div className="hero-visual">

          <div className="hero-blob"></div>

          <img
            src="/media/ChatGPT Image Aug 21, 2026, 11_03_12 AM.png"
            alt="لباس فروشگاه"
            className="hero-image"
          />

        </div>

      </section>


      {/* ================= CATEGORIES ================= */}

      <section className="categories">

        <h2 className="section-title">
          دسته‌بندی‌ها
        </h2>


        <div className="categories-grid">

          <Link
            href="/products?category=tshirt"
            className="category-card"
          >

            <img
              src="/media/تیشرت.png"
              alt="تیشرت"
              className="category-img"
            />

            <span className="category-name">
              تیشرت
            </span>

          </Link>


          <Link
            href="/products?category=pants"
            className="category-card"
          >

            <img
              src="/media/شلوار.png"
              alt="شلوار"
              className="category-img"
            />

            <span className="category-name">
              شلوار
            </span>

          </Link>


          <Link
            href="/products?category=hat"
            className="category-card"
          >

            <img
              src="/media/کلاه.png"
              alt="کلاه"
              className="category-img"
            />

            <span className="category-name">
              کلاه
            </span>

          </Link>

        </div>

      </section>


      {/* ================= FEATURED PRODUCTS ================= */}

      <section className="featured-products">

        <div className="section-heading">

          <span>
            پیشنهاد ما
          </span>

          <h2 className="section-title">
            محصولات ویژه
          </h2>

        </div>


        <div className="home-products-grid">

          {featuredProducts.length === 0 ? (

            <div className="home-products-empty">

              <p>
                هنوز محصول ویژه‌ای اضافه نشده است.
              </p>

            </div>

          ) : (

            featuredProducts.map((product) => (

              <div
                className="home-product-card"
                key={product.id}
              >

                <Link
                  href={`/products/${product.id}`}
                  className="home-product-link"
                >

                  <div className="home-product-image">

                    {product.images.length > 0 ? (

                      <img
                        src={product.images[0]}
                        alt={product.name}
                      />

                    ) : (

                      <span>
                        عکس محصول
                      </span>

                    )}

                  </div>


                  <div className="home-product-content">

                    <span className="home-product-category">
                      {product.category}
                    </span>

                    <h3>
                      {product.name}
                    </h3>

                    <p className="home-product-price">
                      {product.price}
                    </p>

                    {product.stock > 0 ? (

                      <span className="home-product-stock">
                        موجودی: {product.stock} عدد
                      </span>

                    ) : (

                      <span className="home-product-out">
                        ناموجود
                      </span>

                    )}

                  </div>

                </Link>


                <button
                  type="button"
                  className="home-product-add"
                  aria-label={`افزودن ${product.name} به سبد خرید`}
                  onClick={() =>
                    addToCart(product)
                  }
                >
                  +
                </button>

              </div>

            ))

          )}

        </div>


        <div className="all-products-btn">

          <Link href="/products">
            مشاهده همه محصولات
          </Link>

        </div>

      </section>


      {/* ================= REVIEWS ================= */}

      <section className="reviews">

        <div className="section-heading">

          <span>
            تجربه مشتریان
          </span>

          <h2 className="section-title">
            رضایت مشتریان 🤍
          </h2>

        </div>


        <div className="reviews-grid">

          {reviews.map(
            (review, index) => (

              <div
                className="review-card"
                key={index}
              >

                <div className="review-stars">
                  ★★★★★
                </div>

                <p>
                  {review.text}
                </p>

                <strong>
                  {review.name}
                </strong>

              </div>

            )
          )}

        </div>

      </section>


      {/* ================= BOTTOM NAV ================= */}

      <nav className="bottom-nav">

        <Link
          href="/"
          className="bottom-nav-item active"
        >

          <svg viewBox="0 0 24 24">

            <path d="M3 10.5L12 3l9 7.5" />

            <path d="M5 9.5V21h14V9.5" />

            <path d="M9 21v-6h6v6" />

          </svg>

          <span>
            خانه
          </span>

        </Link>


        <Link
          href="/sabad"
          className="bottom-nav-item"
        >

          <svg viewBox="0 0 24 24">

            <path d="M3 4h2l2 12h10l3-9H6" />

            <circle
              cx="9"
              cy="20"
              r="1.5"
            />

            <circle
              cx="18"
              cy="20"
              r="1.5"
            />

          </svg>

          <span>
            ثبت خرید
          </span>

        </Link>


        <Link
          href="/products"
          className="bottom-nav-item"
        >

          <svg viewBox="0 0 24 24">

            <path d="M4 7h16" />

            <path d="M5 7l1 13h12l1-13" />

            <path d="M8 7a4 4 0 0 1 8 0" />

          </svg>

          <span>
            محصولات
          </span>

        </Link>


        <button
          type="button"
          className="bottom-nav-item"
          onClick={() =>
            setShowSearch(true)
          }
        >

          <svg viewBox="0 0 24 24">

            <circle
              cx="11"
              cy="11"
              r="7"
            />

            <path d="m20 20-4-4" />

          </svg>

          <span>
            جستجو
          </span>

        </button>

      </nav>


      {/* ================= FOOTER ================= */}

      <footer
        className="site-footer"
        id="about"
      >

        <div className="footer-container">

          <div className="footer-about">

            <img
              src="media/hom.jpg"
              alt="homestyle"
              className="footer-logo"
            />

            <p>
              استایل تو، انتخاب تو ✨
            </p>

            <span>
              لباس‌هایی برای ساختن استایل خاص خودت.
            </span>

          </div>


          <div className="footer-column">

            <h3>
              دسترسی سریع
            </h3>

            <Link href="/">
              خانه
            </Link>

            <Link href="/products">
              محصولات
            </Link>

            <Link href="/products?category=tshirt">
              تیشرت
            </Link>

            <Link href="/products?category=pants">
              شلوار
            </Link>

            <Link href="/products?category=hat">
              کلاه
            </Link>

            <Link href="#about">
              درباره ما
            </Link>


            <div className="admin-entry">

              <Link
                href="/admin"
                className="admin-entry-button"
              >
                مدیریت
              </Link>

            </div>

          </div>


          <div className="footer-column">

            <h3>
              ارتباط با ما
            </h3>

            <a href="#">
              آدرس فروشگاه
            </a>

            <a href="tel:09123456789">
              📞 ۰۹۱۲۳۴۵۶۷۸۹
            </a>

            <a href="mailto:info@homestyle.ir">
              ✉️ info@homestyle.ir
            </a>

          </div>


          <div className="footer-social">

            <h3>
              ما را دنبال کنید
            </h3>

            <p>
              برای دیدن جدیدترین محصولات همراه ما باشید.
            </p>


            <div className="social-icons">

              <a
                href="#"
                aria-label="Instagram"
              >

                <svg viewBox="0 0 24 24">

                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                  />

                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                  />

                </svg>

              </a>


              <a
                href="#"
                aria-label="Telegram"
              >

                <svg viewBox="0 0 24 24">

                  <path d="M21 3 3 10.5l6.5 2.5L12 20l3-5 4-2Z" />

                </svg>

              </a>

            </div>

          </div>

        </div>


        <div className="footer-bottom">

          <p>
            © ۱۴۰۵ homestyle — تمامی حقوق محفوظ است.
          </p>

          <span>
            ساخته شده با ❤️
          </span>

        </div>

      </footer>

    </main>
  );
}