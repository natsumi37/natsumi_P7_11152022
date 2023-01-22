const { Sequelize, DataTypes } = require("sequelize");
const User = require("./user");

const sequelize = new Sequelize("testdb", "root", "mysqlpassword", {
  host: "localhost",
  dialect: "mysql",
  define: {
    timestamps: false
  }
});

// define "posts" table

const Post = sequelize.define("Post", {
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
});

// define "readpost" table

const ReadPost = sequelize.define("ReadPost", {
  readpost_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  postId: {
    type: DataTypes.INTEGER,
    // foreignKey: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    // foreignKey: true,
    allowNull: false
  }},
  {
  tableName: "readpost",
  }
);

// // define "likepost" table

const LikePost = sequelize.define("LikePost", {
  likepost_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  postId: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    allowNull: false
  }},
  {
  tableName: "likepost",
  }
);

// // define sequelize associations

User.hasMany(Post, {
  foreignKey: "userId"
});
Post.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "user_id"
});

Post.hasMany(ReadPost, {
  foreignKey: "postId"
});
ReadPost.belongsTo(Post, {
  foreignKey: "postId",
  targetKey: "post_id"
});

Post.hasMany(LikePost, {
  foreignKey: "postId"
});
LikePost.belongsTo(Post, {
  foreignKey: "postId",
  targetKey: "post_id"
});

// // export models

module.exports = { sequelize, Post, ReadPost, LikePost };