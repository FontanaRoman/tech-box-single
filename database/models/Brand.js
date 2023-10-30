/** 
@param {import('sequelize').Sequelize} sequelize
@param {import('sequelize/types').DataType} dataTypes
@returns 
Etiquetas de documentacion. No afectan en nada si son removidas.
*/
module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define("Brand", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    tableName: "brands",
    timestamps: false,
  });

  Brand.associate = function(models){
    Brand.hasMany(models.Product, {
      as: "productos", // Cambiado a "productos" en plural
      foreignKey: "brand_id"
    });
  }

  return Brand;
};
