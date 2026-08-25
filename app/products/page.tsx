"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  badge?: string;
  image: string;
};

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "تیشرت مینیمال",
    description: "تیشرت راحت و شیک",
    price: "۸۹۰,۰۰۰ تومان",
    category: "تیشرت",
    badge: "ویژه",
    image: "/media/تیشرت.png",
  },
  {
    id: 2,
    name: "تیشرت کلاسیک",
    description: "سادگی همیشه جذابه",
    price: "۷۹۰,۰۰۰ تومان",
    category: "تیشرت",
    image: "/media/تیشرت.png",
  },
  {
    id: 3,
    name: "شلوار کژوال",
    description: "استایل راحت روزمره",
    price: "۱,۲۵۰,۰۰۰ تومان",
    category: "شلوار",
    badge: "جدید",
    image: "/media/شلوار.png",
  },
  {
    id: 4,
    name: "شلوار کتان",
    description: "نرم و مناسب استفاده روزانه",
    price: "۱,۴۹۰,۰۰۰ تومان",
    category: "شلوار",
    image: "/media/شلوار.png",
  },
  {
    id: 5,
    name: "کلاه مینیمال",
    description: "کلاه شیک و مناسب استایل روزمره",
    price: "۵۹۰,۰۰۰ تومان",
    category: "کلاه",
    badge: "ویژه",
    image: "/media/کلاه.png",
  },
  {
    id: 6,
    name: "کلاه سبز پاستیلی",
    description: "استایل خاص و متفاوت",
    price: "۶۹۰,۰۰۰ تومان",
    category: "کلاه",
    badge: "محبوب",
    image: "/media/کلاه.png",
  },
];

function convertPersianNumber(value: string) {
  const persian = "۰۱۲۳۴۵۶۷۸۹";
  const english = "0123456789";

  return value
    .split("")
    .map((char) => {
      const index = persian.indexOf(char);

      return index !== -1
        ? english[index]
        : char;
    })
    .join("");
}

function getPrice(price: string) {
  const converted = convertPersianNumber(price);

  return Number(
    converted
      .replace(/,/g, "")
      .replace("تومان", "")
      .trim()
  );
}


/* ================================================= */
/* PRODUCTS CONTENT */
/* ================================================= */

