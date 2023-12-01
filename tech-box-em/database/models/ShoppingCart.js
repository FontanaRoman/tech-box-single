/** 
@param {import('sequelize').Sequelize} sequelize
@param {import('sequelize/types').DataType} dataTypes
@returns 
Etiquetas de documentacion. No afectan en nada si son removidas.
*/

module.exports = (sequelize, DataTypes) => {
  const ShoppingCart = sequelize.define("ShoppingCart", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dateOfPurchase: {
      type: DataTypes.DATE,
      allowNull: false
    },
  },
  {
    tableName: "shoppingCart",
    timestamps : false,
  });

  ShoppingCart.associate = function(models) {
    // Corrección: Cambia "foreingKey" a "foreignKey"
    ShoppingCart.hasOne(models.Product, {
      as: "producto",
      foreignKey: "id"
    });
    ShoppingCart.belongsTo(models.User, {
      as: "usuario",
      foreignKey: "user_id"
    });
    ShoppingCart.hasOne(models.PurchasedProduct, {
      as: "productosComprados",
      foreignKey: "shoppingCart_id"
    });
  }

  return ShoppingCart;
};
