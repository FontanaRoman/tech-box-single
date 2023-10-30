/** 
@param {import('sequelize').Sequelize} sequelize
@param {import('sequelize/types').DataType} dataTypes
@returns 
Etiquetas de documentacion. No afectan en nada si son removidas.
*/

module.exports = (sequelize, DataTypes) => {
  const PurchasedProduct = sequelize.define("PurchasedProduct", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Corrección: 'autoIncrement' en lugar de 'aotoIncrement'
    },
    shoppingCart_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  {
    tableName: "purchasedProducts",
    timestamps : false,
  });

  PurchasedProduct.associate = function(models) {
    // Corrección en las relaciones
    PurchasedProduct.belongsTo(models.User, {
      as: "usuario",
      foreignKey: "purchasedProduct_id" // Corrección: Debe ser 'purchasedProduct_id'
    });
    
    PurchasedProduct.belongsTo(models.ShoppingCart, {
      as: "carrito",
      foreignKey: "shoppingCart_id"
    });
  }

  return PurchasedProduct;
};