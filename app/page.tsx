"use client";
import Header from "@/components/Header";
 export default function Home() {
  return (
    
    <main dir="rtl">
      <header className="site-header">
        <div className="header-container">

          <div className="logo">
            <img
              src="/media/hom.png"
              alt="لوگوی فروشگاه"
              className="logo-img"
            />
          </div>

          <nav className="main-nav">
            <a href="#" className="nav-link active">خانه</a>
            <a href="#" className="nav-link">تیشرت</a>
            <a href="#" className="nav-link">شلوار</a>
            <a href="#" className="nav-link">کت</a>
            <a href="#" className="nav-link">درباره ما</a>
          </nav>

          <div className="header-icons">

            <button className="icon-btn" aria-label="جستجو">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            <button className="icon-btn" aria-label="حساب کاربری">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            <a href="/sabad" className="icon-btn cart-btn" aria-label="سبد خرید">
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

  <span className="cart-count">0</span>
</a>

          </div>
        </div>
      </header>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">کالکشن جدید</span>

          <h1 className="hero-title">
            استایل خودت رو
            <br />
            پیدا کن
          </h1>

          <p className="hero-subtitle">
            لباس‌هایی که راحتی و شیکی رو با هم داره. کیفیت تضمینی،
            ارسال سریع به سراسر کشور.
          </p>

          <button className="btn-primary">
            مشاهده کالکشن
          </button>
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
      <section className="categories">
  <h2 className="section-title">دسته‌بندی‌ها</h2>

  <div className="categories-grid">

    <a href="#" className="category-card">
      <img
        src="/media/تیشرت.png"
        alt="تیشرت"
        className="category-img"
      />
      <span className="category-name">تیشرت</span>
    </a>

    <a href="#" className="category-card">
      <img
        src="/media/شلوار.png"
        alt="شلوار"
        className="category-img"
      />
      <span className="category-name">شلوار</span>
    </a>

    <a href="#" className="category-card">
      <img
        src="/media/کت.png"
        alt="کت یا شومیز"
        className="category-img"
      />
      <span className="category-name">کت یا شومیز</span>
    </a>

  </div>
</section>
<section className="featured-products">

  <div className="section-heading">
    <span>پیشنهاد ما</span>
    <h2 className="section-title">محصولات ویژه</h2>
  </div>

  <div className="products-grid">

    <div className="product-card">
      <div className="product-image">
        <img src="/media/تیشرت.png" alt="تیشرت سبز" />
        <span className="product-badge">ویژه</span>
      </div>

      <div className="product-info">
        <h3>تیشرت مینیمال</h3>
        <p>تیشرت راحت و شیک</p>

        <div className="product-bottom">
          <strong>۸۹۰,۰۰۰ تومان</strong>
          <button>+</button>
        </div>
      </div>
    </div>


    <div className="product-card">
      <div className="product-image">
        <img src="/media/شلوار.png" alt="شلوار" />
        <span className="product-badge">جدید</span>
      </div>

      <div className="product-info">
        <h3>شلوار کژوال</h3>
        <p>استایل راحت روزمره</p>

        <div className="product-bottom">
          <strong>۱,۲۵۰,۰۰۰ تومان</strong>
          <button>+</button>
        </div>
      </div>
    </div>


    <div className="product-card">
      <div className="product-image">
        <img src="/media/کت.png" alt="کت" />
        <span className="product-badge">ویژه</span>
      </div>

      <div className="product-info">
        <h3>کت مینیمال</h3>
        <p>مناسب استایل خاص</p>

        <div className="product-bottom">
          <strong>۲,۴۰۰,۰۰۰ تومان</strong>
          <button>+</button>
        </div>
      </div>
    </div>


    <div className="product-card">
      <div className="product-image">
        <img src="/media/تیشرت.png" alt="تیشرت سفید" />
      </div>

      <div className="product-info">
        <h3>تیشرت کلاسیک</h3>
        <p>سادگی همیشه جذابه</p>

        <div className="product-bottom">
          <strong>۷۹۰,۰۰۰ تومان</strong>
          <button>+</button>
        </div>
      </div>
    </div>


    <div className="product-card">
      <div className="product-image">
        <img src="/media/شلوار.png" alt="شلوار کتان" />
      </div>

      <div className="product-info">
        <h3>شلوار کتان</h3>
        <p>نرم و مناسب استفاده روزانه</p>

        <div className="product-bottom">
          <strong>۱,۴۹۰,۰۰۰ تومان</strong>
          <button>+</button>
        </div>
      </div>
    </div>


    <div className="product-card">
      <div className="product-image">
        <img src="/media/کت.png" alt="کت سبز" />
        <span className="product-badge">محبوب</span>
      </div>

      <div className="product-info">
        <h3>کت سبز پاستیلی</h3>
        <p>استایل خاص و متفاوت</p>

        <div className="product-bottom">
          <strong>۲,۷۰۰,۰۰۰ تومان</strong>
          <button>+</button>
        </div>
      </div>
    </div>

  </div>
</section>
<nav className="bottom-nav">

  <a href="#" className="bottom-nav-item active">
    <svg viewBox="0 0 24 24">
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9 21v-6h6v6" />
    </svg>
    <span>خانه</span>
  </a>

  <a href="/sabad" className="bottom-nav-item">
    <svg viewBox="0 0 24 24">
      <path d="M3 4h2l2 12h10l3-9H6" />
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
    </svg>
    <span>ثبت خرید</span>
  </a>

  <a href="\products" className="bottom-nav-item">
    <svg viewBox="0 0 24 24">
      <path d="M4 7h16" />
      <path d="M5 7l1 13h12l1-13" />
      <path d="M8 7a4 4 0 0 1 8 0" />
    </svg>
    <span>محصولات</span>
  </a>

  <a href="#" className="bottom-nav-item">
    <svg viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
    <span>جستجو</span>
  </a>

</nav>
<footer className="site-footer">

  <div className="footer-container">

    <div className="footer-about">

      <img
        src="/media/hom.png"
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

      <h3>دسترسی سریع</h3>

      <a href="#">خانه</a>
      <a href="#">محصولات</a>
      <a href="#">تیشرت</a>
      <a href="#">شلوار</a>
      <a href="#">درباره ما</a>

    </div>


    <div className="footer-column">

      <h3>ارتباط با ما</h3>

      <a href="#">.....</a>
      <a href="tel:09123456789">📞 ۰۹۱۲۳۴۵۶۷۸۹</a>
      <a href="mailto:info@homestyle.ir">
        ✉️ info@homestyle.ir
      </a>

    </div>


    <div className="footer-social">

      <h3>ما را دنبال کنید</h3>

      <p>
        برای دیدن جدیدترین محصولات همراه ما باشید.
      </p>

      <div className="social-icons">

        <a href="#" aria-label="Instagram">
          <svg viewBox="0 0 24 24">
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="5"
            />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" />
          </svg>
        </a>

        <a href="#" aria-label="Telegram">
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