module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull : false
      },
      description: {
        type: DataTypes.STRING,
        allowNull : false
      },
      image: {
        type: DataTypes.STRING,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull : false
      },
      discount: {
        type: DataTypes.INTEGER,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull : false
      },
      state: {
        type: DataTypes.INTEGER,
        allowNull : false
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull : false
      },
      brand_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "products",
    });
  
    return Product;
  };