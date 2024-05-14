const { DataTypes } = require("sequelize");
const database = require("./database");

const UserModel = database.define("UserModel", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.CHAR,
        unique: true
    },
    password: DataTypes.CHAR,
    address: {
        type: DataTypes.CHAR,
        unique: true
    }
})

module.exports = UserModel