module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define("Favorite", {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull : false
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull : false
      },
    },
    {
      tableName: "favorites",
    });
  
    return Favorite;
  };
  