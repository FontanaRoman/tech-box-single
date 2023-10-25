module.exports = (sequelize, DataTypes) => {
    const PurchasedProduct = sequelize.define("PurchasedProduct", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        aotoIncrement : true
      },
      shoppingCart_id: {
        type: DataTypes.INTEGER,
        allowNull : false
      },
    },
    {
      tableName: "purchasedProducts",
    });
  
    return PurchasedProduct;
  };
  