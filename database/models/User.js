/** 
@param {import('sequelize').Sequelize} sequelize
@param {import('sequelize/types').DataType} dataTypes
@returns 
Etiquetas de documentacion. No afectan en nada si son removidas.
*/

module.exports = (sequelize, DataTypes)=>{
    const User = sequelize.define("User",{
        id_user : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        lastname : {
            type : DataTypes.STRING,
            allowNull : false
        },
        rol : {
            type : DataTypes.STRING,
            allowNull : false 
        },
        image : {
            type : DataTypes.STRING,
        },
        favoriteProduct_id : {
            type : DataTypes.INTEGER
        },
        purchasedProducts_id : {
            type : DataTypes.INTEGER
        },
        registerDate : {
            type : DataTypes.DATE,
            allowNull : false
        },
        password : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        phone : {
            type : DataTypes.STRING,
            allowNull : false
        },
        postalCode : {
            type : DataTypes.STRING,
            allowNull : false
        },
        address : {
            type : DataTypes.STRING,
            allowNull : false
        }
    },
    {
        tableName : "users",
        timestamps : false,
    }
    )

    User.associate = function(models){
        User.belongsTo(models.Favorite,{
          as : "favoritos",
          foreignKey : "user_id"
        })
        User.belongsTo(models.Favorite,{
            as : "productosFavoritos",
            foreignKey : "favoriteProduct_id"
          })
          User.belongsTo(models.ShoppingCart,{
            as : "carrito",
            foreignKey : "user_id"
          })
          User.belongsTo(models.PurchasedProduct,{
            as : "productosComprados",
            foreignKey : "purchasedProducts_id"
          })
      }

    return User;

}