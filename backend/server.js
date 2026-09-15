const express = require("express");
const cors = require("cors");
require("dotenv").config();

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./products");

const {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("./users");

const {
  createOrder,
  getUserOrders,
  getOrderById,
  getOrders,
} = require("./orders");

// =========================
// ADMINS
// =========================

const {
  loginAdmin,
} = require("./admins");

// =========================
// NOTIFICATIONS
// =========================

const {
  getNotification,
  createNotification,
  deleteNotification,
} = require("./notifications");

const app = express();

// =========================
// MIDDLEWARE
// =========================

app.use(cors());

// افزایش حجم مجاز درخواست‌ها
// برای ارسال تصاویر Base64 محصولات
app.use(express.json({ limit: "20mb" }));

// =========================
// TEST BACKEND
// =========================

app.get("/", (req, res) => {
  res.json({
    message: "HomeStyle Backend is running!",
  });
});

// =========================
// PRODUCTS API
// =========================

// دریافت محصولات
app.get("/api/products", getProducts);

// افزودن محصول
app.post("/api/products", createProduct);

// ویرایش محصول
app.put("/api/products/:id", updateProduct);

// حذف محصول
app.delete("/api/products/:id", deleteProduct);

// =========================
// USERS API
// =========================

// ثبت نام کاربر
app.post("/api/users/register", registerUser);

// ورود کاربر
app.post("/api/users/login", loginUser);

// دریافت همه کاربران
app.get("/api/users", getUsers);

// دریافت یک کاربر
app.get("/api/users/:id", getUserById);

// ویرایش کاربر
app.put("/api/users/:id", updateUser);

// حذف کاربر
app.delete("/api/users/:id", deleteUser);

// =========================
// ADMINS API
// =========================

// ورود مدیر
app.post("/api/admin/login", loginAdmin);

// =========================
// NOTIFICATIONS API
// =========================

// دریافت اطلاعیه فعال
app.get("/api/notifications", getNotification);

// ایجاد اطلاعیه
app.post("/api/notifications", createNotification);

// غیرفعال کردن اطلاعیه
app.delete("/api/notifications/:id", deleteNotification);

// =========================
// ORDERS API
// =========================

// ثبت سفارش
app.post("/api/orders", createOrder);

// دریافت همه سفارش‌ها
app.get("/api/orders", getOrders);

// دریافت سفارش‌های یک کاربر
app.get("/api/orders/user/:userId", getUserOrders);

// دریافت جزئیات یک سفارش
app.get("/api/orders/:id", getOrderById);

// =========================
// START SERVER
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});