"use client";

import { useEffect, useState } from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    province: "",
    city: "",
    address: "",
    postalCode: "",
    description: "",
  });

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        setCart([]);
      }
    }
  }, []);

  const totalCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const formatPrice = (price: number) => {
    return price.toLocaleString("fa-IR");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setSubmitted(true);
  };

  return (
    <main
      className="checkout-page"
      dir="rtl"
    >

      <div className="checkout-container">

        {/* HEADER */}

        <div className="checkout-header">

          <span className="checkout-badge">
            ثبت سفارش
          </span>

          <h1>
            اطلاعات ارسال
          </h1>

          <p>
            اطلاعاتت رو وارد کن تا سفارش رو
            برات ثبت کنیم.
          </p>

        </div>


        {!submitted ? (

          <div className="checkout-layout">

            {/* FORM */}

            <form
              className="checkout-form"
              onSubmit={handleSubmit}
            >

              <div className="form-section">

                <h2>
                  اطلاعات گیرنده
                </h2>

                <div className="form-grid">

                  {/* نام */}

                  <div className="form-group">

                    <label htmlFor="fullName">
                      نام و نام خانوادگی
                    </label>

                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="مثلاً فاطمه فتاحی"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  {/* تلفن */}

                  <div className="form-group">

                    <label htmlFor="phone">
                      شماره تماس
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  {/* استان */}

                  <div className="form-group">

                    <label htmlFor="province">
                      استان
                    </label>

                    <input
                      id="province"
                      name="province"
                      type="text"
                      placeholder="مثلاً آذربایجان شرقی"
                      value={form.province}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  {/* شهر */}

                  <div className="form-group">

                    <label htmlFor="city">
                      شهر
                    </label>

                    <input
                      id="city"
                      name="city"
                      type="text"
                      placeholder="مثلاً تبریز"
                      value={form.city}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>


                {/* آدرس */}

                <div className="form-group">

                  <label htmlFor="address">
                    آدرس کامل
                  </label>

                  <textarea
                    id="address"
                    name="address"
                    rows={4}
                    placeholder="استان، شهر، خیابان، کوچه، پلاک، واحد..."
                    value={form.address}
                    onChange={handleChange}
                    required
                  />

                </div>


                {/* کد پستی */}

                <div className="form-group">

                  <label htmlFor="postalCode">
                    کد پستی
                  </label>

                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="۱۰ رقم کد پستی"
                    value={form.postalCode}
                    onChange={handleChange}
                    required
                  />

                </div>


                {/* توضیحات */}

                <div className="form-group">

                  <label htmlFor="description">
                    توضیحات سفارش
                    <span>
                      اختیاری
                    </span>
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    placeholder="مثلاً زنگ بزنید و تحویل دهید."
                    value={form.description}
                    onChange={handleChange}
                  />

                </div>

              </div>


              {/* BUTTONS */}

              <div className="checkout-actions">

                <a
                  href="/sabad"
                  className="back-to-cart"
                >
                  بازگشت به ثبت خرید
                </a>

                <button
                  type="submit"
                  className="submit-order-btn"
                >
                  ثبت اطلاعات و ادامه
                </button>

              </div>

            </form>


            {/* SUMMARY */}

            <aside className="checkout-summary">

              <h2>
                خلاصه سفارش
              </h2>


              <div className="checkout-summary-items">

                {cart.map((item) => (

                  <div
                    className="checkout-summary-item"
                    key={item.id}
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div>

                      <strong>
                        {item.name}
                      </strong>

                      <span>
                        تعداد:{" "}
                        {item.quantity.toLocaleString(
                          "fa-IR"
                        )}
                      </span>

                    </div>

                  </div>

                ))}

              </div>


              <div className="checkout-summary-line" />


              <div className="checkout-summary-row">

                <span>
                  تعداد محصولات
                </span>

                <strong>
                  {totalCount.toLocaleString(
                    "fa-IR"
                  )}
                </strong>

              </div>


              <div className="checkout-summary-row">

                <span>
                  مبلغ سفارش
                </span>

                <strong>
                  {formatPrice(totalPrice)}
                  {" "}
                  تومان
                </strong>

              </div>


              <div className="checkout-summary-row">

                <span>
                  ارسال
                </span>

                <strong>
                  رایگان
                </strong>

              </div>


              <div className="checkout-total">

                <span>
                  مبلغ نهایی
                </span>

                <strong>
                  {formatPrice(totalPrice)}
                  {" "}
                  تومان
                </strong>

              </div>

            </aside>

          </div>

        ) : (

          /* SUCCESS */

          <div className="order-success">

            <div className="success-icon">
              ✓
            </div>

            <h2>
              اطلاعات با موفقیت ثبت شد 🎉
            </h2>

            <p>
              اطلاعات گیرنده ثبت شد.
              <br />
              در مرحله بعد می‌تونیم بخش
              پرداخت سفارش رو اضافه کنیم.
            </p>

            <div className="success-buttons">

              <a
                href="/products"
                className="success-products"
              >
                بازگشت به محصولات
              </a>

              <a
                href="/sabad"
                className="success-cart"
              >
                مشاهده ثبت خرید
              </a>

            </div>

          </div>

        )}

      </div>


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
            <circle cx="11" cy="11" r="7" />
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