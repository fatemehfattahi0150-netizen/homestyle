const pool = require("./db");

// =========================
// ثبت سفارش جدید
// =========================

const createOrder = async (req, res) => {
  const client = await pool.connect();

  try {
    const {
      userId,
      fullName,
      phone,
      province,
      city,
      address,
      postalCode,
      description,
      totalCount,
      totalPrice,
      items,
    } = req.body;

    if (
      !userId ||
      !fullName ||
      !phone ||
      !province ||
      !city ||
      !address ||
      !postalCode
    ) {
      return res.status(400).json({
        error: "اطلاعات سفارش کامل نیست",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: "محصولات سفارش ارسال نشده‌اند",
      });
    }

    await client.query("BEGIN");

    // =========================
    // ثبت سفارش اصلی
    // =========================

    const orderResult = await client.query(
      `INSERT INTO orders
      (
        user_id,
        full_name,
        phone,
        province,
        city,
        address,
        postal_code,
        description,
        total_count,
        total_price,
        status
      )
      VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`,
      [
        userId,
        fullName,
        phone,
        province,
        city,
        address,
        postalCode,
        description || null,
        totalCount || 0,
        totalPrice || 0,
        "در حال پردازش",
      ]
    );

    const order = orderResult.rows[0];

    // =========================
    // ثبت محصولات سفارش
    // =========================

    for (const item of items) {
      const productId = item.id;
      const productName = item.name;
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;
      const size = item.size || null;
      const color = item.color || null;

      if (!productId || !productName) {
        throw new Error("اطلاعات یکی از محصولات سفارش ناقص است");
      }

      await client.query(
        `INSERT INTO order_items
        (
          order_id,
          product_id,
          product_name,
          price,
          quantity,
          size,
          color
        )
        VALUES
        ($1, $2, $3, $4, $5, $6, $7)`,
        [
          order.id,
          productId,
          productName,
          price,
          quantity,
          size,
          color,
        ]
      );
    }

    await client.query("COMMIT");

    res.status(201).json({
      message: "سفارش با موفقیت ثبت شد",
      order,
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("CREATE ORDER ERROR:", error);

    res.status(500).json({
      error: "خطا در ثبت سفارش",
    });
  } finally {
    client.release();
  }
};

// =========================
// سفارش‌های یک کاربر
// =========================

const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `SELECT *
       FROM orders
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("GET USER ORDERS ERROR:", error);

    res.status(500).json({
      error: "خطا در دریافت سفارش‌های کاربر",
    });
  }
};

// =========================
// جزئیات یک سفارش
// =========================

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const orderResult = await pool.query(
      `SELECT *
       FROM orders
       WHERE id = $1`,
      [id]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({
        error: "سفارش پیدا نشد",
      });
    }

    const itemsResult = await pool.query(
      `SELECT *
       FROM order_items
       WHERE order_id = $1
       ORDER BY id ASC`,
      [id]
    );

    res.json({
      order: orderResult.rows[0],
      items: itemsResult.rows,
    });
  } catch (error) {
    console.error("GET ORDER BY ID ERROR:", error);

    res.status(500).json({
      error: "خطا در دریافت جزئیات سفارش",
    });
  }
};

// =========================
// همه سفارش‌ها
// =========================

const getOrders = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT *
       FROM orders
       ORDER BY created_at DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);

    res.status(500).json({
      error: "خطا در دریافت سفارش‌ها",
    });
  }
};

// =========================
// خروجی
// =========================

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  getOrders,
};