// ========================================
// Categories Model =====================
// ========================================
module.exports = (sequelize, DataTypes) => {
    const Categories = sequelize.define('Categories', {
        title: DataTypes.STRING
    }, {});

    Categories.associate = function(models) {
        Categories.hasMany(models.Transactions, {
            foreignKey: 'category_id',
            as: 'transactions',
        });

        Categories.belongsTo(models.User, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
        });
    };
    
    return Categories;
};