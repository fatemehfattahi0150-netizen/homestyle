"use client";

import { useEffect, useState } from "react";

type CartItem = {
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
  quantity: number;
};

export default function Sabad() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // دریافت سبد خرید
  useEffect(() => {
    const savedCart = localStorage.getItem("homestyle-cart");

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);

        // هماهنگ کردن محصولات قدیمی با ساختار جدید
        const fixedCart = parsedCart.map((item: any) => ({
          ...item,
          price: String(item.price ?? "0"),
          images:
            Array.isArray(item.images) && item.images.length > 0
              ? item.images
              : item.image
                ? [item.image]
                : [],
          quantity: Number(item.quantity ?? 1),
        }));

        setCart(fixedCart);
      } catch {
        setCart([]);
      }
    }

    setLoaded(true);
  }, []);

  // ذخیره سبد خرید
  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);

    localStorage.setItem(
      "homestyle-cart",
      JSON.stringify(newCart)
    );
  };

  // افزایش تعداد
  const increaseQuantity = (id: number) => {
    const newCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    updateCart(newCart);
  };

  // کاهش تعداد
  const decreaseQuantity = (id: number) => {
    const newCart = cart
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(newCart);
  };

  // حذف محصول
  const removeProduct = (id: number) => {
    const newCart = cart.filter(
      (item) => item.id !== id
    );

    updateCart(newCart);
  };

  // تعداد کل محصولات
  const totalCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  // تبدیل قیمت به عدد
  const getPrice = (price: string | number) => {
    const cleaned = String(price)
      .replace(/[^\d]/g, "");

    return Number(cleaned) || 0;
  };

  // مبلغ کل
  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      getPrice(item.price) * item.quantity,
    0
  );

  // فرمت قیمت
  const formatPrice = (price: number) => {
    return price.toLocaleString("fa-IR");
  };

  return (
    <main
      className="cart-page"
      dir="rtl"
    >
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

          <h1>
            ثبت خرید
          </h1>

          <p>
            محصولاتی که انتخاب کردی
            اینجا منتظرت هستن
          </p>

        </div>


        {/* CONTENT */}

        <div className="cart-content">

          {/* PRODUCTS */}

          <div className="cart-products">

            {!loaded ? (

              <div className="empty-cart">

                <h2>
                  در حال بارگذاری...
                </h2>

              </div>

            ) : cart.length === 0 ? (

              /* EMPTY CART */

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

                </div>

                <h2>
                  سبد خریدت خالیه
                </h2>

                <p>
                  هنوز محصولی به سبد خرید اضافه نکردی.
                  <br />
                  یه سر به محصولاتمون بزن و
                  استایل مورد علاقه‌ات رو پیدا کن.
                </p>

                <a
                  href="/products"
                  className="back-shopping"
                >
                  مشاهده محصولات
                </a>

              </div>

            ) : (

              /* PRODUCTS */

              <div className="cart-items">

                {cart.map((item) => (

                  <div
                    className="cart-item"
                    key={item.id}
                  >

                    {/* IMAGE */}

                    <img
                      src={
                        item.images &&
                        item.images.length > 0
                          ? item.images[0]
                          : "/media/placeholder.jpg"
                      }
                      alt={item.name}
                      className="cart-item-image"
                    />


                    {/* INFO */}

                    <div className="cart-item-info">

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        {formatPrice(
                          getPrice(item.price)
                        )}
                        {" "}
                        تومان
                      </p>

                      {item.category && (
                        <small>
                          {item.category}
                        </small>
                      )}


                      {/* QUANTITY */}

                      <div className="cart-quantity">

                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(
                              item.id
                            )
                          }
                        >
                          −
                        </button>

                        <span>
                          {item.quantity.toLocaleString(
                            "fa-IR"
                          )}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(
                              item.id
                            )
                          }
                        >
                          +
                        </button>

                      </div>

                    </div>


                    {/* LEFT */}

                    <div className="cart-item-left">

                      <strong>
                        {formatPrice(
                          getPrice(item.price) *
                            item.quantity
                        )}
                        {" "}
                        تومان
                      </strong>

                      <button
                        type="button"
                        className="remove-product"
                        onClick={() =>
                          removeProduct(
                            item.id
                          )
                        }
                      >
                        حذف
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>


          {/* SUMMARY */}

          <div className="cart-summary">

            <h2>
              خلاصه خرید
            </h2>


            <div className="summary-row">

              <span>
                تعداد محصولات
              </span>

              <strong>
                {totalCount.toLocaleString(
                  "fa-IR"
                )}
              </strong>

            </div>


            <div className="summary-row">

              <span>
                مبلغ محصولات
              </span>

              <strong>
                {formatPrice(totalPrice)}
                {" "}
                تومان
              </strong>

            </div>


            <div className="summary-row">

              <span>
                هزینه ارسال
              </span>

              <strong>
                ....
              </strong>

            </div>


            <div className="summary-line"></div>


            <div className="summary-total">

              <span>
                مبلغ نهایی
              </span>

              <strong>
                {formatPrice(totalPrice)}
                {" "}
                تومان
              </strong>

            </div>


            {/* CHECKOUT */}

            <a
              href="/checkout"
              className="checkout-btn"
              style={{
                pointerEvents:
                  cart.length === 0
                    ? "none"
                    : "auto",

                opacity:
                  cart.length === 0
                    ? 0.5
                    : 1,
              }}
            >
              ادامه ثبت سفارش
            </a>

          </div>

        </div>

      </div>


      {/* FOOTER */}

      <footer className="site-footer">

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

            <a href="/">
              خانه
            </a>

            <a href="/products">
              محصولات
            </a>

            <a href="#">
              تیشرت
            </a>

            <a href="#">
              شلوار
            </a>

            <a href="#">
              درباره ما
            </a>

          </div>


          <div className="footer-column">

            <h3>
              ارتباط با ما
            </h3>

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


          <div className="footer-social">

            <h3>
              ما را دنبال کنید
            </h3>

            <p>
              برای دیدن جدیدترین محصولات
              همراه ما باشید.
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


      {/* BOTTOM NAV */}

      <nav className="bottom-nav">

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


        <a
          href="/sabad"
          className="bottom-nav-item active"
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


            {totalCount > 0 && (

              <span className="cart-count">
                {totalCount.toLocaleString(
                  "fa-IR"
                )}
              </span>

            )}

          </div>

          <span>
            ثبت خرید
          </span>

        </a>


        <a
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

        </a>


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