// ========================================
// TRANSACTIONS CONTROLLER=================
// ========================================

// List all transactions of the current user.
module.exports.list_all_transactions = (req, res) => {
    return req.app.locals.models.Transactions.findAll({ //findAndCountAll
        where: { user_id: req.user.id },
        include: ['category']
    })
        .then( (transactions) => {
            return res.json(transactions);
        });
};

// Create a new transaction for the current user.
module.exports.create_transaction = (req, res) => {
    const { description = '', note = '', amount = 0, createdAt = null } = req.body;

    return req.app.locals.models.Transactions
        .create({ description, note, amount, createdAt, user_id: req.user.id })
        .then((transaction) => {
            return res.json(transaction.get());
        });
};

// Delete transaction for the current user.
module.exports.delete_transaction = (req, res) => {
    return req.app.locals.models.Transactions
        .destroy({ where: { id: req.params.id, user_id: req.user.id }})
        .then(() => res.json(true));
};

// Update for the current user.
module.exports.update_transaction = (req, res) => {
    const fields = ['description', 'note', 'amount', 'createdAt'];
    const where = { id: req.params.id, user_id: req.user.id };

    return req.app.locals.models.Transactions
        .update(req.body, { fields, where })
        .then(() => res.json(true));
};