module.exports = (sequelize, DataTypes) => {
    const ShoppingCart = sequelize.define("ShoppingCart", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement : true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull : false
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull : false
      },
      dateOfPurchase: {
        type: DataTypes.DATE,
        allowNull : false
      },
    },
    {
      tableName: "shoppingCart",
    });
  
    return ShoppingCart;
  };
  