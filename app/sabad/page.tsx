export default function Sabad() {
  return (
    <main className="cart-page" dir="rtl">

      <div className="cart-container">

        {/* HEADER */}

        <div className="cart-header">

          <span className="cart-badge">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 8h12l-1 13H7L6 8Z" />
              <path d="M9 8a3 3 0 0 1 6 0" />
            </svg>

            خرید من

          </span>

          <h1>ثبت خرید</h1>

          <p>
            محصولاتی که انتخاب کردی اینجا منتظرت هستن
          </p>

        </div>


        {/* CONTENT */}

        <div className="cart-content">

          <div className="cart-products">

            <div className="empty-cart">

              <div className="empty-icon">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 4h2l2 12h10l3-9H6" />
                  <circle cx="9" cy="20" r="1.5" />
                  <circle cx="18" cy="20" r="1.5" />
                </svg>

              </div>

              <h2>
                سبد خریدت خالیه
              </h2>

              <p>
                هنوز محصولی به سبد خرید اضافه نکردی.
                <br />
                یه سر به محصولاتمون بزن و استایل مورد علاقه‌ات رو پیدا کن.
              </p>

              <a
                href="/"
                className="back-shopping"
              >
                مشاهده محصولات
              </a>

            </div>

          </div>


          {/* SUMMARY */}

          <div className="cart-summary">

            <h2>خلاصه خرید</h2>

            <div className="summary-row">
              <span>تعداد محصولات</span>
              <strong>۰</strong>
            </div>

            <div className="summary-row">
              <span>مبلغ محصولات</span>
              <strong>۰ تومان</strong>
            </div>

            <div className="summary-row">
              <span>هزینه ارسال</span>
              <strong>رایگان</strong>
            </div>

            <div className="summary-line"></div>

            <div className="summary-total">
              <span>مبلغ نهایی</span>
              <strong>۰ تومان</strong>
            </div>

            <button
              className="checkout-btn"
              disabled
            >
              ادامه ثبت سفارش
            </button>

          </div>

        </div>

      </div>
      {/* =========================
    FOOTER
========================= */}

<footer className="site-footer">

<div className="footer-container">

  {/* معرفی */}

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


  {/* دسترسی سریع */}

  <div className="footer-column">

    <h3>دسترسی سریع</h3>

    <a href="/">خانه</a>
    <a href="/">محصولات</a>
    <a href="#">تیشرت</a>
    <a href="#">شلوار</a>
    <a href="#">درباره ما</a>

  </div>


  {/* ارتباط با ما */}

  <div className="footer-column">

    <h3>ارتباط با ما</h3>

    <a href="#">
      ...
    </a>

    <a href="tel:09123456789">
      📞 ۰۹۱۲۳۴۵۶۷۸۹
    </a>

    <a href="mailto:info@homestyle.ir">
      ✉️ info@homestyle.ir
    </a>

  </div>


  {/* شبکه‌های اجتماعی */}

  <div className="footer-social">

    <h3>ما را دنبال کنید</h3>

    <p>
      برای دیدن جدیدترین محصولات همراه ما باشید.
    </p>


    <div className="social-icons">

      {/* Instagram */}

      <a href="#" aria-label="Instagram">

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


      {/* Telegram */}

      <a href="#" aria-label="Telegram">

        <svg viewBox="0 0 24 24">

          <path d="M21 3 3 10.5l6.5 2.5L12 20l3-5 4-2Z" />

        </svg>

      </a>

    </div>

  </div>

</div>


{/* پایین فوتر */}

<div className="footer-bottom">

  <p>
    © ۱۴۰۵ homestyle — تمامی حقوق محفوظ است.
  </p>

  <span>
    ساخته شده با ❤️
  </span>

</div>

</footer>


      {/* =========================
          BOTTOM NAVIGATION
      ========================== */}

      <nav className="bottom-nav">

        {/* خانه */}

        <a
          href="/"
          className="bottom-nav-item"
        >

          <svg viewBox="0 0 24 24">
            <path d="M3 10.5L12 3l9 7.5" />
            <path d="M5 9.5V21h14V9.5" />
            <path d="M9 21v-6h6v6" />
          </svg>

          <span>خانه</span>

        </a>


        {/* ثبت خرید */}

        <a
          href="/sabad"
          className="bottom-nav-item active"
        >

          <svg viewBox="0 0 24 24">
            <path d="M3 4h2l2 12h10l3-9H6" />
            <circle cx="9" cy="20" r="1.5" />
            <circle cx="18" cy="20" r="1.5" />
          </svg>

          <span>ثبت خرید</span>

        </a>


        {/* محصولات */}

        <a
          href="#"
          className="bottom-nav-item"
        >

          <svg viewBox="0 0 24 24">
            <path d="M4 7h16" />
            <path d="M5 7l1 13h12l1-13" />
            <path d="M8 7a4 4 0 0 1 8 0" />
          </svg>

          <span>محصولات</span>

        </a>


        {/* جستجو */}

        <a
          href="#"
          className="bottom-nav-item"
        >

          <svg viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>

          <span>جستجو</span>

        </a>

      </nav>

    </main>
  );
}