/** 
@param {import('sequelize').Sequelize} sequelize
@param {import('sequelize/types').DataType} dataTypes
@returns 
Etiquetas de documentacion. No afectan en nada si son removidas.
*/

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    discount: {
      type: DataTypes.INTEGER,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    brand_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "products",
    timestamps : false,
  });

  Product.associate = function(models) {
    Product.belongsTo(models.Brand, {
      as: "marca",
      foreignKey: "brand_id"
    });
    Product.belongsTo(models.Category, {
      as: "categoria",
      foreignKey: "category_id"
    });
    Product.hasMany(models.Favorite, {
      as: "favoritos",
      foreignKey: "product_id"
    });
    Product.hasOne(models.ShoppingCart, {
      as: "carrito",
      foreignKey: "product_id"
    });
    
  }

  return Product;
};
