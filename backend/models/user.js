const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("testdb", "root", "mysqlpassword", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false
  }
});

const User = sequelize.define("users", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profilePicUrl: {
    type: DataTypes.STRING
  }
});

console.log("table: users is ", User === sequelize.models.users);
module.exports = User;