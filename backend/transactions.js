let transactions = [];

// دریافت لیست تراکنش‌ها
const getTransactions = (req, res) => {
  res.json(transactions);
};

// ثبت تراکنش جدید
const createTransaction = (req, res) => {
  const newTransaction = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date(),
  };

  transactions.push(newTransaction);

  res.status(201).json(newTransaction);
};

// تغییر وضعیت تراکنش
const updateTransaction = (req, res) => {
  const id = Number(req.params.id);

  const index = transactions.findIndex(
    (transaction) => transaction.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      error: "تراکنش پیدا نشد",
    });
  }

  transactions[index] = {
    ...transactions[index],
    ...req.body,
    id,
  };

  res.json(transactions[index]);
};

// حذف تراکنش
const deleteTransaction = (req, res) => {
  const id = Number(req.params.id);

  const index = transactions.findIndex(
    (transaction) => transaction.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      error: "تراکنش پیدا نشد",
    });
  }

  transactions.splice(index, 1);

  res.json({
    message: "تراکنش با موفقیت حذف شد",
  });
};

module.exports = {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};