import Link from "next/link";

const collections = [
  {
    id: 1,
    title: "کالکشن پاییزی",
    subtitle: "رنگ‌های گرم و استایل خاص پاییز",
    image: "/media/autumn.png",
    className: "autumn",
  },
  {
    id: 2,
    title: "کالکشن زمستانی",
    subtitle: "گرم، شیک و مناسب روزهای سرد",
    image: "/media/winter.png",
    className: "winter",
  },
  {
    id: 3,
    title: "کالکشن بهاری",
    subtitle: "رنگ‌های لطیف برای شروع یک فصل تازه",
    image: "/media/spring.png",
    className: "spring",
  },
  {
    id: 4,
    title: "کالکشن تابستانی",
    subtitle: "سبک، خنک و مناسب روزهای آفتابی",
    image: "/media/summer.png",
    className: "summer",
  },
];

export default function CollectionsPage() {
  return (
    <main className="collections-page" dir="rtl">

      <header className="collections-header">

        <Link
          href="/"
          className="back-home"
        >
          ← بازگشت به خانه
        </Link>

        <span className="collections-badge">
          HomeStyle
        </span>

        <h1>
          کالکشن‌های ما
        </h1>

        <p>
          فصل مورد علاقه‌ات رو انتخاب کن
          و استایل مخصوص خودت رو پیدا کن.
        </p>

      </header>


      <section className="collections-grid">

        {collections.map((collection) => (

          <Link
            key={collection.id}
            href={`/products?collection=${collection.className}`}
            className={`collection-card ${collection.className}`}
          >

            <div className="collection-image">

              <img
                src={collection.image}
                alt={collection.title}
              />

            </div>

            <div className="collection-info">

              <span>
                COLLECTION 0{collection.id}
              </span>

              <h2>
                {collection.title}
              </h2>

              <p>
                {collection.subtitle}
              </p>

              <strong>
                مشاهده محصولات ←
              </strong>

            </div>

          </Link>

        ))}

      </section>


      <nav className="bottom-nav">

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


        <Link
          href="/sabad"
          className="bottom-nav-item"
        >
          <svg viewBox="0 0 24 24">
            <path d="M3 4h2l2 12h10l3-9H6" />
            <circle cx="9" cy="20" r="1.5" />
            <circle cx="18" cy="20" r="1.5" />
          </svg>

          <span>
            ثبت خرید
          </span>
        </Link>

      </nav>
      <footer className="site-footer">

  <div className="footer-container">

    {/* درباره فروشگاه */}

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

      <h3>
        دسترسی سریع
      </h3>

      <Link href="/">
        خانه
      </Link>

      <Link href="/collections">
        کالکشن‌ها
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

    </div>


    {/* ارتباط با ما */}

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


    {/* شبکه‌های اجتماعی */}

    <div className="footer-social">

      <h3>
        ما را دنبال کنید
      </h3>

      <p>
        برای دیدن جدیدترین محصولات همراه ما باشید.
      </p>

      <div className="social-icons">

        {/* Instagram */}

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


        {/* Telegram */}

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

    </main>
  );
}