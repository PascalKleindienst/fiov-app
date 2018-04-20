// ========================================
// TRANSACTIONS CONTROLLER=================
// ========================================

// List all transactions of the current user.
module.exports.list_all_transactions = (req, res) => {
    req.app.locals.models.Transactions.findAll({ //findAndCountAll
        where: { user_id: req.user.id },
        include: ['category']
    })
        .then( (transactions) => {
            res.json(transactions);
        })
        .catch((err) => {
            res.send(err);
        });
};

// Create a new transaction for the current user.
module.exports.create_transaction = (req, res) => {
    const { description = '', note = '', amount = 0, createdAt = null } = req.body;

    req.app.locals.models.Transactions
        .create({ description, note, amount, createdAt, user_id: req.user.id })
        .then((transaction) => {
            res.json(transaction.get());
        })
        .catch((err) => {
            res.send(err);
        });
};
