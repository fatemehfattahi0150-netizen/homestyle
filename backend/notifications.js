const pool = require("./db");

// =========================
// دریافت اطلاعیه فعال
// =========================

const getNotification = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT *
       FROM notifications
       WHERE is_active = true
       ORDER BY id DESC
       LIMIT 1`
    );

    if (result.rows.length === 0) {
      return res.json(null);
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("GET NOTIFICATION ERROR:", error);

    res.status(500).json({
      error: "خطا در دریافت اطلاعیه",
    });
  }
};

// =========================
// ایجاد اطلاعیه
// =========================

const createNotification = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "متن اطلاعیه الزامی است",
      });
    }

    // غیرفعال کردن اطلاعیه‌های قبلی
    await pool.query(
      `UPDATE notifications
       SET is_active = false`
    );

    // ایجاد اطلاعیه جدید
    const result = await pool.query(
      `INSERT INTO notifications (message, is_active)
       VALUES ($1, true)
       RETURNING *`,
      [message.trim()]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("CREATE NOTIFICATION ERROR:", error);

    res.status(500).json({
      error: "خطا در ایجاد اطلاعیه",
      details: error.message,
    });
  }
};

// =========================
// حذف / غیرفعال کردن اطلاعیه
// =========================

const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE notifications
       SET is_active = false
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "اطلاعیه پیدا نشد",
      });
    }

    res.json({
      message: "اطلاعیه با موفقیت غیرفعال شد",
      notification: result.rows[0],
    });
  } catch (error) {
    console.error("DELETE NOTIFICATION ERROR:", error);

    res.status(500).json({
      error: "خطا در حذف اطلاعیه",
      details: error.message,
    });
  }
};

module.exports = {
  getNotification,
  createNotification,
  deleteNotification,
};
