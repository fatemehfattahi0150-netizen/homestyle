const pool = require("./db");

// =========================
// دریافت همه محصولات
// =========================

const getProducts = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    res.status(500).json({
      error: "خطا در دریافت محصولات",
    });
  }
};

// =========================
// ایجاد محصول جدید
// =========================

const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      description,
      images,
      sizes,
      colors,
      isFeatured,
      collections,
      stock,
    } = req.body;

    // نمایش اطلاعاتی که از صفحه مدیریت دریافت شده
    console.log("CREATE PRODUCT BODY:", req.body);

    const result = await pool.query(
      `INSERT INTO products
      (
        name,
        price,
        category,
        description,
        images,
        sizes,
        colors,
        is_featured,
        collections,
        stock
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
      [
        name,
        price,
        category,
        description,
        images || [],
        sizes || [],
        colors || [],
        isFeatured ?? false,
        collections || [],
        stock ?? 0,
      ]
    );

    console.log("PRODUCT CREATED:", result.rows[0]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);

    // نمایش خطای واقعی PostgreSQL در ترمینال
    console.error("DETAIL:", error.detail);
    console.error("MESSAGE:", error.message);
    console.error("CODE:", error.code);

    res.status(500).json({
      error: "خطا در ایجاد محصول",
      details: error.message,
    });
  }
};

// =========================
// ویرایش محصول
// =========================

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      price,
      category,
      description,
      images,
      sizes,
      colors,
      isFeatured,
      collections,
      stock,
    } = req.body;

    console.log("UPDATE PRODUCT ID:", id);
    console.log("UPDATE PRODUCT BODY:", req.body);

    const result = await pool.query(
      `UPDATE products
       SET
         name = $1,
         price = $2,
         category = $3,
         description = $4,
         images = $5,
         sizes = $6,
         colors = $7,
         is_featured = $8,
         collections = $9,
         stock = $10
       WHERE id = $11
       RETURNING *`,
      [
        name,
        price,
        category,
        description,
        images || [],
        sizes || [],
        colors || [],
        isFeatured ?? false,
        collections || [],
        stock ?? 0,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "محصول پیدا نشد",
      });
    }

    console.log("PRODUCT UPDATED:", result.rows[0]);

    res.json(result.rows[0]);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    console.error("DETAIL:", error.detail);
    console.error("MESSAGE:", error.message);
    console.error("CODE:", error.code);

    res.status(500).json({
      error: "خطا در ویرایش محصول",
      details: error.message,
    });
  }
};

// =========================
// حذف محصول
// =========================

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("DELETE PRODUCT ID:", id);

    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "محصول پیدا نشد",
      });
    }

    console.log("PRODUCT DELETED:", result.rows[0]);

    res.json({
      message: "محصول با موفقیت حذف شد",
      product: result.rows[0],
    });
  } catch (error) {
    console.error("DELETE PRODUCT ERROR:", error);
    console.error("DETAIL:", error.detail);
    console.error("MESSAGE:", error.message);
    console.error("CODE:", error.code);

    res.status(500).json({
      error: "خطا در حذف محصول",
      details: error.message,
    });
  }
};

// =========================
// EXPORT
// =========================

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};