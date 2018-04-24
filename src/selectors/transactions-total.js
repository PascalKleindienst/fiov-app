// =========================================
// TRANSACTION TOTAL SELECTOR ==============
// =========================================

// Get transactions total
export default (transactions) => (
    transactions
        .map((transaction) => transaction.amount)
        .reduce((sum, val) => sum + val, 0)
);