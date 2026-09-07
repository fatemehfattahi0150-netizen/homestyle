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

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductPage({
  params,
}: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { id } = await params;

        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error("خطا در دریافت محصولات");
        }

        const products: Product[] = await response.json();

        const foundProduct = products.find(
          (item) => item.id === Number(id)
        );

        setProduct(foundProduct || null);
      } catch (error) {
        console.error(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params]);

  const formatPrice = (price: string | number) => {
    const numberPrice = Number(
      String(price).replace(/[^\d]/g, "")
    );

    return numberPrice.toLocaleString("fa-IR");
  };

  const addToCart = () => {
    if (!product) return;

    const savedCart =
      localStorage.getItem("homestyle-cart");

    let cart: any[] = [];

    if (savedCart) {
      try {
        cart = JSON.parse(savedCart);
      } catch {
        cart = [];
      }
    }

    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
        selectedSize,
        selectedColor,
      });
    }

    localStorage.setItem(
      "homestyle-cart",
      JSON.stringify(cart)
    );

    setAdded(true);

    setTimeout(() => {
      window.location.href = "/sabad";
    }, 500);
  };

  /* ================= LOADING ================= */

  if (loading) {
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
              در حال بارگذاری...
            </h1>

            <p>
              لطفاً چند لحظه صبر کن.
            </p>

          </div>

        </div>
      </main>
    );
  }

  /* ================= NOT FOUND ================= */

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


        {/* BOTTOM NAV */}

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


  /* ================= PRODUCT ================= */

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [];

  return (
    <main
      className="product-page"
      dir="rtl"
    >

      <div className="product-details-wrapper">

        {/* BACK */}

        <Link
          href="/products"
          className="product-back-link"
        >
          ← برگشت به محصولات
        </Link>


        {/* PRODUCT */}

        <section className="product-detail-card">

          {/* ================= IMAGES ================= */}

          <div className="product-detail-images">

            <div className="product-detail-image">

              {images.length > 0 ? (

                <img
                  src={images[selectedImage]}
                  alt={product.name}
                />

              ) : (

                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "60px",
                  }}
                >
                  🛍️
                </div>

              )}

            </div>


            {/* THUMBNAILS */}

            {images.length > 1 && (

              <div className="product-detail-thumbnails">

                {images.map(
                  (image, index) => (

                    <button
                      key={index}
                      type="button"
                      onClick={() =>
                        setSelectedImage(index)
                      }
                      style={{
                        border:
                          selectedImage === index
                            ? "2px solid #315c45"
                            : "2px solid transparent",
                        padding: "0",
                        background: "white",
                        cursor: "pointer",
                        borderRadius: "10px",
                        overflow: "hidden",
                      }}
                    >

                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                      />

                    </button>

                  )
                )}

              </div>

            )}

          </div>


          {/* ================= INFO ================= */}

          <div className="product-detail-info">

            {/* CATEGORY */}

            <span className="product-detail-category">
              {product.category}
            </span>


            {/* NAME */}

            <h1>
              {product.name}
            </h1>


            {/* DESCRIPTION */}

            <p className="product-detail-description">
              {product.description}
            </p>


            {/* PRICE */}

            <div className="product-detail-price">
              {formatPrice(product.price)}
              {" "}
              تومان
            </div>


            {/* STOCK */}

            <div
              style={{
                marginTop: "10px",
                marginBottom: "20px",
                fontSize: "14px",
              }}
            >

              {product.stock > 0 ? (
                <span>
                  موجودی:{" "}
                  {product.stock.toLocaleString(
                    "fa-IR"
                  )}{" "}
                  عدد
                </span>
              ) : (
                <span>
                  ناموجود
                </span>
              )}

            </div>


            {/* SIZE */}

            {product.sizes &&
              product.sizes.length > 0 && (

                <div className="product-detail-options">

                  <span className="product-detail-options-title">
                    انتخاب سایز
                  </span>

                  <div className="product-option-list">

                    {product.sizes.map(
                      (size) => (

                        <button
                          key={size}
                          type="button"
                          onClick={() =>
                            setSelectedSize(size)
                          }
                          style={{
                            border:
                              selectedSize === size
                                ? "2px solid #315c45"
                                : "1px solid #d7e5dc",
                            background:
                              selectedSize === size
                                ? "#dceee3"
                                : "white",
                            cursor: "pointer",
                            padding:
                              "8px 16px",
                            borderRadius:
                              "8px",
                          }}
                        >
                          {size}
                        </button>

                      )
                    )}

                  </div>

                </div>

              )}


            {/* COLOR */}

            {product.colors &&
              product.colors.length > 0 && (

                <div className="product-detail-options">

                  <span className="product-detail-options-title">
                    انتخاب رنگ
                  </span>

                  <div className="product-option-list">

                    {product.colors.map(
                      (color) => (

                        <button
                          key={color}
                          type="button"
                          onClick={() =>
                            setSelectedColor(color)
                          }
                          style={{
                            border:
                              selectedColor === color
                                ? "2px solid #315c45"
                                : "1px solid #d7e5dc",
                            background:
                              selectedColor === color
                                ? "#dceee3"
                                : "white",
                            cursor: "pointer",
                            padding:
                              "8px 16px",
                            borderRadius:
                              "8px",
                          }}
                        >
                          {color}
                        </button>

                      )
                    )}

                  </div>

                </div>

              )}


            {/* ADD TO CART */}

            <button
              type="button"
              className="product-add-cart"
              onClick={addToCart}
              disabled={product.stock <= 0}
              style={{
                opacity:
                  product.stock <= 0
                    ? 0.5
                    : 1,
                cursor:
                  product.stock <= 0
                    ? "not-allowed"
                    : "pointer",
              }}
            >

              {product.stock <= 0
                ? "محصول ناموجود است"
                : added
                  ? "✓ به ثبت خرید اضافه شد"
                  : "افزودن به ثبت خرید"}

            </button>

          </div>

        </section>


        {/* ================= EXTRA DETAILS ================= */}

        <section className="product-extra-details">

          <h2>
            جزئیات محصول
          </h2>

          <div className="product-extra-details-content">

            <p>
              دسته‌بندی:{" "}
              {product.category}
            </p>

            {product.collections &&
              product.collections.length > 0 && (

                <p>
                  مجموعه:{" "}
                  {product.collections.join("، ")}
                </p>

              )}

            {product.isFeatured && (

              <p>
                ⭐ این محصول در محصولات ویژه قرار دارد.
              </p>

            )}

          </div>

        </section>

      </div>


      {/* ================= BOTTOM NAV ================= */}

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