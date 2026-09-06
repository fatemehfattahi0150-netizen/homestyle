"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [mode, setMode] =
    useState<"login" | "register">("login");

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    // بعد از ورود یا ثبت‌نام
    window.location.href = "/account";
  };

  return (
    <main className="auth-page" dir="rtl">

      <div className="auth-container">

        {/* =========================
            BRAND
        ========================== */}

        <section className="auth-brand">

          <div className="auth-logo">
            <img
              src="media/hom.jpg"
              alt="HomeStyle"
            />
          </div>

          <span className="auth-brand-badge">
            HomeStyle
          </span>

          <h1>
            استایل تو،
            <br />
            انتخاب تو
          </h1>

          <p>
            وارد حساب کاربری خودت شو و
            خریدت رو راحت‌تر ادامه بده.
          </p>

        </section>


        {/* =========================
            FORM CARD
        ========================== */}

        <section className="auth-card">

          {/* TABS */}

          <div className="auth-tabs">

            <button
              type="button"
              className={
                mode === "login"
                  ? "auth-tab active"
                  : "auth-tab"
              }
              onClick={() => setMode("login")}
            >
              ورود
            </button>

            <button
              type="button"
              className={
                mode === "register"
                  ? "auth-tab active"
                  : "auth-tab"
              }
              onClick={() => setMode("register")}
            >
              ثبت‌نام
            </button>

          </div>


          {/* HEADING */}

          <div className="auth-heading">

            <h2>
              {mode === "login"
                ? "خوش برگشتی"
                : "به HomeStyle خوش اومدی 🌿"}
            </h2>

            <p>
              {mode === "login"
                ? "اطلاعات حساب کاربری خودت رو وارد کن."
                : "برای ساخت حساب کاربری اطلاعاتت رو وارد کن."}
            </p>

          </div>


          {/* =========================
              FORM
          ========================== */}

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            {/* NAME */}

            {mode === "register" && (

              <div className="auth-field">

                <label htmlFor="name">
                  نام و نام خانوادگی
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="مثلاً فاطمه فتاحی"
                  required
                />

              </div>

            )}


            {/* PHONE */}

            <div className="auth-field">

              <label htmlFor="phone">
                شماره موبایل
              </label>

              <input
                id="phone"
                type="tel"
                inputMode="tel"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                required
              />

            </div>


            {/* PASSWORD */}

            <div className="auth-field">

              <label htmlFor="password">
                رمز عبور
              </label>

              <input
                id="password"
                type="password"
                placeholder="رمز عبور خود را وارد کنید"
                required
              />

            </div>


            {/* CONFIRM PASSWORD */}

            {mode === "register" && (

              <div className="auth-field">

                <label htmlFor="confirmPassword">
                  تکرار رمز عبور
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="رمز عبور را دوباره وارد کنید"
                  required
                />

              </div>

            )}


            {/* LOGIN OPTIONS */}

            {mode === "login" && (

              <div className="auth-options">

                <label className="remember-me">

                  <input
                    type="checkbox"
                  />

                  <span>
                    مرا به خاطر بسپار
                  </span>

                </label>


                <button
                  type="button"
                  className="forgot-password"
                >
                  رمز عبور را فراموش کردم؟
                </button>

              </div>

            )}


            {/* =========================
                MAIN BUTTON
            ========================== */}

            <button
              type="submit"
              className="auth-submit"
            >
              {mode === "login"
                ? "ورود به حساب"
                : "ساخت حساب کاربری"}
            </button>


            {/* =========================
                GO TO CART
            ========================== */}

            <Link
              href="/checkout"
              className="go-cart-button"
            >
              {mode === "login"
                ? "ورود و ادامه فرایند خرید "
                : "ثبت‌نام و ادامه فرایند خرید "}
            </Link>

          </form>


          {/* =========================
              SWITCH
          ========================== */}

          <div className="auth-switch">

            {mode === "login" ? (

              <>
                <span>
                  هنوز حساب کاربری نداری؟
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setMode("register")
                  }
                >
                  ثبت‌نام کن
                </button>
              </>

            ) : (

              <>
                <span>
                  قبلاً حساب ساختی؟
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setMode("login")
                  }
                >
                  وارد شو
                </button>
              </>

            )}

          </div>


          {/* =========================
              GUEST
          ========================== */}

          <div className="auth-divider">

            <span>
              یا
            </span>

          </div>


          <Link
            href="/checkout"
            className="guest-button"
          >
            ادامه بدون ورود
          </Link>

        </section>

      </div>


      {/* =========================
          BOTTOM NAVIGATION
      ========================== */}

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


        {/* PRODUCTS */}

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


        {/* SEARCH */}

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