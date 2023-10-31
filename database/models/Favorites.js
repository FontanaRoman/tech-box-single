/** 
@param {import('sequelize').Sequelize} sequelize
@param {import('sequelize/types').DataType} dataTypes
@returns 
Etiquetas de documentacion. No afectan en nada si son removidas.
*/

module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define("Favorite", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  {
    tableName: "favorites",
    timestamps : false,
  });

  Favorite.associate = function(models) {
    Favorite.belongsTo(models.Product, {
      as: "producto",
      foreignKey: "id"
    });

    Favorite.belongsTo(models.User, {
      as: "usuario",
      foreignKey: "user_id"
    });

    Favorite.hasMany(models.User, {
      as: "usuariosFavoritos",
      foreignKey: "favoriteProduct_id"
    });
  }

  return Favorite;
};
