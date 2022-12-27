const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("testdb", "root", "mysqlpassword", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false
  }
});

// async function test() {
//   try {
//   await sequelize.authenticate();
//   console.log("Connected to database!");
// } catch (error) {
//   console.error('Unable to connect to database:', error);
// }}

// test();

const Post = sequelize.define("posts", {
  post_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contentImgUrl: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.STRING,
    foreignKey: true,
    allowNull: false
  },
  readPostId: [{
    type: DataTypes.STRING
  }],
  likePostId: [{
    type: DataTypes.STRING
  }]
});

console.log(Post === sequelize.models.posts);
module.exports = Post;