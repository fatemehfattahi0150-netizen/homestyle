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
  images: string[];
  sizes: string[];
  colors: string[];
  isFeatured: boolean;
  collections: string[];
  stock: number;
};

type CartItem = Product & {
  quantity: number;
};

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
  ) || 0;
}

function ProductsContent() {
  const searchParams = useSearchParams();

  const categoryFromUrl =
    searchParams.get("category");

  /* ================= PRODUCTS ================= */

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loadingProducts, setLoadingProducts] =
    useState(true);

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

  /* ================= MODAL ================= */

  const [showModal, setShowModal] =
    useState(false);

  const [addedProduct, setAddedProduct] =
    useState<Product | null>(null);

  /* ================================================= */
  /* LOAD PRODUCTS FROM DATABASE */
  /* ================================================= */

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoadingProducts(true);

        const response =
          await fetch("/api/products");

        if (!response.ok) {
          throw new Error(
            "خطا در دریافت محصولات"
          );
        }

        const data =
          await response.json();

        const fixedProducts: Product[] =
          data.map((product: any) => ({
            ...product,

            images:
              Array.isArray(product.images)
                ? product.images
                : [],

            sizes:
              Array.isArray(product.sizes)
                ? product.sizes
                : [],

            colors:
              Array.isArray(product.colors)
                ? product.colors
                : [],

            collections:
              Array.isArray(
                product.collections
              )
                ? product.collections
                : [],

            price:
              String(product.price ?? ""),

            stock:
              Number(product.stock ?? 0),
          }));

        setProducts(fixedProducts);

      } catch (error) {
        console.error(
          "Error loading products:",
          error
        );

        setProducts([]);

      } finally {
        setLoadingProducts(false);
      }
    };

    loadProducts();
  }, []);

  /* ================================================= */
  /* LOAD CART */
  /* ================================================= */

  useEffect(() => {
    const savedCart =
      localStorage.getItem(
        "homestyle-cart"
      );

    if (savedCart) {
      try {
        setCart(
          JSON.parse(savedCart)
        );
      } catch {
        setCart([]);
      }
    }
  }, []);

  /* ================================================= */
  /* URL CATEGORY */
  /* ================================================= */

  useEffect(() => {
    if (categoryFromUrl === "tshirt") {
      setFilter("تیشرت");

    } else if (
      categoryFromUrl === "pants"
    ) {
      setFilter("شلوار");

    } else if (
      categoryFromUrl === "hat"
    ) {
      setFilter("کلاه");

    } else {
      setFilter("همه");
    }
  }, [categoryFromUrl]);

  /* ================================================= */
  /* CART COUNT */
  /* ================================================= */

  const cartCount =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  /* ================================================= */
  /* FILTER PRODUCTS */
  /* ================================================= */

  const filteredProducts =
    filter === "همه"
      ? products
      : products.filter(
          (product) =>
            product.category === filter
        );

  /* ================================================= */
  /* ADD TO CART */
  /* ================================================= */

  const addToCart = (
    product: Product
  ) => {
    if (product.stock <= 0) {
      return;
    }

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
          ...product,
          quantity: 1,
        },
      ];
    }

    setCart(newCart);

    localStorage.setItem(
      "homestyle-cart",
      JSON.stringify(newCart)
    );

    setAddedProduct(product);
    setShowModal(true);
  };

  /* ================================================= */
  /* RETURN */
  /* ================================================= */

  return (
    <main
      className="products-page"
      dir="rtl"
    >

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

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


      {/* ================================================= */}
      {/* PRODUCTS SECTION */}
      {/* ================================================= */}

      <section className="products-section">

        {/* FILTER */}

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


        {/* ================================================= */}
        {/* PRODUCTS GRID */}
        {/* ================================================= */}

        <div className="products-page-grid">

          {loadingProducts ? (

            <div className="no-products">

              <div className="no-products-icon">
                🛍️
              </div>

              <h2>
                در حال بارگذاری محصولات...
              </h2>

              <p>
                لطفاً چند لحظه صبر کن.
              </p>

            </div>

          ) : filteredProducts.length > 0 ? (

            filteredProducts.map(
              (product) => (

                <article
                  className="shop-product-card"
                  key={product.id}
                >

                  {/* PRODUCT TOP */}

                  <div className="product-top-info">

                    <span>
                      {product.category}
                    </span>

                    {product.isFeatured && (
                      <strong>
                        ویژه
                      </strong>
                    )}

                  </div>


                  {/* IMAGE */}

                  <Link
                    href={`/products/${product.id}`}
                    className="product-image-link"
                  >

                    <div className="shop-product-image">

                      {product.images &&
                      product.images.length > 0 ? (

                        <img
                          src={
                            product.images[0]
                          }
                          alt={
                            product.name
                          }
                        />

                      ) : (

                        <div
                          style={{
                            width:
                              "100%",
                            height:
                              "100%",
                            display:
                              "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                            fontSize:
                              "50px",
                          }}
                        >
                          🛍️
                        </div>

                      )}

                    </div>

                  </Link>


                  {/* INFO */}

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
                          {" "}
                          تومان
                        </strong>

                      </div>


                      {/* ADD TO CART */}

                      <button
                        type="button"
                        className="add-product-btn"
                        aria-label={
                          `افزودن ${product.name}`
                        }
                        onClick={() =>
                          addToCart(product)
                        }
                        disabled={
                          product.stock <= 0
                        }
                        style={{
                          opacity:
                            product.stock <= 0
                              ? 0.5
                              : 1,
                        }}
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


                    {/* STOCK */}

                    <small
                      style={{
                        display:
                          "block",
                        marginTop:
                          "8px",
                      }}
                    >
                      {product.stock > 0
                        ? `موجودی: ${product.stock.toLocaleString("fa-IR")} عدد`
                        : "ناموجود"}
                    </small>

                  </div>

                </article>

              )
            )

          ) : (

            /* EMPTY */

            <div className="no-products">

              <div className="no-products-icon">
                🛍️
              </div>

              <h2>
                هنوز محصولی اضافه نشده
              </h2>

              <p>
                محصولات جدید از پنل مدیریت
                اضافه می‌شوند.
              </p>

            </div>

          )}

        </div>

      </section>


      {/* ================================================= */}
      {/* CART MODAL */}
      {/* ================================================= */}

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


      {/* ================================================= */}
      {/* BOTTOM NAV */}
      {/* ================================================= */}

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
                {cartCount.toLocaleString(
                  "fa-IR"
                )}
              </span>

            )}

          </div>


          <span>
            ثبت خرید
          </span>

        </Link>


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