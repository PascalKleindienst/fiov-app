// ========================================
// ROUTES =================================
// ========================================
module.exports = (app, publicPath) => {
    const path = require('path');
    const isAuthenticated = (req,res,next) => req.isAuthenticated() ? next() : res.redirect('/');
    
    app.use('/api', isAuthenticated);

    // =============== Transactions ===============
    const TransactionsController = require('../controllers/transactions');
    app.route('/api/transactions')
        .get(TransactionsController.list_all_transactions)
        .post(TransactionsController.create_transaction);
    app.route('/api/transactions/:id')
        .patch(TransactionsController.update_transaction)
        .delete(TransactionsController.delete_transaction);

    app.get('*', (req, res) => {
        res.sendFile(path.join(publicPath, 'index.html'));
    });
};
