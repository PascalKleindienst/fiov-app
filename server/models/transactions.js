// ========================================
// Transactions Model =====================
// ========================================
module.exports = (sequelize, DataTypes) => {
    const Transactions = sequelize.define('Transactions', {
        description: DataTypes.STRING,
        note: DataTypes.TEXT,
        amount: DataTypes.INTEGER
    }, {});

    Transactions.associate = function(models) {
        Transactions.belongsTo(models.Categories, {
            foreignKey: 'category_id',
            onDelete: 'CASCADE',
            as: 'category'
        });

        Transactions.belongsTo(models.User, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            as: 'user'
        });
    };
    
    return Transactions;
};