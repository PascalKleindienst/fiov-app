// ========================================
// ROUTES =================================
// ========================================
module.exports = (app, publicPath) => {
    const path = require('path');
    const isAuthenticated = (req,res,next) => req.isAuthenticated() ? next() : res.redirect('/');
    
    app.use('/api', isAuthenticated);
    app.get('/api/transactions', (req, res) => {
        // app.locals.models.Transactions.findAndCountAll({
        app.locals.models.Transactions.findAll({
            where: { user_id: req.user.id },
            include: ['category']
        }).then( (transactions) => {
            res.json(transactions);
        });
    });

    app.get('*', (req, res) => {
        res.sendFile(path.join(publicPath, 'index.html'));
    });
};
