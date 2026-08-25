import Link from "next/link";

export default function AccountPage() {
  return (
    <main className="account-page" dir="rtl">

      <div className="account-container">

        {/* HEADER */}

        <section className="account-header">

          <div className="account-avatar">
            ف
          </div>

          <div>
            <span>حساب کاربری</span>

            <h1>
              سلام 👋
            </h1>

            <p>
              به حساب کاربری HomeStyle خوش اومدی.
            </p>
          </div>

        </section>


        {/* اطلاعات کاربر */}

        <section className="account-section">

          <div className="section-title">

            <h2>
              اطلاعات من
            </h2>

            <button type="button">
              ویرایش
            </button>

          </div>


          <div className="account-info-grid">

            <div className="info-box">

              <span>
                نام و نام خانوادگی
              </span>

              <strong>
                فاطمه فتاحی
              </strong>

            </div>


            <div className="info-box">

              <span>
                شماره موبایل
              </span>

              <strong>
                ۰۹۱۲۳۴۵۶۷۸۹
              </strong>

            </div>

          </div>

        </section>


        {/* سفارش ها */}

        <section className="account-section">

          <div className="section-title">

            <h2>
              سفارش‌های من
            </h2>

            <span>
              ۲ سفارش
            </span>

          </div>


          <div className="order-card">

            <div className="order-icon">
              🛍️
            </div>


            <div className="order-details">

              <strong>
                سفارش #۱۲۳۴
              </strong>

              <span>
                ۲ محصول
              </span>

              <span>
                ۲,۱۴۰,۰۰۰ تومان
              </span>

            </div>


            <span className="order-status">
              تحویل شده
            </span>

          </div>


          <div className="order-card">

            <div className="order-icon">
              🛍️
            </div>


            <div className="order-details">

              <strong>
                سفارش #۱۲۳۵
              </strong>

              <span>
                ۱ محصول
              </span>

              <span>
                ۸۹۰,۰۰۰ تومان
              </span>

            </div>


            <span className="order-status pending">
              در حال پردازش
            </span>

          </div>

        </section>
        {/* کدهای تخفیف */}

<section className="account-section">

<div className="section-title">

  <h2>
    کدهای تخفیف من 🎁
  </h2>

</div>

<div className="empty-discount">

  <div className="empty-discount-icon">
    🎁
  </div>

  <h3>
    فعلاً کد تخفیفی نداری
  </h3>

  <p>
    با خرید از HomeStyle ممکنه کدهای تخفیف ویژه‌ای
    برات فعال بشه.
  </p>

</div>

</section>


        {/* دکمه ها */}

        <section className="account-actions">

          <Link href="/products">
            ادامه خرید
          </Link>


          <Link href="/sabad">
            مشاهده ثبت خرید
          </Link>


          <button type="button">
            خروج از حساب
          </button>

        </section>

      </div>


      {/* FOOTER */}

      <footer className="site-footer">

        <div className="footer-container">


          {/* معرفی */}

          <div className="footer-about">

            <img
              src="/media/hom.png"
              alt="HomeStyle"
              className="footer-logo"
            />

            <p>
              استایل تو، انتخاب تو
            </p>

            <span>
              لباس‌هایی برای ساختن استایل خاص خودت.
            </span>

          </div>


          {/* دسترسی سریع */}

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

            <Link href="/sabad">
              ثبت خرید
            </Link>

            <Link href="#">
              درباره ما
            </Link>

          </div>


          {/* ارتباط */}

          <div className="footer-column">

            <h3>
              ارتباط با ما
            </h3>

            <a href="tel:09123456789">
              📞 ۰۹۱۲۳۴۵۶۷۸۹
            </a>

            <a href="mailto:info@homestyle.ir">
              ✉️ info@homestyle.ir
            </a>

          </div>


          {/* شبکه اجتماعی */}

          <div className="footer-social">

            <h3>
              ما را دنبال کنید
            </h3>

            <p>
              برای دیدن جدیدترین محصولات
              همراه ما باشید.
            </p>

          </div>

        </div>


        {/* پایین فوتر */}

        <div className="footer-bottom">

          <p>
            © ۱۴۰۵ HomeStyle — تمامی حقوق محفوظ است.
          </p>

          <span>
            ساخته شده با ❤️
          </span>

        </div>

      </footer>


      {/* BOTTOM NAV */}

      <nav className="bottom-nav">


        {/* خانه */}

        <Link
          href="/"
          className="bottom-nav-item"
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


        {/* ثبت خرید */}

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


        {/* محصولات */}

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


        {/* جستجو */}

        <Link
          href="/search"
          className="bottom-nav-item"
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

        </Link>

      </nav>

    </main>
  );
}