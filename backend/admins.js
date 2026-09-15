const pool = require("./db");

const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "نام کاربری و رمز عبور الزامی است",
      });
    }

    const result = await pool.query(
      `SELECT id, username, name, password_hash
       FROM admins
       WHERE username = $1`,
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: "نام کاربری یا رمز عبور اشتباه است",
      });
    }

    const admin = result.rows[0];

    if (password !== admin.password_hash) {
      return res.status(401).json({
        error: "نام کاربری یا رمز عبور اشتباه است",
      });
    }

    res.json({
      message: "ورود موفق بود",
      admin: {
        id: admin.id,
        username: admin.username,
        name: admin.name,
      },
    });
  } catch (error) {
    console.error("ADMIN LOGIN ERROR:", error);

    res.status(500).json({
      error: "خطا در ورود مدیر",
    });
  }
};

module.exports = {
  loginAdmin,
};