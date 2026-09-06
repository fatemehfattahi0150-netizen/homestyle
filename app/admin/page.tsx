"use client";

import {
  useState,
  type FormEvent,
  type ChangeEvent,
} from "react";

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

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [menuOpen, setMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);

  const [products, setProducts] = useState<Product[]>([]);

  /* ================= PRODUCT FORM ================= */

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const [productImages, setProductImages] = useState<string[]>([]);

  const [productSizes, setProductSizes] = useState<string[]>([]);
  const [productColors, setProductColors] = useState<string[]>([]);

  const [newSize, setNewSize] = useState("");
  const [newColor, setNewColor] = useState("");

  const [isFeatured, setIsFeatured] = useState(false);
  const [collections, setCollections] = useState<string[]>([]);

  /* ================= NOTIFICATION ================= */

  const [notificationText, setNotificationText] = useState("");

  /* ================= LOAD NOTIFICATION ================= */

  const loadNotification = () => {
    const savedNotification = localStorage.getItem(
      "homestyle-notification"
    );

    if (savedNotification) {
      setNotificationText(savedNotification);
    } else {
      setNotificationText("");
    }
  };

  /* ================= PUBLISH NOTIFICATION ================= */

  const publishNotification = () => {
    const text = notificationText.trim();

    if (!text) {
      localStorage.removeItem(
        "homestyle-notification"
      );

      setNotificationText("");

      alert("اطلاعیه حذف شد.");

      return;
    }

    localStorage.setItem(
      "homestyle-notification",
      text
    );

    setNotificationText(text);

    alert("اطلاعیه با موفقیت منتشر شد.");
  };

  /* ================= LOGIN ================= */

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    if (username === "admin" && password === "1234") {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError(
        "نام کاربری یا رمز عبور اشتباه است."
      );
    }
  };

  /* ================= MENU ================= */

  const openPanel = (panel: string) => {
    setActivePanel(panel);
    setMenuOpen(false);

    if (panel === "notifications") {
      loadNotification();
    }
  };

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    setIsLoggedIn(false);
    setMenuOpen(false);
    setActivePanel(null);

    setUsername("");
    setPassword("");
    setShowPassword(false);
  };

  /* ================= IMAGE UPLOAD ================= */

  const handleImageUpload = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;

    if (!files) return;

    const selectedFiles = Array.from(files);

    selectedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          setProductImages((current) => [
            ...current,
            reader.result as string,
          ]);
        }
      };

      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  /* ================= REMOVE IMAGE ================= */

  const removeImage = (index: number) => {
    setProductImages((current) =>
      current.filter(
        (_, imageIndex) =>
          imageIndex !== index
      )
    );
  };

  /* ================= ADD SIZE ================= */

  const addSize = () => {
    const size = newSize.trim();

    if (!size) return;

    if (productSizes.includes(size)) {
      setNewSize("");
      return;
    }

    setProductSizes((current) => [
      ...current,
      size,
    ]);

    setNewSize("");
  };

  /* ================= REMOVE SIZE ================= */

  const removeSize = (size: string) => {
    setProductSizes((current) =>
      current.filter(
        (item) => item !== size
      )
    );
  };

  /* ================= ADD COLOR ================= */

  const addColor = () => {
    const color = newColor.trim();

    if (!color) return;

    if (productColors.includes(color)) {
      setNewColor("");
      return;
    }

    setProductColors((current) => [
      ...current,
      color,
    ]);

    setNewColor("");
  };

  /* ================= REMOVE COLOR ================= */

  const removeColor = (color: string) => {
    setProductColors((current) =>
      current.filter(
        (item) => item !== color
      )
    );
  };

  /* ================= COLLECTION ================= */

  const toggleCollection = (
    collection: string
  ) => {
    setCollections((current) =>
      current.includes(collection)
        ? current.filter(
            (item) =>
              item !== collection
          )
        : [...current, collection]
    );
  };

  /* ================= RESET FORM ================= */

  const resetProductForm = () => {
    setProductName("");
    setProductPrice("");
    setProductStock("");
    setProductCategory("");
    setProductDescription("");

    setProductImages([]);

    setProductSizes([]);
    setProductColors([]);

    setNewSize("");
    setNewColor("");

    setIsFeatured(false);
    setCollections([]);
  };

  /* ================= SAVE PRODUCT ================= */

  const saveProduct = () => {
    if (!productName.trim()) {
      alert(
        "لطفاً نام محصول را وارد کنید."
      );
      return;
    }

    if (!productPrice.trim()) {
      alert(
        "لطفاً قیمت محصول را وارد کنید."
      );
      return;
    }

    if (!productStock.trim()) {
      alert(
        "لطفاً تعداد موجودی محصول را وارد کنید."
      );
      return;
    }

    if (Number(productStock) < 0) {
      alert(
        "تعداد موجودی نمی‌تواند منفی باشد."
      );
      return;
    }

    if (!productCategory) {
      alert(
        "لطفاً دسته‌بندی محصول را انتخاب کنید."
      );
      return;
    }

    const newProduct: Product = {
      id: Date.now(),

      name: productName.trim(),

      price: productPrice.trim(),

      stock: Number(productStock),

      category: productCategory,

      description:
        productDescription.trim(),

      images: productImages,

      sizes: productSizes,

      colors: productColors,

      isFeatured,

      collections,
    };

    setProducts((current) => [
      ...current,
      newProduct,
    ]);

    resetProductForm();

    setActivePanel(null);
  };

  /* ================= LOGIN PAGE ================= */

  if (!isLoggedIn) {
    return (
      <main className="admin-login-page">

        <div className="admin-login-box">

          <div className="admin-login-logo">
            <img
              src="media/hom.jpg"
              alt=""
            />
          </div>

          <h1>
            ورود به مدیریت
          </h1>

          <p>
            برای ورود به پنل مدیریت اطلاعات خود را وارد کنید.
          </p>

          <form onSubmit={handleLogin}>

            <label>
              نام کاربری

              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }
                placeholder="نام کاربری"
                autoComplete="username"
              />
            </label>

            <label className="admin-password-label">
              رمز عبور

              <div className="admin-password-wrapper">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder="رمز عبور"
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="admin-password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (current) =>
                        !current
                    )
                  }
                >
                  {showPassword
                    ? "مخفی"
                    : "نمایش"}
                </button>

              </div>
            </label>

            {loginError && (
              <div className="admin-login-error">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="admin-login-button"
            >
              ورود
            </button>

          </form>

        </div>

      </main>
    );
  }

  /* ================= ADMIN PANEL ================= */

  return (
    <main className="admin-page">

      {/* HEADER */}

      <header className="admin-header">

        <div className="admin-brand">

          <div className="admin-logo">

            <img
              src="media/hom.jpg"
              alt=""
            />

          </div>

          <div>

            <h1>
              سلام، خوش آمدی
            </h1>

            <p>
              مدیریت فروشگاه
            </p>

          </div>

        </div>


        {/* HAMBURGER */}

        <button
          className="admin-menu-button"
          onClick={() =>
            setMenuOpen(
              (current) =>
                !current
            )
          }
          aria-label="باز کردن منو"
          aria-expanded={menuOpen}
        >

          <span></span>
          <span></span>
          <span></span>

        </button>

      </header>


      {/* SIDE MENU */}

      {menuOpen && (
        <>

          <div
            className="admin-menu-overlay"
            onClick={() =>
              setMenuOpen(false)
            }
          />

          <aside className="admin-side-menu">

            {/* PROFILE */}

            <div className="admin-profile">

              <div className="admin-profile-image">

                <img
                  src="media/hesab.webp"
                  alt=""
                />

              </div>

              <div>

                <strong>
                  admin
                </strong>

                <span>
                  مدیر فروشگاه
                </span>

              </div>

            </div>


            {/* MENU */}

            <div className="admin-menu-items">

              <button
                onClick={() =>
                  openPanel(
                    "products"
                  )
                }
              >
                محصولات
              </button>

              <button
                onClick={() =>
                  openPanel(
                    "notifications"
                  )
                }
              >
                اطلاعیه‌ها
              </button>

              <button
                onClick={() =>
                  openPanel(
                    "transactions"
                  )
                }
              >
                لیست تراکنش‌ها
              </button>

              <button
                onClick={() =>
                  openPanel(
                    "orders"
                  )
                }
              >
                سفارش‌های ثبت‌شده
              </button>

              <button
                onClick={() =>
                  openPanel(
                    "shipping"
                  )
                }
              >
                تغییرات ثبت خرید
              </button>

            </div>


            {/* LOGOUT */}

            <button
              className="admin-logout"
              onClick={handleLogout}
            >
              خروج
            </button>

          </aside>

        </>
      )}


      {/* MAIN */}

      <section className="admin-content">

        {/* FILTER */}

        <div className="admin-filter">

          <div className="admin-search">

            <input
              type="text"
              placeholder="جستجوی محصول..."
            />

          </div>

          <button>
            ویرایش شده
          </button>

          <button>
            حذف شده
          </button>

          <button>
            تغییر داده شده
          </button>

        </div>


        {/* PRODUCTS */}

        <div className="admin-products">

          {products.length === 0 ? (

            <div className="admin-empty">

              <h2>
                هنوز محصولی اضافه نشده
              </h2>

              <p>
                برای اضافه کردن محصول روی دکمه + بزن.
              </p>

            </div>

          ) : (

            products.map(
              (product) => (

                <div
                  className="admin-product-card"
                  key={product.id}
                >

                  <div className="admin-product-info">

                    <div className="admin-product-image">

                      {product.images.length > 0 ? (

                        <img
                          src={
                            product.images[0]
                          }
                          alt={
                            product.name
                          }
                        />

                      ) : (

                        <span>
                          عکس محصول
                        </span>

                      )}

                    </div>


                    <div>

                      <h3>
                        {product.name}
                      </h3>

                      <p>
                        {product.price}
                      </p>

                      <span>
                        {product.category}
                      </span>

                      {product.stock > 0 ? (

                        <span>
                          موجودی:{" "}
                          {product.stock}{" "}
                          عدد
                        </span>

                      ) : (

                        <span className="admin-out-of-stock">
                          ناموجود
                        </span>

                      )}

                    </div>

                  </div>


                  <div className="admin-product-actions">

                    <button
                      onClick={() =>
                        openPanel(
                          `edit-${product.id}`
                        )
                      }
                    >
                      ویرایش
                    </button>


                    <button
                      onClick={() => {

                        const confirmed =
                          window.confirm(
                            "آیا از حذف این محصول مطمئن هستید؟"
                          );

                        if (!confirmed)
                          return;

                        setProducts(
                          (
                            currentProducts
                          ) =>
                            currentProducts.filter(
                              (item) =>
                                item.id !==
                                product.id
                            )
                        );

                      }}
                    >
                      حذف
                    </button>

                  </div>

                </div>

              )
            )

          )}

        </div>

      </section>


      {/* ADD PRODUCT */}

      <button
        className="admin-add-product"
        onClick={() =>
          openPanel(
            "add-product"
          )
        }
        aria-label="افزودن محصول"
      >
        +
      </button>


      {/* POPUP */}

      {activePanel && (

        <div className="admin-panel-overlay">

          <div className="admin-popup">

            <button
              className="admin-popup-close"
              onClick={() =>
                setActivePanel(null)
              }
            >
              بستن
            </button>


            {/* PRODUCTS */}

            {activePanel ===
              "products" && (
              <>

                <h2>
                  محصولات
                </h2>

                <p>
                  مدیریت محصولات فروشگاه
                </p>

                <button
                  className="admin-primary-button"
                  onClick={() =>
                    openPanel(
                      "add-product"
                    )
                  }
                >
                  افزودن محصول
                </button>

              </>
            )}


            {/* ADD PRODUCT */}

            {activePanel ===
              "add-product" && (
              <>

                <h2>
                  افزودن محصول جدید
                </h2>


                <div className="admin-form">

                  {/* NAME */}

                  <label>

                    نام محصول

                    <input
                      type="text"
                      value={
                        productName
                      }
                      onChange={(e) =>
                        setProductName(
                          e.target.value
                        )
                      }
                      placeholder="نام محصول"
                    />

                  </label>


                  {/* PRICE */}

                  <label>

                    قیمت

                    <input
                      type="text"
                      value={
                        productPrice
                      }
                      onChange={(e) =>
                        setProductPrice(
                          e.target.value
                        )
                      }
                      placeholder="مثلاً ۱,۴۹۰,۰۰۰ تومان"
                    />

                  </label>


                  {/* STOCK */}

                  <label>

                    تعداد موجودی

                    <input
                      type="number"
                      min="0"
                      value={
                        productStock
                      }
                      onChange={(e) =>
                        setProductStock(
                          e.target.value
                        )
                      }
                      placeholder="مثلاً 10"
                    />

                  </label>


                  {/* CATEGORY */}

                  <label>

                    دسته‌بندی

                    <select
                      value={
                        productCategory
                      }
                      onChange={(e) =>
                        setProductCategory(
                          e.target.value
                        )
                      }
                    >

                      <option value="">
                        انتخاب دسته‌بندی
                      </option>

                      <option value="تیشرت">
                        تیشرت
                      </option>

                      <option value="شلوار">
                        شلوار
                      </option>

                      <option value="کلاه">
                        کلاه
                      </option>

                      <option value="کیف و کوله">
                        کیف و کوله
                      </option>

                      <option value="ست">
                        ست
                      </option>

                    </select>

                  </label>


                  {/* IMAGES */}

                  <div className="admin-image-upload">

                    <strong>
                      عکس‌های محصول
                    </strong>

                    <p>
                      می‌توانی چند عکس برای محصول انتخاب کنی.
                    </p>


                    <label className="admin-file-button">

                      انتخاب عکس‌ها

                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={
                          handleImageUpload
                        }
                      />

                    </label>


                    {productImages.length >
                      0 && (

                      <div className="admin-image-preview">

                        {productImages.map(
                          (
                            image,
                            index
                          ) => (

                            <div
                              className="admin-preview-item"
                              key={`${image}-${index}`}
                            >

                              <img
                                src={image}
                                alt={`تصویر ${
                                  index + 1
                                }`}
                              />

                              <button
                                type="button"
                                onClick={() =>
                                  removeImage(
                                    index
                                  )
                                }
                              >
                                حذف
                              </button>

                            </div>

                          )
                        )}

                      </div>

                    )}

                  </div>


                  {/* DESCRIPTION */}

                  <label>

                    توضیحات

                    <textarea
                      value={
                        productDescription
                      }
                      onChange={(e) =>
                        setProductDescription(
                          e.target.value
                        )
                      }
                      placeholder="توضیحات محصول"
                    />

                  </label>


                  {/* SIZES */}

                  <div className="admin-form-section">

                    <strong>
                      سایزها
                    </strong>

                    <div className="admin-add-option">

                      <input
                        type="text"
                        value={
                          newSize
                        }
                        onChange={(e) =>
                          setNewSize(
                            e.target.value
                          )
                        }
                        onKeyDown={(e) => {

                          if (
                            e.key ===
                            "Enter"
                          ) {

                            e.preventDefault();

                            addSize();

                          }

                        }}
                        placeholder="مثلاً S یا 38"
                      />

                      <button
                        type="button"
                        onClick={
                          addSize
                        }
                      >
                        افزودن سایز
                      </button>

                    </div>


                    {productSizes.length >
                      0 && (

                      <div className="admin-added-options">

                        {productSizes.map(
                          (size) => (

                            <div
                              className="admin-added-option"
                              key={size}
                            >

                              <span>
                                {size}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  removeSize(
                                    size
                                  )
                                }
                              >
                                حذف
                              </button>

                            </div>

                          )
                        )}

                      </div>

                    )}

                  </div>


                  {/* COLORS */}

                  <div className="admin-form-section">

                    <strong>
                      رنگ‌ها
                    </strong>

                    <div className="admin-add-option">

                      <input
                        type="text"
                        value={
                          newColor
                        }
                        onChange={(e) =>
                          setNewColor(
                            e.target.value
                          )
                        }
                        onKeyDown={(e) => {

                          if (
                            e.key ===
                            "Enter"
                          ) {

                            e.preventDefault();

                            addColor();

                          }

                        }}
                        placeholder="مثلاً مشکی"
                      />

                      <button
                        type="button"
                        onClick={
                          addColor
                        }
                      >
                        افزودن رنگ
                      </button>

                    </div>


                    {productColors.length >
                      0 && (

                      <div className="admin-added-options">

                        {productColors.map(
                          (color) => (

                            <div
                              className="admin-added-option"
                              key={color}
                            >

                              <span>
                                {color}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  removeColor(
                                    color
                                  )
                                }
                              >
                                حذف
                              </button>

                            </div>

                          )
                        )}

                      </div>

                    )}

                  </div>


                  {/* COLLECTIONS */}

                  <div className="admin-form-section">

                    <strong>
                      محل نمایش محصول
                    </strong>


                    <label className="admin-checkbox">

                      <input
                        type="checkbox"
                        checked={
                          isFeatured
                        }
                        onChange={(e) =>
                          setIsFeatured(
                            e.target.checked
                          )
                        }
                      />

                      محصول ویژه

                    </label>


                    <label className="admin-checkbox">

                      <input
                        type="checkbox"
                        checked={collections.includes(
                          "تابستانه"
                        )}
                        onChange={() =>
                          toggleCollection(
                            "تابستانه"
                          )
                        }
                      />

                      کالکشن بهاره

                    </label>


                    <label className="admin-checkbox">

                      <input
                        type="checkbox"
                        checked={collections.includes(
                          "تابستانی"
                        )}
                        onChange={() =>
                          toggleCollection(
                            "تابستانی"
                          )
                        }
                      />

                      کالکشن تابستانی

                    </label>


                    <label className="admin-checkbox">

                      <input
                        type="checkbox"
                        checked={collections.includes(
                          "پاییزی "
                        )}
                        onChange={() =>
                          toggleCollection(
                            "پاییزی "
                          )
                        }
                      />

                      کالکشن پاییزی

                    </label>


                    <label className="admin-checkbox">

                      <input
                        type="checkbox"
                        checked={collections.includes(
                          "زمستانی"
                        )}
                        onChange={() =>
                          toggleCollection(
                            "زمستانی "
                          )
                        }
                      />

                      کالکشن زمستانی

                    </label>

                  </div>


                  {/* SAVE */}

                  <button
                    type="button"
                    className="admin-primary-button"
                    onClick={
                      saveProduct
                    }
                  >
                    ذخیره محصول
                  </button>

                </div>

              </>
            )}


            {/* NOTIFICATIONS */}

            {activePanel ===
              "notifications" && (
              <>

                <h2>
                  اطلاعیه‌ها
                </h2>

                <p>
                  این اطلاعیه بعد از انتشار در صفحه اصلی نمایش داده می‌شود.
                </p>

                <textarea
                  className="admin-notification-input"
                  value={
                    notificationText
                  }
                  onChange={(e) =>
                    setNotificationText(
                      e.target.value
                    )
                  }
                  placeholder="اطلاعیه جدید را بنویس..."
                />

                <button
                  type="button"
                  className="admin-primary-button"
                  onClick={
                    publishNotification
                  }
                >
                  انتشار اطلاعیه
                </button>

              </>
            )}


            {/* TRANSACTIONS */}

            {activePanel ===
              "transactions" && (
              <>

                <h2>
                  لیست تراکنش‌ها
                </h2>

                <div className="admin-empty">

                  <p>
                    هنوز تراکنشی ثبت نشده است.
                  </p>

                </div>

              </>
            )}


            {/* ORDERS */}

            {activePanel ===
              "orders" && (
              <>

                <h2>
                  سفارش‌های ثبت‌شده
                </h2>

                <div className="admin-empty">

                  <p>
                    هنوز سفارشی ثبت نشده است.
                  </p>

                </div>

              </>
            )}


            {/* SHIPPING */}

            {activePanel ===
              "shipping" && (
              <>

                <h2>
                  هزینه ارسال شهرها
                </h2>

                <div className="shipping-list">

                  <div>

                    <span>
                      تهران
                    </span>

                    <input
                      type="text"
                      placeholder="هزینه ارسال"
                    />

                  </div>


                  <div>

                    <span>
                      تبریز
                    </span>

                    <input
                      type="text"
                      placeholder="هزینه ارسال"
                    />

                  </div>


                  <div>

                    <span>
                      مشهد
                    </span>

                    <input
                      type="text"
                      placeholder="هزینه ارسال"
                    />

                  </div>

                </div>


                <button className="admin-primary-button">
                  ذخیره تغییرات
                </button>

              </>

            )}

          </div>

        </div>

      )}

    </main>
  );
}