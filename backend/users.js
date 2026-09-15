const pool = require("./db");
const bcrypt = require("bcryptjs");

// =========================
// ثبت نام کاربر
// =========================

const registerUser = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({
        error: "نام، شماره موبایل و رمز عبور الزامی هستند",
      });
    }

    // بررسی شماره موبایل تکراری
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE phone = $1",
      [phone]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        error: "این شماره موبایل قبلاً ثبت شده است",
      });
    }

    // رمز عبور را هش می‌کنیم
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users
      (name, phone, email, password_hash)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, phone, email, created_at`,
      [name, phone, email || null, passwordHash]
    );

    res.status(201).json({
      message: "ثبت نام با موفقیت انجام شد",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("REGISTER USER ERROR:", error);

    res.status(500).json({
      error: "خطا در ثبت نام کاربر",
    });
  }
};

// =========================
// ورود کاربر
// =========================

const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        error: "شماره موبایل و رمز عبور الزامی هستند",
      });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE phone = $1",
      [phone]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: "شماره موبایل یا رمز عبور اشتباه است",
      });
    }

    const user = result.rows[0];

    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatch) {
      return res.status(401).json({
        error: "شماره موبایل یا رمز عبور اشتباه است",
      });
    }

    res.json({
      message: "ورود با موفقیت انجام شد",
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error("LOGIN USER ERROR:", error);

    res.status(500).json({
      error: "خطا در ورود کاربر",
    });
  }
};

// =========================
// دریافت همه کاربران
// =========================

const getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, phone, email, created_at, updated_at
       FROM users
       ORDER BY id DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error("GET USERS ERROR:", error);

    res.status(500).json({
      error: "خطا در دریافت کاربران",
    });
  }
};

// =========================
// دریافت یک کاربر
// =========================

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT id, name, phone, email, created_at, updated_at
       FROM users
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "کاربر پیدا نشد",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("GET USER ERROR:", error);

    res.status(500).json({
      error: "خطا در دریافت کاربر",
    });
  }
};

// =========================
// ویرایش کاربر
// =========================

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, email } = req.body;

    const result = await pool.query(
      `UPDATE users
       SET
         name = $1,
         phone = $2,
         email = $3,
         updated_at = CURRENT_TIMESTAMP
       WHERE id = $4
       RETURNING id, name, phone, email, created_at, updated_at`,
      [name, phone, email || null, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "کاربر پیدا نشد",
      });
    }

    res.json({
      message: "اطلاعات کاربر با موفقیت ویرایش شد",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("UPDATE USER ERROR:", error);

    res.status(500).json({
      error: "خطا در ویرایش کاربر",
    });
  }
};

// =========================
// حذف کاربر
// =========================

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING id, name, phone, email",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "کاربر پیدا نشد",
      });
    }

    res.json({
      message: "کاربر با موفقیت حذف شد",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("DELETE USER ERROR:", error);

    res.status(500).json({
      error: "خطا در حذف کاربر",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};