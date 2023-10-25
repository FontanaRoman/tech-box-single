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

    return User;

}