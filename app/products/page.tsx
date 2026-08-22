"use client";

import { useState } from "react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  badge?: string;
  image: string;
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
    name: "کت مینیمال",
    description: "مناسب استایل خاص",
    price: "۲,۴۰۰,۰۰۰ تومان",
    category: "کت",
    badge: "ویژه",
    image: "/media/کت.png",
  },
  {
    id: 6,
    name: "کت سبز پاستیلی",
    description: "استایل خاص و متفاوت",
    price: "۲,۷۰۰,۰۰۰ تومان",
    category: "کت",
    badge: "محبوب",
    image: "/media/کت.png",
  },
];

export default function Products() {
  const [filter, setFilter] = useState("همه");

  const filteredProducts =
    filter === "همه"
      ? products
      : products.filter((product) => product.category === filter);

  return (
    <main className="products-page" dir="rtl">

      <section className="products-header">
        <span className="products-badge">
          کالکشن HomeStyle
        </span>

        <h1>محصولات</h1>

        <p>
          محصول مورد علاقه‌ات رو پیدا کن و استایل خودت رو بساز.
        </p>
      </section>

      <section className="products-section">

        <div className="filter-box">
          <span className="filter-title">
            دسته‌بندی محصولات
          </span>

          <div className="filter-buttons">
            {["همه", "تیشرت", "شلوار", "کت"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
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

        <div className="products-page-grid">

          {filteredProducts.map((product) => (
            <article
              className="shop-product-card"
              key={product.id}
            >

              <div className="product-top-info">
                <span>{product.category}</span>

                {product.badge && (
                  <strong>{product.badge}</strong>
                )}
              </div>
              <a
  href={`/products/${product.id}`}
  className="product-image-link"
>
  <div className="shop-product-image">
    <img
      src={product.image}
      alt={product.name}
    />
  </div>
</a>
    

              <div className="shop-product-info">
                <h2>{product.name}</h2>

                <p>{product.description}</p>

                <div className="shop-product-bottom">

                  <div>
                    <small>قیمت</small>

                    <strong>
                      {product.price}
                    </strong>
                  </div>

                  <button
                    type="button"
                    className="add-product-btn"
                    aria-label={`افزودن ${product.name}`}
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
          ))}

        </div>

      </section>

    </main>
  );
}