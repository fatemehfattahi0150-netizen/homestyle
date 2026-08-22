interface ProductPageProps {
    params: Promise<{
      id: string;
    }>;
  }
  
  const products = {
    "1": {
      name: "تیشرت مینیمال",
      description: "تیشرت راحت و شیک برای استفاده روزمره.",
      price: "۸۹۰,۰۰۰ تومان",
      category: "تیشرت",
      image: "/media/تیشرت.png",
    },
  
    "2": {
      name: "تیشرت کلاسیک",
      description: "سادگی همیشه جذابه و برای استایل روزمره مناسبه.",
      price: "۷۹۰,۰۰۰ تومان",
      category: "تیشرت",
      image: "/media/تیشرت.png",
    },
  
    "3": {
      name: "شلوار کژوال",
      description: "استایل راحت روزمره با طراحی مینیمال.",
      price: "۱,۲۵۰,۰۰۰ تومان",
      category: "شلوار",
      image: "/media/شلوار.png",
    },
  
    "4": {
      name: "شلوار کتان",
      description: "نرم و مناسب استفاده روزانه.",
      price: "۱,۴۹۰,۰۰۰ تومان",
      category: "شلوار",
      image: "/media/شلوار.png",
    },
  
    "5": {
      name: "کت مینیمال",
      description: "مناسب استایل خاص و متفاوت.",
      price: "۲,۴۰۰,۰۰۰ تومان",
      category: "کت",
      image: "/media/کت.png",
    },
  
    "6": {
      name: "کت سبز پاستیلی",
      description: "استایل خاص و متفاوت با رنگ سبز پاستیلی.",
      price: "۲,۷۰۰,۰۰۰ تومان",
      category: "کت",
      image: "/media/کت.png",
    },
  };
  
  export default async function ProductPage({
    params,
  }: ProductPageProps) {
    const { id } = await params;
  
    const product = products[id as keyof typeof products];
  
    if (!product) {
      return (
        <main className="product-page" dir="rtl">
          <div className="product-details-wrapper">
  
            <h1>محصول پیدا نشد</h1>
  
            <a
              href="/products"
              className="product-back-link"
            >
              ← برگشت به محصولات
            </a>
  
          </div>
        </main>
      );
    }
  
    return (
      <main className="product-page" dir="rtl">
  
        <div className="product-details-wrapper">
  
          {/* برگشت */}
  
          <a
            href="/products"
            className="product-back-link"
          >
            ← برگشت به محصولات
          </a>
  
  
          {/* کارت محصول */}
  
          <section className="product-detail-card">
  
            {/* تصویر */}
  
            <div className="product-detail-image">
  
              <img
                src={product.image}
                alt={product.name}
              />
  
            </div>
  
  
            {/* اطلاعات */}
  
            <div className="product-detail-info">
  
              <span className="product-detail-category">
                {product.category}
              </span>
  
  
              <h1>
                {product.name}
              </h1>
  
  
              <p className="product-detail-description">
                {product.description}
              </p>
  
  
              <div className="product-detail-price">
                {product.price}
              </div>
  
  
              {/* سایز */}
  
              <div className="product-detail-options">
  
                <span className="product-detail-options-title">
                  انتخاب سایز
                </span>
  
                <div className="product-option-list">
  
                  <button
                    type="button"
                    className="product-option"
                  >
                    S
                  </button>
  
                  <button
                    type="button"
                    className="product-option"
                  >
                    M
                  </button>
  
                  <button
                    type="button"
                    className="product-option"
                  >
                    L
                  </button>
  
                  <button
                    type="button"
                    className="product-option"
                  >
                    XL
                  </button>
  
                </div>
  
              </div>
  
  
              {/* رنگ */}
  
              <div className="product-detail-options">
  
                <span className="product-detail-options-title">
                  انتخاب رنگ
                </span>
  
                <div className="product-option-list">
  
                  <button
                    type="button"
                    className="product-option"
                  >
                    سبز پاستیلی
                  </button>
  
                  <button
                    type="button"
                    className="product-option"
                  >
                    سفید
                  </button>
  
                </div>
  
              </div>
  
  
              {/* ثبت خرید */}
  
              <a
                href={`/sabad?id=${id}`}
                className="product-add-cart"
              >
                افزودن به ثبت خرید
              </a>
  
            </div>
  
          </section>
  
        </div>
  
  
        {/* منوی شناور */}
  
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
  
            <span>
              خانه
            </span>
  
          </a>
  
  
          {/* ثبت خرید */}
  
          <a
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
  
          </a>
  
  
          {/* محصولات */}
  
          <a
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
  
          </a>
  
  
          {/* جستجو */}
  
          <a
            href="#"
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
  
          </a>
  
        </nav>
  
      </main>
    );
  }