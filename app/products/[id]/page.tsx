import Link from "next/link";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  /*
    فعلاً هیچ محصول فیکی اینجا وجود ندارد.
    بعداً محصول با id از دیتابیس / پنل مدیریت دریافت می‌شود.
  */

  const product = null;

  if (!product) {
    return (
      <main
        className="product-page"
        dir="rtl"
      >
        <div className="product-details-wrapper">

          <div className="product-not-found">

            <div className="product-not-found-icon">
              🛍️
            </div>

            <h1>
              محصول پیدا نشد
            </h1>

            <p>
              این محصول هنوز اضافه نشده یا وجود ندارد.
            </p>

            <Link
              href="/products"
              className="product-back-link"
            >
              ← برگشت به محصولات
            </Link>

          </div>

        </div>


        {/* ================= BOTTOM NAV ================= */}

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
            className="bottom-nav-item active"
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
            href="/products"
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


  /*
    صفحه اصلی جزئیات محصول
    بعداً اطلاعات این بخش مستقیماً از پنل ادمین می‌آید.
  */

  return (
    <main
      className="product-page"
      dir="rtl"
    >

      <div className="product-details-wrapper">

        <Link
          href="/products"
          className="product-back-link"
        >
          ← برگشت به محصولات
        </Link>


        <section className="product-detail-card">

          {/* تصاویر محصول */}

          <div className="product-detail-images">

            <div className="product-detail-image">
              {/* تصویر اصلی محصول */}
            </div>

            <div className="product-detail-thumbnails">
              {/* تصاویر بیشتر محصول اینجا قرار می‌گیرند */}
            </div>

          </div>


          {/* اطلاعات محصول */}

          <div className="product-detail-info">

            <span className="product-detail-category">
              دسته‌بندی
            </span>


            <h1>
              نام محصول
            </h1>


            <p className="product-detail-description">
              توضیحات محصول از پنل مدیریت در این قسمت نمایش داده می‌شود.
            </p>


            <div className="product-detail-price">
              قیمت محصول
            </div>


            {/* سایز */}

            <div className="product-detail-options">

              <span className="product-detail-options-title">
                انتخاب سایز
              </span>

              <div className="product-option-list">

                {/* سایزها بعداً از پنل ادمین می‌آیند */}

              </div>

            </div>


            {/* رنگ */}

            <div className="product-detail-options">

              <span className="product-detail-options-title">
                انتخاب رنگ
              </span>

              <div className="product-option-list">

                {/* رنگ‌ها بعداً از پنل ادمین می‌آیند */}

              </div>

            </div>


            {/* افزودن به ثبت خرید */}

            <button
              type="button"
              className="product-add-cart"
            >
              افزودن به ثبت خرید
            </button>

          </div>

        </section>


        {/* ================= PRODUCT DESCRIPTION ================= */}

        <section className="product-extra-details">

          <h2>
            جزئیات محصول
          </h2>

          <div className="product-extra-details-content">

            {/* 
              جزئیات بیشتر محصول بعداً از پنل مدیریت
              به صورت داینامیک نمایش داده می‌شوند.
            */}

          </div>

        </section>

      </div>


      {/* ================= BOTTOM NAV ================= */}

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
          className="bottom-nav-item active"
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
          href="/products"
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