function ProductsContent() {
  const searchParams = useSearchParams();

  const categoryFromUrl = searchParams.get("category");


  /* ================= FILTER ================= */

  const getInitialFilter = () => {
    if (categoryFromUrl === "tshirt") {
      return "تیشرت";
    }

    if (categoryFromUrl === "pants") {
      return "شلوار";
    }

    if (categoryFromUrl === "hat") {
      return "کلاه";
    }

    return "همه";
  };


  const [filter, setFilter] =
    useState(getInitialFilter);


  /* ================= CART ================= */

  const [cart, setCart] =
    useState<CartItem[]>([]);


  const [showModal, setShowModal] =
    useState(false);


  const [addedProduct, setAddedProduct] =
    useState<Product | null>(null);


  /* ================= LOAD CART ================= */

  useEffect(() => {
    const savedCart =
      localStorage.getItem("cart");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        setCart([]);
      }
    }
  }, []);


  /* ================= URL CATEGORY ================= */

  useEffect(() => {
    if (categoryFromUrl === "tshirt") {
      setFilter("تیشرت");
    }

    else if (categoryFromUrl === "pants") {
      setFilter("شلوار");
    }

    else if (categoryFromUrl === "hat") {
      setFilter("کلاه");
    }

    else {
      setFilter("همه");
    }
  }, [categoryFromUrl]);


  /* ================= CART COUNT ================= */

  const cartCount =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );


  /* ================= FILTER PRODUCTS ================= */

  const filteredProducts =
    filter === "همه"
      ? products
      : products.filter(
          (product) =>
            product.category === filter
        );


  /* ================= ADD TO CART ================= */

  const addToCart = (
    product: Product
  ) => {

    const existingProduct =
      cart.find(
        (item) =>
          item.id === product.id
      );


    let newCart: CartItem[];


    if (existingProduct) {

      newCart =
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        );

    } else {

      newCart = [
        ...cart,
        {
          id: product.id,
          name: product.name,
          price: getPrice(product.price),
          image: product.image,
          quantity: 1,
        },
      ];

    }


    setCart(newCart);


    localStorage.setItem(
      "cart",
      JSON.stringify(newCart)
    );


    setAddedProduct(product);
    setShowModal(true);
  };


  return (
    <main
      className="products-page"
      dir="rtl"
    >

      {/* ================= HEADER ================= */}

      <section className="products-header">

        <span className="products-badge">
          کالکشن HomeStyle
        </span>

        <h1>
          {filter === "همه"
            ? "محصولات"
            : filter}
        </h1>

        <p>
          محصول مورد علاقه‌ات رو پیدا کن
          و استایل خودت رو بساز.
        </p>

      </section>


      {/* ================= PRODUCTS ================= */}

      <section className="products-section">


        {/* ================= FILTER ================= */}

        <div className="filter-box">

          <span className="filter-title">
            دسته‌بندی محصولات
          </span>


          <div className="filter-buttons">

            {[
              "همه",
              "تیشرت",
              "شلوار",
              "کلاه",
            ].map((item) => (

              <button
                key={item}
                type="button"
                onClick={() =>
                  setFilter(item)
                }
                className={
                  filter === item
                    ? "filter-btn active"
                    : "filter-btn"
                }
              >
                {item}
              </button>

            ))}

          </div>

        </div>


        {/* ================= PRODUCTS GRID ================= */}

        <div className="products-page-grid">

          {filteredProducts.length > 0 ? (

            filteredProducts.map(
              (product) => (

                <article
                  className="shop-product-card"
                  key={product.id}
                >

                  {/* CATEGORY + BADGE */}

                  <div className="product-top-info">

                    <span>
                      {product.category}
                    </span>

                    {product.badge && (
                      <strong>
                        {product.badge}
                      </strong>
                    )}

                  </div>


                  {/* PRODUCT IMAGE */}

                  <Link
                    href={`/products/${product.id}`}
                    className="product-image-link"
                  >

                    <div className="shop-product-image">

                      <img
                        src={product.image}
                        alt={product.name}
                      />

                    </div>

                  </Link>


                  {/* PRODUCT INFO */}

                  <div className="shop-product-info">

                    <h2>
                      {product.name}
                    </h2>

                    <p>
                      {product.description}
                    </p>


                    <div className="shop-product-bottom">

                      <div>

                        <small>
                          قیمت
                        </small>

                        <strong>
                          {product.price}
                        </strong>

                      </div>


                      {/* ADD TO CART */}

                      <button
                        type="button"
                        className="add-product-btn"
                        aria-label={`افزودن ${product.name}`}
                        onClick={() =>
                          addToCart(product)
                        }
                      >

                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >

                          <path d="M12 5v14" />

                          <path d="M5 12h14" />

                        </svg>

                      </button>

                    </div>

                  </div>

                </article>

              )
            )

          ) : (

            <div className="no-products">
              محصولی در این دسته‌بندی پیدا نشد.
            </div>

          )}

        </div>

      </section>


      {/* ================= MODAL ================= */}

      {showModal &&
        addedProduct && (

          <div
            className="cart-modal-overlay"
            onClick={() =>
              setShowModal(false)
            }
          >

            <div
              className="cart-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              {/* CLOSE */}

              <button
                type="button"
                className="cart-modal-close"
                onClick={() =>
                  setShowModal(false)
                }
              >
                ×
              </button>


              {/* ICON */}

              <div className="cart-modal-icon">
                🛒
              </div>


              <h2>
                محصول به ثبت خرید اضافه شد
              </h2>


              <p>
                آیا مایل به رفتن به سبد خرید هستید؟
              </p>


              <strong className="modal-product-name">
                {addedProduct.name}
              </strong>


              {/* BUTTONS */}

              <div className="cart-modal-buttons">

                <Link
                  href="/sabad"
                  className="go-to-cart"
                >
                  بله
                </Link>


                <button
                  type="button"
                  className="continue-shopping"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  خیر
                </button>

              </div>

            </div>

          </div>

        )}


      {/* ================= BOTTOM NAV ================= */}

      <nav className="bottom-nav">


        {/* HOME */}

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


        {/* CART */}

        <Link
          href="/sabad"
          className="bottom-nav-item"
        >

          <div className="bottom-cart-icon">

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


            {cartCount > 0 && (

              <span className="cart-count">
                {cartCount}
              </span>

            )}

          </div>


          <span>
            ثبت خرید
          </span>

        </Link>


        {/* PRODUCTS */}

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


        {/* SEARCH */}

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


/* ================================================= */
/* PAGE */
/* ================================================= */

export default function Products() {
  return (
    <Suspense
      fallback={
        <main
          dir="rtl"
          className="products-page"
        >
          <div className="products-loading">
            در حال بارگذاری محصولات...
          </div>
        </main>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}